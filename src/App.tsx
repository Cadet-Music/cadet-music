import { useEffect, useState, useCallback } from 'react';
import { useStore } from './store';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import Settings from './components/Settings';
import Leaderboard from './components/Leaderboard';
import AdminPanel from './components/AdminPanel';
import Songs from './components/Songs';
import Banner from './components/Banner';
import KonamiListener from './components/KonamiListener';

// Secret corner click detector - NO VISUAL FEEDBACK
const CORNER_THRESHOLD = 120;

function SecretCornerListener() {
  const { unlockAdmin, adminUnlocked, resetAll, setCurrentView } = useStore();
  const [sequence, setSequence] = useState<number[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const CORNER_SEQUENCE = [0, 1, 2, 3];

  const getCorner = useCallback((x: number, y: number): number | null => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const isRight = x > w - CORNER_THRESHOLD;
    const isLeft = x < CORNER_THRESHOLD;
    const isTop = y < CORNER_THRESHOLD;
    const isBottom = y > h - CORNER_THRESHOLD;
    
    if (isRight && isBottom) return 0;
    if (isRight && isTop) return 1;
    if (isLeft && isTop) return 2;
    if (isLeft && isBottom) return 3;
    
    return null;
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // If reset dialog is showing, ignore corner clicks
      if (showResetConfirm) return;
      
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
          if (adminUnlocked) {
            // Already in admin mode, show reset option
            setShowResetConfirm(true);
          } else {
            // First time, unlock admin
            unlockAdmin();
          }
          setSequence([]);
        }
      } else {
        setSequence(corner === CORNER_SEQUENCE[0] ? [corner] : []);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [sequence, getCorner, unlockAdmin, adminUnlocked, showResetConfirm]);

  const handleReset = () => {
    resetAll();
    setShowResetConfirm(false);
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <>
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2332] rounded-xl p-6 max-w-md w-full border-2 border-[#c44536]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#c44536]/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c44536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a2332] dark:text-white">Reset All Data?</h3>
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-[#c44536]/5 border border-[#c44536]/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                <span className="font-semibold text-[#c44536]">Warning:</span> This will delete:
              </p>
              <ul className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2 space-y-1">
                <li>• All user accounts</li>
                <li>• All progress and XP</li>
                <li>• All stickers and achievements</li>
                <li>• All song selections</li>
                <li>• All banner customizations</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelReset}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 btn-danger"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const { user, currentView, darkMode, adminUnlocked } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (adminUnlocked && currentView === 'admin') {
    return <><AdminPanel /><SecretCornerListener /></>;
  }

  if (!user) return <><Login /><KonamiListener /><SecretCornerListener /></>;
  if (!user.onboarded) return <><Onboarding /><KonamiListener /><SecretCornerListener /></>;
  
  // Force song selection after onboarding
  if (!user.songsSelected) return <><Songs /><SecretCornerListener /></>;
  
  switch (currentView) {
    case 'lesson':
      return <><LessonView /><KonamiListener /><SecretCornerListener /></>;
    case 'settings':
      return <><Settings /><KonamiListener /><SecretCornerListener /></>;
    case 'songs':
      return <><Songs /><KonamiListener /><SecretCornerListener /></>;
    case 'leaderboard':
      return <><Leaderboard /><KonamiListener /><SecretCornerListener /></>;
    case 'banner':
      return <><Banner /><KonamiListener /><SecretCornerListener /></>;
    default:
      return <><Dashboard /><KonamiListener /><SecretCornerListener /></>;
  }
}

export default App;
