// POST /api/admin/reset-password  { email }   (admin token)
// Sets a temporary password, shown once. The cadet must choose a new one at sign-in.
// Every existing session for the account stops working immediately.
import { verifyAdminToken } from './analytics.js';
import { accountByEmail, hashPassword, normalizeEmail, readBody, saveAccount, temporaryPassword } from '../_lib/accounts.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const auth = String(req.headers?.authorization ?? '').replace(/^Bearer\s+/i, '').trim();
  if (!verifyAdminToken(auth)) return res.status(401).json({ ok: false, error: 'unauthorized' });

  const body = await readBody(req);
  const account = await accountByEmail(normalizeEmail(body.email));
  if (!account) return res.status(404).json({ ok: false, error: 'No account with that email.' });

  const tempPassword = temporaryPassword();
  account.hash = hashPassword(tempPassword);
  account.mustChange = true;
  account.passwordSetAt = Date.now();
  await saveAccount(account);

  return res.status(200).json({ ok: true, tempPassword, email: account.email });
}
