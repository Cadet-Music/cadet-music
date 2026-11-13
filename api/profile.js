// GET  /api/profile                 -> { ok, profile }
// PUT  /api/profile  { profile }    -> { ok }
// The profile is the cadet's full saved progress: target, progress, requirement records, instrument.
// Only the signed-in account can read or write its own profile.
import { accountForSession, bearerToken, getProfile, PROFILE_MAX_BYTES, readBody, saveProfile } from './_lib/accounts.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const account = await accountForSession(bearerToken(req));
  if (!account) return res.status(401).json({ ok: false, error: 'Please sign in again.' });

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, profile: await getProfile(account.id) });
  }

  if (req.method === 'PUT') {
    const body = await readBody(req);
    const profile = body.profile;
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      return res.status(400).json({ ok: false, error: 'profile must be an object.' });
    }
    const size = Buffer.byteLength(JSON.stringify(profile), 'utf8');
    if (size > PROFILE_MAX_BYTES) {
      return res.status(413).json({ ok: false, error: 'Saved progress is too large.' });
    }
    await saveProfile(account.id, profile);
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ ok: false, error: 'Method not allowed' });
}
