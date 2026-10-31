import type React from "react";
import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react';
import { useStore } from './store';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import KonamiListener from './components/KonamiListener';
import CommandPalette from './components/CommandPalette';
import ShortcutsHelp from './components/ShortcutsHelp';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

// Route-level code splitting: heavy / rarely-visited views load on demand
const Settings = lazy(() => import('./components/Settings'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Songs = lazy(() => import('./components/Songs'));
const Banner = lazy(() => import('./components/Banner'));
const Analytics = lazy(() => import('./components/Analytics'));
const AnimationDemo = lazy(() => import('./components/AnimationDemo'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const CookiePolicy = lazy(() => import('./components/CookiePolicy'));
const ToneCoachView = lazy(() => import('./components/ToneCoachView'));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-spin inline-block">🎵</div>
        <p className="text-text-secondary">Loading…</p>
      </div>
    </div>
  );
}

// Secret corner click detector - NO VISUAL FEEDBACK
const CORNER_THRESHOLD = 120;

function SecretCornerListener() {
  const { unlockAdmin, adminUnlocked } = useStore();
  const sequenceRef = useRef<number[]>([]);

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
      const corner = getCorner(e.clientX, e.clientY);
      if (corner === null) {
        sequenceRef.current = [];
        return;
      }
      
      const nextExpected = CORNER_SEQUENCE[sequenceRef.current.length];
      if (corner === nextExpected) {
        sequenceRef.current = [...sequenceRef.current, corner];
        
        if (sequenceRef.current.length === CORNER_SEQUENCE.length) {
          if (!adminUnlocked) {
            unlockAdmin();
          }
          sequenceRef.current = [];
        }
      } else {
        sequenceRef.current = corner === CORNER_SEQUENCE[0] ? [corner] : [];
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [getCorner, unlockAdmin, adminUnlocked]);

  return null;
}

function AppShell() {
  const { user, currentView } = useStore();

  // Global keyboard shortcuts: ? help, m dark mode, n next lesson, etc.
  useKeyboardShortcuts();

  if (!user) return <><Login /><KonamiListener /><SecretCornerListener /></>;
  if (!user.onboarded) return <><Onboarding /><KonamiListener /><SecretCornerListener /></>;

  // Force song selection after onboarding
  if (!user.songsSelected) return <><Songs /><SecretCornerListener /></>;

  let page: React.ReactNode;
  switch (currentView) {
    case 'lesson':
      page = <LessonView />; break;
    case 'settings':
      page = <Settings />; break;
    case 'songs':
      page = <Songs />; break;
    case 'leaderboard':
      page = <Leaderboard />; break;
    case 'banner':
      page = <Banner />; break;
    case 'analytics':
      page = <Analytics />; break;
    case 'animations':
      page = <AnimationDemo />; break;
    case 'privacy':
      page = <PrivacyPolicy />; break;
    case 'terms':
      page = <TermsOfService />; break;
    case 'cookies':
      page = <CookiePolicy />; break;
    case 'tone-coach':
      page = <ToneCoachView />; break;
    default:
      page = <Dashboard />;
  }

  return (
    <>
      {page}
      <KonamiListener />
      <SecretCornerListener />
      {/* Command palette (Cmd/Ctrl+K) + shortcut help overlay (?) */}
      <CommandPalette />
      <ShortcutsHelp />
    </>
  );
}

function App() {
  const { darkMode, adminUnlocked, currentView } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (adminUnlocked && currentView === 'admin') {
    return (
      <Suspense fallback={<PageFallback />}>
        <AdminPanel />
        <SecretCornerListener />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageFallback />}>
      <AppShell />
    </Suspense>
  );
}

export default App;
