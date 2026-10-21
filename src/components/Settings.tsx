import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, AVATARS, Instrument } from '../store';
import { BASIC_SONGS, LEVEL_A_SONGS, LEVEL_B_SONGS } from '../data';

export default function Settings() {
  const { user, setCurrentView, setInstrument, setActiveSongs, setDarkMode, darkMode } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'instrument' | 'songs'>('profile');
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  if (!user) return null;

  const instruments: { id: Instrument; name: string; emoji: string; scale: string }[] = [
    { id: 'alto', name: 'Alto Sax', emoji: '🎷', scale: 'E♭ (G Major)' },
    { id: 'tenor', name: 'Tenor Sax', emoji: '🎷', scale: 'B♭ (C Major)' },
    { id: 'baritone', name: 'Baritone Sax', emoji: '🎷', scale: 'E♭ (G Major)' },
    { id: 'soprano', name: 'Soprano Sax', emoji: '🎷', scale: 'B♭ (C Major)' },
  ];

  const currentSongs = user.instrumentLevel === 0 ? BASIC_SONGS : [...LEVEL_A_SONGS, ...LEVEL_B_SONGS];
  const songLists = user.instrumentLevel === 0 
    ? [{ title: 'Basic Songs', songs: BASIC_SONGS }]
    : [
        { title: 'List A', songs: LEVEL_A_SONGS },
        { title: 'List B', songs: LEVEL_B_SONGS },
      ];

  const toggleSong = (songId: string) => {
    const current = user.activeSongs;
    if (current.includes(songId)) {
      setActiveSongs(current.filter(s => s !== songId));
    } else if (current.length < 2) {
      setActiveSongs([...current, songId]);
    }
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
          <h1 className="text-xl font-bold text-[#3c3c3c] dark:text-white">Settings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-xl mx-auto px-4 pt-4">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'profile' as const, label: '👤 Profile' },
            { id: 'instrument' as const, label: '🎷 Instrument' },
            { id: 'songs' as const, label: '🎵 Songs' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#58cc02] text-white'
                  : 'bg-white dark:bg-[#1a2c34] text-[#777] dark:text-[#aaa] border-2 border-[#e5e5e5] dark:border-[#2a3f4a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Avatar */}
            <div className="card text-center">
              <p className="text-sm font-bold text-[#777] dark:text-[#aaa] uppercase tracking-wide mb-3">Avatar</p>
              <button
                onClick={() => setAvatarPickerOpen(!avatarPickerOpen)}
                className="w-20 h-20 rounded-full bg-[#58cc02] flex items-center justify-center text-4xl border-4 border-[#46a302] mx-auto mb-3 hover:scale-105 transition-transform"
              >
                {user.avatar}
              </button>
              <p className="text-[#777] dark:text-[#aaa] text-sm">Tap to change</p>
              
              {avatarPickerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 grid grid-cols-6 gap-2"
                >
                  {AVATARS.map(a => (
                    <button
                      key={a}
                      onClick={() => {
                        useStore.getState().setUser({ ...user, avatar: a });
                        setAvatarPickerOpen(false);
                      }}
                      className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        user.avatar === a ? 'bg-[#58cc02] scale-110' : 'bg-[#f7f7f7] dark:bg-[#131f24] hover:bg-[#e5e5e5] dark:hover:bg-[#2a3f4a]'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Stats */}
            <div className="card">
              <p className="text-sm font-bold text-[#777] dark:text-[#aaa] uppercase tracking-wide mb-3">Your Stats</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-[#3c3c3c] dark:text-white">{user.progress.xp}</p>
                  <p className="text-xs text-[#777] dark:text-[#aaa]">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-[#3c3c3c] dark:text-white">{user.progress.streak}</p>
                  <p className="text-xs text-[#777] dark:text-[#aaa]">Day Streak 🔥</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-[#3c3c3c] dark:text-white">{user.progress.completedLessons.length}</p>
                  <p className="text-xs text-[#777] dark:text-[#aaa]">Lessons Done</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-[#3c3c3c] dark:text-white">Lv.{user.progress.level}</p>
                  <p className="text-xs text-[#777] dark:text-[#aaa]">Your Level</p>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#3c3c3c] dark:text-white">Dark Mode</p>
                  <p className="text-sm text-[#777] dark:text-[#aaa]">Easier on the eyes</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-14 h-7 rounded-full transition-colors relative ${
                    darkMode ? 'bg-[#1cb0f6]' : 'bg-[#e5e5e5]'
                  }`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform shadow ${
                    darkMode ? 'translate-x-7' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="card">
              <p className="text-sm font-bold text-[#777] dark:text-[#aaa] uppercase tracking-wide mb-2">Name</p>
              <p className="text-xl font-bold text-[#3c3c3c] dark:text-white">{user.username}</p>
            </div>
          </motion.div>
        )}

        {/* Instrument Tab */}
        {activeTab === 'instrument' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-sm text-[#777] dark:text-[#aaa] mb-4">
              Select your instrument. This adjusts scales, fingerings, and transpositions.
            </p>
            {instruments.map(inst => (
              <button
                key={inst.id}
                onClick={() => setInstrument(inst.id)}
                className={`w-full card flex items-center gap-4 text-left transition-all ${
                  user.instrument === inst.id ? 'border-[#58cc02] bg-[#58cc02]/5' : ''
                }`}
              >
                <span className="text-3xl">{inst.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-[#3c3c3c] dark:text-white">{inst.name}</p>
                  <p className="text-sm text-[#777] dark:text-[#aaa]">{inst.scale}</p>
                </div>
                {user.instrument === inst.id && (
                  <span className="text-[#58cc02] text-xl font-bold">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Songs Tab */}
        {activeTab === 'songs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div>
              <p className="text-sm text-[#777] dark:text-[#aaa] mb-2">
                Choose {user.instrumentLevel === 0 ? '2' : '1 from List A + 1 from List B'} focus songs.
              </p>
              <p className="text-sm text-[#777] dark:text-[#aaa]">
                Selected: <span className="font-bold text-[#58cc02]">{user.activeSongs.length}/2</span>
              </p>
            </div>

            {songLists.map(list => (
              <div key={list.title}>
                <h3 className="font-bold text-[#3c3c3c] dark:text-white mb-3">{list.title}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {list.songs.map(song => {
                    const isSelected = user.activeSongs.includes(song.id);
                    const canSelect = isSelected || user.activeSongs.length < 2;
                    
                    return (
                      <button
                        key={song.id}
                        onClick={() => canSelect && toggleSong(song.id)}
                        disabled={!canSelect}
                        className={`card flex items-center gap-4 text-left transition-all ${
                          isSelected ? 'border-[#58cc02] bg-[#58cc02]/5' : ''
                        } ${!canSelect ? 'opacity-50' : ''}`}
                      >
                        <span className="text-3xl">{song.emoji}</span>
                        <div className="flex-1">
                          <p className="font-bold text-[#3c3c3c] dark:text-white">{song.title}</p>
                          <p className="text-sm text-[#777] dark:text-[#aaa]">{song.composer}</p>
                        </div>
                        {isSelected && (
                          <span className="text-[#58cc02] text-xl font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {user.activeSongs.length > 0 && (
              <div className="card bg-[#ffc800]/10 border-[#ffc800]">
                <p className="text-sm text-[#3c3c3c] dark:text-white">
                  ⚠️ Switching songs will reset progress for the removed song. Your XP is kept!
                </p>
              </div>
            )}
          </motion.div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}
