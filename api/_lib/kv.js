// Shared storage helper for the Cadet Music serverless endpoints.
//
// Primary store: Vercel KV (Upstash Redis under the hood). Connect a KV store
// in the Vercel dashboard (Storage tab) and the `KV_REST_API_URL` /
// `KV_REST_API_TOKEN` environment variables are injected automatically — no
// code changes needed.
//
// Fallback: when KV is not configured yet (or a call fails), we degrade to an
// in-memory store so the endpoints keep working locally (`vercel dev`) and in
// production previews. NOTE: the in-memory fallback is per-warm-instance only
// — data does NOT survive cold starts or sync across instances. Everything
// you see working without KV configured is best-effort demo data, not real
// global state.

const MEMORY = new Map();

export function kvEnabled() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

let _kv = null;
async function getKv() {
  if (!kvEnabled()) return null;
  if (!_kv) {
    const { kv } = await import('@vercel/kv');
    _kv = kv;
  }
  return _kv;
}

/** Read a JSON value. Returns `fallback` on miss/error/unconfigured-KV-miss. */
export async function getJSON(key, fallback = null) {
  const client = await getKv();
  if (client) {
    try {
      const raw = await client.get(key);
      if (raw == null) return fallback;
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error(`[kv] GET ${key} failed, falling back to memory:`, err?.message ?? err);
    }
  }
  return MEMORY.has(key) ? MEMORY.get(key) : fallback;
}

/** Write a JSON value (best-effort; memory mirror keeps dev mode consistent). */
export async function setJSON(key, value) {
  MEMORY.set(key, value);
  const client = await getKv();
  if (!client) return false;
  try {
    await client.set(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[kv] SET ${key} failed (kept in memory):`, err?.message ?? err);
    return false;
  }
}
