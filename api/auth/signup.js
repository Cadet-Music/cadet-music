// POST /api/auth/signup  { email, displayName, password }
import {
  accountByEmail, createAccount, clientIp, isCadetEmail, issueSession, normalizeEmail,
  publicAccount, readBody, withinLimit, MIN_PASSWORD_LENGTH,
} from '../_lib/accounts.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  // Sign-up is limited per address to slow down bulk account creation.
  if (!(await withinLimit(`auth:signup:${clientIp(req)}`, 10, 60 * 60 * 1000))) {
    return res.status(429).json({ ok: false, error: 'Too many sign-ups from this device. Try again later.' });
  }

  const body = await readBody(req);
  const email = normalizeEmail(body.email);
  const displayName = String(body.displayName ?? '').trim().slice(0, 40);
  const password = String(body.password ?? '');

  if (!isCadetEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Use your .cadets.gc.ca email address.' });
  }
  if (!displayName) {
    return res.status(400).json({ ok: false, error: 'Enter the name you want shown, for example Cdt Smith.' });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ ok: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
  }
  if (await accountByEmail(email)) {
    return res.status(409).json({ ok: false, error: 'An account already exists for this email. Sign in instead.' });
  }

  if (!issueSession('config-check')) {
    return res.status(500).json({ ok: false, error: 'Server misconfigured: SESSION_SECRET is not set.' });
  }

  const account = await createAccount({ email, displayName, password });
  const sessionToken = issueSession(account.id);
  return res.status(200).json({ ok: true, token: sessionToken, account: publicAccount(account), profile: null });
}
