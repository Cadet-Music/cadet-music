import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { CURRICULUM, getAllLessons, getLessonStatus, STICKER_INFO } from '../data';

// SVG Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const MusicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function Dashboard() {
  const { user, setCurrentView, setCurrentLesson, setDarkMode, darkMode, logout, updateStreak } = useStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    updateStreak();
  }, []);

  if (!user) return null;

  const allLessons = getAllLessons();
  const completedIds = user.progress.completedLessons;
  const nextLesson = allLessons.find(l => !completedIds.includes(l.id));
  const totalLessons = allLessons.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const handleNodeClick = (lessonId: string) => {
    const status = getLessonStatus(lessonId, completedIds);
    if (status === 'locked') return;
    setSelectedNode(lessonId);
  };

  const handleStartLesson = () => {
    if (selectedNode) {
      setCurrentLesson(selectedNode);
      setCurrentView('lesson');
    }
  };

  const lesson = selectedNode ? allLessons.find(l => l.id === selectedNode) : null;

  const getNodeOffset = (sectionIdx: number, lessonIdx: number) => {
    const pattern = [0, -40, -20, 20, 40, 20, -20, -40];
    return pattern[(sectionIdx * 3 + lessonIdx) % pattern.length];
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545]">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-sm font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-[#1a2332] dark:text-white leading-tight">{user.username}</p>
                <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Level {user.progress.level}</p>
              </div>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-12 left-0 bg-white dark:bg-[#1a2332] border border-[#c8c8c8] dark:border-[#2a3545] rounded-lg shadow-lg w-52 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-[#c8c8c8] dark:border-[#2a3545]">
                      <p className="font-semibold text-sm text-[#1a2332] dark:text-white">{user.username}</p>
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">Level {user.progress.level} · {user.instrument} sax</p>
                    </div>
                    <button
                      onClick={() => { setCurrentView('settings'); setProfileOpen(false); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-[#f0f0f0] dark:hover:bg-[#0f1720] text-[#1a2332] dark:text-white text-sm font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <SettingsIcon /> Settings
                    </button>
                    <button
                      onClick={() => { setDarkMode(!darkMode); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-[#f0f0f0] dark:hover:bg-[#0f1720] text-[#1a2332] dark:text-white text-sm font-medium flex items-center gap-2.5 transition-colors"
                    >
                      {darkMode ? <SunIcon /> : <MoonIcon />}
                      {darkMode ? 'Light mode' : 'Dark mode'}
                    </button>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-[#f0f0f0] dark:hover:bg-[#0f1720] text-[#c44536] text-sm font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <LogoutIcon /> Log out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            {user.progress.streak > 0 && (
              <div className="streak-badge">
                <FireIcon /> {user.progress.streak}
              </div>
            )}
            <div className="xp-badge">
              <StarIcon /> {user.progress.xp}
            </div>
          </div>
        </div>
      </header>

      {/* Stickers Banner */}
      {user.progress.stickers.length > 0 && (
        <div className="bg-[#1a2332] dark:bg-[#2a3545] px-4 py-2.5">
          <div className="max-w-2xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="text-[#c9a84c] font-semibold text-xs whitespace-nowrap uppercase tracking-wide">Achievements</span>
            {user.progress.stickers.map((s) => (
              <div
                key={s}
                className="flex items-center gap-1.5 bg-[#2a3545] dark:bg-[#1a2332] rounded-md px-2.5 py-1 flex-shrink-0"
              >
                <span className="text-[#c9a84c] text-xs font-semibold">{STICKER_INFO[s]?.name || s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Daily Goal */}
        <motion.div 
          className="card mb-5 cursor-pointer hover:scale-[1.02] transition-transform"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]"
              animate={{ rotate: completedCount >= 3 ? [0, 360] : 0 }}
              transition={{ duration: 2, repeat: completedCount >= 3 ? Infinity : 0 }}
            >
              <TargetIcon />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <p className="font-semibold text-sm text-[#1a2332] dark:text-white">Daily Goal</p>
                <motion.span 
                  className="text-xs font-bold text-[#c9a84c]"
                  key={completedCount}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                >
                  {Math.min(completedCount, 3)}/3
                </motion.span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((completedCount / 3) * 100, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm text-[#1a2332] dark:text-white">Progress</h2>
            <motion.span 
              className="text-xs font-bold text-[#c9a84c]"
              key={progressPercent}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {progressPercent}%
            </motion.span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{completedCount}/{totalLessons} lessons</span>
            {user.activeSongs.length > 0 && (
              <motion.span 
                className="text-xs text-[#5a6577] dark:text-[#9aa3b0]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {user.activeSongs.length} active songs
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Learning Path */}
        <div className="relative">
          {CURRICULUM.map((section, sIdx) => (
            <div key={section.id} className="mb-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
                className="text-center mb-5"
              >
                <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1a2332] border border-[#c8c8c8] dark:border-[#2a3545] rounded-full px-4 py-1.5">
                  <h3 className="font-semibold text-[#1a2332] dark:text-white text-xs uppercase tracking-wide">
                    {section.title}
                  </h3>
                  {section.level > 0 && (
                    <span className="text-[10px] font-bold text-[#5a6577] dark:text-[#9aa3b0] bg-[#f0f0f0] dark:bg-[#0f1720] rounded-full px-2 py-0.5">
                      Lv.{section.level}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Path Nodes */}
              <div className="flex flex-col items-center gap-4">
                {section.lessons.map((lesson, lIdx) => {
                  const status = getLessonStatus(lesson.id, completedIds);
                  const isBoss = lesson.type === 'exam';
                  const offset = getNodeOffset(sIdx, lIdx);

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: lIdx * 0.03, type: 'spring', stiffness: 200 }}
                      className="relative"
                      style={{ transform: `translateX(${offset}px)` }}
                    >
                      <motion.button
                        onClick={() => handleNodeClick(lesson.id)}
                        className={`path-node ${status} ${isBoss ? 'boss' : ''}`}
                        title={lesson.title}
                        whileHover={status !== 'locked' ? { scale: 1.15 } : {}}
                        whileTap={status !== 'locked' ? { scale: 0.9 } : {}}
                        animate={status === 'available' ? { 
                          boxShadow: ['0 0 0 0 rgba(201, 168, 76, 0.4)', '0 0 0 10px rgba(201, 168, 76, 0)', '0 0 0 0 rgba(201, 168, 76, 0)']
                        } : {}}
                        transition={status === 'available' ? { duration: 2, repeat: Infinity } : {}}
                      >
                        {status === 'locked' ? (
                          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <LockIcon />
                          </motion.div>
                        ) : status === 'completed' ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <CheckIcon />
                          </motion.div>
                        ) : (
                          <motion.span 
                            className="text-xs font-bold"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {sIdx * 3 + lIdx + 1}
                          </motion.span>
                        )}
                      </motion.button>

                      {/* Lesson label */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-[10px] font-medium text-[#5a6577] dark:text-[#9aa3b0]">
                          {status === 'completed' ? lesson.title.split(' ').slice(0, 2).join(' ') : 
                           status === 'available' ? lesson.title.split(' ').slice(0, 2).join(' ') : ''}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1a2332] border-t border-[#c8c8c8] dark:border-[#2a3545]">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          <motion.button
            onClick={() => setCurrentView('dashboard')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#c9a84c]"
            whileTap={{ scale: 0.9 }}
          >
            <HomeIcon active={true} />
            <span className="text-[10px] font-semibold">Home</span>
          </motion.button>
          <motion.button
            onClick={() => setCurrentView('leaderboard')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#9aa3b0] dark:text-[#5a6577] hover:text-[#1a2332] dark:hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <TrophyIcon />
            <span className="text-[10px] font-semibold">Stats</span>
          </motion.button>
          {nextLesson ? (
            <motion.button
              onClick={() => { setCurrentLesson(nextLesson.id); setCurrentView('lesson'); }}
              className="flex flex-col items-center gap-0.5 p-2 -mt-5"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center text-[#1a2332] shadow-md"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayIcon />
              </motion.div>
              <span className="text-[10px] font-semibold text-[#c9a84c]">Start</span>
            </motion.button>
          ) : (
            <div className="w-12 h-12" />
          )}
          <motion.button
            onClick={() => setCurrentView('settings')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#9aa3b0] dark:text-[#5a6577] hover:text-[#1a2332] dark:hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <MusicIcon />
            <span className="text-[10px] font-semibold">Songs</span>
          </motion.button>
          <motion.button
            onClick={() => { setDarkMode(!darkMode); }}
            className="flex flex-col items-center gap-0.5 p-2 text-[#9aa3b0] dark:text-[#5a6577] hover:text-[#1a2332] dark:hover:text-white transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
            <span className="text-[10px] font-semibold">Theme</span>
          </motion.button>
        </div>
      </nav>

      {/* Lesson Info Modal */}
      <AnimatePresence>
        {selectedNode && lesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1a2332] rounded-xl p-6 w-full max-w-sm shadow-xl border border-[#c8c8c8] dark:border-[#2a3545]"
            >
              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#c9a84c] font-bold text-lg">
                    {lesson.type === 'exam' ? 'EXAM' : lesson.type === 'rhythm' ? 'RHY' : lesson.type === 'theory' ? 'THY' : 'PLAY'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#1a2332] dark:text-white">{lesson.title}</h3>
                <p className="text-[#5a6577] dark:text-[#9aa3b0] mt-1 text-sm">{lesson.description}</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="xp-badge">+{lesson.xp} XP</div>
                <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0] capitalize">
                  {lesson.type}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                {getLessonStatus(lesson.id, completedIds) !== 'locked' && (
                  <button
                    onClick={handleStartLesson}
                    className="btn-accent flex-1"
                  >
                    {completedIds.includes(lesson.id) ? 'Retry' : 'Start'}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
