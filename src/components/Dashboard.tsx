import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, AVATARS } from '../store';
import { CURRICULUM, getAllLessons, getLessonStatus, STICKER_INFO } from '../data';
import Mascot from './Mascot';

export default function Dashboard() {
  const { user, setCurrentView, setCurrentLesson, setDarkMode, darkMode, logout, updateStreak } = useStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'excited'>('idle');

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
    setMascotMood('excited');
    setTimeout(() => setMascotMood('idle'), 2000);
  };

  const handleStartLesson = () => {
    if (selectedNode) {
      setCurrentLesson(selectedNode);
      setCurrentView('lesson');
    }
  };

  const lesson = selectedNode ? allLessons.find(l => l.id === selectedNode) : null;

  // Calculate path offsets for winding effect
  const getNodeOffset = (sectionIdx: number, lessonIdx: number) => {
    const pattern = [0, -50, -30, 30, 50, 30, -30, -50];
    return pattern[(sectionIdx * 3 + lessonIdx) % pattern.length];
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#131f24] pb-28">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2c34] border-b-2 border-[#e5e5e5] dark:border-[#2a3f4a] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-[#58cc02] flex items-center justify-center text-xl border-2 border-[#46a302]">
                {user.avatar}
              </div>
              <span className="font-bold text-[#3c3c3c] dark:text-white hidden sm:block">{user.username}</span>
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-12 left-0 bg-white dark:bg-[#1a2c34] border-2 border-[#e5e5e5] dark:border-[#2a3f4a] rounded-xl shadow-xl w-56 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-[#e5e5e5] dark:border-[#2a3f4a]">
                      <p className="font-bold text-[#3c3c3c] dark:text-white">{user.username}</p>
                      <p className="text-sm text-[#777] dark:text-[#aaa]">Level {user.progress.level} • {user.instrument} sax</p>
                    </div>
                    <button
                      onClick={() => { setCurrentView('settings'); setProfileOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f7f7f7] dark:hover:bg-[#131f24] text-[#3c3c3c] dark:text-white font-medium flex items-center gap-3 transition-colors"
                    >
                      ⚙️ Settings
                    </button>
                    <button
                      onClick={() => { setDarkMode(!darkMode); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f7f7f7] dark:hover:bg-[#131f24] text-[#3c3c3c] dark:text-white font-medium flex items-center gap-3 transition-colors"
                    >
                      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-[#f7f7f7] dark:hover:bg-[#131f24] text-[#ff4b4b] font-medium flex items-center gap-3 transition-colors"
                    >
                      🚪 Log Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user.progress.streak > 0 && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="streak-badge text-sm"
              >
                🔥 {user.progress.streak}
              </motion.div>
            )}
            <div className="xp-badge text-sm">
              ⭐ {user.progress.xp}
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Banner */}
      {user.progress.stickers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#ffc800] to-[#ff9500] px-4 py-2.5"
        >
          <div className="max-w-2xl mx-auto flex items-center gap-3 overflow-x-auto scrollbar-hide">
            <span className="font-bold text-white whitespace-nowrap text-sm">🏆 Stickers:</span>
            {user.progress.stickers.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 flex-shrink-0"
              >
                <span>{STICKER_INFO[s]?.emoji || '🏅'}</span>
                <span className="text-white text-xs font-bold whitespace-nowrap">{STICKER_INFO[s]?.name || s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Mascot */}
        <Mascot mood={mascotMood} message={
          completedCount === 0 ? "Let's start your journey! 🎷" :
          nextLesson ? `Next: ${nextLesson.title}` : 'Amazing! All done! 🎉'
        } />

        {/* Daily Goal */}
        <div className="card mb-4 bg-gradient-to-r from-[#58cc02]/5 to-[#1cb0f6]/5 dark:from-[#58cc02]/10 dark:to-[#1cb0f6]/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#ffc800]/20 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-[#3c3c3c] dark:text-white">Daily Goal</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 progress-bar h-2">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((user.progress.completedLessons.filter(id => {
                      const today = new Date().toISOString().split('T')[0];
                      return true; // simplified - just show overall progress
                    }).length / 3) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs font-bold text-[#777] dark:text-[#aaa]">
                  {Math.min(completedCount, 3)}/3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-[#3c3c3c] dark:text-white">Your Journey</h2>
            <span className="text-sm font-bold text-[#777] dark:text-[#aaa]">{completedCount}/{totalLessons}</span>
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
            <span className="text-xs text-[#777] dark:text-[#aaa]">{progressPercent}% complete</span>
            {user.activeSongs.length > 0 && (
              <span className="text-xs text-[#777] dark:text-[#aaa]">🎵 {user.activeSongs.length} songs</span>
            )}
          </div>
        </div>

        {/* Learning Path */}
        <div className="relative">
          {CURRICULUM.map((section, sIdx) => (
            <div key={section.id} className="mb-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1a2c34] border-2 border-[#e5e5e5] dark:border-[#2a3f4a] rounded-full px-5 py-2">
                  <h3 className="font-bold text-[#3c3c3c] dark:text-white text-sm">
                    {section.title}
                  </h3>
                  {section.level > 0 && (
                    <span className="text-xs font-bold text-[#777] dark:text-[#aaa] bg-[#f7f7f7] dark:bg-[#131f24] rounded-full px-2 py-0.5">
                      Lv.{section.level}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Winding Path Nodes */}
              <div className="flex flex-col items-center gap-3">
                {section.lessons.map((lesson, lIdx) => {
                  const status = getLessonStatus(lesson.id, completedIds);
                  const isBoss = lesson.type === 'exam';
                  const offset = getNodeOffset(sIdx, lIdx);

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: lIdx * 0.04, type: 'spring', stiffness: 200 }}
                      className="relative"
                      style={{ transform: `translateX(${offset}px)` }}
                    >
                      {/* Connector */}
                      {lIdx > 0 && (
                        <div
                          className="absolute w-1 bg-[#e5e5e5] dark:bg-[#2a3f4a] -top-3 left-1/2 -translate-x-1/2"
                          style={{
                            height: '12px',
                            background: status === 'completed' || getLessonStatus(section.lessons[lIdx - 1]?.id || '', completedIds) === 'completed'
                              ? '#58cc02' : undefined
                          }}
                        />
                      )}
                      
                      <button
                        onClick={() => handleNodeClick(lesson.id)}
                        className={`path-node ${status} ${isBoss ? 'boss' : ''}`}
                        title={lesson.title}
                      >
                        {status === 'locked' ? (
                          <span className="text-gray-400">🔒</span>
                        ) : (
                          <span>{lesson.emoji}</span>
                        )}
                        {status === 'completed' && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-[#1a2c34] rounded-full flex items-center justify-center text-[10px] font-bold text-[#58cc02] border border-[#58cc02]">
                            ✓
                          </div>
                        )}
                      </button>

                      {/* Lesson label */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-[10px] font-medium text-[#777] dark:text-[#aaa]">
                          {status === 'completed' ? lesson.title.split(' ').slice(0, 2).join(' ') : ''}
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
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1a2c34] border-t-2 border-[#e5e5e5] dark:border-[#2a3f4a]">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#58cc02]"
          >
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#777] dark:text-[#aaa] hover:text-[#3c3c3c] dark:hover:text-white"
          >
            <span className="text-xl">🏆</span>
            <span className="text-[10px] font-bold">Ranks</span>
          </button>
          {nextLesson ? (
            <button
              onClick={() => { setCurrentLesson(nextLesson.id); setCurrentView('lesson'); }}
              className="flex flex-col items-center gap-0.5 p-2 -mt-6"
            >
              <div className="w-14 h-14 rounded-full bg-[#58cc02] flex items-center justify-center text-2xl shadow-lg border-4 border-white dark:border-[#1a2c34]">
                ▶️
              </div>
              <span className="text-[10px] font-bold text-[#58cc02]">GO</span>
            </button>
          ) : (
            <div className="w-14 h-14" />
          )}
          <button
            onClick={() => setCurrentView('settings')}
            className="flex flex-col items-center gap-0.5 p-2 text-[#777] dark:text-[#aaa] hover:text-[#3c3c3c] dark:hover:text-white"
          >
            <span className="text-xl">🎵</span>
            <span className="text-[10px] font-bold">Songs</span>
          </button>
          <button
            onClick={() => { setDarkMode(!darkMode); }}
            className="flex flex-col items-center gap-0.5 p-2 text-[#777] dark:text-[#aaa] hover:text-[#3c3c3c] dark:hover:text-white"
          >
            <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
            <span className="text-[10px] font-bold">Theme</span>
          </button>
        </div>
      </nav>

      {/* Lesson Info Modal */}
      <AnimatePresence>
        {selectedNode && lesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1a2c34] rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="text-center mb-5">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="text-5xl mb-3 block"
                >
                  {lesson.emoji}
                </motion.span>
                <h3 className="text-xl font-bold text-[#3c3c3c] dark:text-white">{lesson.title}</h3>
                <p className="text-[#777] dark:text-[#aaa] mt-1 text-sm">{lesson.description}</p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="xp-badge">+{lesson.xp} XP</div>
                <div className="text-sm font-medium text-[#777] dark:text-[#aaa] capitalize flex items-center gap-1">
                  {lesson.type === 'exam' ? '🏆 Challenge' : lesson.type === 'rhythm' ? '🥁 Rhythm' : lesson.type === 'theory' ? '📚 Theory' : '🎷 Playing'}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="btn-secondary flex-1"
                >
                  CLOSE
                </button>
                {getLessonStatus(lesson.id, completedIds) !== 'locked' && (
                  <button
                    onClick={handleStartLesson}
                    className="btn-primary flex-1"
                  >
                    {completedIds.includes(lesson.id) ? 'RETRY' : 'START'}
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
