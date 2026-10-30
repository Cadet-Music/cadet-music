import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CadetLevel, LEVEL_INFO } from './data';
import { ConceptStats, Concept, recordCorrectAnswer, recordIncorrectAnswer, initializeConceptMastery } from './competency';

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
  requiredLevel?: number;
}

export interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  level: number;
  accuracy: number;
  stickers: string[];
  goalsCompleted: number;
  conceptMastery: Record<string, ConceptStats>;
}

export interface BannerSticker {
  id: string;
  x: number;
  y: number;
  rotation: number;
}

export interface User {
  id: string;
  username: string;
  rank: string;
  lastName: string;
  email: string;
  avatar: string;
  instrument: Instrument;
  instrumentId: string; // Full instrument ID (e.g., "alto-sax", "tenor-sax")
  progress: UserProgress;
  activeSongs: string[];
  theoryLevel: CadetLevel;
  instrumentLevel: CadetLevel;
  onboarded: boolean;
  songsSelected: boolean;
  bannerBg: string;
  bannerStickers: BannerSticker[];
}

export type ViewType = 'login' | 'onboarding' | 'dashboard' | 'lesson' | 'settings' | 'songs' | 'leaderboard' | 'admin' | 'banner' | 'analytics' | 'animations' | 'privacy' | 'terms' | 'cookies';

interface AppState {
  user: User | null;
  darkMode: boolean;
  currentView: ViewType;
  currentLessonId: string | null;
  lessonComplete: boolean;
  adminUnlocked: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (data: { username: string; rank?: string; lastName?: string; email?: string }) => void;
  unlockAdmin: () => void;
  lockAdmin: () => void;
  logout: () => void;
  setDarkMode: (dark: boolean) => void;
  setCurrentView: (view: ViewType) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  setInstrument: (instrument: Instrument) => void;
  setActiveSongs: (songs: string[]) => void;
  setSongsSelected: (val: boolean) => void;
  setOnboarded: (val: boolean) => void;
  setTheoryLevel: (level: CadetLevel) => void;
  setInstrumentLevel: (level: CadetLevel) => void;
  addSticker: (sticker: string) => void;
  updateStreak: () => void;
  setBannerBg: (bg: string) => void;
  addBannerSticker: (sticker: BannerSticker) => void;
  removeBannerSticker: (id: string) => void;
  updateBannerSticker: (id: string, updates: Partial<BannerSticker>) => void;
  resetAll: () => void;
  
  // Competency tracking
  recordCorrectAnswer: (concept: Concept) => void;
  recordIncorrectAnswer: (concept: Concept) => void;
}

const BANNER_BGS = [
  'linear-gradient(135deg, #1a2332 0%, #2d3a4a 100%)',
  'linear-gradient(135deg, #c9a84c 0%, #a68a3a 100%)',
  'linear-gradient(135deg, #3a8a5c 0%, #2d6d48 100%)',
  'linear-gradient(135deg, #4a7c8a 0%, #2d5a66 100%)',
  'linear-gradient(135deg, #c44536 0%, #a33628 100%)',
  'linear-gradient(135deg, #6b4c8a 0%, #4a3566 100%)',
];

export const STICKER_DEFS: Record<string, { name: string; icon: string }> = {
  'first-5': { name: 'First Steps', icon: '⭐' },
  'dedicated': { name: 'Dedicated', icon: '🏅' },
  'xp-500': { name: '500 XP', icon: '💫' },
  'xp-1000': { name: '1000 XP', icon: '✨' },
  'week-streak': { name: 'Week Streak', icon: '🔥' },
  'month-streak': { name: 'Month Streak', icon: '💎' },
  'theory-master': { name: 'Theory Master', icon: '📚' },
  'level-5': { name: 'Level 5', icon: '🎯' },
};

const defaultUser = (data: { username: string; rank?: string; lastName?: string; email?: string }): User => ({
  id: crypto.randomUUID(),
  username: data.username,
  rank: data.rank || '',
  lastName: data.lastName || '',
  email: data.email || '',
  avatar: '🎵',
  instrument: 'alto',
  instrumentId: 'alto-sax',
  progress: {
    completedLessons: [],
    xp: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    level: 0,
    accuracy: 0,
    stickers: [],
    goalsCompleted: 0,
    conceptMastery: {},
  },
  activeSongs: [],
  theoryLevel: 'BASIC',
  instrumentLevel: 'BASIC',
  onboarded: false,
  songsSelected: false,
  bannerBg: BANNER_BGS[0],
  bannerStickers: [],
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      darkMode: false,
      currentView: 'login',
      currentLessonId: null,
      lessonComplete: false,
      adminUnlocked: false,
      
      setUser: (user) => set({ user }),
      
      login: (data) => {
        const user = defaultUser(data);
        set({ user, currentView: 'onboarding' });
      },

      unlockAdmin: () => set({ adminUnlocked: true, currentView: 'admin' }),
      lockAdmin: () => set({ adminUnlocked: false, currentView: 'dashboard' }),
      
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
        const newGoalsCompleted = alreadyCompleted ? user.progress.goalsCompleted : user.progress.goalsCompleted + 1;
        
        const newStickers = [...user.progress.stickers];
        if (newCompleted.length >= 5 && !newStickers.includes('first-5')) newStickers.push('first-5');
        if (newCompleted.length >= 20 && !newStickers.includes('dedicated')) newStickers.push('dedicated');
        if (newXp >= 500 && !newStickers.includes('xp-500')) newStickers.push('xp-500');
        if (newXp >= 1000 && !newStickers.includes('xp-1000')) newStickers.push('xp-1000');
        if (user.progress.streak >= 7 && !newStickers.includes('week-streak')) newStickers.push('week-streak');
        if (user.progress.streak >= 30 && !newStickers.includes('month-streak')) newStickers.push('month-streak');
        if (LEVEL_INFO[user.theoryLevel].number >= 3 && !newStickers.includes('theory-master')) newStickers.push('theory-master');
        if (newLevel >= 5 && !newStickers.includes('level-5')) newStickers.push('level-5');
        
        set({
          user: {
            ...user,
            progress: {
              ...user.progress,
              completedLessons: newCompleted,
              xp: newXp,
              level: newLevel,
              stickers: newStickers,
              goalsCompleted: newGoalsCompleted,
              lastActiveDate: new Date().toISOString().split('T')[0],
            },
          },
          lessonComplete: true,
        });
      },
      
      setInstrument: (instrument) => {
        const user = get().user;
        if (!user) return;
        
        // Map instrument type to full instrument ID
        const instrumentIdMap: Record<string, string> = {
          'alto': 'alto-sax',
          'tenor': 'tenor-sax',
          'baritone': 'baritone-sax',
          'soprano': 'soprano-sax',
        };
        
        const instrumentId = instrumentIdMap[instrument] || 'alto-sax';
        
        set({ user: { ...user, instrument, instrumentId } });
      },
      
      setActiveSongs: (songs) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, activeSongs: songs, songsSelected: songs.length > 0 } });
      },

      setSongsSelected: (val) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, songsSelected: val } });
      },
      
      setOnboarded: (val) => {
        const user = get().user;
        if (!user) return;
        // Force song selection after onboarding
        set({ user: { ...user, onboarded: val }, currentView: val ? 'songs' : 'dashboard' });
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
        if (lastActive === today) return;
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

      setBannerBg: (bg) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, bannerBg: bg } });
      },

      addBannerSticker: (sticker) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, bannerStickers: [...user.bannerStickers, sticker] } });
      },

      removeBannerSticker: (id) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, bannerStickers: user.bannerStickers.filter(s => s.id !== id) } });
      },

      updateBannerSticker: (id, updates) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, bannerStickers: user.bannerStickers.map(s => s.id === id ? { ...s, ...updates } : s) } });
      },
      
      // Competency tracking actions
      recordCorrectAnswer: (concept) => {
        const user = get().user;
        if (!user) return;
        
        const updatedMastery = recordCorrectAnswer(user.progress.conceptMastery, concept);
        
        set({
          user: {
            ...user,
            progress: {
              ...user.progress,
              conceptMastery: updatedMastery,
            },
          },
        });
      },
      
      recordIncorrectAnswer: (concept) => {
        const user = get().user;
        if (!user) return;
        
        const updatedMastery = recordIncorrectAnswer(user.progress.conceptMastery, concept);
        
        set({
          user: {
            ...user,
            progress: {
              ...user.progress,
              conceptMastery: updatedMastery,
            },
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
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Migration from version 0 to 1: Add conceptMastery
        if (version < 1 && persistedState.user?.progress) {
          persistedState.user.progress.conceptMastery = initializeConceptMastery(
            persistedState.user.progress.conceptMastery
          );
        }
        return persistedState;
      },
    }
  )
);

export { BANNER_BGS };
