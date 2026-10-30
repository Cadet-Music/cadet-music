import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function KonamiListener() {
  const [activated, setActivated] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expectedKey = KONAMI_SEQUENCE[inputIndex];
      
      if (e.code === expectedKey) {
        const newIndex = inputIndex + 1;
        setInputIndex(newIndex);
        
        if (newIndex === KONAMI_SEQUENCE.length) {
          setActivated(true);
          setInputIndex(0);
          // Dispatch custom event for app-level handling
          window.dispatchEvent(new CustomEvent('konami-secret'));
        }
      } else {
        // Reset if wrong key
        setInputIndex(e.code === KONAMI_SEQUENCE[0] ? 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActivated(false)}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center p-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🎵
            </motion.div>
            <h2 className="text-4xl font-extrabold text-white mb-3">
              SECRET UNLOCKED! 🎉
            </h2>
            <p className="text-xl text-white/80 mb-2">
              You found the Konami Code!
            </p>
            <p className="text-white/60">
              You're a true music explorer 🎷✨
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {['🎵', '🎶', '🎷', '🎼', '🎹'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="text-4xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-8">
              Tap anywhere to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
