import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { changePassword, fetchProfile, signIn, signUp, type AccountInfo } from '../utils/authApi';

const MIN_PASSWORD = 8;

/**
 * Sign-in and sign-up with a cadet email and password. Passwords are checked on the
 * server; progress is restored from the saved profile on sign-in.
 */
export default function Login() {
  const { startSession, darkMode, setDarkMode } = useStore();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirm, setNewConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  // Set after an admin reset: the cadet must choose a new password before continuing.
  const [mustChange, setMustChange] = useState<AccountInfo | null>(null);

  const finish = async (account: AccountInfo, profileFromServer?: unknown | null) => {
    const profile = profileFromServer ?? null;
    startSession(account, profile);
  };

  const submitSignIn = async () => {
    const result = await signIn({ email: email.trim().toLowerCase(), password });
    if (!result.ok || !result.account) return setError(result.error ?? 'Sign-in failed.');
    if (result.account.mustChange) {
      setMustChange(result.account);
      setPassword('');
      return;
    }
    await finish(result.account, result.profile);
  };

  const submitSignUp = async () => {
    if (!displayName.trim()) return setError('Enter the name you want shown, for example Cdt Smith.');
    if (password.length < MIN_PASSWORD) return setError(`Password must be at least ${MIN_PASSWORD} characters.`);
    if (password !== confirm) return setError('The two passwords do not match.');
    const result = await signUp({ email: email.trim().toLowerCase(), displayName: displayName.trim(), password });
    if (!result.ok || !result.account) return setError(result.error ?? 'Sign-up failed.');
    await finish(result.account, null);
  };

  const submitChange = async () => {
    if (newPassword.length < MIN_PASSWORD) return setError(`New password must be at least ${MIN_PASSWORD} characters.`);
    if (newPassword !== newConfirm) return setError('The two new passwords do not match.');
    const result = await changePassword(password, newPassword);
    if (!result.ok || !result.account) return setError(result.error ?? 'Could not change the password.');
    const profile = await fetchProfile();
    await finish(result.account, profile);
  };

  const submit = async () => {
    if (busy) return;
    setError('');
    if (!email.trim()) return setError('Enter your cadet email.');
    if (!password) return setError('Enter your password.');
    setBusy(true);
    try {
      if (mustChange) await submitChange();
      else if (mode === 'signup') await submitSignUp();
      else await submitSignIn();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-[#0f1720] p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-lg bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#1a2332' : '#c9a84c'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="font-semibold text-[#1a2332] dark:text-white text-lg tracking-tight">Cadet Music</span>
        </div>

        <h1 className="text-2xl font-semibold text-[#1a2332] dark:text-white mb-1 text-center">
          {mustChange ? 'Choose a new password' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </h1>
        <p className="text-[#5a6577] dark:text-[#9aa3b0] text-sm mb-8 text-center">
          {mustChange
            ? 'Your password was reset. Choose a new one to continue.'
            : mode === 'signup'
              ? 'Use your .cadets.gc.ca email address.'
              : 'Use the email and password for your account.'}
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); void submit(); }}
          className="space-y-4"
        >
          {!mustChange && (
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">Cadet email</label>
              <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>
          )}

          {!mustChange && mode === 'signup' && (
            <div>
              <label htmlFor="login-name" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">Name shown in the app</label>
              <input id="login-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Cdt Smith" className="input-field" />
            </div>
          )}

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">
              {mustChange ? 'Temporary password' : 'Password'}
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete={mode === 'signup' && !mustChange ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {!mustChange && mode === 'signup' && (
            <div>
              <label htmlFor="login-confirm" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">Confirm password</label>
              <input id="login-confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field" />
            </div>
          )}

          {mustChange && (
            <>
              <div>
                <label htmlFor="login-new" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">New password</label>
                <input id="login-new" type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" />
              </div>
              <div>
                <label htmlFor="login-new-confirm" className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-1.5">Confirm new password</label>
                <input id="login-new-confirm" type="password" autoComplete="new-password" value={newConfirm} onChange={(e) => setNewConfirm(e.target.value)} className="input-field" />
              </div>
            </>
          )}

          {error && <p className="text-[#c44536] text-sm font-medium" role="alert">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full py-3.5 mt-2 disabled:opacity-60">
            {busy ? 'Please wait…' : mustChange ? 'Save new password' : mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {!mustChange && (
          <p className="text-center text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-8">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(''); }}
              className="text-[#c9a84c] hover:text-[#a68a3a] font-semibold"
            >
              {mode === 'signup' ? 'Sign in' : 'Create account'}
            </button>
          </p>
        )}

        <div className="flex items-center justify-center mt-6">
          <button type="button" onClick={() => setDarkMode(!darkMode)} className="text-xs text-[#9aa3b0] hover:text-[#5a6577] dark:hover:text-[#e8eaed]">
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
