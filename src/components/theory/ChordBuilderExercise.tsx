import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChordBuilderExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const CHORDS = [
  { name: 'C Major', notes: ['C', 'E', 'G'], type: 'major' },
  { name: 'G Major', notes: ['G', 'B', 'D'], type: 'major' },
  { name: 'F Major', notes: ['F', 'A', 'C'], type: 'major' },
  { name: 'D Major', notes: ['D', 'F#', 'A'], type: 'major' },
  { name: 'A Minor', notes: ['A', 'C', 'E'], type: 'minor' },
  { name: 'E Minor', notes: ['E', 'G', 'B'], type: 'minor' },
  { name: 'D Minor', notes: ['D', 'F', 'A'], type: 'minor' },
];

const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function ChordBuilderExercise({ onComplete }: ChordBuilderExerciseProps) {
  const [targetChord, setTargetChord] = useState(getRandomChord());
  const [userNotes, setUserNotes] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function getRandomChord() {
    return CHORDS[Math.floor(Math.random() * CHORDS.length)];
  }

  function addNote(note: string) {
    if (userNotes.length >= 3) return;
    if (userNotes.includes(note)) return;
    setUserNotes([...userNotes, note]);
  }

  function removeNote(index: number) {
    setUserNotes(userNotes.filter((_, i) => i !== index));
  }

  function resetChord() {
    setUserNotes([]);
    setIsCorrect(null);
  }

  function checkChord() {
    // Check if the notes match (order doesn't matter)
    const targetNotes = [...targetChord.notes].sort();
    const userNotesSorted = [...userNotes].sort();
    const correct = JSON.stringify(targetNotes) === JSON.stringify(userNotesSorted);
    
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
  }

  function nextChord() {
    setTargetChord(getRandomChord());
    setUserNotes([]);
    setIsCorrect(null);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🎼 Chord Builder
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Target chord */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-4 mb-6">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">Build this chord:</div>
        <div className="text-2xl font-bold text-[#c9a84c] mb-2">{targetChord.name}</div>
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
          Type: {targetChord.type === 'major' ? 'Major (happy sound)' : 'Minor (sad sound)'}
        </div>
      </div>

      {/* Note selection */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-[#1a2332] dark:text-white mb-2">Select 3 notes:</div>
        <div className="grid grid-cols-6 gap-2">
          {ALL_NOTES.map(note => (
            <motion.button
              key={note}
              onClick={() => addNote(note)}
              disabled={userNotes.length >= 3 || userNotes.includes(note) || isCorrect !== null}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 rounded-lg bg-[#e8e8e8] dark:bg-[#2a3545] text-[#1a2332] dark:text-white font-bold text-sm hover:bg-[#c9a84c] hover:text-[#1a2332] disabled:opacity-50"
            >
              {note}
            </motion.button>
          ))}
        </div>
      </div>

      {/* User's chord */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-6">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">Your chord ({userNotes.length}/3):</div>
        <div className="flex flex-wrap gap-2">
          {userNotes.map((note, index) => (
            <motion.button
              key={index}
              onClick={() => removeNote(index)}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-3 rounded-lg font-bold text-lg ${
                isCorrect !== null
                  ? targetChord.notes.includes(note)
                    ? 'bg-[#3a8a5c] text-white'
                    : 'bg-[#c44536] text-white'
                  : 'bg-[#c9a84c] text-[#1a2332]'
              }`}
            >
              {note}
            </motion.button>
          ))}
          {userNotes.length === 0 && (
            <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">Click notes above to build the chord</div>
          )}
        </div>
      </div>

      {/* Chord visualization */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-6">
        <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-2">Chord structure:</div>
        <div className="flex items-center justify-center gap-4">
          {userNotes.length === 3 && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c9a84c]">{userNotes[0]}</div>
                <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Root</div>
              </div>
              <div className="text-2xl text-[#5a6577] dark:text-[#9aa3b0]">+</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c9a84c]">{userNotes[1]}</div>
                <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">3rd</div>
              </div>
              <div className="text-2xl text-[#5a6577] dark:text-[#9aa3b0]">+</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#c9a84c]">{userNotes[2]}</div>
                <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">5th</div>
              </div>
            </>
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
              onClick={resetChord}
              className="flex-1 btn-secondary"
              disabled={userNotes.length === 0}
            >
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={checkChord}
              className="flex-1 btn-accent"
              disabled={userNotes.length !== 3}
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
              ? '✓ Perfect chord!' 
              : `✗ Correct answer: ${targetChord.notes.join(' - ')}`
            }
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextChord}
            className="w-full btn-primary"
          >
            Next Chord
          </motion.button>
        </div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Major chord: Root + Major 3rd + Perfect 5th | Minor chord: Root + Minor 3rd + Perfect 5th
      </div>
    </div>
  );
}
