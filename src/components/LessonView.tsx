import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { getLessonById } from '../data';
import confetti from 'canvas-confetti';
import SaxophoneAssembly from './SaxophoneAssembly';

type LessonStep = 'intro' | 'learn' | 'quiz' | 'complete';
type ExerciseType = 'multiple-choice' | 'note-match' | 'rhythm-tap' | 'true-false' | 'fill-order';

interface QuizOption {
  text: string;
  correct: boolean;
}

interface Exercise {
  type: ExerciseType;
  question: string;
  options?: QuizOption[];
  items?: string[];
  correctOrder?: string[];
  correctAnswer?: string;
  notePairs?: { note: string; position: string }[];
}

function getExercisesForLesson(lessonId: string): Exercise[] {
  const exercises: Record<string, Exercise[]> = {
    'pb-1': [
      { type: 'multiple-choice', question: 'Which part vibrates to make sound?', options: [{ text: 'The reed', correct: true }, { text: 'The bell', correct: false }, { text: 'The keys', correct: false }, { text: 'The neck', correct: false }] },
      { type: 'true-false', question: 'The bell is where sound comes out of the saxophone.', correctAnswer: 'true' },
      { type: 'note-match', question: 'Match the parts to their function:', notePairs: [{ note: 'Mouthpiece', position: 'Where you blow' }, { note: 'Reed', position: 'Vibrates to make sound' }, { note: 'Bell', position: 'Sound exits here' }] },
    ],
    'pb-3': [
      { type: 'multiple-choice', question: 'What creates sound on saxophone?', options: [{ text: 'Reed vibrating against mouthpiece', correct: true }, { text: 'Blowing air only', correct: false }, { text: 'Pressing keys', correct: false }, { text: 'Tapping the bell', correct: false }] },
      { type: 'true-false', question: 'You should always wet your reed before playing.', correctAnswer: 'true' },
    ],
    'n-1': [
      { type: 'multiple-choice', question: 'Which fingers play the note B?', options: [{ text: 'Left hand index finger', correct: true }, { text: 'Right hand only', correct: false }, { text: 'All fingers', correct: false }, { text: 'No fingers', correct: false }] },
      { type: 'fill-order', question: 'Put the notes in order from highest to lowest:', items: ['B', 'A', 'G'], correctOrder: ['B', 'A', 'G'] },
    ],
    'n-2': [
      { type: 'multiple-choice', question: 'On the staff, notes go from ___ to ___', options: [{ text: 'Bottom to top = low to high', correct: true }, { text: 'Left to right', correct: false }, { text: 'Top to bottom = low to high', correct: false }, { text: 'Outside to inside', correct: false }] },
      { type: 'true-false', question: 'The treble clef is also called the G clef.', correctAnswer: 'true' },
    ],
    'r-1': [
      { type: 'rhythm-tap', question: 'Tap 4 quarter notes (1 beat each):', items: ['1', '2', '3', '4'] },
      { type: 'multiple-choice', question: 'How many beats does a quarter note get?', options: [{ text: '1 beat', correct: true }, { text: '2 beats', correct: false }, { text: '4 beats', correct: false }, { text: '1/2 beat', correct: false }] },
    ],
    'r-4': [
      { type: 'rhythm-tap', question: 'Tap 8 eighth notes (2 per beat):', items: ['1-and', '2-and', '3-and', '4-and'] },
      { type: 'multiple-choice', question: 'How many eighth notes fit in one beat?', options: [{ text: '2', correct: true }, { text: '1', correct: false }, { text: '3', correct: false }, { text: '4', correct: false }] },
    ],
    't-1': [
      { type: 'multiple-choice', question: 'What does 4/4 time mean?', options: [{ text: '4 beats per measure, quarter = 1 beat', correct: true }, { text: '4 notes per song', correct: false }, { text: 'Play 4 times fast', correct: false }, { text: '4 instruments', correct: false }] },
      { type: 'true-false', question: '3/4 time has 3 beats per measure.', correctAnswer: 'true' },
    ],
    't-3': [
      { type: 'multiple-choice', question: 'What does "piano" (p) mean?', options: [{ text: 'Soft', correct: true }, { text: 'Loud', correct: false }, { text: 'Fast', correct: false }, { text: 'Slow', correct: false }] },
      { type: 'fill-order', question: 'Order dynamics from softest to loudest:', items: ['pp', 'p', 'mp', 'mf', 'f', 'ff'], correctOrder: ['pp', 'p', 'mp', 'mf', 'f', 'ff'] },
    ],
  };

  return exercises[lessonId] || [
    { type: 'multiple-choice', question: 'Did you complete the practice?', options: [{ text: 'Yes, I practiced!', correct: true }, { text: 'Not yet', correct: false }] },
  ];
}

function getLearnContent(lessonId: string): { title: string; content: string; tip: string; image?: string } {
  const content: Record<string, { title: string; content: string; tip: string; image?: string }> = {
    'pb-1': { 
      title: 'Meet Your Saxophone', 
      content: 'The saxophone has 4 main parts:\n\nMouthpiece — where you blow\nNeck — connects mouthpiece to body\nBody — the main tube with keys\nBell — the flared end\n\nThe reed is a thin piece of cane that vibrates when air passes over it.', 
      tip: 'Always wet your reed before playing.',
      image: 'https://image.qwenlm.ai/generated-images/fd6a03c2-7031-47b1-8955-86ec8e6007f1/_result.png'
    },
    'pb-2': { 
      title: 'Assembly Steps', 
      content: '1. Attach neck to body\n2. Wet the reed\n3. Place reed on mouthpiece\n4. Slide ligature over & tighten\n5. Attach mouthpiece to neck', 
      tip: 'Handle by the bell & body — never by the keys.',
      image: 'https://image.qwenlm.ai/generated-images/280f89c2-89c5-4eb0-9878-f1af364176cc/_result.png'
    },
    'n-1': { 
      title: 'Your First Notes: B, A, G', 
      content: 'B — Left hand: index finger\nA — Left hand: index + middle\nG — Left hand: all 3 fingers\n\nPractice: B-B-B → A-A-A → G-G-G', 
      tip: 'Keep fingers curved like holding a ball.',
      image: 'https://image.qwenlm.ai/generated-images/c401d953-df85-4c9d-bf1a-74062e3fbc39/_result.png'
    },
    'r-1': { 
      title: 'Quarter Notes', 
      content: 'A quarter note = 1 beat\n\nCount: 1 - 2 - 3 - 4\n\nEach number = one quarter note\n\n4 quarter notes = 4 taps', 
      tip: 'Start at 60 BPM — one tap per second.',
      image: 'https://image.qwenlm.ai/generated-images/2035579c-9e7f-4e50-b1db-049573a0ae18/_result.png'
    },
    'r-4': { 
      title: 'Eighth Notes', 
      content: 'Eighth notes = half a beat each\n\nCount: "1-and, 2-and, 3-and, 4-and"\n\n8 eighth notes = 8 taps in 4 beats', 
      tip: 'Think "hot-dog, hot-dog" — two taps per beat.',
      image: 'https://image.qwenlm.ai/generated-images/2035579c-9e7f-4e50-b1db-049573a0ae18/_result.png'
    },
    't-1': { 
      title: 'Time Signatures', 
      content: '4/4 — 4 beats, quarter = 1 beat\n3/4 — 3 beats (waltz)\n2/4 — 2 beats (march)\n\nTop number = beats per measure\nBottom = which note gets 1 beat', 
      tip: '4/4 is the most common time signature.'
    },
    't-3': { 
      title: 'Dynamics', 
      content: 'pp = pianissimo (very soft)\np = piano (soft)\nmp = mezzo piano (medium soft)\nmf = mezzo forte (medium loud)\nf = forte (loud)\nff = fortissimo (very loud)', 
      tip: 'Dynamics add expression to your music.',
      image: 'https://image.qwenlm.ai/generated-images/75559c54-0718-4c3d-8e1f-2bb21a3a558d/_result.png'
    },
  };

  return content[lessonId] || {
    title: 'Practice Time',
    content: 'Follow the instructions and practice.\n\nFocus on accuracy over speed.\nTake it slow — speed up later.\nRepeat until comfortable.',
    tip: 'Even 5 minutes daily helps.',
  };
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Exercise Components
function MultipleChoiceExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = exercise.options?.[idx].correct || false;
    setTimeout(() => onComplete(correct), 800);
  };

  return (
    <div>
      <motion.p 
        className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {exercise.question}
      </motion.p>
      <div className="space-y-2.5">
        {exercise.options?.map((opt, idx) => {
          let borderColor = 'border-[#c8c8c8] dark:border-[#2a3545]';
          let bgColor = '';
          if (selected !== null) {
            if (opt.correct) { borderColor = 'border-[#3a8a5c]'; bgColor = 'bg-[#3a8a5c]/5 dark:bg-[#3a8a5c]/10'; }
            else if (idx === selected) { borderColor = 'border-[#c44536]'; bgColor = 'bg-[#c44536]/5 dark:bg-[#c44536]/10'; }
          }
          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={selected === null ? { scale: 1.02, x: 5 } : {}}
              whileTap={selected === null ? { scale: 0.98 } : {}}
              className={`w-full p-4 rounded-lg text-left font-medium transition-all border ${borderColor} ${bgColor} ${
                selected === null ? 'hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 dark:hover:bg-[#c9a84c]/10' : ''
              } text-[#1a2332] dark:text-white`}
            >
              {opt.text}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function TrueFalseExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (val: string) => {
    if (selected) return;
    setSelected(val);
    const correct = val === exercise.correctAnswer;
    setTimeout(() => onComplete(correct), 800);
  };

  return (
    <div>
      <motion.p 
        className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {exercise.question}
      </motion.p>
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          onClick={() => handleSelect('true')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={selected === null ? { scale: 1.05 } : {}}
          whileTap={selected === null ? { scale: 0.95 } : {}}
          className={`p-5 rounded-lg font-semibold border transition-all ${
            selected === 'true'
              ? exercise.correctAnswer === 'true'
                ? 'border-[#3a8a5c] bg-[#3a8a5c]/10 text-[#3a8a5c]'
                : 'border-[#c44536] bg-[#c44536]/10 text-[#c44536]'
              : 'border-[#c8c8c8] dark:border-[#2a3545] text-[#1a2332] dark:text-white hover:border-[#c9a84c]'
          }`}
        >
          True
        </motion.button>
        <motion.button
          onClick={() => handleSelect('false')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={selected === null ? { scale: 1.05 } : {}}
          whileTap={selected === null ? { scale: 0.95 } : {}}
          className={`p-5 rounded-lg font-semibold border transition-all ${
            selected === 'false'
              ? exercise.correctAnswer === 'false'
                ? 'border-[#3a8a5c] bg-[#3a8a5c]/10 text-[#3a8a5c]'
                : 'border-[#c44536] bg-[#c44536]/10 text-[#c44536]'
              : 'border-[#c8c8c8] dark:border-[#2a3545] text-[#1a2332] dark:text-white hover:border-[#c9a84c]'
          }`}
        >
          False
        </motion.button>
      </div>
    </div>
  );
}

function RhythmTapExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [tapCount, setTapCount] = useState(0);
  const targetTaps = exercise.items?.length || 4;

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= targetTaps) {
      setTimeout(() => onComplete(true), 500);
    }
  };

  return (
    <div className="text-center">
      <motion.p 
        className="text-lg font-semibold text-[#1a2332] dark:text-white mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {exercise.question}
      </motion.p>
      <motion.p 
        className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Tap {targetTaps} times
      </motion.p>
      
      <div className="flex justify-center gap-2 mb-6">
        {exercise.items?.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ 
              scale: i < tapCount ? [1, 1.3, 1] : 1,
              backgroundColor: i < tapCount ? '#c9a84c' : undefined
            }}
            transition={{ delay: i * 0.05 }}
            className={`w-8 h-8 rounded-full transition-colors ${
              i < tapCount ? 'bg-[#c9a84c]' : 'bg-[#d0d0d0] dark:bg-[#2a3545]'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleTap}
        className={`w-24 h-24 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332] text-sm font-bold shadow-lg ${
          tapCount < targetTaps ? 'animate-pulse' : ''
        }`}
      >
        TAP
      </motion.button>
      <motion.p 
        className="text-sm font-medium text-[#5a6577] dark:text-[#9aa3b0] mt-4"
        key={tapCount}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
      >
        {tapCount}/{targetTaps}
      </motion.p>
    </div>
  );
}

function FillOrderExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>(exercise.items || []);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (item: string) => {
    if (submitted) return;
    setSelected([...selected, item]);
    setRemaining(remaining.filter(i => i !== item));
  };

  const handleRemove = (idx: number) => {
    if (submitted) return;
    const item = selected[idx];
    setSelected(selected.filter((_, i) => i !== idx));
    setRemaining([...remaining, item]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = JSON.stringify(selected) === JSON.stringify(exercise.correctOrder);
    setTimeout(() => onComplete(correct), 1000);
  };

  return (
    <div>
      <p className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6 text-center">{exercise.question}</p>
      
      <div className="min-h-[56px] bg-[#e8e8e8] dark:bg-[#0f1720] border border-dashed border-[#c8c8c8] dark:border-[#2a3545] rounded-lg p-3 mb-4 flex flex-wrap gap-2">
        {selected.map((item, idx) => (
          <motion.button
            key={`${item}-${idx}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleRemove(idx)}
            className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-all ${
              submitted
                ? exercise.correctOrder?.[idx] === item
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#c44536] text-white'
                : 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
            }`}
          >
            {item}
          </motion.button>
        ))}
        {selected.length === 0 && <span className="text-[#9aa3b0] text-sm self-center mx-auto">Tap items below in order</span>}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {remaining.map(item => (
          <motion.button
            key={item}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(item)}
            className="px-3 py-1.5 rounded-md font-semibold text-sm border border-[#c8c8c8] dark:border-[#2a3545] bg-white dark:bg-[#1a2332] text-[#1a2332] dark:text-white hover:border-[#c9a84c] transition-colors"
          >
            {item}
          </motion.button>
        ))}
      </div>

      {selected.length === (exercise.items?.length || 0) && !submitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSubmit}
          className="btn-accent w-full"
        >
          Check Answer
        </motion.button>
      )}
    </div>
  );
}

function NoteMatchExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const positions = exercise.notePairs?.map(p => p.position) || [];
  const notes = exercise.notePairs?.map(p => p.note) || [];

  const handleMatch = (position: string) => {
    if (submitted || !selectedNote) return;
    setMatches({ ...matches, [position]: selectedNote });
    setSelectedNote(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let allCorrect = true;
    exercise.notePairs?.forEach(pair => {
      if (matches[pair.position] !== pair.note) allCorrect = false;
    });
    setTimeout(() => onComplete(allCorrect), 1000);
  };

  const allMatched = Object.keys(matches).length === positions.length;

  return (
    <div>
      <p className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6 text-center">{exercise.question}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase text-center mb-2">Terms</p>
          {notes.map(note => (
            <button
              key={note}
              onClick={() => setSelectedNote(note)}
              className={`w-full p-3 rounded-lg font-medium text-center text-sm transition-all ${
                selectedNote === note
                  ? 'bg-[#c9a84c] text-[#1a2332] border border-[#a68a3a]'
                  : Object.values(matches).includes(note)
                  ? 'bg-[#3a8a5c]/10 text-[#3a8a5c] border border-[#3a8a5c]'
                  : 'bg-white dark:bg-[#1a2332] border border-[#c8c8c8] dark:border-[#2a3545] text-[#1a2332] dark:text-white'
              }`}
            >
              {note}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase text-center mb-2">Definitions</p>
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => handleMatch(pos)}
              className={`w-full p-3 rounded-lg font-medium text-center text-xs transition-all ${
                matches[pos]
                  ? submitted
                    ? exercise.notePairs?.find(p => p.position === pos)?.note === matches[pos]
                      ? 'bg-[#3a8a5c]/10 border border-[#3a8a5c] text-[#3a8a5c]'
                      : 'bg-[#c44536]/10 border border-[#c44536] text-[#c44536]'
                    : 'bg-[#c9a84c]/10 border border-[#c9a84c] text-[#c9a84c]'
                  : 'bg-[#e8e8e8] dark:bg-[#0f1720] border border-dashed border-[#c8c8c8] dark:border-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
              }`}
            >
              {matches[pos] ? `${matches[pos]} →` : pos}
            </button>
          ))}
        </div>
      </div>

      {allMatched && !submitted && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleSubmit} className="btn-accent w-full">
          Check Answer
        </motion.button>
      )}
    </div>
  );
}

export default function LessonView() {
  const { user, currentLessonId, setCurrentView, completeLesson, setCurrentLesson } = useStore();
  const [step, setStep] = useState<LessonStep>('intro');
  const [noSax, setNoSax] = useState(false);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const lesson = currentLessonId ? getLessonById(currentLessonId) : null;
  const learnContent = currentLessonId ? getLearnContent(currentLessonId) : null;
  const exercises = currentLessonId ? getExercisesForLesson(currentLessonId) : [];

  if (!lesson || !user) return null;

  const isPlayingLesson = lesson.type === 'playing';
  const isRhythmLesson = lesson.type === 'rhythm';
  const totalExercises = exercises.length;
  const currentExercise = exercises[exerciseIdx];

  const handleExerciseComplete = (correct: boolean) => {
    if (correct) setCorrectCount(c => c + 1);
    
    setTimeout(() => {
      if (exerciseIdx < totalExercises - 1) {
        setExerciseIdx(i => i + 1);
      } else {
        completeLesson(lesson.id, lesson.xp);
        setStep('complete');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }, correct ? 600 : 1200);
  };

  const handleBackToPath = () => {
    setCurrentLesson(null);
    setCurrentView('dashboard');
  };

  const progressPercent = step === 'intro' ? 10 : step === 'learn' ? 30 : step === 'quiz' ? 50 + ((exerciseIdx + 1) / totalExercises) * 45 : 100;

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button onClick={handleBackToPath} className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#c44536] transition-colors">
            <CloseIcon />
          </button>
          <div className="flex-1">
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="xp-badge text-xs">+{lesson.xp} XP</div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="lesson-container pb-8">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center py-10"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[#c9a84c] font-bold text-sm uppercase">
                  {lesson.type === 'exam' ? 'Exam' : lesson.type === 'rhythm' ? 'Rhythm' : lesson.type === 'theory' ? 'Theory' : 'Play'}
                </span>
              </motion.div>
              <motion.h1 
                className="text-2xl font-semibold text-[#1a2332] dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {lesson.title}
              </motion.h1>
              <motion.p 
                className="text-[#5a6577] dark:text-[#9aa3b0] mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {lesson.description}
              </motion.p>

              {(isPlayingLesson || isRhythmLesson) && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={() => setNoSax(!noSax)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      noSax ? 'bg-[#c9a84c] text-[#1a2332]' : 'bg-[#f0f0f0] dark:bg-[#1a2332] text-[#5a6577] dark:text-[#9aa3b0] border border-[#e2e4e8] dark:border-[#2a3545]'
                    }`}
                  >
                    {noSax ? 'Tap Mode Active' : "Don't have your sax?"}
                  </motion.button>
                  {noSax && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2"
                    >
                      We'll use tapping and quizzes instead.
                    </motion.p>
                  )}
                </motion.div>
              )}

              <motion.button 
                onClick={() => setStep('learn')} 
                className="btn-accent px-8 py-3.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex items-center gap-2">Begin Lesson <ArrowRightIcon /></span>
              </motion.button>
            </motion.div>
          )}

          {step === 'learn' && learnContent && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="py-6"
            >
              <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mb-4">
                {learnContent.title}
              </h2>
              
              {/* Interactive Assembly for pb-2 */}
              {currentLessonId === 'pb-2' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-5"
                >
                  <SaxophoneAssembly />
                </motion.div>
              )}

              {learnContent.image && currentLessonId !== 'pb-2' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-5 rounded-lg overflow-hidden border border-[#c8c8c8] dark:border-[#2a3545]"
                >
                  <img 
                    src={learnContent.image} 
                    alt={learnContent.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}
              
              <div className="bg-white dark:bg-[#1a2332] rounded-lg p-5 border border-[#c8c8c8] dark:border-[#2a3545] mb-5">
                <div className="text-[#1a2332] dark:text-white leading-relaxed whitespace-pre-line text-[15px]">
                  {learnContent.content}
                </div>
              </div>

              <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/30 dark:bg-[#c9a84c]/10 rounded-lg p-4 mb-8">
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                  <span className="font-semibold text-[#1a2332] dark:text-white">Tip: </span>{learnContent.tip}
                </p>
              </div>

              <button onClick={() => setStep('quiz')} className="btn-accent w-full py-3.5">
                <span className="flex items-center justify-center gap-2">Continue to Practice <ArrowRightIcon /></span>
              </button>
            </motion.div>
          )}

          {step === 'quiz' && currentExercise && (
            <motion.div
              key={`quiz-${exerciseIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              {/* Exercise counter */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {exercises.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < exerciseIdx ? 'bg-[#3a8a5c]' : i === exerciseIdx ? 'bg-[#c9a84c]' : 'bg-[#d0d0d0] dark:bg-[#2a3545]'
                    }`}
                  />
                ))}
              </div>

              <div className="bg-white dark:bg-[#1a2332] rounded-lg p-5 border border-[#c8c8c8] dark:border-[#2a3545]">
                {currentExercise.type === 'multiple-choice' && (
                  <MultipleChoiceExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
                )}
                {currentExercise.type === 'true-false' && (
                  <TrueFalseExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
                )}
                {currentExercise.type === 'rhythm-tap' && (
                  <RhythmTapExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
                )}
                {currentExercise.type === 'fill-order' && (
                  <FillOrderExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
                )}
                {currentExercise.type === 'note-match' && (
                  <NoteMatchExercise exercise={currentExercise} onComplete={handleExerciseComplete} />
                )}
              </div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="py-12 text-center"
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-[#3a8a5c]/10 flex items-center justify-center mx-auto mb-5"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <motion.span 
                  className="text-[#3a8a5c]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CheckIcon />
                </motion.span>
              </motion.div>
              <motion.h2 
                className="text-2xl font-semibold text-[#1a2332] dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Lesson Complete!
              </motion.h2>
              <motion.p 
                className="text-[#5a6577] dark:text-[#9aa3b0] mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {lesson.title}
              </motion.p>
              <motion.p 
                className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {correctCount}/{totalExercises} correct
              </motion.p>

              <div className="flex items-center justify-center gap-3 mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="xp-badge"
                >
                  +{lesson.xp} XP
                </motion.div>
                {user.progress.streak > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                    className="streak-badge"
                  >
                    {user.progress.streak} day streak
                  </motion.div>
                )}
              </div>

              <motion.button 
                onClick={handleBackToPath} 
                className="btn-accent px-8 py-3.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <span className="flex items-center gap-2">Continue <ArrowRightIcon /></span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
