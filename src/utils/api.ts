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
 * Every failure mode (401 wrong password, 405/500 misconfiguration, network
 * error, malformed JSON) resolves to `false` — this function NEVER throws and
 * NEVER leaves the caller in an inconsistent state.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
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
    // by returning false instead of throwing on the non-ok response.
    if (!res.ok) return false;
    const data = await res.json();
    return data?.ok === true;
  } catch (err) {
    // Network failure / invalid JSON — treat as unauthenticated, don't throw.
    console.error('admin-login request failed:', err);
    return false;
  }
}

/** Fetch global standings from /api/leaderboard (GET). */
export async function fetchLeaderboard(): Promise<ServerLeaderboardEntry[]> {
  const res = await fetch('/api/leaderboard', { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`leaderboard GET failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.entries) ? data.entries : [];
}

/** Submit a cadet's XP update to /api/leaderboard (POST). Returns fresh standings. */
export async function submitScore(entry: {
  name: string;
  xp: number;
  streak: number;
  lessons: number;
  bannerBg?: string;
  stickers?: string[];
}): Promise<ServerLeaderboardEntry[]> {
  const res = await fetch('/api/leaderboard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error(`leaderboard POST failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data?.entries) ? data.entries : [];
}
