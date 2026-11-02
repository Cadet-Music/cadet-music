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
 * Verify an admin login against the server (/api/admin-login).
 * The cadet email must match the official pattern, and the password is
 * validated server-side via process.env.ADMIN_PASSWORD, so no secret lives in
 * the client bundle.
 *
 * On success the server also returns a short-lived signed bearer token used
 * for authenticated endpoints like /api/admin/analytics.
 *
 * Every failure mode (400 bad email, 401 wrong password, 405/500
 * misconfiguration, network error, malformed JSON) resolves to
 * `{ ok: false, token: null }` — this function NEVER throws.
 */
export interface AdminLoginResult {
  ok: boolean;
  token: string | null;
}

export async function verifyAdminPassword(
  email: string,
  password: string,
): Promise<AdminLoginResult & { error?: string }> {
  try {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.status === 500) {
      console.error('admin-login endpoint misconfigured (is ADMIN_PASSWORD set in Vercel?)');
      return { ok: false, token: null, error: 'Server misconfigured: ADMIN_PASSWORD is not set in Vercel environment variables.' };
    }
    if (res.status === 400) {
      return {
        ok: false,
        token: null,
        error: 'Enter a valid cadet email (first initial, last name, 3 digits, @cdt.cadets.gc.ca).',
      };
    }
    // 401 = wrong password; handled as a normal result, not an exception.
    if (!res.ok) {
      return {
        ok: false,
        token: null,
        error: res.status === 401 ? 'Incorrect admin password.' : `Server returned ${res.status}.`,
      };
    }
    const data = await res.json();
    return {
      ok: data?.ok === true,
      token: typeof data?.token === 'string' ? data.token : null,
    };
  } catch (err) {
    // Network failure / invalid JSON — treat as unauthenticated, don't throw.
    console.error('admin-login request failed:', err);
    return { ok: false, token: null, error: 'Network error contacting /api/admin-login.' };
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
  /** meta.demo = true when the server had no real KV submissions yet and fell back to seed rows. */
  meta?: { demo?: boolean };
  totals: {
    cadets: number;
    totalXP: number;
    avgXP: number;
    activeStreaks: number;
    avgCompletionRate: number;
    strugglingCount: number;
  };
  cadets: CadetAnalyticsRow[];
  /** Server-aggregated visitor telemetry (global, from Vercel KV via /api/telemetry). */
  telemetry?: ServerTelemetryReport;
}

export interface ServerVisitorRecord {
  id: string;
  timestamp: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  userAgent: string;
  platform: string;
  viewport: string;
  touch: boolean;
  loggedAt?: string;
}

export interface ServerLoginRecord {
  id: string;
  timestamp: string;
  username: string;
  instrument: string;
  lessonProgress: string;
  xp: number;
  streak: number;
  events: string;
}

export interface ServerTelemetryReport {
  totals: {
    sessions: number;
    sessionsLast7Days: number;
    uniqueIps: number;
    touchSessions: number;
    logins: number;
  };
  countries: [string, number][];
  cities: [string, number][];
  oses: [string, number][];
  browsers: [string, number][];
  recentVisitors: ServerVisitorRecord[];
  recentLogins: ServerLoginRecord[];
}

/**
 * Fetch live aggregated cadet analytics from /api/admin/analytics.
 * Requires the bearer token returned by verifyAdminPassword(). A 401 (expired
 * or missing token) and any network failure resolve to `null` — never throws.
 */
export interface AdminAnalyticsResult {
  report: AdminAnalyticsReport | null;
  error?: string;
}

export async function fetchAdminAnalytics(token: string | null): Promise<AdminAnalyticsResult> {
  if (!token) return { report: null, error: 'No server session token — the admin login endpoint did not return one (check ADMIN_PASSWORD in Vercel).' };
  try {
    const res = await fetch('/api/admin/analytics', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      // 401 = expired/invalid session token; handle smoothly, no throw.
      const reason = res.status === 401
        ? 'Authentication rejected by /api/admin/analytics (HTTP 401) — your admin session token is missing, expired, or ANALYTICS_SECRET/ADMIN_PASSWORD changed. Re-enter the admin password.'
        : `/api/admin/analytics returned HTTP ${res.status}.`;
      console.warn(`admin analytics unavailable (HTTP ${res.status})`);
      return { report: null, error: reason };
    }
    const data = await res.json();
    if (data?.ok === true && Array.isArray(data.cadets)) return { report: data };
    return { report: null, error: 'Unexpected response shape from /api/admin/analytics.' };
  } catch (err) {
    console.warn('admin analytics request failed:', err);
    return { report: null, error: 'Network error contacting /api/admin/analytics.' };
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
