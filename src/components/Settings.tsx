import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Instrument } from '../store';
import { CadetLevel, LEVELS, LEVEL_INFO, getSongsForLevel } from '../data';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MusicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export default function Settings() {
  const { user, setCurrentView, setInstrument, setActiveSongs, setDarkMode, darkMode, setTheoryLevel, setInstrumentLevel } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'instrument' | 'levels' | 'songs'>('profile');
  const [showLevelWarning, setShowLevelWarning] = useState(false);

  if (!user) return null;

  const instruments: { id: Instrument; name: string; scale: string; desc: string }[] = [
    { id: 'alto', name: 'Alto Saxophone', scale: 'E♭', desc: 'Most common' },
    { id: 'tenor', name: 'Tenor Saxophone', scale: 'B♭', desc: 'Jazz & rock' },
    { id: 'baritone', name: 'Baritone Saxophone', scale: 'E♭', desc: 'Deep tone' },
    { id: 'soprano', name: 'Soprano Saxophone', scale: 'B♭', desc: 'Highest pitch' },
  ];

  const handleInstrumentLevelChange = (newLevel: CadetLevel) => {
    if (LEVEL_INFO[newLevel].number > LEVEL_INFO[user.theoryLevel].number) {
      setShowLevelWarning(true);
      return;
    }
    setInstrumentLevel(newLevel);
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <UserIcon /> },
    { id: 'instrument' as const, label: 'Instrument', icon: <MusicIcon /> },
    { id: 'levels' as const, label: 'Levels', icon: <ListIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Settings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-[#e8e8e8] dark:bg-[#1a2332] rounded-lg p-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-md font-medium text-sm transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#2a3545] text-[#1a2332] dark:text-white shadow-sm'
                  : 'text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card text-center">
              <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">Profile</p>
              <div className="w-16 h-16 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-2xl font-bold mx-auto mb-3">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <p className="text-lg font-semibold text-[#1a2332] dark:text-white">{user.username}</p>
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">{user.instrument} saxophone</p>
            </div>

            <div className="card">
              <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-4">Statistics</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-[#e8e8e8] dark:bg-[#0f1720] rounded-lg">
                  <p className="text-xl font-bold text-[#1a2332] dark:text-white">{user.progress.xp}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">Total XP</p>
                </div>
                <div className="text-center p-3 bg-[#e8e8e8] dark:bg-[#0f1720] rounded-lg">
                  <p className="text-xl font-bold text-[#1a2332] dark:text-white">{user.progress.streak}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">Day Streak</p>
                </div>
                <div className="text-center p-3 bg-[#e8e8e8] dark:bg-[#0f1720] rounded-lg">
                  <p className="text-xl font-bold text-[#1a2332] dark:text-white">{user.progress.completedLessons.length}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">Lessons Done</p>
                </div>
                <div className="text-center p-3 bg-[#e8e8e8] dark:bg-[#0f1720] rounded-lg">
                  <p className="text-xl font-bold text-[#1a2332] dark:text-white">{user.theoryLevel}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">Theory Level</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#1a2332] dark:text-white">Dark Mode</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">Switch between light and dark themes</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    darkMode ? 'bg-[#c9a84c]' : 'bg-[#c8c8c8]'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${
                    darkMode ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instrument Tab */}
        {activeTab === 'instrument' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
              Select your instrument. This adjusts scales and transpositions.
            </p>
            {instruments.map(inst => (
              <button
                key={inst.id}
                onClick={() => setInstrument(inst.id)}
                className={`w-full card flex items-center gap-4 text-left transition-all ${
                  user.instrument === inst.id ? 'border-[#c9a84c] bg-[#c9a84c]/5 dark:bg-[#c9a84c]/10' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  user.instrument === inst.id 
                    ? 'bg-[#c9a84c] text-[#1a2332]' 
                    : 'bg-[#e8e8e8] dark:bg-[#0f1720] text-[#5a6577] dark:text-[#9aa3b0]'
                }`}>
                  <MusicIcon />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#1a2332] dark:text-white">{inst.name}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{inst.scale} · {inst.desc}</p>
                </div>
                {user.instrument === inst.id && (
                  <span className="text-[#c9a84c]"><CheckIcon /></span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="card bg-[#c9a84c]/5 border-[#c9a84c]/30 dark:bg-[#c9a84c]/10">
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                <span className="font-semibold text-[#1a2332] dark:text-white">Note: </span>
                Your theory level must be equal to or higher than your playing level.
              </p>
            </div>

            {/* Theory Level */}
            <div className="card">
              <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                Theory Level
              </p>
              <div className="flex gap-2">
                {LEVELS.map(level => (
                  <button
                    key={level}
                    onClick={() => setTheoryLevel(level)}
                    className={`flex-1 py-3 rounded-lg font-semibold text-xs transition-all ${
                      user.theoryLevel === level
                        ? 'bg-[#c9a84c] text-[#1a2332]'
                        : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#d0d0d0] dark:hover:bg-[#3a4a5a]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2">
                Current: {user.theoryLevel} · {LEVEL_INFO[user.theoryLevel].description}
              </p>
            </div>

            {/* Playing Level */}
            <div className="card">
              <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                Playing Level
              </p>
              <div className="flex gap-2">
                {LEVELS.map(level => {
                  const isDisabled = LEVEL_INFO[level].number > LEVEL_INFO[user.theoryLevel].number;
                  return (
                    <button
                      key={level}
                      onClick={() => !isDisabled && handleInstrumentLevelChange(level)}
                      disabled={isDisabled}
                      className={`flex-1 py-3 rounded-lg font-semibold text-xs transition-all ${
                        user.instrumentLevel === level
                          ? 'bg-[#c9a84c] text-[#1a2332]'
                          : isDisabled
                            ? 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] opacity-40 cursor-not-allowed'
                            : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#d0d0d0] dark:hover:bg-[#3a4a5a]'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2">
                Current: {user.instrumentLevel} · {LEVEL_INFO[user.instrumentLevel].description}
              </p>
            </div>
          </motion.div>
        )}

        <div className="h-8" />
      </div>

      {/* Level Warning Modal */}
      <AnimatePresence>
        {showLevelWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowLevelWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1a2332] rounded-xl p-6 max-w-sm w-full border border-[#c8c8c8] dark:border-[#2a3545]"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[#c44536]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <h3 className="font-semibold text-[#1a2332] dark:text-white">Level Requirement</h3>
              </div>
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-5">
                Your playing level must be equal to or lower than your theory level. 
                Complete more theory lessons first to unlock higher playing levels.
              </p>
              <button
                onClick={() => setShowLevelWarning(false)}
                className="btn-primary w-full"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
