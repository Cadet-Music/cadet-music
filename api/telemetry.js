// Vercel serverless function: POST /api/telemetry
//
// Receives cadet session ping data from the client (src/utils/telemetry.ts)
// and records it SERVER-SIDE in Vercel KV so the Admin Panel can show
// aggregated visitor metrics across ALL devices worldwide — not just the
// one browser's localStorage.
//
// Keys written:
//   telemetry:visitors  -> capped array of visitor/session records (~500 max)
//   telemetry:logins    -> capped array of cadet login/session pings  (~500 max)
//
// Storage: api/_lib/kv.js — real persistence when a Vercel KV store is
// connected; graceful in-memory fallback (per-instance, non-persistent)
// until then.
//
// Abuse controls: honeypot field (`website_url`) rejects obvious bots
// silently, payload sizes are clamped, and arrays are capped FIFO so nobody
// can flood the store.

import { getJSON, setJSON } from './_lib/kv.js';

const VISITORS_KEY = 'telemetry:visitors';
const LOGINS_KEY = 'telemetry:logins';
const MAX_RECORDS = 500;
const HONEYPOT_FIELD = 'website_url';

function str(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max);
}

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : 0;
}

function bool(value) {
  return value === true || value === 'true';
}

/** Build a sanitized visitor record from the client payload + request headers. */
function buildVisitorRecord(body, req) {
  // The server sees the REAL connecting IP (the client-reported `ip` comes
  // from a public echo service and may be missing/spoofed). We keep both.
  const fwd = String(req.headers['x-forwarded-for'] || '');
  const realIp = (fwd.split(',')[0] || '').trim() || str(req.socket?.remoteAddress, 45);
  return {
    id: str(body.id, 36) || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    timestamp: str(body.timestamp, 32) || new Date().toISOString(),
    ip: realIp || str(body.ip, 45),
    clientReportedIp: str(body.ip, 45),
    city: str(body.city, 64),
    region: str(body.region, 64),
    country: str(body.country, 64),
    countryCode: str(body.countryCode, 2).toUpperCase(),
    userAgent: str(body.userAgent, 512),
    screen: str(body.screen, 20),
    viewport: str(body.viewport, 20),
    touch: bool(body.touch),
    platform: str(body.platform, 40),
    cores: num(body.cores),
    memoryGB: typeof body.memoryGB === 'number' ? num(body.memoryGB) : null,
    language: str(body.language, 12),
    referrer: str(body.referrer, 300),
    sessionStart: str(body.sessionStart, 32),
    loggedAt: new Date().toISOString(),
  };
}

/** Login/session ping: identifies WHICH cadet is active (optional fields). */
function buildLoginRecord(body, visitorId) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    timestamp: str(body.timestamp, 32) || new Date().toISOString(),
    username: str(body.username, 40),
    instrument: str(body.instrument, 40),
    lessonProgress: str(body.lessonProgress, 60),
    xp: num(body.xp),
    streak: num(body.streak),
    events: str(body.events, 40), // e.g. "visit" | "login"
    visitorId: str(visitorId, 36),
    loggedAt: new Date().toISOString(),
  };
}

async function appendCapped(key, record) {
  const list = (await getJSON(key, [])) ?? [];
  const arr = Array.isArray(list) ? list : [];
  arr.unshift(record); // newest first
  await setJSON(key, arr.slice(0, MAX_RECORDS));
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body ?? {};

  // Honeypot: silent rejection for automated submitters (same contract as
  // /api/leaderboard — respond 200 so bots can't detect the block).
  const hp = body[HONEYPOT_FIELD];
  if (typeof hp === 'string' && hp.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  try {
    const visitor = buildVisitorRecord(body, req);
    await appendCapped(VISITORS_KEY, visitor);

    // A login ping carries cadet identity; plain page-visit pings don't.
    if (str(body.username, 40) || str(body.events, 40) === 'login') {
      await appendCapped(LOGINS_KEY, buildLoginRecord(body, visitor.id));
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[telemetry] write failed:', err?.message ?? err);
    // Telemetry must never break the client — report success anyway.
    return res.status(200).json({ ok: true });
  }
}
