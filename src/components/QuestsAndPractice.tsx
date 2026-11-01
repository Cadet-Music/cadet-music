import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { QUEST_POOL, ensureDayRecord, todayKey } from '../quests';
import { PRACTICE_PRESETS, SESSIONS_PER_FREEZE, minutesInLastDays, dailyTotals } from '../practiceLog';

/**
 * Dashboard panels:
 *  - Daily Practice Quests (deterministic per-day challenges with claimable XP)
 *  - Practice Log (self-reported real-world practice; earns Streak Freezes)
 */
export default function QuestsAndPractice() {
  const {
    user, activity, practiceLog,
    logPracticeSession, claimQuests, setDailyGoalMinutes,
  } = useStore();

  const [minutes, setMinutes] = useState(15);
  const [notes, setNotes] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [justLogged, setJustLogged] = useState(false);

  const today = todayKey();
  const day = useMemo(
    () => ensureDayRecord(activity[today], today, user?.progress.streak ?? 0),
    [activity, today, user?.progress.streak]
  );

  const weekMinutes = useMemo(() => minutesInLastDays(practiceLog, 7), [practiceLog]);
  const recent = useMemo(() => dailyTotals(practiceLog, 7), [practiceLog]);
  const goal = user?.progress.dailyGoalMinutes ?? 15;
  const todayMinutes = recent.find((d) => d.day === today)?.minutes ?? 0;
  const goalPct = Math.min(100, Math.round((todayMinutes / goal) * 100));
  const sessionsToNextFreeze = SESSIONS_PER_FREEZE - (practiceLog.length % SESSIONS_PER_FREEZE);

  if (!user) return null;

  const unclaimedXp = day.quests
    .filter((qp) => qp.completed && !qp.claimedXp)
    .reduce((s, qp) => s + (QUEST_POOL.find((q) => q.id === qp.questId)?.xpReward ?? 0), 0);

  const handleLog = () => {
    const preset = selectedPreset !== null ? PRACTICE_PRESETS[selectedPreset] : null;
    logPracticeSession(minutes, preset ? preset.concepts : [], notes || undefined);
    setNotes('');
    setSelectedPreset(null);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      {/* ── Daily Quests ─────────────────────────────────────── */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gradient">🗺️ Daily Quests</h2>
          {unclaimedXp > 0 && (
            <button onClick={() => claimQuests()} className="btn-accent text-sm px-3 py-1.5 animate-pulse">
              Claim +{unclaimedXp} XP
            </button>
          )}
        </div>
        <ul className="space-y-3">
          {day.quests.map((qp) => {
            const def = QUEST_POOL.find((q) => q.id === qp.questId);
            if (!def) return null;
            const pct = Math.min(100, Math.round((qp.current / def.target) * 100));
            return (
              <li key={qp.questId} className="text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className={qp.completed ? 'font-semibold' : ''}>
                    {def.emoji} {def.label} {qp.completed && (qp.claimedXp ? '✓' : '🎁')}
                  </span>
                  <span className="text-text-secondary text-xs">
                    {Math.min(qp.current, def.target)}/{def.target} · +{def.xpReward} XP
                  </span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${qp.completed ? 'bg-green-500' : 'gradient-accent'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* ── Practice Log ─────────────────────────────────────── */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gradient">🎷 Practice Log</h2>
          <span title="Streak Freezes — earned every 5 logged sessions, spent to repair a broken streak">
            ❄️ {user.progress.streakFreezes}
          </span>
        </div>

        {/* Daily goal progress */}
        <div className="mb-3 text-sm">
          <div className="flex justify-between text-text-secondary mb-1">
            <span>Today: {todayMinutes} min of {goal} min goal</span>
            <span>{goalPct}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${goalPct >= 100 ? 'bg-green-500' : 'gradient-accent'}`}
              initial={{ width: 0 }}
              animate={{ width: `${goalPct}%` }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
            <span>Goal:</span>
            {[10, 15, 20, 30, 45].map((m) => (
              <button
                key={m}
                onClick={() => setDailyGoalMinutes(m)}
                className={`px-2 py-0.5 rounded-full border text-xs ${
                  goal === m
                    ? 'border-accent bg-accent/10 font-semibold'
                    : 'border-gray-300 dark:border-gray-700 hover:border-accent'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {PRACTICE_PRESETS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => { setSelectedPreset(i); setMinutes(p.minutes); }}
              className={`px-2 py-1 rounded-full text-xs border transition-colors ${
                selectedPreset === i
                  ? 'border-accent bg-accent/10 font-semibold'
                  : 'border-gray-300 dark:border-gray-700 hover:border-accent'
              }`}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        {/* Log form */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={1}
            max={240}
            value={minutes}
            onChange={(e) => setMinutes(Math.max(1, Math.min(240, Number(e.target.value) || 1)))}
            aria-label="Practice minutes"
            className="w-20 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-center"
          />
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you work on? (optional)"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-sm"
          />
          <button onClick={handleLog} className="btn-primary text-sm whitespace-nowrap">
            {justLogged ? '✓ Logged!' : 'Log session'}
          </button>
        </div>

        <p className="text-xs text-text-secondary mt-2">
          This week: {weekMinutes} min · {practiceLog.length} lifetime sessions ·{' '}
          {sessionsToNextFreeze} more to earn a ❄️ Streak Freeze
        </p>
      </motion.div>
    </div>
  );
}
