// Pure helpers for the share-card pipeline (kept DOM-free so they are unit-testable).

/**
 * iOS Safari requires navigator.share() to run inside the transient user-activation
 * window (~a few hundred ms after a tap). If rasterization took longer than this,
 * fall back to clipboard/download instead of attempting (and failing) a native share.
 */
export const TRANSIENT_ACTIVATION_BUDGET_MS = 1200;

export function hasUserActivationWindow(startedAt: number, now: number = Date.now()): boolean {
  return now - startedAt <= TRANSIENT_ACTIVATION_BUDGET_MS;
}

export interface ShareSupport {
  canShareFiles: boolean; // Web Share API with file attachment support
  canShare: boolean;      // Web Share API at all
  canClipboardWrite: boolean; // ClipboardItem image support
  canDownload: boolean;   // anchor download fallback (basically always true in browsers)
}

export function detectShareSupport(): ShareSupport {
  const nav = navigator as Navigator & {
    canShare?: (data?: ShareData) => boolean;
    share?: (data?: ShareData) => Promise<void>;
  };
  const doc = document as Document & {
    clipboard?: { write?: (items: unknown[]) => Promise<void> };
  };

  let canShareFiles = false;
  try {
    if (typeof nav.canShare === 'function' && typeof nav.share === 'function') {
      // Probe with a zero-byte File — cheap and synchronous.
      const probe = new File([new Blob([], { type: 'image/png' })], 'probe.png', { type: 'image/png' });
      canShareFiles = nav.canShare({ files: [probe] });
    }
  } catch {
    canShareFiles = false;
  }

  const ClipboardItemCtor = (window as unknown as { ClipboardItem?: unknown }).ClipboardItem;
  const canClipboardWrite =
    !!doc.clipboard && typeof doc.clipboard.write === 'function' && !!ClipboardItemCtor;

  return {
    canShareFiles,
    canShare: typeof nav.share === 'function',
    canClipboardWrite,
    canDownload: typeof document !== 'undefined' && 'a' in document.createElement('div'),
  };
}

/** Choose the best available delivery channel for a generated card blob. */
export function pickShareMethod(support: ShareSupport): 'web-share' | 'clipboard' | 'download' {
  if (support.canShareFiles) return 'web-share';
  if (support.canClipboardWrite) return 'clipboard';
  return 'download';
}

/** Deterministic slug used for the exported filename. */
export function shareFileName(username: string, kind: 'streak' | 'banner'): string {
  const safe = username.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'cadet';
  return `cadet-${kind}-${safe}.png`;
}
