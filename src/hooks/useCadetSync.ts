import { useEffect } from 'react';
import { useStore, STICKER_DEFS } from '../store';
import { submitScore, ConceptMasterySync } from '../utils/api';

// Wait for a burst of changes (e.g. answering several quiz questions) to settle
// before sending, so each cadet makes one request instead of one per answer.
const SYNC_DELAY_MS = 4000;

/**
 * Keeps the server copy of the signed-in cadet's progress up to date, from
 * anywhere in the app. Before this, progress only synced while a cadet had the
 * Leaderboard page open, so the admin panel missed everyone who never visited it.
 *
 * Sends: display name, XP, streak, lessons finished, banner, and per-concept
 * quiz counts. Never sends the cadet's email. Best-effort: failures are ignored.
 */
export default function useCadetSync(): void {
  const { user } = useStore();
  const username = user?.username;
  const xp = user?.progress.xp;
  const streak = user?.progress.streak;
  const lessonCount = user?.progress.completedLessons.length;
  const conceptMastery = user?.progress.conceptMastery;

  useEffect(() => {
    if (!username) return;
    const timer = window.setTimeout(() => {
      // Read the freshest state at send time, not the values captured above.
      const current = useStore.getState().user;
      if (!current) return;

      const mastery: ConceptMasterySync = {};
      for (const [concept, stats] of Object.entries(current.progress.conceptMastery ?? {})) {
        if (stats && stats.attempts > 0) {
          mastery[concept] = {
            attempts: stats.attempts,
            correct: stats.correct,
            lastReviewed: stats.lastReviewed,
          };
        }
      }

      void submitScore({
        name: current.username,
        xp: current.progress.xp,
        streak: current.progress.streak,
        lessons: current.progress.completedLessons.length,
        bannerBg: current.bannerBg,
        stickers: current.progress.stickers.map((s) => STICKER_DEFS[s]?.icon || '⭐'),
        conceptMastery: mastery,
        honeypot: '',
      }).catch((err) => console.warn('Progress sync failed:', err));
    }, SYNC_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [username, xp, streak, lessonCount, conceptMastery]);
}
