import { motion } from 'framer-motion';
import { useStore } from '../store';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  lessons: number;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex M.', xp: 2450, streak: 21, lessons: 48 },
  { rank: 2, name: 'Jordan K.', xp: 1890, streak: 14, lessons: 35 },
  { rank: 3, name: 'Sam R.', xp: 1650, streak: 10, lessons: 30 },
  { rank: 4, name: 'Casey L.', xp: 1200, streak: 7, lessons: 22 },
  { rank: 5, name: 'Riley P.', xp: 980, streak: 5, lessons: 18 },
];

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

const FireIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 23c-3.87 0-7-3.13-7-7 0-2.38 1.19-4.47 3-5.74C10.29 8.73 12 6.5 12 3c0 0 3.5 2.5 4.5 6.5.5 2 1 3 1.5 3.5.67.67 1 1.59 1 2.5 0 3.87-3.13 7.5-7 7.5z" />
  </svg>
);

export default function Leaderboard() {
  const { user, setCurrentView } = useStore();

  if (!user) return null;

  const allEntries = [...MOCK_LEADERBOARD];
  const userEntry: LeaderboardEntry = {
    rank: 0,
    name: user.username,
    xp: user.progress.xp,
    streak: user.progress.streak,
    lessons: user.progress.completedLessons.length,
  };

  let userRank = allEntries.filter(e => e.xp > user.progress.xp).length + 1;
  allEntries.splice(userRank - 1, 0, { ...userEntry, rank: userRank });
  allEntries.forEach((e, i) => e.rank = i + 1);

  const isUser = (name: string) => name === user.username;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#e2e4e8] dark:border-[#2a3545] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#c9a84c]"><TrophyIcon /></span>
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Leaderboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mb-8 pt-4">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0f0f0] dark:bg-[#2a3545] flex items-center justify-center text-sm font-bold text-[#1a2332] dark:text-white mx-auto mb-2 border-2 border-[#c0c0c0]">
              {allEntries[1]?.name.charAt(0)}
            </div>
            <p className="text-xs font-semibold text-[#1a2332] dark:text-white truncate w-16">{allEntries[1]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{allEntries[1]?.xp} XP</p>
            <div className="w-14 h-12 bg-[#f0f0f0] dark:bg-[#2a3545] rounded-t-lg mt-2 flex items-center justify-center border-t-2 border-x-2 border-[#c0c0c0]/40">
              <span className="text-sm font-bold text-[#5a6577] dark:text-[#9aa3b0]">2</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-base font-bold text-[#c9a84c] mx-auto mb-2 border-2 border-[#c9a84c]">
              {allEntries[0]?.name.charAt(0)}
            </div>
            <p className="text-sm font-semibold text-[#1a2332] dark:text-white truncate w-20">{allEntries[0]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{allEntries[0]?.xp} XP</p>
            <div className="w-16 h-20 bg-[#c9a84c]/5 rounded-t-lg mt-2 flex items-center justify-center border-t-2 border-x-2 border-[#c9a84c]/30">
              <span className="text-lg font-bold text-[#c9a84c]">1</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#f0f0f0] dark:bg-[#2a3545] flex items-center justify-center text-sm font-bold text-[#1a2332] dark:text-white mx-auto mb-2 border-2 border-[#cd7f32]">
              {allEntries[2]?.name.charAt(0)}
            </div>
            <p className="text-xs font-semibold text-[#1a2332] dark:text-white truncate w-16">{allEntries[2]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{allEntries[2]?.xp} XP</p>
            <div className="w-14 h-8 bg-[#f0f0f0] dark:bg-[#2a3545] rounded-t-lg mt-2 flex items-center justify-center border-t-2 border-x-2 border-[#cd7f32]/40">
              <span className="text-sm font-bold text-[#5a6577] dark:text-[#9aa3b0]">3</span>
            </div>
          </motion.div>
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {allEntries.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className={`card flex items-center gap-3 py-3 px-4 ${
                isUser(entry.name) ? 'border-[#c9a84c] bg-[#c9a84c]/5 dark:bg-[#c9a84c]/10' : ''
              }`}
            >
              <span className={`w-7 text-center text-sm font-bold ${
                entry.rank <= 3 ? 'text-[#c9a84c]' : 'text-[#5a6577] dark:text-[#9aa3b0]'
              }`}>
                {entry.rank}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                isUser(entry.name) 
                  ? 'bg-[#c9a84c] text-[#1a2332]' 
                  : 'bg-[#f0f0f0] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
              }`}>
                {entry.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${
                  isUser(entry.name) ? 'text-[#c9a84c]' : 'text-[#1a2332] dark:text-white'
                }`}>
                  {entry.name}{isUser(entry.name) ? ' (You)' : ''}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{entry.lessons} lessons</span>
                  {entry.streak > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                      <FireIcon /> {entry.streak}d
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm font-bold text-[#1a2332] dark:text-white">{entry.xp}</span>
              <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">XP</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
