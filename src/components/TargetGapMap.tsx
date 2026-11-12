import { motion } from 'framer-motion';
import { useStore } from '../store';
import { getLessonById } from '../curriculum';
import { getRequirementProgram } from '../requirements/programs';
import {
  availableLevels,
  buildGapMap,
  resolveTarget,
  type RequirementStatus,
} from '../requirements/engine';
import { FAMILY_TITLE, STATE_LABEL, type RequirementState } from '../requirements/model';
import type { CadetLevel } from '../curriculum/types';
import { instrumentDisplayName } from '../instruments/registry';

const LEVEL_LABEL: Readonly<Record<CadetLevel, string>> = {
  BASIC: 'Basic',
  ONE: 'Level One',
  TWO: 'Level Two',
  THREE: 'Level Three',
  FOUR: 'Level Four',
  FIVE: 'Level Five',
};

const STATE_CLASS: Readonly<Record<RequirementState, string>> = {
  'not-started': 'text-[#5a6577] dark:text-[#9aa3b0]',
  learning: 'text-[#4a7c8a]',
  'ready-to-check': 'text-[#a68a3a] dark:text-[#c9a84c]',
  'observed-pass': 'text-[#3a8a5c]',
};

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

function StateLabel({ state }: { state: RequirementState }) {
  return <span className={`text-xs font-semibold whitespace-nowrap ${STATE_CLASS[state]}`}>{STATE_LABEL[state]}</span>;
}

export default function TargetGapMap() {
  const { user, setCurrentView, setCurrentLesson, setTargetLevel, setRequirementReady } = useStore();
  if (!user) return null;

  const program = getRequirementProgram(user.instrumentId);
  const records = user.requirements ?? {};
  const completed = user.progress.completedLessons;

  const back = () => setCurrentView('dashboard');

  if (!program) {
    return (
      <div className="min-h-screen p-6 max-w-xl mx-auto">
        <button onClick={back} className="flex items-center gap-1 text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6"><BackIcon /> Back</button>
        <p className="text-[#1a2332] dark:text-white">
          Level requirements for {instrumentDisplayName(user.instrumentId)} are not available yet.
        </p>
      </div>
    );
  }

  const levels = availableLevels(program);
  const target = resolveTarget(program, user.targetLevel, records, completed);
  if (!target) return null;
  const gap = buildGapMap(program, target, records, completed);
  const focus: RequirementStatus | null = gap.focus;

  // First teaching lesson that exists in the curriculum, so "Practise this" always opens something real.
  const practiceLessonId = focus?.def.teachingLessonIds.find((id) => getLessonById(id)) ?? null;
  const focusReady = focus?.state === 'ready-to-check';

  const chooseTarget = (level: CadetLevel) => setTargetLevel(level);

  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#1a2332]/90 backdrop-blur border-b border-[#e2e4e8] dark:border-[#2a3545] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button onClick={back} className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white"><BackIcon /></button>
          <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Your path</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Target selection */}
        <section aria-label="Target level">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#5a6577] dark:text-[#9aa3b0] mb-2">Working toward</p>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => {
              const selected = level === target;
              return (
                <button
                  key={level}
                  onClick={() => chooseTarget(level)}
                  aria-pressed={selected}
                  className={`min-h-[40px] px-4 rounded-lg text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                      : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#dcdcdc] dark:hover:bg-[#33404f]'
                  }`}
                >
                  {LEVEL_LABEL[level]}
                </button>
              );
            })}
          </div>
        </section>

        {/* Current focus */}
        <motion.section
          key={focus?.def.id ?? 'done'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          aria-label="Next up"
        >
          {focus ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#a68a3a] dark:text-[#c9a84c]">Next up</p>
              <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mt-1">{focus.def.title}</h2>
              <p className="text-sm text-[#1a2332] dark:text-white mt-3">{focus.def.standard}</p>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2">Source: {focus.def.source}</p>
              <div className="mt-3"><StateLabel state={focus.state} /></div>

              <div className="mt-5 flex flex-col gap-2">
                {practiceLessonId && (
                  <button
                    onClick={() => { setCurrentLesson(practiceLessonId); setCurrentView('lesson'); }}
                    className="btn-accent w-full py-3"
                  >
                    Practise this
                  </button>
                )}
                <button
                  onClick={() => setRequirementReady(focus.def.id, !focusReady)}
                  className="btn-secondary w-full py-3"
                  aria-pressed={focusReady}
                >
                  {focusReady ? 'Undo: not ready yet' : 'I have practised this and am ready to check'}
                </button>
              </div>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-3">
                Marking something ready does not pass it. An assessor confirms each pass.
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3a8a5c]">Complete</p>
              <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mt-1">
                Every requirement for {LEVEL_LABEL[target]} is passed.
              </h2>
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2">Choose your next level above when you are ready.</p>
            </>
          )}
        </motion.section>

        {/* Gap map */}
        <section aria-label="Gap map">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-semibold text-[#1a2332] dark:text-white">{LEVEL_LABEL[target]}</h2>
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
              {gap.targetOpen === 0 ? 'Nothing left' : `${gap.targetOpen} to go`}
            </p>
          </div>

          <div className="space-y-4">
            {gap.targetGroups.map((group) => (
              <div key={group.family} className="card">
                <p className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">{FAMILY_TITLE[group.family]}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.def.id} className="flex items-start justify-between gap-3">
                      <span className={`text-sm ${item.def.id === focus?.def.id ? 'font-semibold text-[#1a2332] dark:text-white' : 'text-[#1a2332] dark:text-white'}`}>
                        {item.def.title}
                      </span>
                      <StateLabel state={item.state} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {gap.earlierOpen.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">Earlier levels still open</p>
              <ul className="space-y-2">
                {gap.earlierOpen.map((item) => (
                  <li key={item.def.id} className="flex items-start justify-between gap-3">
                    <span className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                      {item.def.title} <span className="text-xs">({LEVEL_LABEL[item.def.level]})</span>
                    </span>
                    <StateLabel state={item.state} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
