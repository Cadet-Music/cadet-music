import { useState } from 'react';
import { motion } from 'framer-motion';

interface DynamicsPracticeExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const DYNAMICS = [
  { symbol: 'ppp', name: 'Pianississimo', volume: 10, description: 'Very very soft' },
  { symbol: 'pp', name: 'Pianissimo', volume: 20, description: 'Very soft' },
  { symbol: 'p', name: 'Piano', volume: 35, description: 'Soft' },
  { symbol: 'mp', name: 'Mezzo Piano', volume: 50, description: 'Medium soft' },
  { symbol: 'mf', name: 'Mezzo Forte', volume: 65, description: 'Medium loud' },
  { symbol: 'f', name: 'Forte', volume: 80, description: 'Loud' },
  { symbol: 'ff', name: 'Fortissimo', volume: 90, description: 'Very loud' },
  { symbol: 'fff', name: 'Fortississimo', volume: 100, description: 'Very very loud' },
];

export default function DynamicsPracticeExercise({ onComplete }: DynamicsPracticeExerciseProps) {
  const [currentDynamic, setCurrentDynamic] = useState(getRandomDynamic());
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [mode, setMode] = useState<'symbol-to-name' | 'name-to-symbol'>('symbol-to-name');

  function getRandomDynamic() {
    return DYNAMICS[Math.floor(Math.random() * DYNAMICS.length)];
  }

  function handleAnswer(answer: string) {
    setUserAnswer(answer);
    const correct = mode === 'symbol-to-name' 
      ? answer === currentDynamic.name
      : answer === currentDynamic.symbol;
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
    
    setTimeout(() => {
      setCurrentDynamic(getRandomDynamic());
      setUserAnswer(null);
      setIsCorrect(null);
    }, 1500);
  }

  function toggleMode() {
    setMode(mode === 'symbol-to-name' ? 'name-to-symbol' : 'symbol-to-name');
    setCurrentDynamic(getRandomDynamic());
    setUserAnswer(null);
    setIsCorrect(null);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🔊 Dynamics Practice
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleMode}
          className="w-full btn-secondary text-sm"
        >
          Switch to {mode === 'symbol-to-name' ? 'Name → Symbol' : 'Symbol → Name'}
        </motion.button>
      </div>

      {/* Question */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-6 mb-6 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          {mode === 'symbol-to-name' ? 'What is the name of this dynamic?' : 'What is the symbol for this dynamic?'}
        </div>
        <div className="text-4xl font-bold text-[#c9a84c] mb-2 italic">
          {mode === 'symbol-to-name' ? currentDynamic.symbol : currentDynamic.name}
        </div>
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
          {currentDynamic.description}
        </div>
      </div>

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {(mode === 'symbol-to-name' ? DYNAMICS.map(d => d.name) : DYNAMICS.map(d => d.symbol)).map((answer, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(answer)}
            disabled={userAnswer !== null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              userAnswer === answer
                ? isCorrect
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#c44536] text-white'
                : (mode === 'symbol-to-name' ? currentDynamic.name : currentDynamic.symbol) === answer && userAnswer !== null
                ? 'bg-[#3a8a5c] text-white'
                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white hover:bg-[#c9a84c] hover:text-[#1a2332]'
            }`}
          >
            {answer}
          </motion.button>
        ))}
      </div>

      {/* Visual volume indicator */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-4">
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-2">Volume level:</div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Soft</div>
          <div className="flex-1 h-4 bg-[#e8e8e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3a8a5c] to-[#c44536]"
              initial={{ width: 0 }}
              animate={{ width: `${currentDynamic.volume}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Loud</div>
        </div>
      </div>

      {/* Feedback */}
      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-3 rounded-lg ${
            isCorrect ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' : 'bg-[#c44536]/10 text-[#c44536]'
          }`}
        >
          {isCorrect ? '✓ Correct!' : `✗ That was ${mode === 'symbol-to-name' ? currentDynamic.name : currentDynamic.symbol}`}
        </motion.div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Piano = soft, Forte = loud, Mezzo = medium
      </div>
    </div>
  );
}
