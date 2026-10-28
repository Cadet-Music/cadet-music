import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimeSignatureExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const TIME_SIGNATURES = [
  { signature: '4/4', beats: 4, noteValue: 'quarter', name: 'Common Time', description: '4 quarter notes per measure' },
  { signature: '3/4', beats: 3, noteValue: 'quarter', name: 'Waltz Time', description: '3 quarter notes per measure' },
  { signature: '2/4', beats: 2, noteValue: 'quarter', name: 'March Time', description: '2 quarter notes per measure' },
  { signature: '6/8', beats: 6, noteValue: 'eighth', name: 'Compound Duple', description: '6 eighth notes per measure' },
  { signature: '9/8', beats: 9, noteValue: 'eighth', name: 'Compound Triple', description: '9 eighth notes per measure' },
  { signature: '12/8', beats: 12, noteValue: 'eighth', name: 'Compound Quadruple', description: '12 eighth notes per measure' },
];

export default function TimeSignatureExercise({ onComplete }: TimeSignatureExerciseProps) {
  const [currentTimeSig, setCurrentTimeSig] = useState(getRandomTimeSig());
  const [questionType, setQuestionType] = useState<'identify' | 'count'>('identify');
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function getRandomTimeSig() {
    return TIME_SIGNATURES[Math.floor(Math.random() * TIME_SIGNATURES.length)];
  }

  function handleAnswer(answer: string) {
    setUserAnswer(answer);
    let correct = false;
    
    if (questionType === 'identify') {
      correct = answer === currentTimeSig.signature;
    } else {
      correct = parseInt(answer) === currentTimeSig.beats;
    }
    
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
    
    setTimeout(() => {
      setCurrentTimeSig(getRandomTimeSig());
      setUserAnswer(null);
      setIsCorrect(null);
      setQuestionType(Math.random() > 0.5 ? 'identify' : 'count');
    }, 1500);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        ⏱️ Time Signature Practice
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Question */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-6 mb-6 text-center">
        {questionType === 'identify' ? (
          <>
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
              This time signature has {currentTimeSig.beats} {currentTimeSig.noteValue} notes per measure.
            </div>
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
              What is the time signature?
            </div>
            <div className="text-5xl font-bold text-[#c9a84c] mb-2">
              ?
            </div>
            <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
              {currentTimeSig.description}
            </div>
          </>
        ) : (
          <>
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
              Time signature:
            </div>
            <div className="text-5xl font-bold text-[#c9a84c] mb-2">
              {currentTimeSig.signature}
            </div>
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
              How many beats per measure?
            </div>
            <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
              {currentTimeSig.name}
            </div>
          </>
        )}
      </div>

      {/* Answer buttons */}
      {questionType === 'identify' ? (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {TIME_SIGNATURES.map(timeSig => (
            <motion.button
              key={timeSig.signature}
              onClick={() => handleAnswer(timeSig.signature)}
              disabled={userAnswer !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-3 px-4 rounded-lg font-bold text-lg transition-all ${
                userAnswer === timeSig.signature
                  ? isCorrect
                    ? 'bg-[#3a8a5c] text-white'
                    : 'bg-[#c44536] text-white'
                  : currentTimeSig.signature === timeSig.signature && userAnswer !== null
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white hover:bg-[#c9a84c] hover:text-[#1a2332]'
              }`}
            >
              {timeSig.signature}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[2, 3, 4, 6, 9, 12].map(beats => (
            <motion.button
              key={beats}
              onClick={() => handleAnswer(beats.toString())}
              disabled={userAnswer !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`py-3 px-4 rounded-lg font-bold text-lg transition-all ${
                userAnswer === beats.toString()
                  ? isCorrect
                    ? 'bg-[#3a8a5c] text-white'
                    : 'bg-[#c44536] text-white'
                  : currentTimeSig.beats === beats && userAnswer !== null
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white hover:bg-[#c9a84c] hover:text-[#1a2332]'
              }`}
            >
              {beats}
            </motion.button>
          ))}
        </div>
      )}

      {/* Visual representation */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-4">
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-2">Beats in this measure:</div>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: currentTimeSig.beats }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                i === 0 ? 'bg-[#c9a84c] text-[#1a2332]' : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white'
              }`}
            >
              {i + 1}
            </motion.div>
          ))}
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
          {isCorrect ? '✓ Correct!' : `✗ The answer was ${questionType === 'identify' ? currentTimeSig.signature : currentTimeSig.beats}`}
        </motion.div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Top number = beats per measure | Bottom number = note value (4 = quarter, 8 = eighth)
      </div>
    </div>
  );
}
