// Vercel serverless functions: /api/leaderboard
//   GET  -> global standings (sorted by XP, top 100). Real cadets only.
//   POST -> submit/upsert a cadet's progress (XP, streak, lessons, quiz results)
//
// Storage: Vercel KV via api/_lib/kv.js (in-memory fallback until one is
// connected). There is no mock data: with no submissions the list is empty.
//
// Privacy: the public GET exposes only name, XP, streak, lessons and banner.
// Quiz results (conceptMastery) and activity times are stored for the admin
// panel and are never returned from this endpoint.

import { loadCadets, saveCadets, publicEntry } from './_lib/cadets.js';

// ---- Helpers ---------------------------------------------------------------
function sanitizeString(value, max) {
  if (typeof value !== 'string') return '';
  // Strip control chars; clamp length so nobody floods storage.
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);
}

function sanitizeNumber(value, max) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), max);
}

function sanitizeIso(value) {
  if (typeof value !== 'string') return '';
  const t = Date.parse(value);
  return Number.isFinite(t) ? new Date(t).toISOString() : '';
}

// Quiz results per concept: { [conceptId]: { attempts, correct, lastReviewed } }.
// Keys are restricted and values clamped so the store can't be flooded or abused.
const MAX_CONCEPTS = 40;
function sanitizeMastery(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out = {};
  for (const [key, val] of Object.entries(raw).slice(0, MAX_CONCEPTS)) {
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,39}$/.test(key) || key.startsWith('__')) continue;
    if (!val || typeof val !== 'object') continue;
    const attempts = sanitizeNumber(val.attempts, 1_000_000);
    const correct = Math.min(sanitizeNumber(val.correct, 1_000_000), attempts);
    if (attempts === 0) continue;
    out[key] = { attempts, correct, lastReviewed: sanitizeIso(val.lastReviewed) };
  }
  return Object.keys(out).length > 0 ? out : null;
}

// ---- Honeypot anti-bot field -------------------------------------------------
// The client renders a visually hidden input named `website_url` in every form
// that submits to this endpoint. Real users never fill it; bots usually do. If
// it's present AND non-empty we drop the request SILENTLY (fake success) so bots
// can't tell they were blocked, and we never store their payload.
const HONEYPOT_FIELD = 'website_url';
function isBotSubmission(body) {
  const hp = body?.[HONEYPOT_FIELD];
  return typeof hp === 'string' && hp.trim().length > 0;
}

function ranked(list) {
  const sorted = [...list].sort((a, b) => b.xp - a.xp).slice(0, 100);
  return sorted.map((e, i) => ({ ...publicEntry(e), rank: i + 1 }));
}

async function parseBody(req) {
  if (req.body != null && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
  });
  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

// ---- Handler ---------------------------------------------------------------
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    return res.status(200).json({ entries: ranked(await loadCadets()) });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);

    if (isBotSubmission(body)) {
      return res.status(200).json({ ok: true, entry: null, entries: ranked(await loadCadets()) });
    }

    const name = sanitizeString(body.name, 40);
    if (!name) {
      return res.status(400).json({ ok: false, error: 'name is required' });
    }

    const list = await loadCadets();
    const existing = list.find((e) => e.name.toLowerCase() === name.toLowerCase());
    const now = new Date().toISOString();
    const streak = sanitizeNumber(body.streak, 3650);
    const incoming = {
      name,
      xp: sanitizeNumber(body.xp, 1_000_000),
      streak, // best streak (public leaderboard never goes down)
      currentStreak: streak, // latest reported streak (admin panel)
      lessons: sanitizeNumber(body.lessons, 100_000),
      bannerBg: sanitizeString(body.bannerBg, 200),
      stickers: Array.isArray(body.stickers)
        ? body.stickers.filter((s) => typeof s === 'string').slice(0, 8)
        : [],
      conceptMastery: sanitizeMastery(body.conceptMastery),
      updatedAt: now,
    };

    if (existing) {
      // Never let a submission lower someone's recorded best.
      Object.assign(existing, {
        xp: Math.max(existing.xp, incoming.xp),
        streak: Math.max(existing.streak, incoming.streak),
        currentStreak: incoming.currentStreak,
        lessons: Math.max(existing.lessons, incoming.lessons),
        bannerBg: incoming.bannerBg || existing.bannerBg,
        stickers: incoming.stickers.length ? incoming.stickers : existing.stickers,
        // Latest quiz snapshot wins; keep the old one if this payload had none.
        conceptMastery: incoming.conceptMastery ?? existing.conceptMastery ?? null,
        updatedAt: now,
      });
    } else {
      list.push(incoming);
    }

    await saveCadets(list);
    const standings = ranked(list);
    const me = standings.find((e) => e.name.toLowerCase() === name.toLowerCase());
    return res.status(200).json({ ok: true, entry: me, entries: standings });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
