import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Instrument = 'alto' | 'tenor' | 'baritone' | 'soprano';
export type LessonStatus = 'locked' | 'available' | 'completed';
export type LessonType = 'theory' | 'playing' | 'rhythm' | 'exam';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  emoji: string;
  topic: string;
  xp: number;
  description: string;
  interactive: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  level: number;
  accuracy: number;
  stickers: string[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  instrument: Instrument;
  progress: UserProgress;
  activeSongs: string[];
  theoryLevel: number;
  instrumentLevel: number;
  onboarded: boolean;
}

interface AppState {
  user: User | null;
  darkMode: boolean;
  currentView: 'login' | 'onboarding' | 'dashboard' | 'lesson' | 'settings' | 'leaderboard';
  currentLessonId: string | null;
  lessonComplete: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (username: string) => void;
  logout: () => void;
  setDarkMode: (dark: boolean) => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  setInstrument: (instrument: Instrument) => void;
  setActiveSongs: (songs: string[]) => void;
  setOnboarded: (val: boolean) => void;
  setTheoryLevel: (level: number) => void;
  setInstrumentLevel: (level: number) => void;
  addSticker: (sticker: string) => void;
  updateStreak: () => void;
  resetAll: () => void;
}

const AVATARS = ['🎵', '🎶', '🎷', '🎼', '🎹', '🥁', '🎺', '🎸', '🎻', '🪗', '🎤', '🎧'];

const defaultUser = (username: string): User => ({
  id: crypto.randomUUID(),
  username,
  avatar: '🎵',
  instrument: 'alto',
  progress: {
    completedLessons: [],
    xp: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    level: 0,
    accuracy: 0,
    stickers: [],
  },
  activeSongs: [],
  theoryLevel: 0,
  instrumentLevel: 0,
  onboarded: false,
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      darkMode: false,
      currentView: 'login',
      currentLessonId: null,
      lessonComplete: false,

      setUser: (user) => set({ user }),
      
      login: (username) => {
        const user = defaultUser(username);
        set({ user, currentView: 'onboarding' });
      },
      
      logout: () => set({ user: null, currentView: 'login' }),
      
      setDarkMode: (dark) => {
        set({ darkMode: dark });
        if (dark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      setCurrentView: (view) => set({ currentView: view }),
      
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId, lessonComplete: false }),
      
      completeLesson: (lessonId, xp) => {
        const user = get().user;
        if (!user) return;
        
        const alreadyCompleted = user.progress.completedLessons.includes(lessonId);
        const newCompleted = alreadyCompleted 
          ? user.progress.completedLessons 
          : [...user.progress.completedLessons, lessonId];
        const newXp = alreadyCompleted ? user.progress.xp : user.progress.xp + xp;
        const newLevel = Math.floor(newXp / 100);
        
        // Check for stickers
        const newStickers = [...user.progress.stickers];
        if (newCompleted.length >= 5 && !newStickers.includes('first-5')) newStickers.push('first-5');
        if (newCompleted.length >= 20 && !newStickers.includes('dedicated')) newStickers.push('dedicated');
        if (newXp >= 500 && !newStickers.includes('xp-500')) newStickers.push('xp-500');
        if (newXp >= 1000 && !newStickers.includes('xp-1000')) newStickers.push('xp-1000');
        if (user.progress.streak >= 7 && !newStickers.includes('week-streak')) newStickers.push('week-streak');
        
        set({
          user: {
            ...user,
            progress: {
              ...user.progress,
              completedLessons: newCompleted,
              xp: newXp,
              level: newLevel,
              stickers: newStickers,
              lastActiveDate: new Date().toISOString().split('T')[0],
            },
          },
          lessonComplete: true,
        });
      },
      
      setInstrument: (instrument) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, instrument } });
      },
      
      setActiveSongs: (songs) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, activeSongs: songs } });
      },
      
      setOnboarded: (val) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, onboarded: val }, currentView: 'dashboard' });
      },
      
      setTheoryLevel: (level) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, theoryLevel: level } });
      },
      
      setInstrumentLevel: (level) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, instrumentLevel: level } });
      },
      
      addSticker: (sticker) => {
        const user = get().user;
        if (!user) return;
        if (user.progress.stickers.includes(sticker)) return;
        set({ user: { ...user, progress: { ...user.progress, stickers: [...user.progress.stickers, sticker] } } });
      },
      
      updateStreak: () => {
        const user = get().user;
        if (!user) return;
        const today = new Date().toISOString().split('T')[0];
        const lastActive = user.progress.lastActiveDate;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        let newStreak = user.progress.streak;
        if (lastActive === today) return; // Already counted today
        if (lastActive === yesterday) {
          newStreak += 1;
        } else if (lastActive !== today) {
          newStreak = 1;
        }
        
        set({
          user: {
            ...user,
            progress: { ...user.progress, streak: newStreak, lastActiveDate: today },
          },
        });
      },
      
      resetAll: () => {
        localStorage.clear();
        set({ user: null, currentView: 'login', darkMode: false });
        document.documentElement.classList.remove('dark');
      },
    }),
    {
      name: 'cadet-music-storage',
    }
  )
);

export { AVATARS };
