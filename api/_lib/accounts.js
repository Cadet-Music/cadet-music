// Account, password, session and rate-limit helpers for /api/auth/* and /api/profile.
//
// Passwords are hashed with scrypt; the plain password is never stored or returned.
// Sessions are HMAC-signed tokens. A password change or admin reset sets
// passwordSetAt, which invalidates every session issued before it.
//
// Required environment variable: SESSION_SECRET (32+ random characters).
// Without it, sign-in fails closed rather than using a guessable default.

import crypto from 'crypto';
import { getJSON, setJSON, delJSON } from './kv.js';

export const EMAIL_SUFFIX = '.cadets.gc.ca';
export const MIN_PASSWORD_LENGTH = 8;
export const PROFILE_MAX_BYTES = 300 * 1024;

const SESSION_MS = 30 * 24 * 60 * 60 * 1000;
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const FAIL_MAX = 5;
const SCRYPT = { N: 16384, r: 8, p: 1 };

// ---- email -------------------------------------------------------------------

export function normalizeEmail(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function isCadetEmail(email) {
  return email.endsWith(EMAIL_SUFFIX) && /^[^\s@]+@[^\s@]+$/.test(email);
}

// ---- passwords ---------------------------------------------------------------

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, SCRYPT);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export function verifyPassword(password, stored) {
  const [alg, saltB64, hashB64] = String(stored ?? '').split('$');
  if (alg !== 'scrypt' || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = crypto.scryptSync(String(password), Buffer.from(saltB64, 'base64'), expected.length, SCRYPT);
  return crypto.timingSafeEqual(actual, expected);
}

/** Cryptographically random temporary password for admin resets. No ambiguous characters. */
export function temporaryPassword(length = 12) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < length; i++) out += alphabet[crypto.randomInt(alphabet.length)];
  return out;
}

// ---- sessions ----------------------------------------------------------------

function sessionKey() {
  const secret = process.env.SESSION_SECRET ?? '';
  if (secret.length < 32) return null;
  return crypto.createHash('sha256').update(`cadet-music-session:${secret}`).digest();
}

export function issueSession(accountId) {
  const key = sessionKey();
  if (!key) return null;
  const now = Date.now();
  const payload = Buffer.from(JSON.stringify({ sub: accountId, iat: now, exp: now + SESSION_MS })).toString('base64url');
  const sig = crypto.createHmac('sha256', key).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

/** Returns the account for a valid, unexpired session that was issued after the last password change. */
export async function accountForSession(token) {
  const key = sessionKey();
  if (!key || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', key).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  let data;
  try {
    data = JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    return null;
  }
  if (!data.exp || data.exp < Date.now()) return null;

  const account = await getJSON(`account:${data.sub}`, null);
  if (!account) return null;
  if (account.passwordSetAt && data.iat < account.passwordSetAt) return null;
  return account;
}

export function bearerToken(req) {
  const header = String(req.headers?.authorization ?? '');
  return /^Bearer\s+/i.test(header) ? header.replace(/^Bearer\s+/i, '').trim() : '';
}

// ---- accounts ----------------------------------------------------------------

export async function accountByEmail(email) {
  const id = await getJSON(`email:${email}`, null);
  return id ? getJSON(`account:${id}`, null) : null;
}

export async function createAccount({ email, displayName, password }) {
  const id = crypto.randomUUID();
  const now = Date.now();
  const account = {
    id,
    email,
    displayName,
    hash: hashPassword(password),
    mustChange: false,
    createdAt: now,
    passwordSetAt: now,
    lastSignIn: now,
  };
  await setJSON(`account:${id}`, account);
  await setJSON(`email:${email}`, id);
  const index = await getJSON('accounts:index', []);
  await setJSON('accounts:index', [...index, id]);
  return account;
}

export async function saveAccount(account) {
  await setJSON(`account:${account.id}`, account);
}

export function publicAccount(account) {
  return {
    id: account.id,
    email: account.email,
    displayName: account.displayName,
    mustChange: Boolean(account.mustChange),
  };
}

export async function getProfile(accountId) {
  const record = await getJSON(`profile:${accountId}`, null);
  return record?.profile ?? null;
}

export async function saveProfile(accountId, profile) {
  await setJSON(`profile:${accountId}`, { profile, updatedAt: Date.now() });
}

/** Removes every account, its profile and its email index. Used only by the admin clear-test-data action. */
export async function clearAllAccounts() {
  const ids = await getJSON('accounts:index', []);
  for (const id of ids) {
    const account = await getJSON(`account:${id}`, null);
    if (account?.email) await delJSON(`email:${account.email}`);
    await delJSON(`account:${id}`);
    await delJSON(`profile:${id}`);
  }
  await delJSON('accounts:index');
  return ids.length;
}

// ---- rate limiting -----------------------------------------------------------

/** Counts an event under `key`. Returns true if the caller is still within `max` events per window. */
export async function withinLimit(key, max, windowMs) {
  const now = Date.now();
  const rec = await getJSON(key, null);
  const current = rec && now - rec.first < windowMs ? rec : { count: 0, first: now };
  if (current.count >= max) return false;
  await setJSON(key, { count: current.count + 1, first: current.first });
  return true;
}

export async function failuresLocked(email) {
  const rec = await getJSON(`auth:fail:${email}`, null);
  return Boolean(rec && Date.now() - rec.first < FAIL_WINDOW_MS && rec.count >= FAIL_MAX);
}

export async function recordFailure(email) {
  const now = Date.now();
  const rec = await getJSON(`auth:fail:${email}`, null);
  const current = rec && now - rec.first < FAIL_WINDOW_MS ? rec : { count: 0, first: now };
  await setJSON(`auth:fail:${email}`, { count: current.count + 1, first: current.first });
}

export async function clearFailures(email) {
  await delJSON(`auth:fail:${email}`);
}

// ---- request helpers ---------------------------------------------------------

export async function readBody(req) {
  if (req.body != null && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
  });
  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

export function clientIp(req) {
  const fwd = String(req.headers?.['x-forwarded-for'] ?? '');
  return (fwd.split(',')[0] || '').trim() || String(req.socket?.remoteAddress ?? 'unknown');
}
