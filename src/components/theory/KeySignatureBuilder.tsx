import { useState } from 'react';
import { motion } from 'framer-motion';

interface KeySignatureBuilderProps {
  onComplete?: (correct: boolean) => void;
}

const KEY_SIGNATURES = {
  'C Major': { sharps: 0, flats: 0 },
  'G Major': { sharps: 1, flats: 0 },
  'D Major': { sharps: 2, flats: 0 },
  'A Major': { sharps: 3, flats: 0 },
  'E Major': { sharps: 4, flats: 0 },
  'F Major': { sharps: 0, flats: 1 },
  'Bb Major': { sharps: 0, flats: 2 },
  'Eb Major': { sharps: 0, flats: 3 },
  'Ab Major': { sharps: 0, flats: 4 },
};

export default function KeySignatureBuilder({ onComplete }: KeySignatureBuilderProps) {
  const [targetKey, setTargetKey] = useState(getRandomKey());
  const [userSharps, setUserSharps] = useState(0);
  const [userFlats, setUserFlats] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function getRandomKey() {
    const keys = Object.keys(KEY_SIGNATURES);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function checkAnswer() {
    const target = KEY_SIGNATURES[targetKey as keyof typeof KEY_SIGNATURES];
    const correct = userSharps === target.sharps && userFlats === target.flats;
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
  }

  function nextQuestion() {
    setTargetKey(getRandomKey());
    setUserSharps(0);
    setUserFlats(0);
    setIsCorrect(null);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🔑 Key Signature Builder
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Target key */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-4 mb-6 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">Build the key signature for:</div>
        <div className="text-2xl font-bold text-[#c9a84c]">{targetKey}</div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Sharps */}
        <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4">
          <div className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">Sharps (♯)</div>
          <div className="flex items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setUserSharps(Math.max(0, userSharps - 1))}
              className="w-10 h-10 rounded-lg bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white font-bold"
            >
              -
            </motion.button>
            <div className="text-3xl font-bold text-[#1a2332] dark:text-white w-12 text-center">
              {userSharps}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setUserSharps(Math.min(7, userSharps + 1))}
              className="w-10 h-10 rounded-lg bg-[#c9a84c] text-[#1a2332] font-bold"
            >
              +
            </motion.button>
          </div>
        </div>

        {/* Flats */}
        <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4">
          <div className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">Flats (♭)</div>
          <div className="flex items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setUserFlats(Math.max(0, userFlats - 1))}
              className="w-10 h-10 rounded-lg bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white font-bold"
            >
              -
            </motion.button>
            <div className="text-3xl font-bold text-[#1a2332] dark:text-white w-12 text-center">
              {userFlats}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setUserFlats(Math.min(7, userFlats + 1))}
              className="w-10 h-10 rounded-lg bg-[#c9a84c] text-[#1a2332] font-bold"
            >
              +
            </motion.button>
          </div>
        </div>
      </div>

      {/* Visual representation */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-6">
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-2">Your answer:</div>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: userSharps }).map((_, i) => (
            <span key={`sharp-${i}`} className="text-2xl">♯</span>
          ))}
          {Array.from({ length: userFlats }).map((_, i) => (
            <span key={`flat-${i}`} className="text-2xl">♭</span>
          ))}
          {userSharps === 0 && userFlats === 0 && (
            <span className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">No accidentals (C Major)</span>
          )}
        </div>
      </div>

      {/* Check button */}
      {isCorrect === null ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={checkAnswer}
          className="w-full btn-accent"
        >
          Check Answer
        </motion.button>
      ) : (
        <div>
          <div className={`text-center p-3 rounded-lg mb-4 ${
            isCorrect ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' : 'bg-[#c44536]/10 text-[#c44536]'
          }`}>
            {isCorrect ? '✓ Correct!' : `✗ Incorrect. ${targetKey} has ${KEY_SIGNATURES[targetKey as keyof typeof KEY_SIGNATURES].sharps} sharps and ${KEY_SIGNATURES[targetKey as keyof typeof KEY_SIGNATURES].flats} flats.`}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            className="w-full btn-primary"
          >
            Next Question
          </motion.button>
        </div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Sharps: F-C-G-D-A-E-B | Flats: B-E-A-D-G-C-F (reverse order)
      </div>
    </div>
  );
}
