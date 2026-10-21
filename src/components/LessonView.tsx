import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { getLessonById, getAllLessons } from '../data';
import confetti from 'canvas-confetti';
import Mascot from './Mascot';

type LessonStep = 'intro' | 'learn' | 'practice' | 'quiz' | 'complete';
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

function getLearnContent(lessonId: string): { title: string; content: string; tip: string; visual?: string } {
  const content: Record<string, { title: string; content: string; tip: string; visual?: string }> = {
    'pb-1': { title: 'Meet Your Saxophone', content: 'The saxophone has 4 main parts:\n\n🔹 Mouthpiece — where you blow\n🔹 Neck — connects mouthpiece to body\n🔹 Body — the main tube with keys\n🔹 Bell — the flared end\n\nThe reed is a thin piece of cane that vibrates when air passes over it!', tip: '💡 Always wet your reed before playing!', visual: '🎷' },
    'pb-2': { title: 'Assembly Steps', content: '1️⃣ Attach neck to body\n2️⃣ Wet the reed\n3️⃣ Place reed on mouthpiece\n4️⃣ Slide ligature over & tighten\n5️⃣ Attach mouthpiece to neck', tip: '💡 Handle by the bell & body — never by the keys!', visual: '🔧' },
    'n-1': { title: 'Your First Notes: B, A, G', content: '🎵 B — Left hand: index finger\n🎵 A — Left hand: index + middle\n🎵 G — Left hand: all 3 fingers\n\nPractice: B-B-B → A-A-A → G-G-G', tip: '💡 Keep fingers curved like holding a ball!', visual: '🎵' },
    'r-1': { title: 'Quarter Notes ♩', content: 'A quarter note = 1 beat\n\nCount: 1 - 2 - 3 - 4\n\nEach number = one quarter note\n\n♩ ♩ ♩ ♩ = 4 taps', tip: '💡 Start at 60 BPM — one tap per second!', visual: '♩' },
    'r-4': { title: 'Eighth Notes ♫', content: 'Eighth notes = half a beat each\n\nCount: "1-and, 2-and, 3-and, 4-and"\n\n♫ ♫ ♫ ♫ = 8 taps in 4 beats', tip: '💡 Think "hot-dog, hot-dog" — two taps per beat!', visual: '♫' },
    't-1': { title: 'Time Signatures', content: '4/4 — 4 beats, quarter = 1 beat\n3/4 — 3 beats (waltz)\n2/4 — 2 beats (march)\n\nTop number = beats per measure\nBottom = which note gets 1 beat', tip: '💡 4/4 is the most common time signature!', visual: '⏱️' },
    't-3': { title: 'Dynamics', content: 'pp = pianissimo (very soft)\np = piano (soft)\nmp = mezzo piano (medium soft)\nmf = mezzo forte (medium loud)\nf = forte (loud)\nff = fortissimo (very loud)', tip: '💡 Dynamics add expression to your music!', visual: '🔊' },
  };

  return content[lessonId] || {
    title: 'Practice Time',
    content: 'Follow the instructions and practice!\n\n🎯 Focus on accuracy over speed.\n🎯 Take it slow — speed up later.\n🎯 Repeat until comfortable.',
    tip: '💡 Even 5 minutes daily helps!',
    visual: '🎯',
  };
}

// Individual Exercise Components
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
      <p className="text-xl font-bold text-[#3c3c3c] dark:text-white mb-6 text-center">{exercise.question}</p>
      <div className="space-y-3">
        {exercise.options?.map((opt, idx) => {
          let cls = 'border-2 border-[#e5e5e5] dark:border-[#2a3f4a] bg-white dark:bg-[#131f24]';
          if (selected !== null) {
            if (opt.correct) cls = 'border-2 border-[#58cc02] bg-[#58cc02]/10';
            else if (idx === selected) cls = 'border-2 border-[#ff4b4b] bg-[#ff4b4b]/10';
          }
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(idx)}
              className={`w-full p-4 rounded-xl text-left font-semibold text-lg transition-all ${cls} text-[#3c3c3c] dark:text-white`}
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
      <p className="text-xl font-bold text-[#3c3c3c] dark:text-white mb-6 text-center">{exercise.question}</p>
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('true')}
          className={`p-6 rounded-xl font-bold text-xl border-2 transition-all ${
            selected === 'true'
              ? exercise.correctAnswer === 'true'
                ? 'border-[#58cc02] bg-[#58cc02]/10 text-[#58cc02]'
                : 'border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b]'
              : 'border-[#e5e5e5] dark:border-[#2a3f4a] text-[#3c3c3c] dark:text-white'
          }`}
        >
          ✓ TRUE
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSelect('false')}
          className={`p-6 rounded-xl font-bold text-xl border-2 transition-all ${
            selected === 'false'
              ? exercise.correctAnswer === 'false'
                ? 'border-[#58cc02] bg-[#58cc02]/10 text-[#58cc02]'
                : 'border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b]'
              : 'border-[#e5e5e5] dark:border-[#2a3f4a] text-[#3c3c3c] dark:text-white'
          }`}
        >
          ✗ FALSE
        </motion.button>
      </div>
    </div>
  );
}

function RhythmTapExercise({ exercise, onComplete }: { exercise: Exercise; onComplete: (correct: boolean) => void }) {
  const [tapCount, setTapCount] = useState(0);
  const [started, setStarted] = useState(false);
  const targetTaps = exercise.items?.length || 4;

  const handleTap = () => {
    if (!started) setStarted(true);
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= targetTaps) {
      setTimeout(() => onComplete(true), 500);
    }
  };

  return (
    <div className="text-center">
      <p className="text-xl font-bold text-[#3c3c3c] dark:text-white mb-4">{exercise.question}</p>
      <p className="text-[#777] dark:text-[#aaa] mb-6">Tap {targetTaps} times!</p>
      
      {/* Tap targets visualization */}
      <div className="flex justify-center gap-2 mb-6">
        {exercise.items?.map((_, i) => (
          <motion.div
            key={i}
            animate={i < tapCount ? { scale: [1, 1.3, 1], backgroundColor: '#58cc02' } : {}}
            className={`w-10 h-10 rounded-full border-2 ${
              i < tapCount ? 'bg-[#58cc02] border-[#46a302]' : 'bg-[#e5e5e5] dark:bg-[#2a3f4a] border-[#ccc] dark:border-[#3a4f5a]'
            } transition-colors`}
          />
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        className="w-28 h-28 rounded-full bg-[#1cb0f6] text-white text-2xl font-bold shadow-lg active:bg-[#1899d6]"
      >
        TAP!
      </motion.button>
      <p className="text-lg font-bold text-[#3c3c3c] dark:text-white mt-4">{tapCount}/{targetTaps}</p>
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
      <p className="text-xl font-bold text-[#3c3c3c] dark:text-white mb-6 text-center">{exercise.question}</p>
      
      {/* Selected order */}
      <div className="min-h-[60px] bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-dashed border-[#e5e5e5] dark:border-[#2a3f4a] rounded-xl p-3 mb-4 flex flex-wrap gap-2">
        {selected.map((item, idx) => (
          <motion.button
            key={`${item}-${idx}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleRemove(idx)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              submitted
                ? exercise.correctOrder?.[idx] === item
                  ? 'bg-[#58cc02] text-white'
                  : 'bg-[#ff4b4b] text-white'
                : 'bg-[#1cb0f6] text-white'
            }`}
          >
            {item}
          </motion.button>
        ))}
        {selected.length === 0 && <span className="text-[#aaa] text-sm self-center mx-auto">Tap items below in order</span>}
      </div>

      {/* Available items */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {remaining.map(item => (
          <motion.button
            key={item}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(item)}
            className="px-4 py-2 rounded-lg font-bold text-sm border-2 border-[#e5e5e5] dark:border-[#2a3f4a] bg-white dark:bg-[#1a2c34] text-[#3c3c3c] dark:text-white hover:border-[#1cb0f6]"
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
          className="btn-primary w-full"
        >
          CHECK
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
      <p className="text-xl font-bold text-[#3c3c3c] dark:text-white mb-6 text-center">{exercise.question}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Notes column */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#777] dark:text-[#aaa] uppercase text-center mb-2">Notes</p>
          {notes.map(note => (
            <button
              key={note}
              onClick={() => setSelectedNote(note)}
              className={`w-full p-3 rounded-xl font-bold text-center transition-all ${
                selectedNote === note
                  ? 'bg-[#1cb0f6] text-white border-2 border-[#1899d6]'
                  : Object.values(matches).includes(note)
                  ? 'bg-[#58cc02]/20 text-[#58cc02] border-2 border-[#58cc02]'
                  : 'bg-white dark:bg-[#1a2c34] border-2 border-[#e5e5e5] dark:border-[#2a3f4a] text-[#3c3c3c] dark:text-white'
              }`}
            >
              {note}
            </button>
          ))}
        </div>

        {/* Positions column */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#777] dark:text-[#aaa] uppercase text-center mb-2">Match to</p>
          {positions.map(pos => (
            <button
              key={pos}
              onClick={() => handleMatch(pos)}
              className={`w-full p-3 rounded-xl font-bold text-center text-sm transition-all ${
                matches[pos]
                  ? submitted
                    ? exercise.notePairs?.find(p => p.position === pos)?.note === matches[pos]
                      ? 'bg-[#58cc02]/20 border-2 border-[#58cc02] text-[#58cc02]'
                      : 'bg-[#ff4b4b]/20 border-2 border-[#ff4b4b] text-[#ff4b4b]'
                    : 'bg-[#1cb0f6]/10 border-2 border-[#1cb0f6] text-[#1cb0f6]'
                  : 'bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-dashed border-[#e5e5e5] dark:border-[#2a3f4a] text-[#777] dark:text-[#aaa]'
              }`}
            >
              {matches[pos] ? `${pos} ← ${matches[pos]}` : pos}
            </button>
          ))}
        </div>
      </div>

      {allMatched && !submitted && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleSubmit} className="btn-primary w-full">
          CHECK
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
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'excited'>('idle');
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
    if (correct) {
      setCorrectCount(c => c + 1);
      setMascotMood('happy');
      setTimeout(() => setMascotMood('idle'), 1500);
    }
    
    setTimeout(() => {
      if (exerciseIdx < totalExercises - 1) {
        setExerciseIdx(i => i + 1);
      } else {
        // All exercises done
        completeLesson(lesson.id, lesson.xp);
        setStep('complete');
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    }, correct ? 600 : 1200);
  };

  const handleBackToPath = () => {
    setCurrentLesson(null);
    setCurrentView('dashboard');
  };

  const progressPercent = step === 'intro' ? 10 : step === 'learn' ? 30 : step === 'practice' ? 50 : step === 'quiz' ? 50 + ((exerciseIdx + 1) / totalExercises) * 45 : 100;

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#131f24]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#1a2c34] border-b-2 border-[#e5e5e5] dark:border-[#2a3f4a] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <button onClick={handleBackToPath} className="text-[#777] dark:text-[#aaa] font-bold text-xl hover:text-[#ff4b4b] transition-colors">
            ✕
          </button>
          <div className="flex-1">
            <div className="progress-bar h-3">
              <motion.div
                className="progress-bar-fill"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="xp-badge text-xs">+{lesson.xp}</div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="lesson-container pb-8">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl block mb-6"
              >
                {lesson.emoji}
              </motion.span>
              <h1 className="text-3xl font-extrabold text-[#3c3c3c] dark:text-white mb-3">
                {lesson.title}
              </h1>
              <p className="text-lg text-[#777] dark:text-[#aaa] mb-8">
                {lesson.description}
              </p>

              {(isPlayingLesson || isRhythmLesson) && (
                <div className="mb-8">
                  <button
                    onClick={() => setNoSax(!noSax)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                      noSax ? 'bg-[#1cb0f6] text-white' : 'bg-[#e5e5e5] dark:bg-[#2a3f4a] text-[#777] dark:text-[#aaa]'
                    }`}
                  >
                    {noSax ? '🎮 Tap Mode Active' : "🎷 Don't have your sax?"}
                  </button>
                  {noSax && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#777] dark:text-[#aaa] mt-2">
                      We'll use tapping and quizzes instead!
                    </motion.p>
                  )}
                </div>
              )}

              <button onClick={() => setStep('learn')} className="btn-primary text-lg px-10 py-4">
                LET'S GO!
              </button>
            </motion.div>
          )}

          {step === 'learn' && learnContent && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-6"
            >
              <Mascot mood="idle" message="Read this, then let's practice!" />
              
              <h2 className="text-2xl font-bold text-[#3c3c3c] dark:text-white mb-4">
                {learnContent.visual} {learnContent.title}
              </h2>
              
              <div className="bg-white dark:bg-[#1a2c34] rounded-2xl p-6 border-2 border-[#e5e5e5] dark:border-[#2a3f4a] mb-6">
                <div className="text-[#3c3c3c] dark:text-white text-lg leading-relaxed whitespace-pre-line">
                  {learnContent.content}
                </div>
              </div>

              <div className="bg-[#ffc800]/10 border-2 border-[#ffc800] rounded-xl p-4 mb-8">
                <p className="text-[#3c3c3c] dark:text-white font-medium">{learnContent.tip}</p>
              </div>

              <button onClick={() => setStep('quiz')} className="btn-primary w-full text-lg py-4">
                SHOW WHAT YOU KNOW →
              </button>
            </motion.div>
          )}

          {step === 'quiz' && currentExercise && (
            <motion.div
              key={`quiz-${exerciseIdx}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="py-6"
            >
              {/* Exercise counter */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {exercises.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i < exerciseIdx ? 'bg-[#58cc02]' : i === exerciseIdx ? 'bg-[#1cb0f6]' : 'bg-[#e5e5e5] dark:bg-[#2a3f4a]'
                    }`}
                  />
                ))}
              </div>

              <div className="bg-white dark:bg-[#1a2c34] rounded-2xl p-6 border-2 border-[#e5e5e5] dark:border-[#2a3f4a]">
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
              className="py-12 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
                className="text-7xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-extrabold text-[#3c3c3c] dark:text-white mb-2">
                Lesson Complete!
              </h2>
              <p className="text-lg text-[#777] dark:text-[#aaa] mb-2">
                Great work on "{lesson.title}"
              </p>
              <p className="text-sm text-[#777] dark:text-[#aaa] mb-6">
                {correctCount}/{totalExercises} exercises correct
              </p>

              <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="xp-badge text-lg px-4 py-2"
                >
                  +{lesson.xp} XP
                </motion.div>
                {user.progress.streak > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="streak-badge"
                  >
                    🔥 {user.progress.streak} days
                  </motion.div>
                )}
              </div>

              <button onClick={handleBackToPath} className="btn-primary text-lg px-10 py-4">
                CONTINUE →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
