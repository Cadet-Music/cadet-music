/**
 * Practice Log — lightweight self-reported practice journal.
 *
 * Cadets log real-world practice sessions (minutes + what they worked on).
 * The store uses these to:
 *  - drive "log a practice session" daily quests,
 *  - compute weekly practice minutes for Analytics,
 *  - award a Streak Freeze every 5 logged sessions (passive streak protection).
 */

import { Concept } from './competency';

export interface PracticeLogEntry {
  id: string;
  /** ISO date-time when the session was logged */
  at: string;
  /** YYYY-MM-DD bucket used for daily aggregation */
  day: string;
  minutes: number;
  focusConcepts: Concept[];
  notes?: string;
}

export const SESSIONS_PER_FREEZE = 5;
export const MAX_FREEZES = 2;

export const PRACTICE_PRESETS: Array<{ label: string; emoji: string; minutes: number; concepts: Concept[] }> = [
  { label: 'Long tones', emoji: '🎵', minutes: 10, concepts: ['intonation'] },
  { label: 'Scales & arpeggios', emoji: '🎼', minutes: 15, concepts: ['scales', 'keySignatures'] },
  { label: 'Prepared music (exam song)', emoji: '📄', minutes: 20, concepts: ['preparedMusic'] },
  { label: 'Sight reading', emoji: '👀', minutes: 10, concepts: ['sightReading'] },
  { label: 'Articulation drills', emoji: '👄', minutes: 10, concepts: ['articulations'] },
  { label: 'Rhythm clapping', emoji: '👏', minutes: 5, concepts: ['rhythm', 'timeSignatures'] },
];

export function makeEntry(
  minutes: number,
  focusConcepts: Concept[],
  notes?: string,
  now: Date = new Date()
): PracticeLogEntry {
  return {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    at: now.toISOString(),
    day: now.toISOString().split('T')[0],
    minutes: Math.max(1, Math.round(minutes)),
    focusConcepts,
    notes: notes?.trim() || undefined,
  };
}

/** Total minutes within the last `days` days (inclusive of today). */
export function minutesInLastDays(entries: PracticeLogEntry[], days: number, now: Date = new Date()): number {
  const cutoff = now.getTime() - days * 86400000;
  return entries.filter((e) => new Date(e.at).getTime() >= cutoff).reduce((s, e) => s + e.minutes, 0);
}

/** Per-day totals, most recent first, capped at `limit`. */
export function dailyTotals(entries: PracticeLogEntry[], limit = 7): Array<{ day: string; minutes: number; sessions: number }> {
  const map = new Map<string, { minutes: number; sessions: number }>();
  for (const e of entries) {
    const cur = map.get(e.day) ?? { minutes: 0, sessions: 0 };
    cur.minutes += e.minutes;
    cur.sessions += 1;
    map.set(e.day, cur);
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, limit)
    .map(([day, v]) => ({ day, ...v }));
}

/** Most frequently practiced concepts (for recommendations). */
export function topFocusConcepts(entries: PracticeLogEntry[], n = 3): Array<{ concept: Concept; count: number }> {
  const counts = new Map<Concept, number>();
  for (const e of entries) for (const c of e.focusConcepts) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([concept, count]) => ({ concept, count }));
}

/**
 * How many streak freezes the bank should hold, given lifetime logged sessions.
 * A freeze is earned for every SESSIONS_PER_FREEZE sessions, capped at MAX_FREEZES.
 * (Bank only refills when below cap — spent freezes come back as you keep practicing.)
 */
export function computeFreezeBank(totalSessions: number, currentBank: number): number {
  const earned = Math.min(MAX_FREEZES, Math.floor(totalSessions / SESSIONS_PER_FREEZE));
  return Math.max(currentBank, earned);
}
