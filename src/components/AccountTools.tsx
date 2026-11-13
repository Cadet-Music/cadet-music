import { useState } from 'react';
import { adminResetPassword, adminClearTestData } from '../utils/authApi';

/**
 * Admin-only account tools: reset a cadet's password and clear test data.
 * Passwords are never displayed. A reset produces a temporary password, shown once.
 */
export default function AccountTools({ adminToken }: { adminToken: string | null }) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');

  if (!adminToken) {
    return <div className="card text-sm text-[#5a6577] dark:text-[#9aa3b0]">Unlock the admin panel to manage accounts.</div>;
  }

  const reset = async () => {
    if (busy || !email.trim()) return;
    setBusy(true);
    setTempPassword(null);
    const result = await adminResetPassword(adminToken, email.trim().toLowerCase());
    setBusy(false);
    if (result.ok && result.tempPassword) {
      setTempPassword(result.tempPassword);
      setMessage(`Temporary password for ${email.trim()}. Give it to the cadet once. It is not shown again.`);
    } else {
      setMessage(result.error ?? 'Reset failed.');
    }
  };

  const clearAll = async () => {
    if (busy || confirmText !== 'DELETE TEST DATA') return;
    setBusy(true);
    const result = await adminClearTestData(adminToken);
    setBusy(false);
    setConfirmText('');
    setMessage(result.ok ? `Removed ${result.accountsRemoved ?? 0} test accounts.` : result.error ?? 'Clearing failed.');
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="font-semibold text-base text-[#1a2332] dark:text-white mb-1">Reset a cadet's password</h3>
        <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
          Creates a temporary password. The cadet must choose a new one when they next sign in. All their current sessions stop working.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cadet email"
            aria-label="Cadet email"
            className="input-field"
          />
          <button onClick={reset} disabled={busy || !email.trim()} className="btn-primary sm:w-auto">Reset</button>
        </div>
        {tempPassword && (
          <p className="mt-4 font-mono text-lg tracking-wider text-[#1a2332] dark:text-white" aria-live="polite">{tempPassword}</p>
        )}
      </div>

      <div className="card border-[#c44536]/40">
        <h3 className="font-semibold text-base text-[#1a2332] dark:text-white mb-1">Clear test data</h3>
        <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
          Removes every cadet account, saved profile and leaderboard entry. This cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE TEST DATA"
            aria-label="Confirmation phrase"
            className="input-field"
          />
          <button onClick={clearAll} disabled={busy || confirmText !== 'DELETE TEST DATA'} className="btn-danger sm:w-auto">Clear</button>
        </div>
      </div>

      {message && <p className="text-sm text-[#1a2332] dark:text-white" role="status">{message}</p>}
    </div>
  );
}
