/**
 * Daily Practice Quests — small, Duolingo-style optional challenges generated
 * deterministically per day. Completing a quest awards bonus XP and updates
 * the user's daily goal progress (tracked in store.dailyQuests).
 */

export interface Quest {
  id: string;
  label: string;
  emoji: string;
  /** target count for completion */
  target: number;
  /** metric key used to evaluate progress */
  metric: QuestMetric;
  xpReward: number;
}

export type QuestMetric =
  | 'lessonsCompleted'      // lessons completed today
  | 'correctAnswers'        // correct answers logged today
  | 'practiceSessions'      // practice sessions recorded today
  | 'streakDays';           // current streak length

export interface QuestProgress {
  questId: string;
  current: number;
  completed: boolean;
  claimedXp: boolean;
}

export interface DayRecord {
  date: string;                 // YYYY-MM-DD
  lessonsCompleted: number;
  correctAnswers: number;
  practiceSessions: number;
  quests: QuestProgress[];
}

export const QUEST_POOL: Quest[] = [
  { id: 'q-lesson-2', label: 'Complete 2 lessons', emoji: '📖', target: 2, metric: 'lessonsCompleted', xpReward: 30 },
  { id: 'q-lesson-1', label: 'Complete 1 lesson', emoji: '✨', target: 1, metric: 'lessonsCompleted', xpReward: 15 },
  { id: 'q-correct-10', label: 'Get 10 answers right', emoji: '🎯', target: 10, metric: 'correctAnswers', xpReward: 25 },
  { id: 'q-correct-25', label: 'Get 25 answers right', emoji: '🏹', target: 25, metric: 'correctAnswers', xpReward: 45 },
  { id: 'q-practice-1', label: 'Log 1 practice session', emoji: '🎷', target: 1, metric: 'practiceSessions', xpReward: 20 },
  { id: 'q-practice-2', label: 'Log 2 practice sessions', emoji: '🎶', target: 2, metric: 'practiceSessions', xpReward: 35 },
  { id: 'q-streak-7', label: 'Reach a 7-day streak', emoji: '🔥', target: 7, metric: 'streakDays', xpReward: 50 },
];

/** Deterministic seeded RNG so everyone (and every reload) sees the same quests for a given day. */
export function hashStringToSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const todayKey = (d: Date = new Date()): string => d.toISOString().split('T')[0];

/** Pick `count` distinct quests for the given day (deterministic). */
export function getQuestsForDay(dateStr: string, count = 3): Quest[] {
  const rand = mulberry32(hashStringToSeed(dateStr));
  const pool = [...QUEST_POOL];
  const picked: Quest[] = [];
  while (picked.length < count && pool.length > 0) {
    const idx = Math.floor(rand() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

/** Ensure a DayRecord exists with fresh quests for that date; carries nothing over from prior days. */
export function ensureDayRecord(
  record: DayRecord | undefined,
  dateStr: string,
  streak: number
): DayRecord {
  if (record && record.date === dateStr) return record;
  const quests = getQuestsForDay(dateStr).map((q) => ({
    questId: q.id,
    current: q.metric === 'streakDays' ? streak : 0,
    completed: q.metric === 'streakDays' ? streak >= q.target : false,
    claimedXp: false,
  }));
  return { date: dateStr, lessonsCompleted: 0, correctAnswers: 0, practiceSessions: 0, quests };
}

/** Recompute quest progress from the day's counters (pure; returns a new record). */
export function refreshQuestProgress(record: DayRecord, streak: number): DayRecord {
  const quests = record.quests.map((qp) => {
    const def = QUEST_POOL.find((q) => q.id === qp.questId);
    if (!def || qp.claimedXp) return qp;
    const current =
      def.metric === 'lessonsCompleted' ? record.lessonsCompleted
      : def.metric === 'correctAnswers' ? record.correctAnswers
      : def.metric === 'practiceSessions' ? record.practiceSessions
      : streak;
    return { ...qp, current, completed: current >= def.target };
  });
  return { ...record, quests };
}

/** Total unclaimed XP across finished quests. */
export function unclaimedQuestXp(record: DayRecord): number {
  return record.quests.reduce((sum, qp) => {
    if (!qp.completed || qp.claimedXp) return sum;
    const def = QUEST_POOL.find((q) => q.id === qp.questId);
    return sum + (def?.xpReward ?? 0);
  }, 0);
}

/** Mark all completed quests as claimed; returns updated record and awarded XP. */
export function claimQuests(record: DayRecord): { record: DayRecord; xp: number } {
  let xp = 0;
  const quests = record.quests.map((qp) => {
    if (qp.completed && !qp.claimedXp) {
      const def = QUEST_POOL.find((q) => q.id === qp.questId);
      xp += def?.xpReward ?? 0;
      return { ...qp, claimedXp: true };
    }
    return qp;
  });
  return { record: { ...record, quests }, xp };
}

/** Helper for admin/analytics: overall quest completion rate given history. */
export function questCompletionRate(history: DayRecord[]): number {
  const total = history.reduce((n, d) => n + d.quests.length, 0);
  if (total === 0) return 0;
  const done = history.reduce((n, d) => n + d.quests.filter((q) => q.completed).length, 0);
  return Math.round((done / total) * 100);
}
