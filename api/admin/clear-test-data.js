// POST /api/admin/clear-test-data  { confirm: "DELETE TEST DATA" }   (admin token)
// Removes all cadet accounts, saved profiles and leaderboard entries. Irreversible.
import { verifyAdminToken } from './analytics.js';
import { clearAllAccounts, readBody } from '../_lib/accounts.js';
import { delJSON } from '../_lib/kv.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });

  const auth = String(req.headers?.authorization ?? '').replace(/^Bearer\s+/i, '').trim();
  if (!verifyAdminToken(auth)) return res.status(401).json({ ok: false, error: 'unauthorized' });

  const body = await readBody(req);
  if (body.confirm !== 'DELETE TEST DATA') {
    return res.status(400).json({ ok: false, error: 'Type DELETE TEST DATA to confirm.' });
  }

  const removed = await clearAllAccounts();
  await delJSON('leaderboard:entries');
  return res.status(200).json({ ok: true, accountsRemoved: removed });
}
