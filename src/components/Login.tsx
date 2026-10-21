import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

export default function Login() {
  const { login, darkMode, setDarkMode } = useStore();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    login(username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#58cc02] via-[#46a302] to-[#1cb0f6] dark:from-[#0a1a12] dark:via-[#0d2818] dark:to-[#0a1520]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            🎵
          </motion.div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Cadet Music</h1>
          <p className="text-white/80 text-lg">Learn saxophone the fun way</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#1a2c34] rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-[#3c3c3c] dark:text-white mb-6 text-center">
            Get Started
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#777] dark:text-[#aaa] mb-2 uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 border-2 border-[#e5e5e5] dark:border-[#2a3f4a] rounded-xl text-lg focus:border-[#1cb0f6] dark:focus:border-[#1cb0f6] focus:outline-none transition-colors bg-white dark:bg-[#131f24] text-[#3c3c3c] dark:text-white"
              />
              {error && <p className="text-[#ff4b4b] text-sm mt-1 font-medium">{error}</p>}
            </div>

            <button
              onClick={handleLogin}
              className="btn-primary w-full text-lg py-4"
            >
              START LEARNING
            </button>
          </div>

          {/* Dark mode toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-sm text-[#777] dark:text-[#aaa]">☀️</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                darkMode ? 'bg-[#1cb0f6]' : 'bg-[#e5e5e5]'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
            <span className="text-sm text-[#777] dark:text-[#aaa]">🌙</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { emoji: '🎷', text: 'Saxophone Skills' },
            { emoji: '🎼', text: 'Music Theory' },
            { emoji: '🥁', text: 'Rhythm Training' },
            { emoji: '🏆', text: 'Earn Stickers' },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/20 backdrop-blur rounded-xl p-3 text-center text-white"
            >
              <span className="text-2xl">{f.emoji}</span>
              <p className="text-sm font-semibold mt-1">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
