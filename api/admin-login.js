// Vercel serverless function: POST /api/admin-login
// Validates admin password attempts SERVER-SIDE against the ADMIN_PASSWORD
// environment variable, so the secret never ships in the client bundle.
//
// Configure ADMIN_PASSWORD in Vercel: Project Settings -> Environment Variables.
//
// Request body:  { "email": "<cadet email>", "password": "<attempt>" }
// Responses:     200 { ok: true, token } on success — `token` is a short-lived
//                                        (2h) HMAC-signed bearer token used by
//                                        /api/admin/analytics for auth'd data
//                400 { ok: false, error } missing or malformed cadet email
//                401 { ok: false }       wrong password
//                405                     non-POST method
//                500 { ok: false }       server misconfiguration (no env var)

import crypto from 'crypto';

// Cadet email: [first initial][last name][3 digits]@cdt.cadets.gc.ca
const CADET_EMAIL_REGEX = /^[a-z][a-z]+[0-9]{3}@cdt\.cadets\.gc\.ca$/i;
const CADET_EMAIL_ERROR =
  'Invalid cadet email format. Must follow [first initial][last name][3 digits]@cdt.cadets.gc.ca';

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

  // 1. Cadet email validation
  const email = (typeof body?.email === 'string' ? body.email : '').trim();
  if (!email || !CADET_EMAIL_REGEX.test(email)) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(400).json({ ok: false, error: CADET_EMAIL_ERROR });
  }

  // 2. Password sanitization & diagnostics
  const expectedPassword = (process.env.ADMIN_PASSWORD || '').trim();
  const providedPassword = (typeof body?.password === 'string' ? body.password : '').trim();

  if (!expectedPassword) {
    console.error('[Auth Error] ADMIN_PASSWORD not configured');
    return res.status(500).json({ ok: false, error: 'Server misconfigured' });
  }

  res.setHeader('Cache-Control', 'no-store');
  const ok = providedPassword.length > 0 && safeEqual(providedPassword, expectedPassword);
  if (!ok) {
    console.error('[Auth Error] Password mismatch');
    return res.status(401).json({ ok: false });
  }

  // Issue a short-lived signed bearer token for /api/admin/analytics.
  const token = createAdminToken();
  if (!token) {
    return res.status(500).json({ ok: false, error: 'Server misconfigured' });
  }
  return res.status(200).json({ ok: true, token });
}
