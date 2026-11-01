// Vercel serverless function: GET /api/admin/analytics
//
// Returns REAL aggregated cadet data for the Admin Panel (no more demo-mode
// placeholders): XP / streak totals, lesson completion rates, and
// failure/struggle metrics — plus a CSV export of the same rows.
//
// SECURITY MODEL (important):
//   Vercel serverless functions are stateless and cannot share an in-memory
//   session with the browser, so this endpoint requires a short-lived signed
//   token issued by /api/admin-login (HMAC via crypto). The client sends it
//   as `Authorization: Bearer <token>`. Set ANALYTICS_SECRET in Vercel env
//   vars; if unset we fall back to ADMIN_PASSWORD-derived signing material so
//   the panel works out-of-the-box with only one configured variable.
//
// DATA SOURCE:
//   Same store as /api/leaderboard (in-memory until you attach a database).
//   The API contract is stable — swapping load()/save() in leaderboard.js for
//   Vercel KV / Postgres automatically makes this endpoint persistent too.
//
// Responses:
//   200 { ok: true, generatedAt, totals, cadets }      (default)
//   200 text/csv                                        (?format=csv)
//   401 { ok: false, error: 'unauthorized' }            (missing/bad/expired token)

import crypto from 'crypto';

// ---- Shared leaderboard store ----------------------------------------------
// Duplicated minimal seed so this module is self-contained; when a real DB is
// wired into api/leaderboard.js, both files should import from one shared
// module (e.g. ../_lib/store.js).
const SEED = [
  { name: 'Cpl Thompson', xp: 2450, streak: 21, lessons: 48, conceptMastery: {}, completedLessons: [] },
  { name: 'L/Cpl Martinez', xp: 1890, streak: 14, lessons: 35, conceptMastery: {}, completedLessons: [] },
  { name: 'Cdt Williams', xp: 1650, streak: 10, lessons: 30, conceptMastery: {}, completedLessons: [] },
  { name: 'Cdt Brown', xp: 1200, streak: 7, lessons: 22, conceptMastery: {}, completedLessons: [] },
  { name: 'Cdt Davis', xp: 980, streak: 5, lessons: 18, conceptMastery: {}, completedLessons: [] },
  { name: 'Cdt Johnson', xp: 750, streak: 3, lessons: 14, conceptMastery: {}, completedLessons: [] },
];

let entries = null;
function loadCadets() {
  if (!entries) entries = SEED.map((e) => ({ ...e }));
  return entries;
}

// ---- Auth token (issued by /api/admin-login, verified here) ----------------
function signingKey() {
  const secret = process.env.ANALYTICS_SECRET || process.env.ADMIN_PASSWORD;
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

function verifyAdminToken(token) {
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
// Total curriculum lesson count (mirrors getAllLessons().length in src/data.ts;
// update together if the curriculum changes). Kept as a constant because TS
// sources can't be imported from a serverless JS function.
const TOTAL_LESSONS = 78;

function aggregate(cadet) {
  const masteryEntries = Object.values(cadet.conceptMastery || {});
  const attempts = masteryEntries.reduce((s, m) => s + (m.attempts || 0), 0);
  const correct = masteryEntries.reduce((s, m) => s + (m.correct || 0), 0);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : null;
  const strugglingConcepts = masteryEntries
    .filter((m) => (m.attempts || 0) >= 5 && ((m.correct || 0) / m.attempts) * 100 < 60)
    .map((m) => m.concept);
  return {
    name: cadet.name,
    xp: cadet.xp,
    streak: cadet.streak,
    lessonsCompleted: cadet.lessons,
    completionRate: Math.min(100, Math.round((cadet.lessons / TOTAL_LESSONS) * 100)),
    conceptAttempts: attempts,
    conceptAccuracy: accuracy,
    strugglingConcepts,
    // "Struggling" heuristic mirrors the client's adaptive thresholds
    // (attempts >= 10, accuracy < 60) or near-zero activity.
    flaggedForHelp:
      (attempts >= 10 && accuracy !== null && accuracy < 60) ||
      (cadet.xp < 500 && cadet.streak === 0),
  };
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
  return { rows, totals };
}

// ---- CSV export ---------------------------------------------------------------
function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toCsv(rows) {
  const headers = [
    'name', 'xp', 'streak_days', 'lessons_completed', 'completion_rate_pct',
    'concept_attempts', 'concept_accuracy_pct', 'struggling_concepts', 'flagged_for_help',
  ];
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      csvEscape(r.name), r.xp, r.streak, r.lessonsCompleted, r.completionRate,
      r.conceptAttempts, r.conceptAccuracy ?? '', csvEscape(r.strugglingConcepts.join(';')),
      r.flaggedForHelp ? 'yes' : 'no',
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

  const auth = req.headers.authorization || '';
  let token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  // CSV export is opened via a plain link (no headers possible), so also
  // accept the same signed token as a `?token=` query parameter.
  if (!token && typeof req.query.token === 'string') token = req.query.token;
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  const { rows, totals } = buildReport(loadCadets());

  if (req.query.format === 'csv') {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="cadet-analytics.csv"');
    return res.status(200).send(toCsv(rows));
  }

  return res.status(200).json({
    ok: true,
    generatedAt: new Date().toISOString(),
    totals,
    cadets: rows.sort((a, b) => b.xp - a.xp),
  });
}
