import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import Settings from './components/Settings';
import Leaderboard from './components/Leaderboard';
import AdminPanel from './components/AdminPanel';
import KonamiListener from './components/KonamiListener';

// Secret corner click detector
// Pattern: bottom-right → top-right → top-left → bottom-left
const CORNER_THRESHOLD = 120; // pixels from edge

function SecretCornerListener() {
  const { unlockAdmin, adminUnlocked } = useStore();
  const [sequence, setSequence] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  const CORNER_SEQUENCE = [0, 1, 2, 3]; // BR, TR, TL, BL

  const getCorner = useCallback((x: number, y: number): number | null => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const isRight = x > w - CORNER_THRESHOLD;
    const isLeft = x < CORNER_THRESHOLD;
    const isTop = y < CORNER_THRESHOLD;
    const isBottom = y > h - CORNER_THRESHOLD;
    
    if (isRight && isBottom) return 0; // bottom-right
    if (isRight && isTop) return 1;    // top-right
    if (isLeft && isTop) return 2;     // top-left
    if (isLeft && isBottom) return 3;  // bottom-left
    
    return null;
  }, []);

  useEffect(() => {
    if (adminUnlocked) return;
    
    const handleClick = (e: MouseEvent) => {
      const corner = getCorner(e.clientX, e.clientY);
      if (corner === null) {
        // Reset if click is not in a corner
        if (sequence.length > 0) setSequence([]);
        return;
      }
      
      const nextExpected = CORNER_SEQUENCE[sequence.length];
      if (corner === nextExpected) {
        const newSequence = [...sequence, corner];
        setSequence(newSequence);
        
        if (newSequence.length === CORNER_SEQUENCE.length) {
          // Secret unlocked!
          unlockAdmin();
          setSequence([]);
        }
      } else {
        // Wrong corner, reset
        setSequence(corner === CORNER_SEQUENCE[0] ? [corner] : []);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [sequence, getCorner, unlockAdmin, adminUnlocked]);

  // Show subtle hint after 3 correct corners
  useEffect(() => {
    if (sequence.length === 3) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [sequence.length]);

  if (adminUnlocked) return null;

  return (
    <>
      {/* Progress indicators for corners */}
      {sequence.length > 0 && (
        <div className="fixed top-4 right-4 z-[9999] flex gap-1">
          {CORNER_SEQUENCE.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i < sequence.length 
                  ? 'bg-[#c9a84c] scale-125' 
                  : 'bg-[#5a6577]/30'
              }`}
            />
          ))}
        </div>
      )}
      
      {/* Hint flash */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[#1a2332] text-[#c9a84c] text-xs font-medium px-4 py-2 rounded-lg shadow-lg"
          >
            One more corner...
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const { user, currentView, darkMode, setDarkMode, adminUnlocked } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Admin panel takes priority
  if (adminUnlocked && currentView === 'admin') {
    return <><AdminPanel /><SecretCornerListener /></>;
  }

  if (!user) return <><Login /><KonamiListener /><SecretCornerListener /></>;
  if (!user.onboarded) return <><Onboarding /><KonamiListener /><SecretCornerListener /></>;
  
  switch (currentView) {
    case 'lesson':
      return <><LessonView /><KonamiListener /><SecretCornerListener /></>;
    case 'settings':
      return <><Settings /><KonamiListener /><SecretCornerListener /></>;
    case 'leaderboard':
      return <><Leaderboard /><KonamiListener /><SecretCornerListener /></>;
    default:
      return <><Dashboard /><KonamiListener /><SecretCornerListener /></>;
  }
}

export default App;
