import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStore, STICKER_DEFS } from '../store';
import { stickerIcon } from './Banner';
import Footer from './Footer';
import ShareCardTemplate from './ShareCardTemplate';
import { fetchLeaderboard, submitScore, ServerLeaderboardEntry } from '../utils/api';

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

// Offline fallback used when /api/leaderboard is unreachable (e.g. plain
// `vite preview` with no serverless runtime). The live data now comes from
// the server via fetchLeaderboard()/submitScore() below.
const FALLBACK_LEADERBOARD: ServerLeaderboardEntry[] = [
  { rank: 1, name: 'Cpl Thompson', xp: 2450, streak: 21, lessons: 48, bannerBg: 'linear-gradient(135deg, #c9a84c 0%, #a68a3a 100%)', stickers: ['⭐', '🏅', '💫'] },
  { rank: 2, name: 'L/Cpl Martinez', xp: 1890, streak: 14, lessons: 35, bannerBg: 'linear-gradient(135deg, #3a8a5c 0%, #2d6d48 100%)', stickers: ['⭐', '🔥'] },
  { rank: 3, name: 'Cdt Williams', xp: 1650, streak: 10, lessons: 30, bannerBg: 'linear-gradient(135deg, #4a7c8a 0%, #2d5a66 100%)', stickers: ['⭐', '💎'] },
  { rank: 4, name: 'Cdt Brown', xp: 1200, streak: 7, lessons: 22, bannerBg: 'linear-gradient(135deg, #6b4c8a 0%, #4a3566 100%)', stickers: ['⭐'] },
  { rank: 5, name: 'Cdt Davis', xp: 980, streak: 5, lessons: 18, bannerBg: 'linear-gradient(135deg, #c44536 0%, #a33628 100%)', stickers: ['⭐', '🏅'] },
  { rank: 6, name: 'Cdt Johnson', xp: 750, streak: 3, lessons: 14, bannerBg: 'linear-gradient(135deg, #1a2332 0%, #2d3a4a 100%)', stickers: ['⭐'] },
];

export default function Leaderboard() {
  const { user, setCurrentView } = useStore();

  // Live standings fetched from /api/leaderboard (GET). Falls back to the
  // seed list if the endpoint is unavailable so the page never blanks out.
  const [serverEntries, setServerEntries] = useState<ServerLeaderboardEntry[]>(FALLBACK_LEADERBOARD);
  const [, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const entries = await fetchLeaderboard();
        if (!cancelled && entries.length > 0) setServerEntries(entries);
      } catch (err) {
        console.warn('Leaderboard: using offline fallback data', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!user) return null;

  // Build the visible list: server standings minus any entry that shares the
  // current cadet's name, then insert the cadet's live local progress (the
  // authoritative source for their own XP on this device).
  const myNameLower = user.username.toLowerCase();
  const allEntries: ServerLeaderboardEntry[] = serverEntries.filter(e => e.name.toLowerCase() !== myNameLower);
  const userEntry: ServerLeaderboardEntry = {
    rank: 0,
    name: user.username,
    xp: user.progress.xp,
    streak: user.progress.streak,
    lessons: user.progress.completedLessons.length,
    bannerBg: user.bannerBg,
    stickers: user.progress.stickers.map(s => STICKER_DEFS[s]?.icon || '⭐'),
  };

  let userRank = allEntries.filter(e => e.xp > user.progress.xp).length + 1;
  allEntries.splice(userRank - 1, 0, userEntry);
  allEntries.forEach((e, i) => e.rank = i + 1);

  // Sync this cadet's real-time XP to the server so their rank is shared
  // across devices. Best-effort: refresh the list with returned standings.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    submitScore({
      name: user.username,
      xp: user.progress.xp,
      streak: user.progress.streak,
      lessons: user.progress.completedLessons.length,
      bannerBg: user.bannerBg,
      stickers: user.progress.stickers.map(s => STICKER_DEFS[s]?.icon || '⭐'),
    })
      .then((entries) => {
        if (!cancelled && entries.length > 0) setServerEntries(entries);
      })
      .catch((err) => console.warn('Leaderboard: score sync failed', err));
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.progress.xp]);

  const isUser = (name: string) => name === user.username;

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] pb-24">
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
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Leaderboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Top 3 Podium with Banners */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[1, 0, 2].map((idx) => {
            const entry = allEntries[idx];
            if (!entry) return null;
            const isFirst = idx === 0;
            
            return (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`text-center ${isFirst ? 'order-2' : idx === 1 ? 'order-1' : 'order-3'}`}
              >
                {/* Banner */}
                <div 
                  className="rounded-lg overflow-hidden mb-2 relative"
                  style={{ 
                    background: entry.bannerBg,
                    height: isFirst ? '80px' : '60px',
                  }}
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1 ? 'bg-[#c9a84c] text-[#1a2332]' :
                    entry.rank === 2 ? 'bg-[#c0c0c0] text-[#1a2332]' :
                    'bg-[#cd7f32] text-[#1a2332]'
                  }`}>
                    {entry.rank}
                  </div>
                  {/* Stickers on banner */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1 flex-wrap p-2">
                    {entry.stickers.slice(0, 4).map((sticker, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        className="text-lg"
                      >
                        {sticker}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-sm font-bold mx-auto mb-1 -mt-5 border-2 border-white dark:border-[#0f1720] ${
                  isUser(entry.name) ? 'ring-2 ring-[#c9a84c]' : ''
                }`}>
                  {entry.name.split(' ').pop()?.charAt(0)}
                </div>
                <p className={`text-xs font-semibold truncate ${isUser(entry.name) ? 'text-[#c9a84c]' : 'text-[#1a2332] dark:text-white'}`}>
                  {entry.name.split(' ').slice(1).join(' ')}
                </p>
                <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{entry.xp} XP</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full List with Banners */}
        <div className="space-y-3">
          {allEntries.slice(3).map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`card p-0 overflow-hidden ${isUser(entry.name) ? 'ring-2 ring-[#c9a84c]' : ''}`}
            >
              <div className="flex items-center gap-3">
                {/* Mini Banner */}
                <div 
                  className="w-16 h-16 flex items-center justify-center gap-0.5 flex-shrink-0 relative"
                  style={{ background: entry.bannerBg }}
                >
                  <span className="absolute top-0.5 left-0.5 text-[8px] font-bold text-white/80">
                    #{entry.rank}
                  </span>
                  {entry.stickers.slice(0, 3).map((sticker, i) => (
                    <span key={i} className="text-sm">{sticker}</span>
                  ))}
                </div>
                
                <div className="flex-1 min-w-0 py-2">
                  <p className={`text-sm font-semibold truncate ${isUser(entry.name) ? 'text-[#c9a84c]' : 'text-[#1a2332] dark:text-white'}`}>
                    {entry.name}{isUser(entry.name) ? ' (You)' : ''}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{entry.lessons} lessons</span>
                    {entry.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                        <FireIcon /> {entry.streak}d
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right pr-3">
                  <p className="text-sm font-bold text-[#1a2332] dark:text-white">{entry.xp}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Banner Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mt-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white">Your Banner</h3>
            <button
              onClick={() => setCurrentView('banner')}
              className="text-xs font-semibold text-[#c9a84c] hover:text-[#a68a3a]"
            >
              Customize
            </button>
          </div>
          <div
            className="rounded-lg h-24 sm:h-28 relative overflow-hidden"
            style={{ background: user.bannerBg }}
          >
            {user.bannerStickers.length > 0 ? (
              user.bannerStickers.map((s) => (
                <span
                  key={s.id}
                  className="absolute text-2xl select-none pointer-events-none"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale ?? 1})`,
                    zIndex: s.zIndex ?? 1,
                  }}
                >
                  {stickerIcon(s, user.progress.stickers)}
                </span>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-white/70">Add stickers to your banner</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
              {user.progress.stickers.length} sticker{user.progress.stickers.length !== 1 ? 's' : ''} earned
            </span>
          </div>

          {/* Share progress card (Web Share API → clipboard → download fallback) */}
          <div className="mt-4 flex justify-end">
            <ShareCardTemplate />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
