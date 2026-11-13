// Vercel serverless function: GET /api/admin/analytics
//
// Returns REAL aggregated cadet data for the Admin Panel (no mock rows):
// XP / streak totals, lesson completion, per-concept quiz results, a list of
// what each cadet is struggling with, and class-wide trouble spots, plus a CSV
// export of the same rows.
//
// SECURITY MODEL:
//   Requires a short-lived signed token issued by /api/admin-login, sent as
//   `Authorization: Bearer <token>`. Set ANALYTICS_SECRET in Vercel env vars; if
//   unset, ADMIN_PASSWORD-derived signing material is used instead.
//
// ACTIVITY: sign-ins are grouped per cadet account (where, on what device, how often).
//
// DATA SOURCE:
//   Cadet rows come from api/_lib/cadets.js (the same store /api/leaderboard
//   writes). With no submissions yet, `cadets` is simply empty.
//
// Responses:
//   200 { ok: true, generatedAt, totals, cadets, commonStruggles, telemetry }
//   200 text/csv                                        (?format=csv)
//   401 { ok: false, error: 'unauthorized' }            (missing/bad/expired token)

import crypto from 'crypto';

import { getJSON } from '../_lib/kv.js';
import { loadCadets } from '../_lib/cadets.js';

// ---- Server-side activity, grouped by cadet account ---------------------------
// Every page load posts an anonymous "visit". A sign-in or session ping also posts
// a "login" record carrying the cadet's name and the id of the visit it came
// from, so each login can be joined to where and on what device it happened.
// Anonymous visits are NOT listed; they are only counted.
function parseBrowser(ua) {
  const s = String(ua || '');
  if (/Edg\//.test(s)) return 'Edge';
  if (/OPR\/|Opera/.test(s)) return 'Opera';
  if (/Firefox\//.test(s)) return 'Firefox';
  if (/CriOS\//.test(s)) return 'Chrome (iOS)';
  if (/Safari\//.test(s) && /Version\//.test(s)) return 'Safari';
  if (/Chrome\//.test(s)) return 'Chrome';
  return 'Unknown';
}

const placeOf = (v) => {
  if (!v) return 'Unknown';
  const parts = [v.city, v.region].filter(Boolean).join(', ');
  const cc = v.countryCode ? ` (${v.countryCode})` : '';
  return (parts || v.country || 'Unknown') + (parts ? cc : '');
};

const deviceOf = (v) => (v ? `${v.platform || 'Unknown'} · ${parseBrowser(v.userAgent)}` : 'Unknown');

const topKeys = (map, limit = 3) =>
  [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([k]) => k);

async function aggregateTelemetry() {
  const visitorsRaw = await getJSON('telemetry:visitors', []);
  const loginsRaw = await getJSON('telemetry:logins', []);
  const visitors = Array.isArray(visitorsRaw) ? visitorsRaw : [];
  const logins = Array.isArray(loginsRaw) ? loginsRaw : [];

  const visitorById = new Map(visitors.map((v) => [v.id, v]));
  const linked = new Set(logins.map((l) => l.visitorId).filter(Boolean));
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const byName = new Map();
  let identifiedSessions = 0;
  let identifiedLast7 = 0;
  // Records are stored newest first, so the first one seen per cadet is their latest.
  for (const login of logins) {
    const name = String(login.username || '').trim();
    if (!name) continue;
    identifiedSessions += 1;
    const when = Date.parse(login.loggedAt ?? login.timestamp);
    const isRecent = Number.isFinite(when) && when >= weekAgo;
    if (isRecent) identifiedLast7 += 1;
    const visit = visitorById.get(login.visitorId);
    const key = name.toLowerCase();
    let acc = byName.get(key);
    if (!acc) {
      acc = {
        username: name,
        instrument: login.instrument || '',
        lessonProgress: login.lessonProgress || '',
        xp: login.xp,
        streak: login.streak,
        sessions: 0,
        sessionsLast7Days: 0,
        firstSeen: login.loggedAt ?? login.timestamp,
        lastSeen: login.loggedAt ?? login.timestamp,
        ips: new Set(),
        places: new Map(),
        devices: new Map(),
        recent: [],
      };
      byName.set(key, acc);
    }
    acc.sessions += 1;
    if (isRecent) acc.sessionsLast7Days += 1;
    acc.firstSeen = login.loggedAt ?? login.timestamp; // ends up as the oldest
    if (visit?.ip) acc.ips.add(visit.ip);
    const place = placeOf(visit);
    const device = deviceOf(visit);
    acc.places.set(place, (acc.places.get(place) ?? 0) + 1);
    acc.devices.set(device, (acc.devices.get(device) ?? 0) + 1);
    if (acc.recent.length < 8) {
      acc.recent.push({ when: login.loggedAt ?? login.timestamp, place, device, ip: visit?.ip || '' });
    }
  }

  const accounts = [...byName.values()]
    .map((a) => ({
      username: a.username,
      instrument: a.instrument,
      lessonProgress: a.lessonProgress,
      xp: a.xp,
      streak: a.streak,
      sessions: a.sessions,
      sessionsLast7Days: a.sessionsLast7Days,
      firstSeen: a.firstSeen,
      lastSeen: a.lastSeen,
      ipCount: a.ips.size,
      places: topKeys(a.places),
      devices: topKeys(a.devices),
      recent: a.recent,
    }))
    .sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen));

  return {
    totals: {
      accounts: accounts.length,
      sessions: identifiedSessions,
      sessionsLast7Days: identifiedLast7,
      anonymousVisits: visitors.filter((v) => !linked.has(v.id)).length,
    },
    accounts,
  };
}

// ---- Auth token (issued by /api/admin-login, verified here) ----------------
function signingKey() {
  const secret = (process.env.ANALYTICS_SECRET || process.env.ADMIN_PASSWORD || '').trim();
  if (!secret) return null;
  return crypto.createHash('sha256').update(`cadet-music-admin:${secret}`).digest();
}

export function createAdminToken(ttlMs = 2 * 60 * 60 * 1000) {
  const key = signingKey();
  if (!key) return null;
  const exp = Date.now() + ttlMs;
  const payload = String(exp);
  const sig = crypto.createHmac('sha256', key).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyAdminToken(token) {
  const key = signingKey();
  if (!key || typeof token !== 'string') return false;
  const dot = token.indexOf('.');
  if (dot === -1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', key).update(payload).digest('hex');
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return false;
  } catch {
    return false;
  }
  return Number(payload) > Date.now();
}

// ---- Aggregation -------------------------------------------------------------
// Lessons per instrument path (mirrors getAllLessons('alto-sax').length in src/curriculum).
// The admin panel recomputes completion from the real curriculum, so this is
// only used for the CSV export. Update it if you add or remove lessons.
const TOTAL_LESSONS = 154;

// Thresholds. Keep in sync with the constants at the top of AdminPanel.tsx.
const MIN_ANSWERS = 5; // answers needed on one concept before judging it
const STRUGGLE_BELOW = 60; // % accuracy under which a concept counts as a struggle
const OVERALL_MIN_ANSWERS = 10; // answers overall before judging overall accuracy
const INACTIVE_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

function aggregate(cadet) {
  const now = Date.now();

  // conceptMastery is keyed BY concept id: { rhythm: { attempts, correct, ... } }.
  const concepts = Object.entries(cadet.conceptMastery || {})
    .map(([concept, m]) => {
      const attempts = Number(m?.attempts) || 0;
      const correct = Math.min(Number(m?.correct) || 0, attempts);
      return {
        concept,
        attempts,
        correct,
        accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : 0,
        lastReviewed: typeof m?.lastReviewed === 'string' && m.lastReviewed ? m.lastReviewed : null,
      };
    })
    .filter((c) => c.attempts > 0)
    .sort((a, b) => a.accuracy - b.accuracy);

  const attempts = concepts.reduce((s, c) => s + c.attempts, 0);
  const correct = concepts.reduce((s, c) => s + c.correct, 0);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : null;
  const strugglingConcepts = concepts
    .filter((c) => c.attempts >= MIN_ANSWERS && c.accuracy < STRUGGLE_BELOW)
    .map((c) => c.concept);

  const lastActive = typeof cadet.updatedAt === 'string' ? cadet.updatedAt : null;
  const lastActiveMs = lastActive ? Date.parse(lastActive) : NaN;
  const daysInactive = Number.isFinite(lastActiveMs)
    ? Math.max(0, Math.floor((now - lastActiveMs) / DAY_MS))
    : null;

  const flagReasons = [];
  if (attempts >= OVERALL_MIN_ANSWERS && accuracy !== null && accuracy < STRUGGLE_BELOW) {
    flagReasons.push('low-accuracy');
  }
  if (strugglingConcepts.length > 0) flagReasons.push('struggling-concepts');
  if (daysInactive !== null && daysInactive >= INACTIVE_DAYS) flagReasons.push('inactive');

  // "Current" streak is the latest reported one; a streak only counts as active
  // if the cadet synced within the last day (the stored number can be stale).
  const reportedStreak = typeof cadet.currentStreak === 'number' ? cadet.currentStreak : cadet.streak;
  const streak = daysInactive === null || daysInactive <= 1 ? reportedStreak : 0;

  return {
    name: cadet.name,
    xp: cadet.xp,
    streak,
    bestStreak: cadet.streak,
    lessonsCompleted: cadet.lessons,
    completionRate: Math.min(100, Math.round((cadet.lessons / TOTAL_LESSONS) * 100)),
    conceptAttempts: attempts,
    conceptAccuracy: accuracy,
    strugglingConcepts,
    concepts,
    lastActive,
    daysInactive,
    flagReasons,
    flaggedForHelp: flagReasons.length > 0,
  };
}

// Concepts that several cadets are struggling with, most widespread first.
function commonStruggles(rows) {
  const byConcept = new Map();
  for (const r of rows) {
    for (const c of r.concepts) {
      if (c.attempts >= MIN_ANSWERS && c.accuracy < STRUGGLE_BELOW) {
        const entry = byConcept.get(c.concept) ?? { concept: c.concept, cadets: 0, total: 0 };
        entry.cadets += 1;
        entry.total += c.accuracy;
        byConcept.set(c.concept, entry);
      }
    }
  }
  return [...byConcept.values()]
    .map((e) => ({ concept: e.concept, cadets: e.cadets, avgAccuracy: Math.round(e.total / e.cadets) }))
    .sort((a, b) => b.cadets - a.cadets || a.avgAccuracy - b.avgAccuracy)
    .slice(0, 5);
}

function buildReport(cadets) {
  const rows = cadets.map(aggregate);
  const totals = {
    cadets: rows.length,
    totalXP: rows.reduce((s, r) => s + r.xp, 0),
    avgXP: rows.length ? Math.round(rows.reduce((s, r) => s + r.xp, 0) / rows.length) : 0,
    activeStreaks: rows.filter((r) => r.streak > 0).length,
    avgCompletionRate: rows.length
      ? Math.round(rows.reduce((s, r) => s + r.completionRate, 0) / rows.length)
      : 0,
    strugglingCount: rows.filter((r) => r.flaggedForHelp).length,
  };
  return { rows, totals, struggles: commonStruggles(rows) };
}

// ---- CSV export ---------------------------------------------------------------
// Cadet names are free text submitted by anyone, and this file gets opened in
// Excel, so neutralise cells that start with a formula character.
function csvEscape(value) {
  let s = String(value ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows) {
  const headers = [
    'name', 'xp', 'streak_days', 'best_streak_days', 'lessons_completed', 'completion_rate_pct',
    'concept_attempts', 'concept_accuracy_pct', 'struggling_concepts', 'concept_breakdown',
    'last_synced', 'days_inactive', 'flagged_for_help', 'flag_reasons',
  ];
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      csvEscape(r.name), r.xp, r.streak, r.bestStreak, r.lessonsCompleted, r.completionRate,
      r.conceptAttempts, r.conceptAccuracy ?? '', csvEscape(r.strugglingConcepts.join(';')),
      csvEscape(r.concepts.map((c) => `${c.concept}:${c.correct}/${c.attempts}`).join(';')),
      csvEscape(r.lastActive ?? ''), r.daysInactive ?? '',
      r.flaggedForHelp ? 'yes' : 'no', csvEscape(r.flagReasons.join(';')),
    ].join(','));
  }
  return lines.join('\n');
}

// ---- Handler -------------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const auth = String(req.headers.authorization || '').trim();
  let token = /^Bearer\s+/i.test(auth) ? auth.replace(/^Bearer\s+/i, '').trim() : '';
  // Older clients open the CSV via a plain link, so a `?token=` query parameter
  // is still accepted. The admin panel now sends the header instead.
  if (!token && typeof req.query.token === 'string') token = req.query.token.trim();
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  const cadets = await loadCadets();
  const { rows, totals, struggles } = buildReport(cadets);

  if (req.query.format === 'csv') {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="cadet-analytics.csv"');
    return res.status(200).send(toCsv([...rows].sort((a, b) => b.xp - a.xp)));
  }

  const telemetry = await aggregateTelemetry();
  return res.status(200).json({
    ok: true,
    generatedAt: new Date().toISOString(),
    totals,
    cadets: rows.sort((a, b) => b.xp - a.xp),
    commonStruggles: struggles,
    telemetry,
  });
}
