// Vercel serverless function: POST /api/admin-login
// Validates admin password attempts SERVER-SIDE against the ADMIN_PASSWORD
// environment variable, so the secret never ships in the client bundle.
//
// Configure ADMIN_PASSWORD in Vercel: Project Settings -> Environment Variables.
//
// Request body:  { "password": "<attempt>" }
// Responses:     200 { ok: true }        on success
//                401 { ok: false }       wrong password
//                405                     non-POST method
//                500 { ok: false }       server misconfiguration (no env var)

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error('admin-login: ADMIN_PASSWORD environment variable is not set');
    return res.status(500).json({ ok: false, error: 'Server misconfigured' });
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

  const attempt = typeof body.password === 'string' ? body.password : '';
  const ok = attempt.length > 0 && safeEqual(attempt, expected);

  res.setHeader('Cache-Control', 'no-store');
  return res.status(ok ? 200 : 401).json({ ok });
}
