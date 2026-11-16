// POST /api/auth/signup  { email, rank, lastName, password }
// Display name is "Rank Last Name", for example "Cpl Smith".
import {
  accountByEmail, createAccount, clientIp, isCadetEmail, issueSession, normalizeEmail,
  publicAccount, readBody, withinLimit, MIN_PASSWORD_LENGTH,
} from '../_lib/accounts.js';

/** Ranks a cadet can choose at sign-up. Keep in step with the sign-in screen. */
const RANKS = ['Air Cadet', 'Leading Air Cadet', 'Corporal', 'Flight Corporal', 'Sergeant', 'Flight Sergeant', 'Warrant Officer 2nd Class', 'Warrant Officer 1st Class'];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  // Sign-up is limited per IP address to slow down bulk account creation. The limit is high because
  // a squadron's cadets usually share one network address.
  if (!(await withinLimit(`auth:signup:${clientIp(req)}`, 100, 60 * 60 * 1000))) {
    return res.status(429).json({ ok: false, error: 'Too many sign-ups from this device. Try again later.' });
  }

  const body = await readBody(req);
  const email = normalizeEmail(body.email);
  const rank = String(body.rank ?? '').trim();
  const lastName = String(body.lastName ?? '').trim().slice(0, 30);
  const displayName = `${rank} ${lastName}`.trim();
  const password = String(body.password ?? '');

  if (!isCadetEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Use your .cadets.gc.ca email address.' });
  }
  if (!RANKS.includes(rank)) {
    return res.status(400).json({ ok: false, error: 'Choose your rank.' });
  }
  if (!lastName || !/^[A-Za-z' -]+$/.test(lastName)) {
    return res.status(400).json({ ok: false, error: 'Enter your last name.' });
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
