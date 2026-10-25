import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';

interface SavedSession {
  username: string;
  lastLogin: string;
}

export default function Login() {
  const { login, darkMode, setDarkMode } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'name' | 'email'>('name');
  const [rank, setRank] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cadet_music_session');
    if (saved) {
      try {
        setSavedSession(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('cadet_music_session');
      }
    }
  }, []);

  const handleQuickLogin = () => {
    if (savedSession) {
      login({ username: savedSession.username });
    }
  };

  // Simple password storage for demo (in production, use proper backend auth)
  const getStoredPassword = (identifier: string): string | null => {
    const users = JSON.parse(localStorage.getItem('cadet_music_users') || '{}');
    return users[identifier]?.password || null;
  };

  const storePassword = (identifier: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('cadet_music_users') || '{}');
    users[identifier] = { password, createdAt: new Date().toISOString() };
    localStorage.setItem('cadet_music_users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginMethod === 'name') {
      if (rank.trim().length < 1) {
        setError('Please enter your rank');
        return;
      }
      if (lastName.trim().length < 1) {
        setError('Please enter your last name');
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

      const identifier = `${rank.trim()}.${lastName.trim()}`.toLowerCase();
      
      if (isSignUp) {
        // Check if user already exists
        const existingPassword = getStoredPassword(identifier);
        if (existingPassword) {
          setError('An account with this name already exists. Please sign in.');
          return;
        }
        // Store password for new user
        storePassword(identifier, password);
      } else {
        // Validate password for existing user
        const storedPassword = getStoredPassword(identifier);
        if (storedPassword && storedPassword !== password) {
          setError('Incorrect password. Please try again.');
          return;
        }
        // If no stored password (legacy user), store it now
        if (!storedPassword) {
          storePassword(identifier, password);
        }
      }

      setLoading(true);
      setTimeout(() => {
        const displayName = `${rank.trim()} ${lastName.trim()}`;
        localStorage.setItem('cadet_music_session', JSON.stringify({
          username: displayName,
          lastLogin: new Date().toISOString()
        }));
        login({ username: displayName, rank: rank.trim(), lastName: lastName.trim() });
        setLoading(false);
      }, 600);
    } else {
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

      const identifier = email.trim().toLowerCase();
      
      if (isSignUp) {
        // Check if user already exists
        const existingPassword = getStoredPassword(identifier);
        if (existingPassword) {
          setError('An account with this email already exists. Please sign in.');
          return;
        }
        // Store password for new user
        storePassword(identifier, password);
      } else {
        // Validate password for existing user
        const storedPassword = getStoredPassword(identifier);
        if (storedPassword && storedPassword !== password) {
          setError('Incorrect password. Please try again.');
          return;
        }
        // If no stored password (legacy user), store it now
        if (!storedPassword) {
          storePassword(identifier, password);
        }
      }

      setLoading(true);
      setTimeout(() => {
        const emailParts = email.split('@')[0].split('.');
        const lastNameFromEmail = emailParts[1] || 'Cadet';
        const displayName = `Cdt ${lastNameFromEmail.charAt(0).toUpperCase() + lastNameFromEmail.slice(1)}`;
        localStorage.setItem('cadet_music_session', JSON.stringify({
          username: displayName,
          lastLogin: new Date().toISOString()
        }));
        login({ username: displayName, email: email.trim() });
        setLoading(false);
      }, 600);
    }
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
        <motion.div 
          className="flex items-center gap-3 mb-10 justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-lg bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#1a2332' : '#c9a84c'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </motion.div>
          <span className="font-semibold text-[#1a2332] dark:text-white text-lg tracking-tight">Cadet Music</span>
        </motion.div>

        {/* Quick Login Card */}
        {savedSession && !isSignUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2332] border-2 border-[#c9a84c] rounded-xl p-4 mb-6"
          >
            <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mb-2">Welcome back</p>
            <p className="text-lg font-semibold text-[#1a2332] dark:text-white mb-3">{savedSession.username}</p>
            <button
              onClick={handleQuickLogin}
              className="btn-primary w-full py-3"
            >
              Continue as {savedSession.username.split(' ')[0]}
            </button>
            <button
              onClick={() => setSavedSession(null)}
              className="w-full text-center text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-2 hover:text-[#1a2332] dark:hover:text-white"
            >
              Sign in with different account
            </button>
          </motion.div>
        )}

        {!savedSession && (
          <>
            <motion.h1 
              className="text-2xl font-semibold text-[#1a2332] dark:text-white mb-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {isSignUp ? 'Create account' : 'Sign in'}
            </motion.h1>
            <motion.p 
              className="text-[#5a6577] dark:text-[#9aa3b0] text-sm mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isSignUp ? 'Join Cadet Music today' : 'Enter your credentials to continue'}
            </motion.p>

            {/* Login Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setLoginMethod('name')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'name'
                    ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                    : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                }`}
              >
                Rank + Name
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                    : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                }`}
              >
                Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {loginMethod === 'name' ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}

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

            <p className="text-center text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-8">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                className="text-[#c9a84c] hover:text-[#a68a3a] font-semibold transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </>
        )}

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
