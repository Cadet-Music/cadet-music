import { useState } from 'react';
import { motion } from 'framer-motion';

interface IntervalRecognitionExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const INTERVALS = [
  { name: 'Minor 2nd', semitones: 1, example: 'Jaws theme' },
  { name: 'Major 2nd', semitones: 2, example: 'Happy Birthday' },
  { name: 'Minor 3rd', semitones: 3, example: 'Greensleeves' },
  { name: 'Major 3rd', semitones: 4, example: 'When the Saints Go Marching In' },
  { name: 'Perfect 4th', semitones: 5, example: 'Here Comes the Bride' },
  { name: 'Tritone', semitones: 6, example: 'The Simpsons' },
  { name: 'Perfect 5th', semitones: 7, example: 'Star Wars' },
  { name: 'Minor 6th', semitones: 8, example: 'The Entertainer' },
  { name: 'Major 6th', semitones: 9, example: 'My Bonnie Lies Over the Ocean' },
  { name: 'Octave', semitones: 12, example: 'Somewhere Over the Rainbow' },
];

export default function IntervalRecognitionExercise({ onComplete }: IntervalRecognitionExerciseProps) {
  const [currentInterval, setCurrentInterval] = useState(getRandomInterval());
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  function getRandomInterval() {
    return INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  }

  function handleAnswer(intervalName: string) {
    setUserAnswer(intervalName);
    const correct = intervalName === currentInterval.name;
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
    
    setTimeout(() => {
      setCurrentInterval(getRandomInterval());
      setUserAnswer(null);
      setIsCorrect(null);
      setShowHint(false);
    }, 2000);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🎵 Interval Recognition
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Interval display */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-6 mb-6 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">Listen to this interval:</div>
        <div className="text-3xl mb-4">🎵 → 🎵</div>
        <div className="text-lg font-bold text-[#c9a84c] mb-2">
          {currentInterval.semitones} semitone{currentInterval.semitones !== 1 ? 's' : ''} apart
        </div>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2"
          >
            💡 Hint: Sounds like "{currentInterval.example}"
          </motion.div>
        )}
      </div>

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {INTERVALS.map(interval => (
          <motion.button
            key={interval.name}
            onClick={() => handleAnswer(interval.name)}
            disabled={userAnswer !== null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
              userAnswer === interval.name
                ? isCorrect
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#c44536] text-white'
                : currentInterval.name === interval.name && userAnswer !== null
                ? 'bg-[#3a8a5c] text-white'
                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white hover:bg-[#c9a84c] hover:text-[#1a2332]'
            }`}
          >
            {interval.name}
          </motion.button>
        ))}
      </div>

      {/* Show hint button */}
      {userAnswer === null && !showHint && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowHint(true)}
          className="w-full btn-secondary mb-4"
        >
          💡 Show Hint
        </motion.button>
      )}

      {/* Feedback */}
      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-3 rounded-lg ${
            isCorrect ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' : 'bg-[#c44536]/10 text-[#c44536]'
          }`}
        >
          {isCorrect ? '✓ Correct!' : `✗ That was ${currentInterval.name}`}
        </motion.div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Each interval has a distinctive sound. Use familiar songs to help you remember!
      </div>
    </div>
  );
}
