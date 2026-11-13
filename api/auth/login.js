// POST /api/auth/login  { email, password }
import {
  accountByEmail, clearFailures, failuresLocked, getProfile, issueSession, normalizeEmail,
  publicAccount, readBody, recordFailure, saveAccount, verifyPassword,
} from '../_lib/accounts.js';

const GENERIC_FAILURE = { ok: false, error: 'Email or password is not right.' };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const body = await readBody(req);
  const email = normalizeEmail(body.email);
  const password = String(body.password ?? '');

  if (!email || !password) return res.status(400).json(GENERIC_FAILURE);

  if (await failuresLocked(email)) {
    return res.status(429).json({ ok: false, error: 'Too many wrong attempts. Wait 15 minutes and try again.' });
  }

  const account = await accountByEmail(email);
  if (!account || !verifyPassword(password, account.hash)) {
    await recordFailure(email);
    return res.status(401).json(GENERIC_FAILURE);
  }

  await clearFailures(email);
  account.lastSignIn = Date.now();
  await saveAccount(account);

  const token = issueSession(account.id);
  if (!token) return res.status(500).json({ ok: false, error: 'Server misconfigured: SESSION_SECRET is not set.' });

  return res.status(200).json({
    ok: true,
    token,
    account: publicAccount(account),
    profile: await getProfile(account.id),
  });
}
