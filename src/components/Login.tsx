import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

export default function Login() {
  const { login, darkMode, setDarkMode } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [rank, setRank] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rank.trim().length < 1) {
      setError('Please enter your rank');
      return;
    }
    if (lastName.trim().length < 1) {
      setError('Please enter your last name');
      return;
    }
    if (!email.trim().toLowerCase().endsWith('.cadets.gc.ca')) {
      setError('Please use your .cadets.gc.ca email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const displayName = `${rank.trim()} ${lastName.trim()}`;
      login(displayName);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-[#0f1720] p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-lg bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#1a2332' : '#c9a84c'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="font-semibold text-[#1a2332] dark:text-white text-lg tracking-tight">Cadet Music</span>
        </div>

        <h1 className="text-2xl font-semibold text-[#1a2332] dark:text-white mb-1 text-center">
          {isSignUp ? 'Create account' : 'Sign in'}
        </h1>
        <p className="text-[#5a6577] dark:text-[#9aa3b0] text-sm mb-8 text-center">
          {isSignUp ? 'Join Cadet Music today' : 'Enter your credentials to continue'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
                Rank
              </label>
              <input
                type="text"
                value={rank}
                onChange={(e) => { setRank(e.target.value); setError(''); }}
                placeholder="Cpl"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setError(''); }}
                placeholder="Smith"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
              Cadet365 email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="name@cdt.cadets.gc.ca"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder={isSignUp ? 'Min. 6 characters' : 'Enter your password'}
              className="input-field"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="Re-enter your password"
                className="input-field"
              />
            </div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#c44536] text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 mt-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                {isSignUp ? 'Creating account...' : 'Signing in...'}
              </span>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-center text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-8">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-[#c9a84c] hover:text-[#a68a3a] font-semibold transition-colors"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        {/* Theme toggle */}
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-xs text-[#9aa3b0] hover:text-[#5a6577] dark:hover:text-[#e8eaed] transition-colors"
          >
            {darkMode ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
