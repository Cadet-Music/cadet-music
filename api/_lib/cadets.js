// Shared cadet storage helpers for /api/leaderboard and /api/admin/analytics.
// Real cadet submissions only: there is no mock/sample data anywhere.

import { getJSON, setJSON } from './kv.js';

const ENTRIES_KEY = 'leaderboard:entries';

// Older versions of this app seeded six sample cadets and, on the first real
// submission, saved them into storage. Remove exactly those rows (matched on
// name AND every stat, so a real cadet who shares a name is never touched).
const LEGACY_SAMPLE_ROWS = [
  ['Cpl Thompson', 2450, 21, 48],
  ['L/Cpl Martinez', 1890, 14, 35],
  ['Cdt Williams', 1650, 10, 30],
  ['Cdt Brown', 1200, 7, 22],
  ['Cdt Davis', 980, 5, 18],
  ['Cdt Johnson', 750, 3, 14],
];

function isLegacySample(e) {
  return LEGACY_SAMPLE_ROWS.some(
    ([name, xp, streak, lessons]) =>
      e.name === name && e.xp === xp && e.streak === streak && e.lessons === lessons,
  );
}

/** All stored cadets, newest data included, legacy sample rows removed. */
export async function loadCadets() {
  const stored = await getJSON(ENTRIES_KEY, null);
  if (!Array.isArray(stored)) return [];
  return stored.filter((e) => e && typeof e.name === 'string' && !isLegacySample(e));
}

export async function saveCadets(list) {
  await setJSON(ENTRIES_KEY, list);
}

/** What the PUBLIC leaderboard may expose. Quiz results, current streak and
 *  activity times stay private to the admin panel. */
export function publicEntry(e) {
  return {
    name: e.name,
    xp: e.xp,
    streak: e.streak,
    lessons: e.lessons,
    bannerBg: e.bannerBg,
    stickers: e.stickers,
  };
}
