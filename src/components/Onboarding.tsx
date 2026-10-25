import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: 'basic' | 'intermediate' | 'advanced';
}

const QUESTIONS: QuizQuestion[] = [
  { id: 1, question: 'How many lines are on a music staff?', options: ['3', '4', '5', '6'], correct: 2, category: 'basic' },
  { id: 2, question: 'Which note gets 1 beat in 4/4 time?', options: ['Whole note', 'Half note', 'Quarter note', 'Eighth note'], correct: 2, category: 'basic' },
  { id: 3, question: 'What does "forte" (f) mean?', options: ['Soft', 'Loud', 'Fast', 'Slow'], correct: 1, category: 'basic' },
  { id: 4, question: 'Which clef does saxophone use?', options: ['Bass clef', 'Alto clef', 'Treble clef', 'Tenor clef'], correct: 2, category: 'intermediate' },
  { id: 5, question: 'How many sharps are in G major?', options: ['0', '1', '2', '3'], correct: 1, category: 'intermediate' },
  { id: 6, question: 'What is the relative minor of C major?', options: ['A minor', 'D minor', 'E minor', 'G minor'], correct: 0, category: 'intermediate' },
  { id: 7, question: 'What is a dominant seventh chord built on?', options: ['1st degree', '3rd degree', '5th degree', '7th degree'], correct: 2, category: 'advanced' },
  { id: 8, question: 'In 6/8 time, how many beats are in a measure?', options: ['2 beats (compound duple)', '3 beats (compound triple)', '6 beats (simple)', '8 beats'], correct: 0, category: 'advanced' },
  { id: 9, question: 'What is the interval between C and G?', options: ['Major third', 'Perfect fourth', 'Perfect fifth', 'Major sixth'], correct: 2, category: 'advanced' },
  { id: 10, question: 'Which scale has a raised 7th degree when ascending?', options: ['Natural minor', 'Harmonic minor', 'Melodic minor', 'Dorian mode'], correct: 2, category: 'advanced' },
];

export default function Onboarding() {
  const { setOnboarded, setTheoryLevel, setInstrumentLevel } = useStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [step, setStep] = useState<'quiz' | 'result' | 'levels'>('quiz');
  const [theoryLevel, setLocalTheoryLevel] = useState(0);
  const [playingLevel, setLocalPlayingLevel] = useState(0);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === QUESTIONS[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        const rec = getRecommendedLevel();
        setLocalTheoryLevel(rec.theory);
        setLocalPlayingLevel(Math.min(rec.theory, rec.instrument));
        setStep('result');
      }
    }, 800);
  };

  const getRecommendedLevel = () => {
    if (score >= 8) return { theory: 3, instrument: 2, label: 'Advanced', desc: 'Strong theory foundation.' };
    if (score >= 6) return { theory: 2, instrument: 1, label: 'Intermediate', desc: 'Good understanding.' };
    if (score >= 3) return { theory: 1, instrument: 0, label: 'Beginner', desc: 'Some knowledge detected.' };
    return { theory: 0, instrument: 0, label: 'Complete Beginner', desc: "Starting from the beginning." };
  };

  const handleComplete = () => {
    setTheoryLevel(theoryLevel);
    setInstrumentLevel(playingLevel);
    setOnboarded(true);
  };

  const progress = ((currentQ + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {step === 'quiz' && (
          <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#c8c8c8] dark:border-[#2a3545] p-6 shadow-sm">
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

            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  QUESTIONS[currentQ].category === 'basic' 
                    ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]'
                    : QUESTIONS[currentQ].category === 'intermediate'
                      ? 'bg-[#c9a84c]/10 text-[#c9a84c]'
                      : 'bg-[#c44536]/10 text-[#c44536]'
                }`}>
                  {QUESTIONS[currentQ].category}
                </span>
              </div>
              
              <h2 className="text-lg font-semibold text-[#1a2332] dark:text-white mb-6">
                {QUESTIONS[currentQ].question}
              </h2>

              <div className="space-y-2.5">
                {QUESTIONS[currentQ].options.map((option, idx) => {
                  const isSelected = selected === idx;
                  const showResult = selected !== null;

                  let borderColor = 'border-[#c8c8c8] dark:border-[#2a3545]';
                  let bgColor = '';
                  let textColor = 'text-[#1a2332] dark:text-white';

                  if (showResult && isSelected) {
                    borderColor = 'border-[#c9a84c]';
                    bgColor = 'bg-[#c9a84c]/5 dark:bg-[#c9a84c]/10';
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

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-center"
                >
                  <div className="inline-block w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {step === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#c8c8c8] dark:border-[#2a3545] p-6 shadow-sm text-center"
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
            <p className="text-sm font-medium text-[#1a2332] dark:text-white mb-1">
              Recommended: {getRecommendedLevel().label}
            </p>
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6">
              {getRecommendedLevel().desc}
            </p>

            <button
              onClick={() => setStep('levels')}
              className="btn-accent w-full py-3.5"
            >
              Choose Levels
            </button>
          </motion.div>
        )}

        {step === 'levels' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#c8c8c8] dark:border-[#2a3545] p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white mb-2 text-center">
              Choose Your Levels
            </h2>
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-6 text-center">
              Playing level cannot exceed theory level.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-2">
                  Theory Level
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setLocalTheoryLevel(level);
                        if (playingLevel > level) setLocalPlayingLevel(level);
                      }}
                      className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                        theoryLevel === level
                          ? 'bg-[#c9a84c] text-[#1a2332]'
                          : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-2">
                  Playing Level
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map(level => {
                    const isDisabled = level > theoryLevel;
                    return (
                      <button
                        key={level}
                        onClick={() => !isDisabled && setLocalPlayingLevel(level)}
                        disabled={isDisabled}
                        className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                          playingLevel === level
                            ? 'bg-[#c9a84c] text-[#1a2332]'
                            : isDisabled
                              ? 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] opacity-40 cursor-not-allowed'
                              : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

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
