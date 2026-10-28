import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { getSongsForLevel } from '../data';

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

  const songs = getSongsForLevel(user.instrumentLevel, user.instrumentId);
  const listA = songs.listA;
  const listB = songs.listB;

  const toggleSong = (songId: string, listType: 'A' | 'B') => {
    const current = user.activeSongs;
    
    // Check if this song is already selected
    if (current.includes(songId)) {
      setActiveSongs(current.filter(s => s !== songId));
      return;
    }
    
    // Get the other selected song from the opposite list
    const otherListSongs = listType === 'A' ? listB : listA;
    const selectedFromOtherList = current.find(s => 
      otherListSongs.some(song => song.id === s)
    );
    
    // If we already have a song from the other list, replace the current list's song
    if (selectedFromOtherList) {
      const currentListSongs = listType === 'A' ? listA : listB;
      const newSongs = current.filter(s => !currentListSongs.some(song => song.id === s));
      setActiveSongs([...newSongs, songId]);
    } else {
      // Otherwise, just add this song
      setActiveSongs([...current, songId]);
    }
  };

  // Check if we have exactly 1 from List A and 1 from List B
  const hasOneFromA = listA.some(song => user.activeSongs.includes(song.id));
  const hasOneFromB = listB.some(song => user.activeSongs.includes(song.id));
  const canContinue = hasOneFromA && hasOneFromB;

  const handleContinue = () => {
    if (!canContinue) {
      setShowWarning(true);
      return;
    }
    setCurrentView('dashboard');
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-white dark:bg-[#1a2332] border-b border-[#c8c8c8] dark:border-[#2a3545] px-4 py-4 sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-xl mx-auto flex items-center gap-4">
          {user.songsSelected && (
            <motion.button
              onClick={() => setCurrentView('dashboard')}
              className="text-[#5a6577] dark:text-[#9aa3b0] hover:text-[#1a2332] dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeftIcon />
            </motion.button>
          )}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span 
              className="text-[#c9a84c]"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <MusicIcon />
            </motion.span>
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">
              {user.songsSelected ? 'Your Songs' : 'Choose Your Songs'}
            </h1>
          </motion.div>
          <motion.div 
            className="ml-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <motion.span 
              className={`text-xs font-bold px-2 py-1 rounded ${
                canContinue 
                  ? 'bg-[#3a8a5c]/10 text-[#3a8a5c]' 
                  : 'bg-[#c44536]/10 text-[#c44536]'
              }`}
              animate={canContinue ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {user.activeSongs.length}/2 selected
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="max-w-xl mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Warning for first-time */}
        {!user.songsSelected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#c9a84c]/5 border border-[#c9a84c]/30 dark:bg-[#c9a84c]/10 rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
              <span className="font-semibold text-[#1a2332] dark:text-white">Required: </span>
              Choose 1 song from List A and 1 from List B for Level {user.instrumentLevel}
            </p>
          </motion.div>
        )}

        {/* List A */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide">
              List A
            </h3>
            <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0]">
              {user.activeSongs.filter(s => listA.map(ls => ls.id).includes(s)).length}/1 selected
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {listA.map(song => {
              const isSelected = user.activeSongs.includes(song.id);
              
              return (
                <motion.button
                  key={song.id}
                  onClick={() => toggleSong(song.id, 'A')}
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
                    {song.book && (
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{song.book}{song.page ? `, p. ${song.page}` : ''}</p>
                    )}
                    {song.rcmEquivalent && (
                      <p className="text-xs text-[#c9a84c] dark:text-[#c9a84c] mt-1">{song.rcmEquivalent}</p>
                    )}
                  </div>
                  {isSelected && (
                    <span className="text-[#c9a84c]"><CheckIcon /></span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* List B */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide">
              List B
            </h3>
            <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0]">
              {user.activeSongs.filter(s => listB.map(ls => ls.id).includes(s)).length}/1 selected
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {listB.map(song => {
              const isSelected = user.activeSongs.includes(song.id);
              
              return (
                <motion.button
                  key={song.id}
                  onClick={() => toggleSong(song.id, 'B')}
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
                    {song.rcmEquivalent && (
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">{song.rcmEquivalent}</p>
                    )}
                  </div>
                  {isSelected && (
                    <span className="text-[#c9a84c]"><CheckIcon /></span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

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
                  You must select 2 songs before continuing. Pick 1 from List A and 1 from List B.
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
    </motion.div>
  );
}
