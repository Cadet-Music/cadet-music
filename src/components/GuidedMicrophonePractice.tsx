import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AudioManager, getAudioManager } from '../audioManager';
import WaveformVisualizer from './WaveformVisualizer';

interface GuidedMicrophonePracticeProps {
  targetNotes: string[];
  exerciseName: string;
  onComplete?: () => void;
}

export default function GuidedMicrophonePractice({
  targetNotes,
  exerciseName,
  onComplete,
}: GuidedMicrophonePracticeProps) {
  const [audioManager] = useState<AudioManager>(() => getAudioManager());
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isMicReady, setIsMicReady] = useState(false);
  const [completedNotes, setCompletedNotes] = useState<boolean[]>(new Array(targetNotes.length).fill(false));

  useEffect(() => {
    // Request microphone access on mount
    const setupMicrophone = async () => {
      const success = await audioManager.requestMicrophoneAccess();
      setIsMicReady(success);
    };

    setupMicrophone();

    return () => {
      audioManager.cleanup();
    };
  }, [audioManager]);

  const startListening = async () => {
    if (!isMicReady) {
      const success = await audioManager.requestMicrophoneAccess();
      if (!success) {
        alert('Microphone access is required for this exercise. Please allow microphone access and try again.');
        return;
      }
      setIsMicReady(true);
    }

    audioManager.startListening();
    setIsListening(true);
  };

  const stopListening = () => {
    audioManager.stopListening();
    setIsListening(false);
  };

  const markNoteComplete = () => {
    const newCompleted = [...completedNotes];
    newCompleted[currentNoteIndex] = true;
    setCompletedNotes(newCompleted);

    if (currentNoteIndex < targetNotes.length - 1) {
      setCurrentNoteIndex(currentNoteIndex + 1);
    } else {
      // All notes completed!
      stopListening();
      onComplete?.();
    }
  };

  const resetExercise = () => {
    setCurrentNoteIndex(0);
    setCompletedNotes(new Array(targetNotes.length).fill(false));
  };

  const progress = (completedNotes.filter(Boolean).length / targetNotes.length) * 100;

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-lg p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#1a2332] dark:text-white mb-2">
          🎤 {exerciseName}
        </h3>
        <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
          Play the notes shown below. Use the waveform visualizer to check your sound, then mark each note as complete when you've played it correctly.
        </p>
        {!isMicReady && (
          <p className="text-xs text-[#c44536] mt-2">
            ⚠️ Microphone access required. Click "Start Practice" to enable.
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-1">
          <span>Progress</span>
          <span>{completedNotes.filter(Boolean).length} / {targetNotes.length}</span>
        </div>
        <div className="h-2 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#3a8a5c]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Note Sequence */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {targetNotes.map((note, index) => {
            const isCurrent = index === currentNoteIndex;
            const isCompleted = completedNotes[index];
            
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold
                  border-2 transition-all
                  ${isCompleted 
                    ? 'bg-[#3a8a5c]/20 border-[#3a8a5c] text-[#3a8a5c]' 
                    : isCurrent
                      ? 'bg-[#c9a84c]/20 border-[#c9a84c] text-[#c9a84c] animate-pulse'
                      : 'bg-[#e2e4e8] dark:bg-[#2a3545] border-[#c8c8c8] dark:border-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                  }
                `}
              >
                {note}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Waveform Visualizer */}
      <div className="mb-6">
        <WaveformVisualizer
          audioManager={audioManager}
          isActive={isListening}
          height={80}
        />
        <p className="text-xs text-center text-[#5a6577] dark:text-[#9aa3b0] mt-2">
          {isListening ? '🎵 Playing - watch the waveform!' : 'Click "Start Practice" to begin'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isListening ? (
          <motion.button
            onClick={startListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 btn-primary"
          >
            🎤 Start Practice
          </motion.button>
        ) : (
          <>
            <motion.button
              onClick={markNoteComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 btn-primary"
            >
              ✓ Next Note
            </motion.button>
            <motion.button
              onClick={stopListening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              ⏸️ Stop
            </motion.button>
          </>
        )}
        
        <motion.button
          onClick={resetExercise}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary"
        >
          🔄 Reset
        </motion.button>
      </div>

      {/* Completion Message */}
      {completedNotes.every(Boolean) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center p-4 bg-[#3a8a5c]/10 border border-[#3a8a5c] rounded-lg"
        >
          <div className="text-3xl mb-2">🎉</div>
          <div className="text-lg font-bold text-[#3a8a5c] mb-1">
            Exercise Complete!
          </div>
          <div className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
            Great job! You played all the notes.
          </div>
        </motion.div>
      )}
    </div>
  );
}
