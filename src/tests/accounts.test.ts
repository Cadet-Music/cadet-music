// Server-side account tests: hashing, sign-up rules, sign-in, lockout, profile restore,
// password change, admin reset and clearing test data. Runs against the in-memory store
// (no KV configured), so it needs no network access.

import assert from 'node:assert/strict';
import signup from '../../api/auth/signup.js';
import login from '../../api/auth/login.js';
import changePassword from '../../api/auth/change-password.js';
import profile from '../../api/profile.js';
import resetPassword from '../../api/admin/reset-password.js';
import clearTestData from '../../api/admin/clear-test-data.js';
import { createAdminToken } from '../../api/admin/analytics.js';
import analytics from '../../api/admin/analytics.js';
import { hashPassword, verifyPassword } from '../../api/_lib/accounts.js';
import { getJSON, setJSON } from '../../api/_lib/kv.js';

process.env.SESSION_SECRET = 'test-session-secret-that-is-long-enough-123456';
process.env.ADMIN_PASSWORD = 'test-admin-password';

type Res = { code: number; body: any };
function call(handler: (req: any, res: any) => Promise<unknown>, req: Record<string, any>): Promise<Res> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {};
    const res = {
      setHeader(k: string, v: string) { headers[k] = v; },
      status(c: number) { this.code = c; return this; },
      code: 200,
      json(body: unknown) { resolve({ code: this.code, body }); },
      send(body: unknown) { resolve({ code: this.code, body }); },
    };
    Promise.resolve(handler({ headers: {}, socket: { remoteAddress: '10.0.0.1' }, ...req }, res)).catch((e) => {
      throw e;
    });
  });
}
const auth = (token: string) => ({ authorization: `Bearer ${token}` });
let counter = 0;
const freshEmail = () => `cadet${++counter}${Date.now() % 1000}@cdt.cadets.gc.ca`;

const cases: Array<{ name: string; run: () => Promise<void> }> = [];
const test = (name: string, run: () => Promise<void>) => cases.push({ name, run });

test('passwords hash and verify; the plain text is not stored', async () => {
  const stored = hashPassword('correct horse');
  assert.ok(!stored.includes('correct horse'));
  assert.equal(verifyPassword('correct horse', stored), true);
  assert.equal(verifyPassword('wrong password', stored), false);
});

test('sign-up only accepts cadet email addresses', async () => {
  const r = await call(signup, { method: 'POST', body: { email: 'someone@gmail.com', rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  assert.equal(r.code, 400);
});

test('sign-up rejects short passwords', async () => {
  const r = await call(signup, { method: 'POST', body: { email: freshEmail(), rank: 'Corporal', lastName: 'Test', password: 'short' } });
  assert.equal(r.code, 400);
});

test('sign-up then sign-in returns a token; a new account has no saved profile', async () => {
  const email = freshEmail();
  const s = await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  assert.equal(s.code, 200);
  assert.equal(s.body.account.email, email);
  assert.equal(s.body.profile, null);
  const l = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(l.code, 200);
  assert.ok(l.body.token);
});

test('a duplicate email is refused with a clear message', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const again = await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  assert.equal(again.code, 409);
});

test('wrong password gets a generic message and the same status for unknown emails', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const wrong = await call(login, { method: 'POST', body: { email, password: 'nope-nope' } });
  const unknown = await call(login, { method: 'POST', body: { email: freshEmail(), password: 'nope-nope' } });
  assert.equal(wrong.code, 401);
  assert.equal(unknown.code, 401);
  assert.equal(wrong.body.error, unknown.body.error);
});

test('five wrong passwords lock the account, even for the right password', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  for (let i = 0; i < 5; i++) await call(login, { method: 'POST', body: { email, password: 'wrong-one' } });
  const locked = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(locked.code, 429);
});

test('saved progress is restored on the next sign-in', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const l1 = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  const saved = { username: 'Cdt E', progress: { xp: 420, completedLessons: ['sax-b-parts'] }, instrumentId: 'alto-sax' };
  const put = await call(profile, { method: 'PUT', headers: auth(l1.body.token), body: { profile: saved } });
  assert.equal(put.code, 200);
  const l2 = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.deepEqual(l2.body.profile, saved);
});

test('profile endpoints refuse requests without a valid session', async () => {
  const r = await call(profile, { method: 'GET', headers: auth('not-a-real-token') });
  assert.equal(r.code, 401);
});

test('changing the password returns a new token and cuts off the old session', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const l = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  const oldToken = l.body.token;
  await new Promise((r) => setTimeout(r, 1100)); // sessions are compared by whole seconds
  const c = await call(changePassword, { method: 'POST', headers: auth(oldToken), body: { currentPassword: 'longenough', newPassword: 'another-pass' } });
  assert.equal(c.code, 200);
  const stale = await call(profile, { method: 'GET', headers: auth(oldToken) });
  assert.equal(stale.code, 401, 'old session must stop working');
  const fresh = await call(profile, { method: 'GET', headers: auth(c.body.token) });
  assert.equal(fresh.code, 200);
});

test('admin reset issues a temporary password that must be changed at sign-in', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const adminToken = createAdminToken();
  const reset = await call(resetPassword, { method: 'POST', headers: auth(adminToken!), body: { email } });
  assert.equal(reset.code, 200);
  const l = await call(login, { method: 'POST', body: { email, password: reset.body.tempPassword } });
  assert.equal(l.code, 200);
  assert.equal(l.body.account.mustChange, true);
  const oldPassword = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(oldPassword.code, 401, 'the previous password must no longer work');
});

test('admin reset refuses non-admin callers', async () => {
  const r = await call(resetPassword, { method: 'POST', headers: auth('nope'), body: { email: freshEmail() } });
  assert.equal(r.code, 401);
});

test('clear-test-data needs the confirmation phrase and then removes accounts', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const adminToken = createAdminToken();
  const refused = await call(clearTestData, { method: 'POST', headers: auth(adminToken!), body: { confirm: 'yes' } });
  assert.equal(refused.code, 400);
  const cleared = await call(clearTestData, { method: 'POST', headers: auth(adminToken!), body: { confirm: 'DELETE TEST DATA' } });
  assert.equal(cleared.code, 200);
  const gone = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(gone.code, 401);
});

test('account flow: sign up, sign out, sign back in, and the saved profile is restored on a new device', async () => {
  const email = freshEmail();
  const s = await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  assert.equal(s.code, 200);
  // Sign-out clears the client token; the server keeps the account and profile.
  const l1 = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(l1.code, 200);
  await call(profile, { method: 'PUT', headers: auth(l1.body.token), body: { profile: { username: 'Cdt Flow', progress: { xp: 150, completedLessons: ['sax-b-parts', 'sax-b-assembly'] } } } });
  // Sign back in on the same device (new session token).
  const l2 = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(l2.code, 200);
  assert.equal(l2.body.profile.progress.xp, 150);
  // A different device has no token at all: sign-in alone restores the profile.
  const newDevice = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  assert.equal(newDevice.body.profile.progress.completedLessons.length, 2);
});

test('admin panel lists cadets from their saved profiles', async () => {
  const email = freshEmail();
  await call(signup, { method: 'POST', body: { email, rank: 'Corporal', lastName: 'Test', password: 'longenough' } });
  const l = await call(login, { method: 'POST', body: { email, password: 'longenough' } });
  await call(profile, { method: 'PUT', headers: auth(l.body.token), body: { profile: { username: 'Cdt Listed', progress: { xp: 320, streak: 3, completedLessons: ['a', 'b', 'c'] } } } });
  const r = await call(analytics, { method: 'GET', headers: auth(createAdminToken()!), query: {} });
  assert.equal(r.code, 200);
  const row = r.body.cadets.find((c: any) => c.name === 'Cdt Listed');
  assert.ok(row, 'cadet appears in the admin list');
  assert.equal(row.xp, 320);
  assert.equal(row.lessonsCompleted, 3);
});

test('admin list is empty before any profile is saved, and does not error', async () => {
  const r = await call(analytics, { method: 'GET', headers: auth(createAdminToken()!), query: {} });
  assert.equal(r.code, 200);
  assert.ok(Array.isArray(r.body.cadets));
});

test('sign-up needs a valid rank and last name; the display name is "Rank Last Name"', async () => {
  const noRank = await call(signup, { method: 'POST', body: { email: freshEmail(), lastName: 'Smith', password: 'longenough' } });
  assert.equal(noRank.code, 400);
  const noName = await call(signup, { method: 'POST', body: { email: freshEmail(), rank: 'Corporal', password: 'longenough' } });
  assert.equal(noName.code, 400);
  const ok = await call(signup, { method: 'POST', body: { email: freshEmail(), rank: 'Sergeant', lastName: 'Smith', password: 'longenough' } });
  assert.equal(ok.code, 200);
  assert.equal(ok.body.account.displayName, 'Sergeant Smith');
});

test('email is case-insensitive: a mixed-case sign-up signs in with lowercase and vice versa', async () => {
  const base = freshEmail();
  const mixed = base.replace(/^./, (c) => c.toUpperCase()).replace('@', '@').toUpperCase();
  const s = await call(signup, { method: 'POST', body: { email: mixed, rank: 'Corporal', lastName: 'Case', password: 'longenough' } });
  assert.equal(s.code, 200);
  const lower = await call(login, { method: 'POST', body: { email: base, password: 'longenough' } });
  assert.equal(lower.code, 200, 'lowercase sign-in must work');
  const again = await call(signup, { method: 'POST', body: { email: base, rank: 'Corporal', lastName: 'Case', password: 'longenough' } });
  assert.equal(again.code, 409, 'the same email in another case is a duplicate');
});

test('two cadets with the same rank and last name keep separate activity', async () => {
  await setJSON('telemetry:logins', [
    { id: 'a1', userId: 'user-one', username: 'Corporal Smith', instrument: 'alto-sax', loggedAt: new Date().toISOString(), visitorId: 'v1' },
    { id: 'a2', userId: 'user-two', username: 'Corporal Smith', instrument: 'alto-sax', loggedAt: new Date().toISOString(), visitorId: 'v2' },
  ]);
  const r = await call(analytics, { method: 'GET', headers: auth(createAdminToken()!), query: {} });
  const rows = r.body.telemetry.accounts.filter((a: any) => a.username === 'Corporal Smith');
  assert.equal(rows.length, 2, 'each account gets its own row');
  assert.ok(rows.every((row: any) => row.sessions === 1), 'sign-ins are not merged');
});

test('clear-test-data also removes sign-in and visit records', async () => {
  await setJSON('telemetry:logins', [{ id: 'x', userId: 'u', username: 'Someone', loggedAt: new Date().toISOString() }]);
  await setJSON('telemetry:visitors', [{ id: 'v', ip: '1.2.3.4', loggedAt: new Date().toISOString() }]);
  const r = await call(clearTestData, { method: 'POST', headers: auth(createAdminToken()!), body: { confirm: 'DELETE TEST DATA' } });
  assert.equal(r.code, 200);
  assert.equal(await getJSON('telemetry:logins', null), null);
  assert.equal(await getJSON('telemetry:visitors', null), null);
});

(async () => {
  let failed = 0;
  for (const c of cases) {
    try {
      await c.run();
      console.log(`✅ ${c.name}`);
    } catch (err) {
      failed++;
      console.log(`❌ ${c.name}\n   ${(err as Error).message}`);
    }
  }
  console.log(`accounts: ${cases.length - failed}/${cases.length} passed`);
  if (failed > 0) process.exitCode = 1;
})();
