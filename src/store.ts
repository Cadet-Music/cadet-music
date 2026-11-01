import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CadetLevel, LEVEL_INFO } from './data';
import { ConceptStats, Concept, recordCorrectAnswer, recordIncorrectAnswer, initializeConceptMastery } from './competency';
import { DayRecord, ensureDayRecord, refreshQuestProgress, claimQuests as claimQuestsPure } from './quests';
import { PracticeLogEntry, makeEntry, computeFreezeBank } from './practiceLog';

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
  /** Daily practice goal in minutes (self-reported via the Practice Log) */
  dailyGoalMinutes: number;
  /** Earned by consistently hitting the daily goal; spendable to repair a broken streak */
  streakFreezes: number;
  /** Lifetime best streak */
  longestStreak: number;
  /** Set when updateStreak() repairs a gap using a freeze */
  lastFreezeUsedDate?: string;
}

/** Per-day activity counters + quest progress. Keyed by YYYY-MM-DD. */
export type ActivityHistory = Record<string, DayRecord>;

export interface BannerSticker {
  id: string;
  /** Sticker key from STICKER_DEFS. Optional on legacy placements (pre-migration data). */
  stickerId?: string;
  x: number;
  y: number;
  rotation: number;
  /** Relative scale multiplier (1 = default size) */
  scale?: number;
  zIndex?: number;
}

/** One anonymized-enough client telemetry record for the admin panel. */
export interface VisitorLogEntry {
  id: string;
  timestamp: string; // ISO datetime
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  userAgent: string;
  screen: string; // "WIDTHxHEIGHT" CSS px
  viewport: string; // innerWidth x innerHeight
  touch: boolean;
  platform: string;
  cores: number;
  memoryGB?: number;
  language: string;
  referrer: string;
  sessionStart: string;
}

/** Hard cap to stay well within the ~5 MB localStorage budget. */
export const MAX_VISITOR_LOGS = 100;

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

export type ViewType = 'login' | 'onboarding' | 'dashboard' | 'lesson' | 'settings' | 'songs' | 'leaderboard' | 'admin' | 'banner' | 'analytics' | 'animations' | 'privacy' | 'terms' | 'cookies' | 'tone-coach';

interface AppState {
  user: User | null;
  darkMode: boolean;
  currentView: ViewType;
  currentLessonId: string | null;
  lessonComplete: boolean;
  adminUnlocked: boolean;
  /** Day-keyed activity counters + daily quests */
  activity: ActivityHistory;
  /** Self-reported real-world practice sessions */
  practiceLog: PracticeLogEntry[];
  /** Client-side visitor telemetry (admin panel only) */
  visitorLogs: VisitorLogEntry[];

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
  useStreakFreeze: () => boolean;
  setBannerBg: (bg: string) => void;
  addBannerSticker: (sticker: BannerSticker) => void;
  removeBannerSticker: (id: string) => void;
  updateBannerSticker: (id: string, updates: Partial<BannerSticker>) => void;
  /** Append a visitor telemetry record (capped at MAX_VISITOR_LOGS entries) */
  logVisitorSession: (entry: VisitorLogEntry) => void;
  clearVisitorLogs: () => void;
  resetAll: () => void;

  // Daily goals & quests
  setDailyGoalMinutes: (minutes: number) => void;
  logPracticeSession: (minutes: number, focusConcepts: Concept[], notes?: string) => void;
  claimQuests: () => number;

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
    dailyGoalMinutes: 15,
    streakFreezes: 0,
    longestStreak: 0,
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
      activity: {},
      practiceLog: [],
      visitorLogs: [],

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
        
        // Daily activity tracking (drives practice quests)
        const today = new Date().toISOString().split('T')[0];
        const prevActivity = { ...get().activity };
        if (!alreadyCompleted) {
          const day = ensureDayRecord(prevActivity[today], today, user.progress.streak);
          prevActivity[today] = refreshQuestProgress({ ...day, lessonsCompleted: day.lessonsCompleted + 1 }, user.progress.streak);
        }

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
                    activity: prevActivity,
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
        let freezes = user.progress.streakFreezes ?? 0;
        let usedFreeze = false;
        if (lastActive === today) return;
        if (lastActive === yesterday) {
          newStreak += 1;
        } else {
          // Gap of 2+ days — try to repair with a banked Streak Freeze
          const gapDays = Math.round((new Date(today).getTime() - new Date(lastActive).getTime()) / 86400000);
          if (freezes > 0 && gapDays >= 2 && gapDays <= freezes + 1) {
            newStreak += 1; // streak continues, protected
            freezes -= 1;
            usedFreeze = true;
          } else {
            newStreak = 1;
          }
        }

        const longestStreak = Math.max(user.progress.longestStreak ?? 0, newStreak);
        const activity = { ...get().activity };
        activity[today] = refreshQuestProgress(ensureDayRecord(activity[today], today, newStreak), newStreak);

        set({
          activity,
          user: {
            ...user,
            progress: {
              ...user.progress,
              streak: newStreak,
              longestStreak,
              streakFreezes: freezes,
              lastActiveDate: today,
              ...(usedFreeze ? { lastFreezeUsedDate: today } : {}),
            },
          },
        });
      },

      useStreakFreeze: () => {
        const user = get().user;
        if (!user || (user.progress.streakFreezes ?? 0) <= 0) return false;
        const today = new Date().toISOString().split('T')[0];
        set({
          user: {
            ...user,
            progress: {
              ...user.progress,
              streakFreezes: user.progress.streakFreezes - 1,
              lastFreezeUsedDate: today,
            },
          },
        });
        return true;
      },

      // Daily goals & practice log
      setDailyGoalMinutes: (minutes) => {
        const user = get().user;
        if (!user) return;
        set({ user: { ...user, progress: { ...user.progress, dailyGoalMinutes: Math.max(5, Math.min(240, minutes)) } } });
      },

      logPracticeSession: (minutes, focusConcepts, notes) => {
        const user = get().user;
        if (!user) return;
        const entry = makeEntry(minutes, focusConcepts, notes);
        const practiceLog = [...get().practiceLog, entry];
        const dayKey = entry.day;

        // Update day record with the new session count
        const activity = { ...get().activity };
        const day = ensureDayRecord(activity[dayKey], dayKey, user.progress.streak);
        activity[dayKey] = refreshQuestProgress({ ...day, practiceSessions: day.practiceSessions + 1 }, user.progress.streak);

        // Passive reward: every SESSIONS_PER_FREEZE logged sessions earns a freeze (bank capped)
        const freezes = computeFreezeBank(practiceLog.length, user.progress.streakFreezes ?? 0);

        set({
          practiceLog,
          activity,
          user: {
            ...user,
            progress: { ...user.progress, streakFreezes: freezes, lastActiveDate: dayKey },
          },
        });
      },

      claimQuests: () => {
        const user = get().user;
        if (!user) return 0;
        const today = new Date().toISOString().split('T')[0];
        const activity = { ...get().activity };
        const record = ensureDayRecord(activity[today], today, user.progress.streak);
        const { record: updated, xp } = claimQuestsPure(record);
        if (xp <= 0) return 0;
        activity[today] = updated;
        const newXp = user.progress.xp + xp;
        set({
          activity,
          user: {
            ...user,
            progress: { ...user.progress, xp: newXp, level: Math.floor(newXp / 100) },
          },
        });
        return xp;
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

      // Visitor telemetry (admin panel). Newest-first, hard-capped to protect the localStorage quota.
      logVisitorSession: (entry) => {
        const logs = get().visitorLogs;
        // De-dupe: refresh an existing record with the same session start instead of appending
        const existingIdx = logs.findIndex(l => l.sessionStart === entry.sessionStart);
        let next: VisitorLogEntry[];
        if (existingIdx >= 0) {
          next = [entry, ...logs.filter((_, i) => i !== existingIdx)];
        } else {
          next = [entry, ...logs];
        }
        set({ visitorLogs: next.slice(0, MAX_VISITOR_LOGS) });
      },

      clearVisitorLogs: () => set({ visitorLogs: [] }),
      
      // Competency tracking actions
      recordCorrectAnswer: (concept) => {
        const user = get().user;
        if (!user) return;

        const updatedMastery = recordCorrectAnswer(user.progress.conceptMastery, concept);

        // Daily activity tracking (drives the "get N answers right" practice quests)
        const today = new Date().toISOString().split('T')[0];
        const activity = { ...get().activity };
        const day = ensureDayRecord(activity[today], today, user.progress.streak);
        activity[today] = refreshQuestProgress(
          { ...day, correctAnswers: day.correctAnswers + 1 },
          user.progress.streak
        );

        set({
          activity,
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
        // Only clear this app's own keys — never clobber unrelated
        // localStorage entries that may share the origin.
        Object.keys(localStorage)
          .filter((k) => k.startsWith('cadet-music'))
          .forEach((k) => localStorage.removeItem(k));
        set({ user: null, currentView: 'login', darkMode: false, visitorLogs: [], activity: {}, practiceLog: [] });
        document.documentElement.classList.remove('dark');
      },
    }),
    {
      name: 'cadet-music-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        // Migration from version 0 to 1: Add conceptMastery
        if (version < 1 && persistedState.user?.progress) {
          persistedState.user.progress.conceptMastery = initializeConceptMastery(
            persistedState.user.progress.conceptMastery
          );
        }
        // Migration from version 1 to 2: banner stickers carry their own stickerId/scale/zIndex.
        // Legacy placements encoded the sticker via parseInt(s.id) as an index into progress.stickers.
        if (version < 2 && Array.isArray(persistedState.user?.bannerStickers)) {
          const stickerList: string[] = persistedState.user.progress?.stickers ?? [];
          persistedState.user.bannerStickers = persistedState.user.bannerStickers.map((s: any) => ({
            ...s,
            stickerId: s.stickerId ?? stickerList[parseInt(s.id)] ?? undefined,
            scale: s.scale ?? 1,
            zIndex: s.zIndex ?? 1,
          }));
        }
        return persistedState;
      },
    }
  )
);

export { BANNER_BGS };
