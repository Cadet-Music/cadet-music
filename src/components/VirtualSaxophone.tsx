/**
 * Virtual Saxophone Engine
 * 
 * Interactive saxophone component for hands-on learning.
 * Supports multiple learning modes:
 * - Build Note: User presses keys to match displayed note
 * - Identify Note: User identifies note from fingering
 * - Scale Builder: User constructs scales
 * - Random Practice: System generates notes for practice
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instrument } from '../store';

// ============================================================
// SAXOPHONE FINGERING DATA
// ============================================================

/**
 * Saxophone key definitions
 * Each key has a unique ID and position
 */
export interface SaxKey {
  id: string;
  name: string;
  position: { x: number; y: number };
  hand: 'left' | 'right';
  finger: string;
}

/**
 * Note fingering map
 * Maps note names to required key presses
 */
export interface NoteFingering {
  note: string;
  octave: number;
  keys: string[]; // Array of key IDs that must be pressed
  alternative?: string[][]; // Alternative fingerings
}

/**
 * Alto Saxophone Keys (simplified representation)
 */
export const ALTO_SAX_KEYS: SaxKey[] = [
  // Left hand
  { id: 'lh1', name: 'Left 1 (B)', position: { x: 120, y: 100 }, hand: 'left', finger: 'Index' },
  { id: 'lh2', name: 'Left 2 (A)', position: { x: 120, y: 140 }, hand: 'left', finger: 'Middle' },
  { id: 'lh3', name: 'Left 3 (G)', position: { x: 120, y: 180 }, hand: 'left', finger: 'Ring' },
  { id: 'lh-side', name: 'Left Side (Bb)', position: { x: 90, y: 120 }, hand: 'left', finger: 'Side' },
  
  // Right hand
  { id: 'rh1', name: 'Right 1 (F)', position: { x: 120, y: 240 }, hand: 'right', finger: 'Index' },
  { id: 'rh2', name: 'Right 2 (E)', position: { x: 120, y: 280 }, hand: 'right', finger: 'Middle' },
  { id: 'rh3', name: 'Right 3 (D)', position: { x: 120, y: 320 }, hand: 'right', finger: 'Ring' },
  { id: 'rh-side', name: 'Right Side (C)', position: { x: 150, y: 260 }, hand: 'right', finger: 'Side' },
  
  // Octave key
  { id: 'octave', name: 'Octave Key', position: { x: 120, y: 60 }, hand: 'left', finger: 'Thumb' },
];

/**
 * Alto Saxophone Note Fingerings (simplified)
 * Concert pitch fingerings for common notes
 */
export const ALTO_SAX_FINGERINGS: NoteFingering[] = [
  // Low register
  { note: 'D', octave: 3, keys: ['rh3'] },
  { note: 'E', octave: 3, keys: ['rh2', 'rh3'] },
  { note: 'F', octave: 3, keys: ['rh1', 'rh2', 'rh3'] },
  { note: 'G', octave: 3, keys: ['lh3', 'rh1', 'rh2', 'rh3'] },
  { note: 'A', octave: 3, keys: ['lh2', 'lh3', 'rh1', 'rh2', 'rh3'] },
  { note: 'B', octave: 3, keys: ['lh1', 'lh2', 'lh3', 'rh1', 'rh2', 'rh3'] },
  
  // Middle register (with octave key)
  { note: 'C', octave: 4, keys: ['octave', 'rh1', 'rh2', 'rh3'] },
  { note: 'D', octave: 4, keys: ['octave', 'rh3'] },
  { note: 'E', octave: 4, keys: ['octave', 'rh2', 'rh3'] },
  { note: 'F', octave: 4, keys: ['octave', 'rh1', 'rh2', 'rh3'] },
  { note: 'G', octave: 4, keys: ['octave', 'lh3', 'rh1', 'rh2', 'rh3'] },
  { note: 'A', octave: 4, keys: ['octave', 'lh2', 'lh3', 'rh1', 'rh2', 'rh3'] },
  { note: 'B', octave: 4, keys: ['octave', 'lh1', 'lh2', 'lh3', 'rh1', 'rh2', 'rh3'] },
  
  // Altissimo (simplified)
  { note: 'C', octave: 5, keys: ['octave', 'lh1', 'rh1'] },
  { note: 'D', octave: 5, keys: ['octave', 'lh1', 'lh2'] },
];

// ============================================================
// LEARNING MODES
// ============================================================

export type SaxLearningMode = 
  | 'build-note'      // Display note, user presses keys
  | 'identify-note'   // Display fingering, user identifies note
  | 'scale-builder'   // User constructs scale
  | 'random-practice'; // System generates random notes

export interface SaxExercise {
  id: string;
  mode: SaxLearningMode;
  target?: string; // Note name or scale name
  difficulty: 'easy' | 'medium' | 'hard';
}

// ============================================================
// VIRTUAL SAXOPHONE COMPONENT
// ============================================================

interface VirtualSaxophoneProps {
  instrument: Instrument;
  mode: SaxLearningMode;
  targetNote?: string;
  showNoteName?: boolean;
  onKeyPress?: (keyId: string, pressed: boolean) => void;
  onComplete?: (correct: boolean) => void;
}

export default function VirtualSaxophone({
  instrument,
  mode,
  targetNote,
  showNoteName = true,
  onKeyPress,
  onComplete,
}: VirtualSaxophoneProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Get fingerings for current instrument
  const fingerings = instrument === 'alto' ? ALTO_SAX_FINGERINGS : ALTO_SAX_FINGERINGS;
  const keys = ALTO_SAX_KEYS;

  // Check if current fingering matches target
  useEffect(() => {
    if (!targetNote || pressedKeys.size === 0) return;

    const targetFingering = fingerings.find(f => 
      f.note === targetNote.split('')[0] && 
      f.octave === parseInt(targetNote.split('')[1] || '4')
    );

    if (!targetFingering) return;

    const requiredKeys = new Set(targetFingering.keys);
    const isCorrect = 
      pressedKeys.size === requiredKeys.size &&
      Array.from(pressedKeys).every(key => requiredKeys.has(key));

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        onComplete?.(true);
        setFeedback(null);
      }, 1000);
    } else if (pressedKeys.size >= requiredKeys.size) {
      setFeedback('incorrect');
      setTimeout(() => {
        onComplete?.(false);
        setFeedback(null);
        setPressedKeys(new Set());
      }, 1000);
    }
  }, [pressedKeys, targetNote, fingerings, onComplete]);

  const handleKeyPress = (keyId: string) => {
    const newPressed = new Set(pressedKeys);
    
    if (newPressed.has(keyId)) {
      newPressed.delete(keyId);
      onKeyPress?.(keyId, false);
    } else {
      newPressed.add(keyId);
      onKeyPress?.(keyId, true);
    }
    
    setPressedKeys(newPressed);
  };

  const resetKeys = () => {
    setPressedKeys(new Set());
    setFeedback(null);
  };

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-xl p-6 border border-[#c8c8c8] dark:border-[#2a3545]">
      {/* Target Display */}
      {targetNote && (
        <div className="text-center mb-6">
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-2">
            {mode === 'build-note' && 'Play this note:'}
            {mode === 'identify-note' && 'What note is this?'}
            {mode === 'scale-builder' && 'Build this scale:'}
            {mode === 'random-practice' && 'Play:'}
          </p>
          {showNoteName && (
            <motion.div
              key={targetNote}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-[#1a2332] dark:text-white"
            >
              {targetNote}
            </motion.div>
          )}
        </div>
      )}

      {/* Saxophone Visualization */}
      <div className="relative w-full h-96 bg-[#f5f5f5] dark:bg-[#0f1720] rounded-lg mb-4">
        <svg viewBox="0 0 240 400" className="w-full h-full">
          {/* Saxophone body outline */}
          <path
            d="M 120 40 Q 100 100 100 200 Q 100 300 120 360"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="3"
            opacity="0.3"
          />
          
          {/* Keys */}
          {keys.map((key) => {
            const isPressed = pressedKeys.has(key.id);
            const isRequired = targetNote && fingerings.find(f => 
              f.note === targetNote.split('')[0]
            )?.keys.includes(key.id);
            
            return (
              <motion.g
                key={key.id}
                onClick={() => handleKeyPress(key.id)}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <circle
                  cx={key.position.x}
                  cy={key.position.y}
                  r="15"
                  fill={isPressed ? '#c9a84c' : isRequired ? '#c9a84c30' : '#e8e8e8'}
                  stroke={isPressed ? '#a68a3a' : '#c8c8c8'}
                  strokeWidth="2"
                  className="dark:fill-[#2a3545] dark:stroke-[#5a6577]"
                />
                <text
                  x={key.position.x}
                  y={key.position.y + 5}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-[#1a2332] dark:fill-white pointer-events-none"
                >
                  {key.name.split(' ')[1] || key.name.split(' ')[0]}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-center py-3 rounded-lg mb-4 ${
            feedback === 'correct' 
              ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' 
              : 'bg-[#c44536]/10 text-[#c44536]'
          }`}
        >
          {feedback === 'correct' ? '✓ Correct!' : '✗ Try again'}
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={resetKeys}
          className="flex-1 btn-secondary"
        >
          Reset
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-[#5a6577] dark:text-[#9aa3b0]">
        {mode === 'build-note' && 'Click the keys to match the fingering for the target note.'}
        {mode === 'identify-note' && 'Look at the fingering and identify the note.'}
        {mode === 'scale-builder' && 'Build the scale by playing each note in sequence.'}
        {mode === 'random-practice' && 'Practice playing the displayed notes.'}
      </div>
    </div>
  );
}
