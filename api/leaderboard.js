// Vercel serverless functions: /api/leaderboard
//   GET  -> global high-score standings (sorted by XP, top 100)
//   POST -> submit/upsert a cadet's XP update (syncs rank across devices)
//
// ⚠️ STORAGE CAVEAT: Vercel serverless functions are stateless and restart
// frequently, so this in-memory store only shares data between requests that
// hit the same warm instance — entries will NOT reliably persist or sync
// globally until you connect a real database (see README note below). The
// API contract is designed so swapping in Vercel KV / Upstash Redis /
// Postgres later requires changing only load()/save() here.
//
// Seed data mirrors the former client-side MOCK_LEADERBOARD so the UI keeps
// working while no real submissions exist yet.

const SEED = [
  { name: 'Cpl Thompson', xp: 2450, streak: 21, lessons: 48, bannerBg: 'linear-gradient(135deg, #c9a84c 0%, #a68a3a 100%)', stickers: ['⭐', '🏅', '💫'] },
  { name: 'L/Cpl Martinez', xp: 1890, streak: 14, lessons: 35, bannerBg: 'linear-gradient(135deg, #3a8a5c 0%, #2d6d48 100%)', stickers: ['⭐', '🔥'] },
  { name: 'Cdt Williams', xp: 1650, streak: 10, lessons: 30, bannerBg: 'linear-gradient(135deg, #4a7c8a 0%, #2d5a66 100%)', stickers: ['⭐', '💎'] },
  { name: 'Cdt Brown', xp: 1200, streak: 7, lessons: 22, bannerBg: 'linear-gradient(135deg, #6b4c8a 0%, #4a3566 100%)', stickers: ['⭐'] },
  { name: 'Cdt Davis', xp: 980, streak: 5, lessons: 18, bannerBg: 'linear-gradient(135deg, #c44536 0%, #a33628 100%)', stickers: ['⭐', '🏅'] },
  { name: 'Cdt Johnson', xp: 750, streak: 3, lessons: 14, bannerBg: 'linear-gradient(135deg, #1a2332 0%, #2d3a4a 100%)', stickers: ['⭐'] },
];

// ---- Storage: Vercel KV with in-memory fallback -----------------------------
// See api/_lib/kv.js. With a KV store connected, entries persist across cold
// starts and sync globally across devices; without one we fall back to the
// per-instance in-memory store (plus SEED) so nothing breaks meanwhile.

import { getJSON, setJSON } from './_lib/kv.js';

const ENTRIES_KEY = 'leaderboard:entries';

async function load() {
  const stored = await getJSON(ENTRIES_KEY, null);
  if (Array.isArray(stored) && stored.length > 0) return stored;
  return SEED.map((e) => ({ ...e }));
}

async function save(list) {
  await setJSON(ENTRIES_KEY, list);
}

// ---- Helpers ---------------------------------------------------------------
function sanitizeString(value, max) {
  if (typeof value !== 'string') return '';
  // Strip control chars; clamp length so nobody floods storage.
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);
}

// ---- Honeypot anti-bot field -------------------------------------------------
// The client renders a visually hidden input named `website_url` in every form
// that submits to this endpoint (leaderboard submit + login/onboarding). Real
// users never see or fill it; naive scrapers/bots auto-populate every text
// field they find. If the field is present AND non-empty we treat the request
// as automated and reject it SILENTLY — returning a fake success response with
// the current standings so bots can't tell they were blocked (and never store
// their payload).
const HONEYPOT_FIELD = 'website_url';
function isBotSubmission(body) {
  const hp = body?.[HONEYPOT_FIELD];
  return typeof hp === 'string' && hp.trim().length > 0;
}

function sanitizeNumber(value, max) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), max);
}

function ranked(list) {
  const sorted = [...list].sort((a, b) => b.xp - a.xp).slice(0, 100);
  return sorted.map((e, i) => ({ ...e, rank: i + 1 }));
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
    return res.status(200).json({ entries: ranked(await load()) });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);

    // Honeypot check FIRST: silently drop bot submissions — respond exactly
    // like a successful submit so automated scrapers can't detect the block,
    // but never touch the store with their payload.
    if (isBotSubmission(body)) {
      return res.status(200).json({ ok: true, entry: null, entries: ranked(await load()) });
    }

    const name = sanitizeString(body.name, 40);
    if (!name) {
      return res.status(400).json({ ok: false, error: 'name is required' });
    }

    const list = await load();
    const existing = list.find((e) => e.name.toLowerCase() === name.toLowerCase());
    const incoming = {
      name,
      xp: sanitizeNumber(body.xp, 1_000_000),
      streak: sanitizeNumber(body.streak, 3650),
      lessons: sanitizeNumber(body.lessons, 100_000),
      bannerBg: sanitizeString(body.bannerBg, 200),
      stickers: Array.isArray(body.stickers)
        ? body.stickers.filter((s) => typeof s === 'string').slice(0, 8)
        : [],
    };

    if (existing) {
      // Never let a submission lower someone's recorded best.
      Object.assign(existing, {
        xp: Math.max(existing.xp, incoming.xp),
        streak: Math.max(existing.streak, incoming.streak),
        lessons: Math.max(existing.lessons, incoming.lessons),
        bannerBg: incoming.bannerBg || existing.bannerBg,
        stickers: incoming.stickers.length ? incoming.stickers : existing.stickers,
      });
    } else {
      list.push(incoming);
    }

    await save(list);
    const standings = ranked(list);
    const me = standings.find((e) => e.name.toLowerCase() === name.toLowerCase());
    return res.status(200).json({ ok: true, entry: me, entries: standings });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
