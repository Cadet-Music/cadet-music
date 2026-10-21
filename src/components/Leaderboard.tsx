import { motion } from 'framer-motion';
import { useStore } from '../store';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
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

export default function Leaderboard() {
  const { user, setCurrentView } = useStore();

  if (!user) return null;

  const stats = [
    { label: 'Total XP', value: user.progress.xp, icon: '⭐' },
    { label: 'Day Streak', value: user.progress.streak, icon: '🔥' },
    { label: 'Lessons Completed', value: user.progress.completedLessons.length, icon: '✓' },
    { label: 'Current Level', value: user.progress.level, icon: 'Lv' },
    { label: 'Active Songs', value: user.activeSongs.length, icon: '♪' },
    { label: 'Theory Level', value: user.theoryLevel, icon: 'Thy' },
    { label: 'Instrument Level', value: user.instrumentLevel, icon: 'Inst' },
    { label: 'Achievements', value: user.progress.stickers.length, icon: '★' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors flex items-center gap-2"
          >
            <ChevronLeftIcon />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#c9a84c]"><TrophyIcon /></span>
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Your Progress</h1>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card mb-6 text-center"
        >
          <motion.div 
            className="w-20 h-20 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-3xl font-bold mx-auto mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {user.username.charAt(0).toUpperCase()}
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold text-[#1a2332] dark:text-white mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {user.username}
          </motion.h2>
          <motion.p 
            className="text-sm text-[#5a6577] dark:text-[#9aa3b0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user.instrument} saxophone
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="card cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide">
                  {stat.label}
                </span>
                <motion.span 
                  className="text-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {stat.icon}
                </motion.span>
              </div>
              <motion.p 
                className="text-2xl font-bold text-[#1a2332] dark:text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        {user.progress.stickers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card mt-6"
          >
            <h3 className="text-sm font-semibold text-[#1a2332] dark:text-white mb-3 uppercase tracking-wide">
              Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.progress.stickers.map((sticker) => (
                <div
                  key={sticker}
                  className="px-3 py-1.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-md text-sm font-medium text-[#1a2332] dark:text-white"
                >
                  {sticker}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
