// POST /api/auth/change-password  { currentPassword, newPassword }   (Authorization: Bearer <token>)
// Returns a fresh session token. Older sessions stop working.
import {
  accountForSession, bearerToken, issueSession, MIN_PASSWORD_LENGTH, publicAccount, readBody,
  saveAccount, verifyPassword, hashPassword,
} from '../_lib/accounts.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const account = await accountForSession(bearerToken(req));
  if (!account) return res.status(401).json({ ok: false, error: 'Please sign in again.' });

  const body = await readBody(req);
  const currentPassword = String(body.currentPassword ?? '');
  const newPassword = String(body.newPassword ?? '');

  if (!verifyPassword(currentPassword, account.hash)) {
    return res.status(401).json({ ok: false, error: 'The current password is not right.' });
  }
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ ok: false, error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
  }
  if (newPassword === currentPassword) {
    return res.status(400).json({ ok: false, error: 'Choose a password you have not used before.' });
  }

  account.hash = hashPassword(newPassword);
  account.mustChange = false;
  account.passwordSetAt = Date.now();
  await saveAccount(account);

  // Sessions issued in the same second as the change must still be valid, so the new token is issued after passwordSetAt.
  const token = issueSession(account.id);
  return res.status(200).json({ ok: true, token, account: publicAccount(account) });
}
