/**
 * Keyboard utilities — shared across CommandPalette, useKeyboardShortcuts and ShortcutsHelp.
 */

export interface Shortcut {
  /** Human-readable description shown in the command palette / help overlay */
  label: string;
  /** View to navigate to (via store.setCurrentView) */
  view?: string;
  /** Key to press (single letter/digit, '?' or 'Escape'). Ignored if `combo` is set. */
  key?: string;
  /** Modifier combo, e.g. 'Ctrl+K' */
  combo?: string;
  emoji?: string;
}

/** Global shortcuts surfaced in the Command Palette and the "?" help overlay. */
export const SHORTCUTS: Shortcut[] = [
  { label: 'Open command palette', combo: 'Ctrl+K', emoji: '⌘' },
  { label: 'Dashboard', key: 'd', view: 'dashboard', emoji: '🏠' },
  { label: 'Resume next lesson', key: 'n', view: 'lesson', emoji: '▶️' },
  { label: 'Tone Coach', key: 't', view: 'tone-coach', emoji: '🎓' },
  { label: 'Analytics', key: 'a', view: 'analytics', emoji: '📊' },
  { label: 'Leaderboard', key: 'l', view: 'leaderboard', emoji: '🏆' },
  { label: 'My Banner', key: 'b', view: 'banner', emoji: '🎖️' },
  { label: 'Songs', key: 's', view: 'songs', emoji: '🎵' },
  { label: 'Settings', key: ',', view: 'settings', emoji: '⚙️' },
  { label: 'Toggle dark mode', key: 'm', emoji: '🌗' },
  { label: 'Show / hide this help', key: '?', emoji: '❓' },
];

/** True when the keystroke should be ignored (user is typing somewhere). */
export function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName.toUpperCase();
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable === true;
}

/** Format a combo/key for display, e.g. "Ctrl+K" or "D". */
export function formatShortcut(s: Shortcut): string {
  if (s.combo) return s.combo;
  if (s.key === '?') return '? (Shift+/)';
  return s.key ? s.key.toUpperCase() : '';
}
