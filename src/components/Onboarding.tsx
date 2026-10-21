import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

interface QuizQuestion {
  id: number;
  question: string;
  emoji: string;
  options: string[];
  correct: number;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How many lines are on a music staff?',
    emoji: '📜',
    options: ['3', '4', '5', '6'],
    correct: 2,
  },
  {
    id: 2,
    question: 'Which note gets 1 beat in 4/4 time?',
    emoji: '♩',
    options: ['Whole note', 'Half note', 'Quarter note', 'Eighth note'],
    correct: 2,
  },
  {
    id: 3,
    question: 'What does "forte" (f) mean?',
    emoji: '🔊',
    options: ['Soft', 'Loud', 'Fast', 'Slow'],
    correct: 1,
  },
  {
    id: 4,
    question: 'Which clef does saxophone use?',
    emoji: '🎼',
    options: ['Bass clef', 'Alto clef', 'Treble clef', 'Tenor clef'],
    correct: 2,
  },
  {
    id: 5,
    question: 'How many sharps are in G major?',
    emoji: '♯',
    options: ['0', '1', '2', '3'],
    correct: 1,
  },
];

export default function Onboarding() {
  const { setOnboarded, setTheoryLevel, setInstrumentLevel, user } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
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
        setShowResult(true);
        setFinished(true);
      }
    }, 800);
  };

  const getRecommendedLevel = () => {
    if (score >= 4) return { theory: 2, instrument: 1, label: 'Advanced Beginner', desc: 'You know your stuff! Starting at Level 1.' };
    if (score >= 2) return { theory: 1, instrument: 0, label: 'Beginner', desc: 'Some knowledge detected. Starting with fundamentals.' };
    return { theory: 0, instrument: 0, label: 'Complete Beginner', desc: 'No worries! We\'ll start from the very beginning.' };
  };

  const handleComplete = () => {
    const rec = getRecommendedLevel();
    setTheoryLevel(rec.theory);
    setInstrumentLevel(rec.instrument);
    setOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#131f24] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {!finished ? (
          <div className="bg-white dark:bg-[#1a2c34] rounded-2xl p-6 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#3c3c3c] dark:text-white">
                Placement Check
              </h2>
              <span className="text-sm font-bold text-[#777] dark:text-[#aaa]">
                {currentQ + 1}/{QUESTIONS.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar mb-8">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <span className="text-5xl mb-4 block">{QUESTIONS[currentQ].emoji}</span>
                  <p className="text-xl font-bold text-[#3c3c3c] dark:text-white">
                    {QUESTIONS[currentQ].question}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3">
                  {QUESTIONS[currentQ].options.map((opt, idx) => {
                    let btnClass = 'border-2 border-[#e5e5e5] dark:border-[#2a3f4a] bg-white dark:bg-[#131f24]';
                    if (selected !== null) {
                      if (idx === QUESTIONS[currentQ].correct) {
                        btnClass = 'border-2 border-[#58cc02] bg-[#58cc02]/10';
                      } else if (idx === selected && idx !== QUESTIONS[currentQ].correct) {
                        btnClass = 'border-2 border-[#ff4b4b] bg-[#ff4b4b]/10';
                      }
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`p-4 rounded-xl text-left font-semibold text-lg transition-all ${btnClass} text-[#3c3c3c] dark:text-white hover:border-[#1cb0f6]`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2c34] rounded-2xl p-8 shadow-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-6xl mb-4"
            >
              {score >= 4 ? '🌟' : score >= 2 ? '👍' : '🌱'}
            </motion.div>
            
            <h2 className="text-2xl font-bold text-[#3c3c3c] dark:text-white mb-2">
              {getRecommendedLevel().label}
            </h2>
            <p className="text-[#777] dark:text-[#aaa] mb-4">
              You got {score}/{QUESTIONS.length} correct
            </p>
            <p className="text-lg text-[#3c3c3c] dark:text-white mb-8">
              {getRecommendedLevel().desc}
            </p>

            <button
              onClick={handleComplete}
              className="btn-primary text-lg px-12 py-4"
            >
              LET'S GO! 🎷
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
