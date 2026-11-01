/**
 * Unit tests for pure share-card helpers (src/utils/shareCard.ts).
 * Dependency-free: npx tsx src/tests/shareCard.test.ts
 */
import {
  hasUserActivationWindow,
  pickShareMethod,
  shareFileName,
  TRANSIENT_ACTIVATION_BUDGET_MS,
} from '../utils/shareCard';

let failures = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) { console.error('❌ FAIL:', msg); failures++; }
  else console.log('✅ PASS:', msg);
}

// --- hasUserActivationWindow ---
assert(hasUserActivationWindow(0, 500) === true, 'activation window open at 500ms');
assert(hasUserActivationWindow(0, TRANSIENT_ACTIVATION_BUDGET_MS) === true, 'activation window open at exact budget');
assert(hasUserActivationWindow(0, TRANSIENT_ACTIVATION_BUDGET_MS + 1) === false, 'activation window closed past budget');
assert(hasUserActivationWindow(Date.now(), Date.now()) === true, 'zero elapsed is inside window');

// --- pickShareMethod ---
const full = { canShareFiles: true, canShare: true, canClipboardWrite: true, canDownload: true };
const clipOnly = { canShareFiles: false, canShare: false, canClipboardWrite: true, canDownload: true };
const dlOnly = { canShareFiles: false, canShare: false, canClipboardWrite: false, canDownload: true };
assert(pickShareMethod(full) === 'web-share', 'prefers web-share when files supported');
assert(pickShareMethod({ ...full, canShareFiles: false }) === 'clipboard', 'falls back to clipboard without file share');
assert(pickShareMethod(clipOnly) === 'clipboard', 'clipboard chosen when only channel besides download');
assert(pickShareMethod(dlOnly) === 'download', 'download is last-resort fallback');

// --- shareFileName ---
assert(shareFileName('Cadet User 99!', 'streak') === 'cadet-streak-cadet-user-99.png', 'slugifies username, strips punctuation');
assert(shareFileName('---', 'banner') === 'cadet-banner-cadet.png', 'empty slug falls back to "cadet"');
assert(shareFileName('UPPER Case', 'streak') === 'cadet-streak-upper-case.png', 'lowercases username');
assert(shareFileName("O'Brien", 'streak') === 'cadet-streak-o-brien.png', 'apostrophe becomes separator');

if (failures > 0) { console.error(`\n${failures} test(s) FAILED`); process.exit(1); }
console.log('\nAll shareCard tests passed.');
