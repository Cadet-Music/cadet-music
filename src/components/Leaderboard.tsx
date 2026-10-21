import { motion } from 'framer-motion';
import { useStore } from '../store';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  lessons: number;
}

// Simulated leaderboard data (in production, this would come from a server)
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex M.', avatar: '🎷', xp: 2450, streak: 21, lessons: 48 },
  { rank: 2, name: 'Jordan K.', avatar: '🎵', xp: 1890, streak: 14, lessons: 35 },
  { rank: 3, name: 'Sam R.', avatar: '🎶', xp: 1650, streak: 10, lessons: 30 },
  { rank: 4, name: 'Casey L.', avatar: '🎼', xp: 1200, streak: 7, lessons: 22 },
  { rank: 5, name: 'Riley P.', avatar: '🎹', xp: 980, streak: 5, lessons: 18 },
];

export default function Leaderboard() {
  const { user, setCurrentView } = useStore();

  if (!user) return null;

  // Insert current user into leaderboard
  const allEntries = [...MOCK_LEADERBOARD];
  const userEntry: LeaderboardEntry = {
    rank: 0,
    name: user.username + ' (You)',
    avatar: user.avatar,
    xp: user.progress.xp,
    streak: user.progress.streak,
    lessons: user.progress.completedLessons.length,
  };

  // Find user's rank
  let userRank = allEntries.filter(e => e.xp > user.progress.xp).length + 1;
  allEntries.splice(userRank - 1, 0, { ...userEntry, rank: userRank });

  // Re-rank
  allEntries.forEach((e, i) => e.rank = i + 1);

  const getMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#131f24]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2c34] border-b-2 border-[#e5e5e5] dark:border-[#2a3f4a] px-4 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-[#777] dark:text-[#aaa] font-bold text-xl hover:text-[#3c3c3c] dark:hover:text-white"
          >
            ←
          </button>
          <h1 className="text-xl font-bold text-[#3c3c3c] dark:text-white">🏆 Leaderboard</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 mb-8 pt-4">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#e5e5e5] dark:bg-[#2a3f4a] flex items-center justify-center text-2xl mx-auto mb-2 border-3 border-[#c0c0c0]">
              {allEntries[1]?.avatar}
            </div>
            <p className="text-xs font-bold text-[#3c3c3c] dark:text-white truncate w-16">{allEntries[1]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#777] dark:text-[#aaa]">{allEntries[1]?.xp} XP</p>
            <div className="w-16 h-16 bg-[#e5e5e5] dark:bg-[#2a3f4a] rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-2xl">🥈</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-18 h-18 rounded-full bg-[#ffc800]/20 flex items-center justify-center text-3xl mx-auto mb-2 border-3 border-[#ffc800]">
              {allEntries[0]?.avatar}
            </div>
            <p className="text-sm font-bold text-[#3c3c3c] dark:text-white truncate w-20">{allEntries[0]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#777] dark:text-[#aaa]">{allEntries[0]?.xp} XP</p>
            <div className="w-20 h-24 bg-[#ffc800]/10 rounded-t-lg mt-2 flex items-center justify-center border-t-2 border-x-2 border-[#ffc800]/30">
              <span className="text-3xl">🥇</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#e5e5e5] dark:bg-[#2a3f4a] flex items-center justify-center text-2xl mx-auto mb-2 border-3 border-[#cd7f32]">
              {allEntries[2]?.avatar}
            </div>
            <p className="text-xs font-bold text-[#3c3c3c] dark:text-white truncate w-16">{allEntries[2]?.name.split(' ')[0]}</p>
            <p className="text-xs text-[#777] dark:text-[#aaa]">{allEntries[2]?.xp} XP</p>
            <div className="w-16 h-12 bg-[#e5e5e5] dark:bg-[#2a3f4a] rounded-t-lg mt-2 flex items-center justify-center">
              <span className="text-2xl">🥉</span>
            </div>
          </motion.div>
        </div>

        {/* Full Leaderboard */}
        <div className="space-y-2">
          {allEntries.map((entry, idx) => {
            const isUser = entry.name.includes('(You)');
            const medal = getMedal(entry.rank);

            return (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`card flex items-center gap-3 py-3 px-4 ${
                  isUser ? 'border-[#58cc02] bg-[#58cc02]/5 dark:bg-[#58cc02]/10' : ''
                }`}
              >
                {/* Rank */}
                <div className="w-8 text-center">
                  {medal ? (
                    <span className="text-xl">{medal}</span>
                  ) : (
                    <span className="text-sm font-bold text-[#777] dark:text-[#aaa]">#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  entry.rank <= 3 ? 'bg-[#ffc800]/20' : 'bg-[#f7f7f7] dark:bg-[#131f24]'
                }`}>
                  {entry.avatar}
                </div>

                {/* Name & Stats */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm truncate ${isUser ? 'text-[#58cc02]' : 'text-[#3c3c3c] dark:text-white'}`}>
                    {entry.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#777] dark:text-[#aaa]">
                    <span>🔥 {entry.streak}</span>
                    <span>📚 {entry.lessons} lessons</span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <p className="font-bold text-sm text-[#3c3c3c] dark:text-white">{entry.xp}</p>
                  <p className="text-xs text-[#777] dark:text-[#aaa]">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#777] dark:text-[#aaa]">
            🏆 Leaderboard updates in real-time when connected to server
          </p>
        </div>
      </div>
    </div>
  );
}
