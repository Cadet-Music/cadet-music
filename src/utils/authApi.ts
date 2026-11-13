// Client for /api/auth/*, /api/profile and the admin account actions.
// The session token is kept in localStorage so a cadet stays signed in on this device.
// It is never shown in the UI or written into the saved profile.

const TOKEN_KEY = 'cadet_music_token';

export interface AccountInfo {
  id: string;
  email: string;
  displayName: string;
  mustChange: boolean;
}

export interface AuthOutcome {
  ok: boolean;
  error?: string;
  account?: AccountInfo;
  profile?: unknown;
}

export function getSessionToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setSessionToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: the cadet will simply need to sign in again */
  }
}

export function clearSessionToken(): void {
  setSessionToken(null);
}

async function call(method: string, path: string, body?: unknown, token?: string | null) {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
  } catch {
    return { status: 0, data: { error: 'Could not reach Cadet Music. Check your connection and try again.' } };
  }
}

function outcomeFrom(status: number, data: any): AuthOutcome {
  if (!data?.ok) {
    return { ok: false, error: data?.error ?? (status === 0 ? 'Could not reach Cadet Music.' : 'Something went wrong. Try again.') };
  }
  if (typeof data.token === 'string') setSessionToken(data.token);
  return { ok: true, account: data.account, profile: data.profile ?? null };
}

export async function signUp(input: { email: string; displayName: string; password: string }): Promise<AuthOutcome> {
  const { status, data } = await call('POST', '/api/auth/signup', input);
  return outcomeFrom(status, data);
}

export async function signIn(input: { email: string; password: string }): Promise<AuthOutcome> {
  const { status, data } = await call('POST', '/api/auth/login', input);
  return outcomeFrom(status, data);
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<AuthOutcome> {
  const { status, data } = await call('POST', '/api/auth/change-password', { currentPassword, newPassword }, getSessionToken());
  return outcomeFrom(status, data);
}

export async function fetchProfile(): Promise<unknown | null> {
  const { data } = await call('GET', '/api/profile', undefined, getSessionToken());
  return data?.ok ? data.profile ?? null : null;
}

/** Saves the cadet's full profile. Best-effort: returns false if the save did not go through. */
export async function saveProfile(profile: unknown): Promise<boolean> {
  const token = getSessionToken();
  if (!token) return false;
  const { data } = await call('PUT', '/api/profile', { profile }, token);
  return Boolean(data?.ok);
}

// ---- admin actions (require the admin session token) -----------------------

export async function adminResetPassword(adminToken: string, email: string): Promise<{ ok: boolean; tempPassword?: string; error?: string }> {
  const { data } = await call('POST', '/api/admin/reset-password', { email }, adminToken);
  return data?.ok ? { ok: true, tempPassword: data.tempPassword } : { ok: false, error: data?.error ?? 'Reset failed.' };
}

export async function adminClearTestData(adminToken: string): Promise<{ ok: boolean; accountsRemoved?: number; error?: string }> {
  const { data } = await call('POST', '/api/admin/clear-test-data', { confirm: 'DELETE TEST DATA' }, adminToken);
  return data?.ok ? { ok: true, accountsRemoved: data.accountsRemoved } : { ok: false, error: data?.error ?? 'Clearing failed.' };
}
