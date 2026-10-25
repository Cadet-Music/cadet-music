import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { BASIC_SONGS, LEVEL_A_SONGS, LEVEL_B_SONGS } from '../data';

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

const MusicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export default function Songs() {
  const { user, setCurrentView, setActiveSongs } = useStore();
  const [showWarning, setShowWarning] = useState(false);

  if (!user) return null;

  const requiredSongs = user.instrumentLevel === 0 ? 2 : 2; // 1 from List A + 1 from List B, or 2 basic
  const songLists = user.instrumentLevel === 0 
    ? [{ title: 'Basic Songs', songs: BASIC_SONGS, required: 2 }]
    : [
        { title: 'List A', songs: LEVEL_A_SONGS, required: 1 },
        { title: 'List B', songs: LEVEL_B_SONGS, required: 1 },
      ];

  const toggleSong = (songId: string, listIndex: number) => {
    const current = user.activeSongs;
    const list = songLists[listIndex];
    const songsInList = list.songs.map(s => s.id);
    const selectedInList = current.filter(s => songsInList.includes(s));
    
    if (current.includes(songId)) {
      // Remove
      setActiveSongs(current.filter(s => s !== songId));
    } else {
      // Check if we can add (respecting per-list limit)
      if (selectedInList.length >= list.required) {
        // Replace the existing one in this list
        const newSongs = current.filter(s => !songsInList.includes(s));
        setActiveSongs([...newSongs, songId]);
      } else {
        // Add
        setActiveSongs([...current, songId]);
      }
    }
  };

  const totalRequired = songLists.reduce((sum, l) => sum + l.required, 0);
  const canContinue = user.activeSongs.length >= totalRequired;

  const handleContinue = () => {
    if (!canContinue) {
      setShowWarning(true);
      return;
    }
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          {user.songsSelected && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors"
            >
              <ChevronLeftIcon />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#c9a84c]"><MusicIcon /></span>
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">
              {user.songsSelected ? 'Your Songs' : 'Choose Your Songs'}
            </h1>
          </div>
          <div className="ml-auto">
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              canContinue 
                ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' 
                : 'bg-[#c44536]/10 text-[#c44536]'
            }`}>
              {user.activeSongs.length}/{totalRequired} selected
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Warning for first-time */}
        {!user.songsSelected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#c9a84c]/5 border border-[#c9a84c]/30 dark:bg-[#c9a84c]/10 rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
              <span className="font-semibold text-[#1a2332] dark:text-white">Required: </span>
              {user.instrumentLevel === 0 
                ? 'Choose 2 basic songs to practice'
                : 'Choose 1 song from List A and 1 from List B'}
            </p>
          </motion.div>
        )}

        {songLists.map((list, listIdx) => (
          <div key={list.title} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide">
                {list.title}
              </h3>
              <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0]">
                {user.activeSongs.filter(s => list.songs.map(ls => ls.id).includes(s)).length}/{list.required} selected
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {list.songs.map(song => {
                const isSelected = user.activeSongs.includes(song.id);
                
                return (
                  <motion.button
                    key={song.id}
                    onClick={() => toggleSong(song.id, listIdx)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`card flex items-center gap-3 text-left py-3 px-4 transition-all ${
                      isSelected ? 'border-[#c9a84c] bg-[#c9a84c]/5 dark:bg-[#c9a84c]/10' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected 
                        ? 'bg-[#c9a84c] text-[#1a2332]' 
                        : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                    }`}>
                      <MusicIcon />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#1a2332] dark:text-white">{song.title}</p>
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{song.composer}</p>
                    </div>
                    {isSelected && (
                      <span className="text-[#c9a84c]"><CheckIcon /></span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky bottom-20 pt-4"
        >
          <button
            onClick={handleContinue}
            disabled={!canContinue && user.songsSelected}
            className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all ${
              canContinue
                ? 'bg-[#c9a84c] text-[#1a2332] hover:bg-[#e0c36a]'
                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
            }`}
          >
            {user.songsSelected ? 'Save Changes' : 'Continue to Dashboard'}
          </button>
        </motion.div>

        {/* Warning Modal */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4"
              onClick={() => setShowWarning(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#1a2332] rounded-xl p-6 max-w-sm w-full border border-[#c8c8c8] dark:border-[#2a3545]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#c44536]"><WarningIcon /></span>
                  <h3 className="font-semibold text-[#1a2332] dark:text-white">Songs Required</h3>
                </div>
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-5">
                  You must select {totalRequired} song{totalRequired > 1 ? 's' : ''} before continuing. 
                  {user.instrumentLevel === 0 
                    ? ' Choose 2 basic songs to practice.'
                    : ' Pick 1 from List A and 1 from List B.'}
                </p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="btn-primary w-full"
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
