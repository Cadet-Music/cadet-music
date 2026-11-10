// Vercel serverless function: POST /api/admin-login
// Validates admin password attempts SERVER-SIDE against the ADMIN_PASSWORD
// environment variable, so the secret never ships in the client bundle.
//
// Configure ADMIN_PASSWORD in Vercel: Project Settings -> Environment Variables.
//
// Request body:  { "password": "<attempt>" }
// Responses:     200 { ok: true, token } on success — `token` is a short-lived
//                                        (2h) HMAC-signed bearer token used by
//                                        /api/admin/analytics for auth'd data
//                401 { ok: false, error } wrong password
//                405                     non-POST method
//                429 { ok: false, error } too many wrong passwords from this address
//                500 { ok: false }       server misconfiguration (no env var)
//
// There is deliberately NO email field: the login form must not reveal any
// format that could be guessed. Because the password is now the only secret,
// repeated wrong attempts from one address are locked out for a while.

import crypto from 'crypto';

import { getJSON, setJSON } from './_lib/kv.js';

// ---- Brute-force protection -------------------------------------------------
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

function clientIp(req) {
  const fwd = String(req.headers['x-forwarded-for'] || '');
  const ip = (fwd.split(',')[0] || '').trim() || String(req.socket?.remoteAddress || '');
  return ip.replace(/[^0-9a-fA-F:.]/g, '').slice(0, 45) || 'unknown';
}

async function readAttempts(ip) {
  const rec = await getJSON(`admin:attempts:${ip}`, null);
  if (!rec || typeof rec.count !== 'number' || typeof rec.first !== 'number') return null;
  if (Date.now() - rec.first > LOCKOUT_WINDOW_MS) return null; // window expired
  return rec;
}

async function recordFailure(ip, existing) {
  const rec = existing ?? { count: 0, first: Date.now() };
  rec.count += 1;
  await setJSON(`admin:attempts:${ip}`, rec);
  return rec;
}

// Very small timing-equalised comparison for short secrets.
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const ab = enc.encode(String(a));
  const bb = enc.encode(String(b));
  const len = Math.max(ab.length, bb.length);
  let diff = 0;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] || 0) ^ (bb[i] || 0);
  }
  return diff === 0;
}

// ---- Admin bearer token (shared secret scheme with /api/admin/analytics) --
// Must derive the key exactly as api/admin/analytics.js does (same trimming).
function adminTokenKey() {
  const secret = (process.env.ANALYTICS_SECRET || process.env.ADMIN_PASSWORD || '').trim();
  if (!secret) return null;
  return crypto.createHash('sha256').update(`cadet-music-admin:${secret}`).digest();
}

function createAdminToken(ttlMs = 2 * 60 * 60 * 1000) {
  const key = adminTokenKey();
  if (!key) return null;
  const exp = Date.now() + ttlMs;
  const payload = String(exp);
  const sig = crypto.createHmac('sha256', key).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Body may already be parsed by Vercel, or arrive as a stream/raw string.
  let body = req.body;
  if (body == null) {
    const raw = await new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk) => (data += chunk));
      req.on('end', () => resolve(data));
    });
    try {
      body = JSON.parse(raw || '{}');
    } catch {
      body = {};
    }
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const expectedPassword = (process.env.ADMIN_PASSWORD || '').trim();
  if (!expectedPassword) {
    console.error('[Auth Error] ADMIN_PASSWORD not configured');
    return res.status(500).json({ ok: false, error: 'Server misconfigured' });
  }

  // 1. Locked out? Refuse BEFORE comparing, so a lockout can't be used to test guesses.
  const ip = clientIp(req);
  const attempts = await readAttempts(ip);
  if (attempts && attempts.count >= MAX_FAILED_ATTEMPTS) {
    const retryAfterSec = Math.max(1, Math.ceil((attempts.first + LOCKOUT_WINDOW_MS - Date.now()) / 1000));
    res.setHeader('Retry-After', String(retryAfterSec));
    return res.status(429).json({
      ok: false,
      error: `Too many incorrect attempts. Try again in ${Math.ceil(retryAfterSec / 60)} minute(s).`,
    });
  }

  // 2. Password check
  const providedPassword = (typeof body?.password === 'string' ? body.password : '').trim();
  const ok = providedPassword.length > 0 && safeEqual(providedPassword, expectedPassword);
  if (!ok) {
    await recordFailure(ip, attempts);
    console.error('[Auth Error] Password mismatch');
    return res.status(401).json({ ok: false, error: 'Incorrect password.' });
  }

  // 3. Success: clear the counter and issue a short-lived signed bearer token.
  if (attempts) await setJSON(`admin:attempts:${ip}`, { count: 0, first: Date.now() });
  const token = createAdminToken();
  if (!token) {
    return res.status(500).json({ ok: false, error: 'Server misconfigured' });
  }
  return res.status(200).json({ ok: true, token });
}
