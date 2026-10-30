import { useState } from 'react';
import { motion } from 'framer-motion';

interface ScaleBuilderExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const SCALES = {
  'C Major': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'], pattern: 'W-W-H-W-W-W-H' },
  'G Major': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'], pattern: 'W-W-H-W-W-W-H' },
  'F Major': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'], pattern: 'W-W-H-W-W-W-H' },
  'D Major': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'], pattern: 'W-W-H-W-W-W-H' },
  'Bb Major': { notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'], pattern: 'W-W-H-W-W-W-H' },
};

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function ScaleBuilderExercise({ onComplete }: ScaleBuilderExerciseProps) {
  const [targetScale, setTargetScale] = useState(getRandomScale());
  const [userNotes, setUserNotes] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function getRandomScale() {
    const scales = Object.keys(SCALES);
    return scales[Math.floor(Math.random() * scales.length)];
  }

  function addNote(note: string) {
    if (userNotes.length >= 8) return;
    setUserNotes([...userNotes, note]);
  }

  function removeNote(index: number) {
    setUserNotes(userNotes.filter((_, i) => i !== index));
  }

  function resetScale() {
    setUserNotes([]);
    setIsCorrect(null);
  }

  function checkScale() {
    const target = SCALES[targetScale as keyof typeof SCALES];
    const correct = JSON.stringify(userNotes) === JSON.stringify(target.notes);
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
  }

  function nextScale() {
    setTargetScale(getRandomScale());
    setUserNotes([]);
    setIsCorrect(null);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🎼 Scale Builder
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Target scale */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-4 mb-6">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">Build this scale:</div>
        <div className="text-2xl font-bold text-[#c9a84c] mb-2">{targetScale}</div>
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
          Pattern: {SCALES[targetScale as keyof typeof SCALES].pattern}
        </div>
      </div>

      {/* Note selection */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">Select notes:</div>
        <div className="grid grid-cols-6 gap-2">
          {ALL_NOTES.map(note => (
            <motion.button
              key={note}
              onClick={() => addNote(note)}
              disabled={userNotes.length >= 8 || isCorrect !== null}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 rounded-lg bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white font-bold text-sm hover:bg-[#c9a84c] hover:text-[#1a2332] disabled:opacity-50"
            >
              {note}
            </motion.button>
          ))}
        </div>
      </div>

      {/* User's scale */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-6">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">Your scale ({userNotes.length}/8):</div>
        <div className="flex flex-wrap gap-2">
          {userNotes.map((note, index) => (
            <motion.button
              key={index}
              onClick={() => removeNote(index)}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-lg font-bold ${
                isCorrect !== null
                  ? note === SCALES[targetScale as keyof typeof SCALES].notes[index]
                    ? 'bg-[#3a8a5c] text-white'
                    : 'bg-[#c44536] text-white'
                  : 'bg-[#c9a84c] text-[#1a2332]'
              }`}
            >
              {note}
            </motion.button>
          ))}
          {userNotes.length === 0 && (
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">Click notes above to build the scale</div>
          )}
        </div>
      </div>

      {/* Controls */}
      {isCorrect === null ? (
        <div className="space-y-3">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetScale}
              className="flex-1 btn-secondary"
              disabled={userNotes.length === 0}
            >
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={checkScale}
              className="flex-1 btn-accent"
              disabled={userNotes.length !== 8}
            >
              Check
            </motion.button>
          </div>
        </div>
      ) : (
        <div>
          <div className={`text-center p-3 rounded-lg mb-4 ${
            isCorrect ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' : 'bg-[#c44536]/10 text-[#c44536]'
          }`}>
            {isCorrect 
              ? '✓ Perfect scale!' 
              : `✗ Correct answer: ${SCALES[targetScale as keyof typeof SCALES].notes.join(' - ')}`
            }
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextScale}
            className="w-full btn-primary"
          >
            Next Scale
          </motion.button>
        </div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Major scale pattern: Whole-Whole-Half-Whole-Whole-Whole-Half
      </div>
    </div>
  );
}
