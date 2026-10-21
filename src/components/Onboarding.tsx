import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many lines are on a music staff?',
    options: ['3', '4', '5', '6'],
    correct: 2,
  },
  {
    id: 2,
    question: 'Which note gets 1 beat in 4/4 time?',
    options: ['Whole note', 'Half note', 'Quarter note', 'Eighth note'],
    correct: 2,
  },
  {
    id: 3,
    question: 'What does "forte" (f) mean?',
    options: ['Soft', 'Loud', 'Fast', 'Slow'],
    correct: 1,
  },
  {
    id: 4,
    question: 'Which clef does saxophone use?',
    options: ['Bass clef', 'Alto clef', 'Treble clef', 'Tenor clef'],
    correct: 2,
  },
  {
    id: 5,
    question: 'How many sharps are in G major?',
    options: ['0', '1', '2', '3'],
    correct: 1,
  },
];

export default function Onboarding() {
  const { setOnboarded, setTheoryLevel, setInstrumentLevel } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === QUESTIONS[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 600);
  };

  const getRecommendedLevel = () => {
    if (score >= 4) return { theory: 2, instrument: 1, label: 'Advanced Beginner', desc: 'You have solid fundamentals. Starting at Level 1.' };
    if (score >= 2) return { theory: 1, instrument: 0, label: 'Beginner', desc: 'Some knowledge detected. Starting with fundamentals.' };
    return { theory: 0, instrument: 0, label: 'Complete Beginner', desc: "No prior experience needed. We'll start from the beginning." };
  };

  const handleComplete = () => {
    const rec = getRecommendedLevel();
    setTheoryLevel(rec.theory);
    setInstrumentLevel(rec.instrument);
    setOnboarded(true);
  };

  const progress = ((currentQ + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f1720] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {!finished ? (
          <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#c8c8c8] dark:border-[#2a3545] p-6 shadow-sm">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide">
                  Placement Assessment
                </span>
                <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0]">
                  {currentQ + 1} of {QUESTIONS.length}
                </span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.h2 
              className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {QUESTIONS[currentQ].question}
            </motion.h2>

            <div className="space-y-2.5">
              {QUESTIONS[currentQ].options.map((option, idx) => {
                const isSelected = selected === idx;
                const isCorrect = idx === QUESTIONS[currentQ].correct;
                const showResult = selected !== null;

                let borderColor = 'border-[#c8c8c8] dark:border-[#2a3545]';
                let bgColor = '';
                let textColor = 'text-[#1a2332] dark:text-white';

                if (showResult) {
                  if (isCorrect) {
                    borderColor = 'border-[#3a8a5c]';
                    bgColor = 'bg-[#3a8a5c]/5 dark:bg-[#3a8a5c]/10';
                    textColor = 'text-[#3a8a5c]';
                  } else if (isSelected && !isCorrect) {
                    borderColor = 'border-[#c44536]';
                    bgColor = 'bg-[#c44536]/5 dark:bg-[#c44536]/10';
                    textColor = 'text-[#c44536]';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selected !== null}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={selected === null ? { scale: 1.02, x: 5 } : {}}
                    whileTap={selected === null ? { scale: 0.98 } : {}}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border ${borderColor} ${bgColor} transition-all ${
                      !showResult ? 'hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 dark:hover:bg-[#c9a84c]/10' : ''
                    } ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className={`text-sm font-medium ${textColor}`}>{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#e2e4e8] dark:border-[#2a3545] p-6 shadow-sm text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mb-2">
              Assessment Complete
            </h2>
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">
              Score: {score}/{QUESTIONS.length}
            </p>
            <p className="text-sm font-medium text-[#1a2332] dark:text-white mb-1">
              {getRecommendedLevel().label}
            </p>
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6">
              {getRecommendedLevel().desc}
            </p>

            <button
              onClick={handleComplete}
              className="btn-accent w-full py-3.5"
            >
              Continue
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
