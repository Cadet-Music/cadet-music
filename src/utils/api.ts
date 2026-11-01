// Thin client for the Vercel serverless endpoints under /api/*.
// Uses relative '/api/...' paths so it works on any Vercel domain.

export interface ServerLeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  lessons: number;
  bannerBg: string;
  stickers: string[];
}

/**
 * Verify an admin password against the server (/api/admin-login).
 * The password itself is validated server-side via process.env.ADMIN_PASSWORD,
 * so no secret lives in the client bundle anymore.
 *
 * On success the server also returns a short-lived signed bearer token used
 * for authenticated endpoints like /api/admin/analytics.
 *
 * Every failure mode (401 wrong password, 405/500 misconfiguration, network
 * error, malformed JSON) resolves to `{ ok: false, token: null }` — this
 * function NEVER throws and NEVER leaves the caller in an inconsistent state.
 */
export interface AdminLoginResult {
  ok: boolean;
  token: string | null;
}

export async function verifyAdminPassword(password: string): Promise<AdminLoginResult> {
  try {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.status === 500) {
      console.error('admin-login endpoint misconfigured (is ADMIN_PASSWORD set in Vercel?)');
    }
    // 401 Unauthorized simply means "wrong password" — handle it smoothly
    // by returning ok:false instead of throwing on the non-ok response.
    if (!res.ok) return { ok: false, token: null };
    const data = await res.json();
    return {
      ok: data?.ok === true,
      token: typeof data?.token === 'string' ? data.token : null,
    };
  } catch (err) {
    // Network failure / invalid JSON — treat as unauthenticated, don't throw.
    console.error('admin-login request failed:', err);
    return { ok: false, token: null };
  }
}

// ---- Admin analytics (server-backed, replaces demo-mode placeholders) --------
export interface CadetAnalyticsRow {
  name: string;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  completionRate: number;
  conceptAttempts: number;
  conceptAccuracy: number | null;
  strugglingConcepts: string[];
  flaggedForHelp: boolean;
}

export interface AdminAnalyticsReport {
  ok: boolean;
  generatedAt: string;
  totals: {
    cadets: number;
    totalXP: number;
    avgXP: number;
    activeStreaks: number;
    avgCompletionRate: number;
    strugglingCount: number;
  };
  cadets: CadetAnalyticsRow[];
}

/**
 * Fetch live aggregated cadet analytics from /api/admin/analytics.
 * Requires the bearer token returned by verifyAdminPassword(). A 401 (expired
 * or missing token) and any network failure resolve to `null` — never throws.
 */
export async function fetchAdminAnalytics(token: string | null): Promise<AdminAnalyticsReport | null> {
  if (!token) return null;
  try {
    const res = await fetch('/api/admin/analytics', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      // 401 = expired/invalid session token; handle smoothly, no throw.
      console.warn(`admin analytics unavailable (HTTP ${res.status})`);
      return null;
    }
    const data = await res.json();
    return data?.ok === true && Array.isArray(data.cadets) ? data : null;
  } catch (err) {
    console.warn('admin analytics request failed:', err);
    return null;
  }
}

/** URL for the CSV export of the same report (opens/downloads with token). */
export function adminAnalyticsCsvUrl(token: string): string {
  return `/api/admin/analytics?format=csv&token=${encodeURIComponent(token)}`;
}

/** Fetch global standings from /api/leaderboard (GET). */
export async function fetchLeaderboard(): Promise<ServerLeaderboardEntry[]> {
  const res = await fetch('/api/leaderboard', { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`leaderboard GET failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.entries) ? data.entries : [];
}

/** Submit a cadet's XP update to /api/leaderboard (POST). Returns fresh standings.
 * `honeypot` is the value of the hidden anti-bot field (`website_url`) from the
 * submit form — real users always leave it empty; if a bot fills it in, the
 * server silently drops the submission. */
export async function submitScore(entry: {
  name: string;
  xp: number;
  streak: number;
  lessons: number;
  bannerBg?: string;
  stickers?: string[];
  honeypot?: string;
}): Promise<ServerLeaderboardEntry[]> {
  const { honeypot, ...payload } = entry;
  const res = await fetch('/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, website_url: honeypot ?? '' }),
  });
  if (!res.ok) throw new Error(`leaderboard POST failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.entries) ? data.entries : [];
}
