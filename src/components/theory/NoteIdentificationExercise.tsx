import { useState } from 'react';
import { motion } from 'framer-motion';

interface NoteIdentificationExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const NOTES_ON_LINES = ['E', 'G', 'B', 'D', 'F']; // bottom to top
const NOTES_IN_SPACES = ['F', 'A', 'C', 'E']; // bottom to top

export default function NoteIdentificationExercise({ onComplete }: NoteIdentificationExerciseProps) {
  const [currentNote, setCurrentNote] = useState(generateRandomNote());
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function generateRandomNote() {
    const isOnLine = Math.random() > 0.5;
    if (isOnLine) {
      const lineIndex = Math.floor(Math.random() * 5);
      return { name: NOTES_ON_LINES[lineIndex], position: lineIndex * 2, isOnLine: true };
    } else {
      const spaceIndex = Math.floor(Math.random() * 4);
      return { name: NOTES_IN_SPACES[spaceIndex], position: spaceIndex * 2 + 1, isOnLine: false };
    }
  }

  function handleAnswer(note: string) {
    setUserAnswer(note);
    const correct = note === currentNote.name;
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    
    setTimeout(() => {
      setCurrentNote(generateRandomNote());
      setUserAnswer(null);
      setIsCorrect(null);
    }, 1500);
  }

  const allNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🎼 Note Identification Challenge
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Staff with note */}
      <div className="relative h-40 bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg mb-6 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 300 160">
          {/* Staff lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="20"
              y1={40 + i * 20}
              x2="280"
              y2={40 + i * 20}
              stroke="#1a2332"
              strokeWidth="2"
            />
          ))}
          
          {/* Treble clef */}
          <text x="30" y="100" fontSize="60" fill="#1a2332">𝄞</text>
          
          {/* Note */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <ellipse
              cx="150"
              cy={40 + currentNote.position * 10}
              rx="8"
              ry="6"
              fill="#1a2332"
              transform={`rotate(-20 150 ${40 + currentNote.position * 10})`}
            />
            <line
              x1="158"
              y1={40 + currentNote.position * 10}
              x2="158"
              y2={40 + currentNote.position * 10 - 35}
              stroke="#1a2332"
              strokeWidth="2"
            />
          </motion.g>
        </svg>
      </div>

      {/* Answer buttons */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {allNotes.map(note => (
          <motion.button
            key={note}
            onClick={() => handleAnswer(note)}
            disabled={userAnswer !== null}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-3 rounded-lg font-bold text-lg transition-all ${
              userAnswer === note
                ? isCorrect
                  ? 'bg-[#3a8a5c] text-white'
                  : 'bg-[#c44536] text-white'
                : currentNote.name === note && userAnswer !== null
                ? 'bg-[#3a8a5c] text-white'
                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white hover:bg-[#c9a84c] hover:text-[#1a2332]'
            }`}
          >
            {note}
          </motion.button>
        ))}
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
          {isCorrect ? '✓ Correct!' : `✗ That was ${currentNote.name}`}
        </motion.div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Remember: Lines = E-G-B-D-F (Every Good Boy Does Fine) | Spaces = F-A-C-E
      </div>
    </div>
  );
}
