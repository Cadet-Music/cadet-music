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

// ---- Admin analytics (server-backed) ----------------------------------------

/** One concept's quiz results for one cadet. `concept` is the id from CONCEPTS (e.g. 'noteValues'). */
export interface CadetConceptStat {
  concept: string;
  attempts: number;
  correct: number;
  accuracy: number;
  lastReviewed: string | null;
}

export type FlagReason = 'low-accuracy' | 'struggling-concepts' | 'inactive';

export interface CadetAnalyticsRow {
  name: string;
  xp: number;
  /** Current streak (0 if the cadet hasn't synced in the last day). */
  streak: number;
  bestStreak: number;
  lessonsCompleted: number;
  completionRate: number;
  conceptAttempts: number;
  conceptAccuracy: number | null;
  /** Concept ids under 60% after 5+ answers. */
  strugglingConcepts: string[];
  /** Every concept the cadet has answered, weakest first. */
  concepts: CadetConceptStat[];
  /** ISO time of the cadet's last sync, or null if unknown. */
  lastActive: string | null;
  daysInactive: number | null;
  flagReasons: FlagReason[];
  flaggedForHelp: boolean;
}

/** A concept several cadets are struggling with. */
export interface CommonStruggle {
  concept: string;
  cadets: number;
  avgAccuracy: number;
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
  /** Concepts most cadets struggle with, most widespread first. */
  commonStruggles: CommonStruggle[];
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
 * or missing token) and any network failure resolve to `report: null` with an
 * error message — never throws.
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
    if (data?.ok === true && Array.isArray(data.cadets)) {
      return { report: { ...data, commonStruggles: Array.isArray(data.commonStruggles) ? data.commonStruggles : [] } };
    }
    return { report: null, error: 'Unexpected response shape from /api/admin/analytics.' };
  } catch (err) {
    console.warn('admin analytics request failed:', err);
    return { report: null, error: 'Network error contacting /api/admin/analytics.' };
  }
}

/**
 * @deprecated Puts the admin token in the URL, which leaks it into browser
 * history and server logs. The admin panel now downloads the CSV with an
 * Authorization header instead.
 */
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

/** Quiz results sent with a progress sync, keyed by concept id. */
export type ConceptMasterySync = Record<string, { attempts: number; correct: number; lastReviewed: string }>;

/** Submit a cadet's progress to /api/leaderboard (POST). Returns fresh standings.
 * `conceptMastery` powers the admin panel's "what is this cadet struggling with"
 * summary; the public leaderboard never returns it.
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
  conceptMastery?: ConceptMasterySync;
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
