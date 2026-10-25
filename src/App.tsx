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

// Secret corner click detector - NO VISUAL FEEDBACK
// Pattern: bottom-right → top-right → top-left → bottom-left
const CORNER_THRESHOLD = 120; // pixels from edge

function SecretCornerListener() {
  const { unlockAdmin, adminUnlocked } = useStore();
  const [sequence, setSequence] = useState<number[]>([]);
  
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
        if (sequence.length > 0) setSequence([]);
        return;
      }
      
      const nextExpected = CORNER_SEQUENCE[sequence.length];
      if (corner === nextExpected) {
        const newSequence = [...sequence, corner];
        setSequence(newSequence);
        
        if (newSequence.length === CORNER_SEQUENCE.length) {
          unlockAdmin();
          setSequence([]);
        }
      } else {
        setSequence(corner === CORNER_SEQUENCE[0] ? [corner] : []);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [sequence, getCorner, unlockAdmin, adminUnlocked]);

  return null; // No visual feedback at all
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
