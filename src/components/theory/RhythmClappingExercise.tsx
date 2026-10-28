import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RhythmClappingExerciseProps {
  onComplete?: (correct: boolean) => void;
}

const RHYTHM_PATTERNS = [
  { name: 'Quarter Notes', pattern: [1, 1, 1, 1], timeSignature: '4/4' },
  { name: 'Eighth Notes', pattern: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], timeSignature: '4/4' },
  { name: 'Mixed', pattern: [1, 0.5, 0.5, 1, 1], timeSignature: '4/4' },
  { name: 'Waltz', pattern: [1, 1, 1], timeSignature: '3/4' },
  { name: 'Syncopated', pattern: [0.5, 0.5, 1, 0.5, 0.5, 1], timeSignature: '4/4' },
];

export default function RhythmClappingExercise({ onComplete }: RhythmClappingExerciseProps) {
  const [currentPattern, setCurrentPattern] = useState(RHYTHM_PATTERNS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [userClaps, setUserClaps] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [tempo, setTempo] = useState(80); // BPM

  useEffect(() => {
    if (!isPlaying) return;

    const beatDuration = 60000 / tempo; // ms per beat
    let totalDuration = 0;
    const timeouts: number[] = [];

    currentPattern.pattern.forEach((beat, index) => {
      const timeout = setTimeout(() => {
        setCurrentBeat(index);
      }, totalDuration);
      timeouts.push(timeout);
      totalDuration += beat * beatDuration;
    });

    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      setCurrentBeat(-1);
      checkRhythm();
    }, totalDuration);
    timeouts.push(endTimeout);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isPlaying, currentPattern, tempo]);

  function getRandomPattern() {
    const index = Math.floor(Math.random() * RHYTHM_PATTERNS.length);
    return RHYTHM_PATTERNS[index];
  }

  function startPlayback() {
    setIsPlaying(true);
    setUserClaps([]);
    setIsCorrect(null);
  }

  function handleClap() {
    if (!isPlaying) return;
    
    const now = Date.now();
    setUserClaps(prev => [...prev, now]);
  }

  function checkRhythm() {
    // Simple check: count number of claps vs expected beats
    const expectedBeats = currentPattern.pattern.length;
    const actualClaps = userClaps.length;
    
    // Allow for some tolerance (±1 clap)
    const correct = Math.abs(actualClaps - expectedBeats) <= 1;
    
    setIsCorrect(correct);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    onComplete?.(correct);
  }

  function nextPattern() {
    setCurrentPattern(getRandomPattern());
    setUserClaps([]);
    setIsCorrect(null);
  }

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-4">
        🥁 Rhythm Clapping Exercise
      </h3>
      
      <div className="mb-4 text-center">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
          Score: {score.correct}/{score.total}
        </div>
      </div>

      {/* Pattern info */}
      <div className="bg-[#c9a84c]/10 border border-[#c9a84c] rounded-lg p-4 mb-6">
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-1">Pattern:</div>
        <div className="text-2xl font-bold text-[#c9a84c] mb-2">{currentPattern.name}</div>
        <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
          Time: {currentPattern.timeSignature} | Tempo: {tempo} BPM
        </div>
      </div>

      {/* Visual rhythm */}
      <div className="bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-2">
          {currentPattern.pattern.map((beat, index) => (
            <motion.div
              key={index}
              animate={{
                scale: currentBeat === index ? 1.3 : 1,
                backgroundColor: currentBeat === index ? '#c9a84c' : '#e8e8e8',
              }}
              transition={{ duration: 0.1 }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                beat === 1 ? 'bg-[#1a2332] dark:bg-white' : 'bg-[#5a6577] dark:bg-[#9aa3b0]'
              }`}
            >
              <div className="text-white dark:text-[#1a2332] font-bold">
                {beat === 1 ? '♩' : '♪'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#1a2332] dark:text-white mb-2">
          Tempo: {tempo} BPM
        </label>
        <input
          type="range"
          min="60"
          max="120"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          disabled={isPlaying}
          className="w-full"
        />
      </div>

      {/* Clap button */}
      {!isPlaying && isCorrect === null && (
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startPlayback}
            className="w-full btn-accent"
          >
            ▶ Start Pattern
          </motion.button>
          <div className="text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
            Listen to the pattern, then clap along!
          </div>
        </div>
      )}

      {isPlaying && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClap}
          className="w-full py-8 bg-[#c44536] text-white rounded-lg font-bold text-xl active:bg-[#a33628]"
        >
          👏 CLAP!
        </motion.button>
      )}

      {/* Result */}
      {isCorrect !== null && !isPlaying && (
        <div>
          <div className={`text-center p-3 rounded-lg mb-4 ${
            isCorrect ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' : 'bg-[#c44536]/10 text-[#c44536]'
          }`}>
            {isCorrect 
              ? '✓ Great rhythm!' 
              : `✗ Expected ${currentPattern.pattern.length} claps, you clapped ${userClaps.length} times.`
            }
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextPattern}
            className="w-full btn-primary"
          >
            Next Pattern
          </motion.button>
        </div>
      )}

      {/* Hint */}
      <div className="mt-4 text-xs text-[#5a6577] dark:text-[#9aa3b0] text-center">
        💡 Listen carefully to the rhythm, then clap along with the same pattern!
      </div>
    </div>
  );
}
