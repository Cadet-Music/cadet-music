// Client-side visitor telemetry for the Admin panel — no backend required.
// Fetches coarse geolocation from a public IP-info endpoint (with fallback),
// enriches it with device/session metadata, and hands the record to the store.

import type { VisitorLogEntry } from '../store';

/** Session id: stable across reloads within one browser tab session. */
export function getSessionStart(): string {
  try {
    let s = sessionStorage.getItem('cadet-music-session');
    if (!s) {
      s = new Date().toISOString();
      sessionStorage.setItem('cadet-music-session', s);
    }
    return s;
  } catch {
    // Private mode / storage disabled — fall back to a per-load value
    return thisLoadSessionStart;
  }
}
const thisLoadSessionStart = new Date().toISOString();

export interface GeoInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

interface IpApiResponse {
  ip?: string;
  city?: string;
  region?: string | null;
  regionName?: string | null;
  country_name?: string | null;
  country?: string | null;
  countryCode?: string | null;
  // ip-api.com fallback fields
  status?: string;
  message?: string;
  query?: string;
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 4000): Promise<IpApiResponse | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    return (await res.json()) as IpApiResponse;
  } catch {
    return null; // rate-limited / offline / blocked — never throw into the render loop
  } finally {
    clearTimeout(timer);
  }
}

/** Try ipapi.co first, then ip-api.com. Both are free/no-key; failures resolve to unknowns. */
export async function fetchGeo(): Promise<GeoInfo> {
  const primary = await fetchJsonWithTimeout('https://ipapi.co/json/');
  if (primary && primary.ip) {
    return {
      ip: primary.ip,
      city: primary.city ?? 'Unknown',
      region: primary.region ?? '',
      country: primary.country_name ?? '',
      countryCode: primary.countryCode ?? '',
    };
  }
  const secondary = await fetchJsonWithTimeout('http://ip-api.com/json/?fields=status,message,query,city,regionName,country,countryCode');
  if (secondary && secondary.status === 'success' && secondary.query) {
    return {
      ip: secondary.query,
      city: secondary.city ?? 'Unknown',
      region: secondary.regionName ?? '',
      country: secondary.country ?? '',
      countryCode: secondary.countryCode ?? '',
    };
  }
  return { ip: 'unknown', city: 'Unknown', region: '', country: '', countryCode: '' };
}

/** Parse a user-agent string into a friendly OS + browser label (no external lib). */
export function parseUserAgent(ua: string): { os: string; browser: string } {
  let os = 'Unknown';
  if (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
  else if (/Windows/.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/.test(ua)) os = ua.includes('iPad') ? 'iPadOS' : 'iOS';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Linux/.test(ua)) os = 'Linux';
  else if (/CrOS/.test(ua)) os = 'ChromeOS';

  let browser = 'Unknown';
  if (/Edg\//.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
  else if (/Firefox\//.test(ua)) browser = 'Firefox';
  else if (/CriOS\//.test(ua)) browser = 'Chrome (iOS)';
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = 'Safari';
  else if (/Chrome\//.test(ua)) browser = 'Chrome';

  return { os, browser };
}

/**
 * Heuristic scraper/bot detection. Client-side checks are trivially
 * spoofable, so this is a noise filter for the admin telemetry panel — not
 * a security boundary. It never blocks rendering of the app itself.
 */
export function isLikelyBot(): boolean {
  try {
    const ua = navigator.userAgent || '';
    if (/bot|crawler|spider|slurp|curl|wget|python-requests|headless/i.test(ua)) return true;
    // Headless browsers / automation frameworks leak these properties
    const doc = document as Document & { $cdc_aswtoken?: unknown; callWebdriver?: unknown };
    const nav = navigator as Navigator & { webdriver?: boolean };
    if (nav.webdriver === true) return true;
    if ('$cdc_aswtoken' in doc || 'callWebdriver' in doc) return true;
    // Real browsers have plugins length >= 0 but headless shells often report 0 cores
    if ((navigator.hardwareConcurrency ?? 1) === 0) return true;
    return false;
  } catch {
    return false;
  }
}

/**
 * Scraper hygiene: when a known bot/headless browser visits, wipe this app's
 * own localStorage keys so junk sessions don't accumulate on shared origins.
 * Only touches keys prefixed with 'cadet-music'.
 */
export function purgeStorageForBots(): void {
  if (!isLikelyBot()) return;
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('cadet-music'))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* storage disabled (private mode) — nothing to purge */
  }
}

export function hasTouchSupport(): boolean {
  return typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

function screenDimensions(): string {
  try {
    return `${window.screen.width}x${window.screen.height}`;
  } catch {
    return 'unknown';
  }
}

function viewportDimensions(): string {
  return `${window.innerWidth}x${window.innerHeight}`;
}

export function buildTelemetryPayload(geo: GeoInfo): Omit<VisitorLogEntry, 'id'> {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return {
    timestamp: new Date().toISOString(),
    ip: geo.ip,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    countryCode: geo.countryCode,
    userAgent: navigator.userAgent,
    screen: screenDimensions(),
    viewport: viewportDimensions(),
    touch: hasTouchSupport(),
    platform: parseUserAgent(navigator.userAgent).os,
    cores: navigator.hardwareConcurrency ?? 0,
    memoryGB: nav.deviceMemory,
    language: navigator.language,
    referrer: document.referrer || '(direct)',
    sessionStart: getSessionStart(),
  };
}

let telemetryStarted = false;

/** Fire-and-forget telemetry collection. Safe to call on every mount; runs once per page load. */
export async function collectVisitorTelemetry(log: (entry: VisitorLogEntry) => void): Promise<void> {
  if (telemetryStarted) return;
  telemetryStarted = true;
  try {
    // Scraper/bot hygiene: wipe this app's localStorage keys and skip logging
    // so bot sessions don't pollute the admin telemetry panel. The app itself
    // keeps rendering normally — we never block the UI for suspected bots.
    if (isLikelyBot()) {
      purgeStorageForBots();
      return;
    }
    const geo = await fetchGeo();
    log({ id: crypto.randomUUID(), ...buildTelemetryPayload(geo) });
  } catch {
    // Telemetry must never break the app
  }
}
