import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore, User } from '../store';
import { CURRICULUM, getAllLessons, CadetLevel } from '../data';
import { CONCEPTS, CONCEPT_NAMES, Concept } from '../competency';
import { generateEnhancedAdminAnalytics, EnhancedConceptAnalytics } from '../adaptive';
import { getInstrument, getTranspositionDescription, concertToWritten, writtenToConcert } from '../instruments';
import { parseUserAgent } from '../utils/telemetry';
import { verifyAdminPassword } from '../utils/api';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const allLessons = getAllLessons();

export default function AdminPanel() {
  const { user, lockAdmin, resetAll, visitorLogs, clearVisitorLogs } = useStore();

  // Safety net: if the store ever loses the admin-unlock flag (e.g. a
  // persisted-state migration) while we are on the admin view, exit cleanly
  // to the dashboard instead of rendering nothing (blank screen).
  useEffect(() => {
    if (!useStore.getState().adminUnlocked) lockAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'progress' | 'visitors'>('progress');
  // Gate the panel itself: the 4-corner gesture only sets `adminUnlocked`;
  // a real admin must also enter the admin password before any data renders.
  const [authed, setAuthed] = useState(false);
  const [gatePassword, setGatePassword] = useState('');
  const [gateError, setGateError] = useState(false);
  const [gateChecking, setGateChecking] = useState(false);

  // Admin password is now verified SERVER-SIDE via /api/admin-login against
  // the ADMIN_PASSWORD environment variable (Vercel). No secret in the bundle.
  // The client-side 'password' string remains ONLY as a fallback for local
  // `npm run dev` where there is no serverless runtime; it disappears from
  // the production bundle because import.meta.env.DEV is statically false
  // after minification.
  const CLIENT_DEV_FALLBACK = 'password';

  const handleGateSubmit = async () => {
    if (!gatePassword || gateChecking) return;
    setGateChecking(true);
    let ok = await verifyAdminPassword(gatePassword);
    if (!ok && import.meta.env.DEV) {
      // Local dev convenience only — never active in production builds.
      ok = gatePassword === CLIENT_DEV_FALLBACK;
    }
    setGateChecking(false);
    if (ok) {
      setAuthed(true);
      setGateError(false);
    } else {
      setGateError(true);
    }
  };

  const handleResetClick = () => {
    setShowResetModal(true);
    setResetPassword('');
    setPasswordError('');
  };

  const handleResetConfirm = async () => {
    let ok = await verifyAdminPassword(resetPassword);
    if (!ok && import.meta.env.DEV) {
      ok = resetPassword === CLIENT_DEV_FALLBACK; // local dev only
    }
    if (ok) {
      resetAll();
      setShowResetModal(false);
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
    setResetPassword('');
    setPasswordError('');
  };

  // --- Password gate -------------------------------------------------------
  // Previously this component returned `null` when no user was logged in,
  // which rendered a completely blank (white) screen after the corner
  // gesture. Now the panel always renders something: a password gate first,
  // then the full admin UI. If there is no local profile yet we build a
  // read-only demo profile so every section still works.
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card w-full max-w-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#c9a84c]"><ShieldIcon /></span>
            <h1 className="text-lg font-semibold text-[#1a2332] dark:text-white">Admin Panel</h1>
          </div>
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mb-4">
            Enter the admin password to continue.
          </p>
          <input
            type="password"
            value={gatePassword}
            onChange={(e) => { setGatePassword(e.target.value); setGateError(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleGateSubmit(); }}
            placeholder="Admin password"
            className="input-field mb-3"
            autoFocus
            aria-label="Admin password"
          />
          {gateError && (
            <p className="text-sm text-[#c44536] mb-3 font-medium">Incorrect password</p>
          )}
          <div className="flex gap-3">
            <button onClick={() => lockAdmin()} className="flex-1 btn-secondary" disabled={gateChecking}>
              Exit
            </button>
            <button onClick={handleGateSubmit} className="flex-1 btn-primary" disabled={gateChecking}>
              {gateChecking ? 'Checking…' : 'Unlock'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Demo profile used only when the unlock gesture is performed before any
  // login exists — keeps the panel functional instead of showing nothing.
  const effectiveUser: User = (user as unknown as User) ?? {
    id: 'demo-admin',
    username: 'Demo',
    rank: 'Cadet',
    lastName: '',
    email: 'N/A',
    avatar: '🎵',
    instrument: 'alto',
    instrumentId: 'alto-sax',
    progress: {
      completedLessons: [],
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      level: 1,
      accuracy: 0,
      stickers: [],
      goalsCompleted: 0,
      conceptMastery: {},
      dailyGoalMinutes: 15,
      streakFreezes: 0,
      longestStreak: 0,
    },
    activeSongs: [],
    theoryLevel: 'BASIC',
    instrumentLevel: 'BASIC',
    onboarded: true,
    songsSelected: true,
    bannerBg: '',
    bannerStickers: [],
  };

  // In production, this would fetch all users from backend
  // For now, we show the current user's data as a demo
  const currentUserData = {
    name: effectiveUser.username,
    email: effectiveUser.email || 'N/A',
    instrument: effectiveUser.instrument,
    xp: effectiveUser.progress.xp,
    streak: effectiveUser.progress.streak,
    level: effectiveUser.progress.level,
    theoryLevel: effectiveUser.theoryLevel,
    instrumentLevel: effectiveUser.instrumentLevel,
    completedLessons: effectiveUser.progress.completedLessons,
    totalLessons: allLessons.length,
    lastActive: effectiveUser.progress.lastActiveDate,
    stickers: effectiveUser.progress.stickers,
  };

  const completionPercent = Math.round((currentUserData.completedLessons.length / currentUserData.totalLessons) * 100);

  // Visitor telemetry aggregates (client-side only, capped in store at 100 entries)
  const visitorStats = useMemo(() => {
    const byCountry = new Map<string, number>();
    const byOS = new Map<string, number>();
    const byBrowser = new Map<string, number>();
    let touchCount = 0;
    for (const log of visitorLogs) {
      const country = log.country || 'Unknown';
      byCountry.set(country, (byCountry.get(country) ?? 0) + 1);
      const { os, browser } = parseUserAgent(log.userAgent);
      byOS.set(os, (byOS.get(os) ?? 0) + 1);
      byBrowser.set(browser, (byBrowser.get(browser) ?? 0) + 1);
      if (log.touch) touchCount++;
    }
    const topEntries = (m: Map<string, number>) =>
      [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    return {
      sessions: visitorLogs.length,
      touchSessions: touchCount,
      countries: topEntries(byCountry),
      oses: topEntries(byOS),
      browsers: topEntries(byBrowser),
    };
  }, [visitorLogs]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      {/* Header */}
      <div className="bg-[#1a2332] border-b border-[#2a3545] px-4 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => lockAdmin()}
              className="text-[#9aa3b0] hover:text-white transition-colors flex items-center gap-2"
            >
              <ChevronLeftIcon />
              <span className="text-sm font-medium">Exit</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]"><ShieldIcon /></span>
              <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetClick}
              className="text-xs font-medium uppercase tracking-wide bg-[#c44536] hover:bg-[#a33628] text-white px-3 py-1.5 rounded transition-colors"
            >
              Reset All Data
            </button>
            <span className="text-xs text-[#9aa3b0] font-medium uppercase tracking-wide bg-[#2a3545] px-2 py-1 rounded">
              Demo Mode
            </span>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-6 max-w-md w-full border-2 border-[#c44536]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#c44536]/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c44536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a2332] dark:text-white">Admin Reset</h3>
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">Enter password to confirm</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1a2332] dark:text-[#e8eaed] mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={resetPassword}
                onChange={(e) => { setResetPassword(e.target.value); setPasswordError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleResetConfirm(); }}
                placeholder="Enter admin password"
                className="input-field"
                autoFocus
              />
              {passwordError && (
                <p className="text-sm text-[#c44536] mt-2 font-medium">{passwordError}</p>
              )}
            </div>

            <div className="bg-[#c44536]/5 border border-[#c44536]/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                <span className="font-semibold text-[#c44536]">Warning:</span> This will delete:
              </p>
              <ul className="text-sm text-[#5a6577] dark:text-[#9aa3b0] mt-2 space-y-1">
                <li>• All user accounts</li>
                <li>• All progress and XP</li>
                <li>• All stickers and achievements</li>
                <li>• All song selections</li>
                <li>• All banner customizations</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleResetCancel}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirm}
                className="flex-1 btn-danger"
              >
                Reset Everything
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tab bar */}
        <div className="flex items-center gap-2 mb-6" role="tablist" aria-label="Admin sections">
          {([
            { id: 'progress', label: 'Cadet Progress' },
            { id: 'visitors', label: `Visitor Telemetry${visitorLogs.length > 0 ? ` (${visitorLogs.length})` : ''}` },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#dcdcdc] dark:hover:bg-[#33404f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'visitors' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {/* Visitor summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Logged Sessions', value: visitorStats.sessions, color: 'text-[#1a2332] dark:text-white' },
                { label: 'Touch Devices', value: visitorStats.touchSessions, color: 'text-[#3a8a5c]' },
                { label: 'Countries', value: visitorStats.countries.length, color: 'text-[#c9a84c]' },
                { label: 'Browsers', value: visitorStats.browsers.length, color: 'text-[#1a2332] dark:text-white' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card text-center"
                >
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Breakdown chips */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { title: 'Top Countries', entries: visitorStats.countries, accent: '#c9a84c' },
                { title: 'Operating Systems', entries: visitorStats.oses, accent: '#3a8a5c' },
                { title: 'Browsers', entries: visitorStats.browsers, accent: '#1a2332' },
              ].map((group) => (
                <div key={group.title} className="card">
                  <h4 className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                    {group.title}
                  </h4>
                  {group.entries.length === 0 ? (
                    <p className="text-xs text-[#9aa3b0]">No data yet</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {group.entries.map(([name, count]) => (
                        <li key={name} className="flex items-center justify-between text-sm">
                          <span className="text-[#1a2332] dark:text-white truncate">{name}</span>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${group.accent}18`, color: group.accent }}
                          >
                            {count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Session table */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide">
                  Recent Sessions
                </h3>
                {visitorLogs.length > 0 && (
                  <button
                    onClick={() => { if (confirm('Clear all visitor logs?')) clearVisitorLogs(); }}
                    className="text-xs font-medium uppercase tracking-wide border border-[#c44536]/40 text-[#c44536] hover:bg-[#c44536]/10 px-3 py-1.5 min-h-[40px] rounded transition-colors"
                  >
                    Clear Logs
                  </button>
                )}
              </div>
              {visitorLogs.length === 0 ? (
                <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
                  No sessions logged yet. Telemetry is collected once per page load from a public
                  IP-info endpoint; results appear here after the next visit.
                </p>
              ) : (
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-xs sm:text-sm border-collapse min-w-[640px]">
                    <thead>
                      <tr className="text-left text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide text-[10px] sm:text-xs border-b border-[#e2e4e8] dark:border-[#2a3545]">
                        <th className="py-2 pr-3 font-semibold">When</th>
                        <th className="py-2 pr-3 font-semibold">Location</th>
                        <th className="py-2 pr-3 font-semibold">IP</th>
                        <th className="py-2 pr-3 font-semibold">OS / Browser</th>
                        <th className="py-2 pr-3 font-semibold">Viewport</th>
                        <th className="py-2 font-semibold">Touch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitorLogs.map((log) => {
                        const parsed = parseUserAgent(log.userAgent);
                        return (
                          <tr
                            key={log.id}
                            className="border-b border-[#e8e8e8] dark:border-[#2a3545] last:border-b-0 text-[#1a2332] dark:text-white"
                          >
                            <td className="py-2 pr-3 whitespace-nowrap">
                              {new Date(log.timestamp).toLocaleString(undefined, {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                              })}
                            </td>
                            <td className="py-2 pr-3">
                              <span className="font-medium">{log.city}</span>
                              <span className="text-[#5a6577] dark:text-[#9aa3b0]">
                                {log.region ? `, ${log.region}` : ''}
                                {log.countryCode ? ` (${log.countryCode.toUpperCase()})` : ''}
                              </span>
                            </td>
                            <td className="py-2 pr-3 font-mono text-[10px] sm:text-xs">{log.ip}</td>
                            <td className="py-2 pr-3 whitespace-nowrap">
                              {parsed.os} · {parsed.browser}
                            </td>
                            <td className="py-2 pr-3 font-mono text-[10px] sm:text-xs whitespace-nowrap">
                              {log.viewport}
                            </td>
                            <td className="py-2">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  log.touch ? 'bg-[#3a8a5c]/15 text-[#3a8a5c]' : 'bg-[#9aa3b0]/15 text-[#9aa3b0]'
                                }`}
                              >
                                {log.touch ? 'YES' : 'NO'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-[10px] text-[#9aa3b0] mt-4">
                Client-side only — logs are stored in this browser&apos;s localStorage (capped at 100
                sessions) and never sent to a server. Geolocation is coarse (IP-derived) and may be
                unavailable when rate-limited or offline.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (<>
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-lg p-4 mb-6"
        >
          <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">
            <span className="font-semibold text-[#1a2332] dark:text-white">Note: </span>
            This is demo mode showing your own data. With a backend, you'd see all cadets' progress, 
            who's struggling, completion rates, and detailed analytics.
          </p>
        </motion.div>

        {/* Current User Overview */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-xl font-bold flex-shrink-0">
              {currentUserData.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-[#1a2332] dark:text-white">{currentUserData.name}</h2>
              <p className="text-sm text-[#5a6577] dark:text-[#9aa3b0]">{currentUserData.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-xs font-medium text-[#5a6577] dark:text-[#9aa3b0] bg-[#e8e8e8] dark:bg-[#2a3545] px-2 py-0.5 rounded">
                  {currentUserData.instrument} sax
                </span>
                <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                  Theory Lv.{currentUserData.theoryLevel} · Playing Lv.{currentUserData.instrumentLevel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'XP', value: currentUserData.xp, color: 'text-[#c9a84c]' },
            { label: 'Level', value: currentUserData.level, color: 'text-[#1a2332] dark:text-white' },
            { label: 'Streak', value: `${currentUserData.streak}d`, color: currentUserData.streak > 0 ? 'text-[#3a8a5c]' : 'text-[#c44536]' },
            { label: 'Progress', value: `${completionPercent}%`, color: 'text-[#1a2332] dark:text-white' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0] mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Admin Analytics - Instructor Only */}
        {(() => {
          const allConcepts = Object.values(CONCEPTS) as Concept[];
          const analytics = generateEnhancedAdminAnalytics(effectiveUser.progress.conceptMastery, allConcepts);
          
          // Filter to only show concepts with data
          const conceptsWithData = analytics.filter(a => a.attempts > 0);
          
          // Identify suggested focus areas (low accuracy with sufficient attempts)
          const suggestedFocus = analytics
            .filter(a => a.attempts >= 10 && a.accuracy < 70)
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 3);
          
          // Identify trouble areas (very low accuracy)
          const troubleAreas = analytics
            .filter(a => a.attempts >= 10 && a.accuracy < 60)
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 3);
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="card mb-6"
            >
              <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide mb-4">
                Concept Performance Analytics
              </h3>
              
              {/* Concept Accuracy with Enhanced Details */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                  Concept Performance
                </p>
                <div className="space-y-3">
                  {conceptsWithData
                    .sort((a, b) => b.accuracy - a.accuracy)
                    .map((item: EnhancedConceptAnalytics) => {
                      const color = item.accuracy >= 80 ? '#3a8a5c' : item.accuracy >= 60 ? '#c9a84c' : '#c44536';
                      const stateColor = item.state === 'Mastered' ? '#3a8a5c' : 
                                        item.state === 'Proficient' ? '#c9a84c' : 
                                        item.state === 'Developing' ? '#d4903a' : 
                                        item.state === 'Learning' ? '#c44536' : '#9aa3b0';
                      
                      return (
                        <div key={item.concept} className="border border-[#e2e4e8] dark:border-[#2a3545] rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-[#1a2332] dark:text-white">
                              {CONCEPT_NAMES[item.concept]}
                            </span>
                            <div className="flex items-center gap-2">
                              <span 
                                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{ backgroundColor: `${stateColor}20`, color: stateColor }}
                              >
                                {item.state}
                              </span>
                              <span className="text-sm font-bold" style={{ color }}>
                                {item.accuracy}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="h-1.5 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden mb-2">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${item.accuracy}%`, backgroundColor: color }}
                            />
                          </div>
                          
                          {/* Detailed stats */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[#5a6577] dark:text-[#9aa3b0]">Attempts: </span>
                              <span className="font-semibold text-[#1a2332] dark:text-white">{item.attempts}</span>
                            </div>
                            <div>
                              <span className="text-[#5a6577] dark:text-[#9aa3b0]">Mastery: </span>
                              <span className="font-semibold text-[#1a2332] dark:text-white">{item.mastery}%</span>
                            </div>
                            <div>
                              <span className="text-[#5a6577] dark:text-[#9aa3b0]">Weight: </span>
                              <span className="font-semibold text-[#1a2332] dark:text-white">{item.adaptiveWeight.toFixed(2)}x</span>
                            </div>
                            <div>
                              <span className="text-[#5a6577] dark:text-[#9aa3b0]">Recency: </span>
                              <span className="font-semibold text-[#1a2332] dark:text-white">{(item.recencyMultiplier * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          
                          {item.lastReviewed && (
                            <div className="mt-2 text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                              Last reviewed: {new Date(item.lastReviewed).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Suggested Focus Areas */}
              {suggestedFocus.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                    Suggested Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedFocus.map((item: EnhancedConceptAnalytics) => (
                      <span
                        key={item.concept}
                        className="text-xs font-medium px-2 py-1 rounded bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20"
                      >
                        {CONCEPT_NAMES[item.concept]} ({item.accuracy}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Predicted Trouble Areas */}
              {troubleAreas.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#5a6577] dark:text-[#9aa3b0] uppercase tracking-wide mb-3">
                    Predicted Trouble Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {troubleAreas.map((item: EnhancedConceptAnalytics) => (
                      <span
                        key={item.concept}
                        className="text-xs font-medium px-2 py-1 rounded bg-[#c44536]/10 text-[#c44536] border border-[#c44536]/20"
                      >
                        {CONCEPT_NAMES[item.concept]} ({item.accuracy}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* Transposition Debug View */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card mb-6"
        >
          <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide mb-4">
            Transposition Debug
          </h3>
          
          <div className="bg-[#1a2332] dark:bg-[#0f1720] rounded-lg p-4 text-xs font-mono">
            <div className="space-y-3">
              <div>
                <span className="text-[#9aa3b0]">Selected Instrument: </span>
                <span className="text-[#c9a84c] font-semibold">{effectiveUser.instrumentId}</span>
              </div>
              <div>
                <span className="text-[#9aa3b0]">Instrument Name: </span>
                <span className="text-white">{getInstrument(effectiveUser.instrumentId)?.name || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-[#9aa3b0]">Transposition: </span>
                <span className="text-white">{getTranspositionDescription(effectiveUser.instrumentId)}</span>
              </div>
              <div>
                <span className="text-[#9aa3b0]">Semitones: </span>
                <span className="text-white">{getInstrument(effectiveUser.instrumentId)?.transpositionSemitones || 0}</span>
              </div>
              
              <div className="border-t border-[#2a3545] pt-3 mt-3">
                <p className="text-[#9aa3b0] mb-2">Example Conversions:</p>
                <div className="space-y-1">
                  <div>
                    <span className="text-[#9aa3b0]">Concert Bb4 → Written: </span>
                    <span className="text-[#3a8a5c]">{concertToWritten('Bb4', effectiveUser.instrumentId) || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#9aa3b0]">Concert C5 → Written: </span>
                    <span className="text-[#3a8a5c]">{concertToWritten('C5', effectiveUser.instrumentId) || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#9aa3b0]">Written C5 → Concert: </span>
                    <span className="text-[#c9a84c]">{writtenToConcert('C5', effectiveUser.instrumentId) || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lesson Tree View */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="font-semibold text-sm text-[#1a2332] dark:text-white uppercase tracking-wide mb-4">
            Curriculum Progress
          </h3>
          
          <div className="space-y-2">
            {CURRICULUM.map((section) => {
              const sectionLessons = section.lessons;
              const completedInSection = sectionLessons.filter(l => 
                currentUserData.completedLessons.includes(l.id)
              ).length;
              const sectionPercent = Math.round((completedInSection / sectionLessons.length) * 100);
              const isExpanded = expandedSection === section.id;

              return (
                <div key={section.id} className="border border-[#c8c8c8] dark:border-[#2a3545] rounded-lg overflow-hidden">
                  {/* Section Header */}
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#f0f0f0] dark:hover:bg-[#2a3545] transition-colors"
                  >
                    <motion.span
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      className="text-[#5a6577] dark:text-[#9aa3b0]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-[#1a2332] dark:text-white">{section.title}</p>
                      <p className="text-xs text-[#5a6577] dark:text-[#9aa3b0]">
                        {completedInSection}/{sectionLessons.length} lessons · {sectionPercent}%
                      </p>
                    </div>
                    <div className="w-16">
                      <div className="progress-bar h-1.5">
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${sectionPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Lessons */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-[#c8c8c8] dark:border-[#2a3545] bg-[#fafafa] dark:bg-[#0f1720]/50"
                    >
                      {sectionLessons.map((lesson) => {
                        const isCompleted = currentUserData.completedLessons.includes(lesson.id);
                        
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 px-3 py-2 pl-10 border-b border-[#e8e8e8] dark:border-[#2a3545] last:border-b-0"
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-[#3a8a5c] text-white' 
                                : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                            }`}>
                              {isCompleted ? <CheckIcon /> : <span className="text-[8px]">-</span>}
                            </div>
                            <span className="text-sm text-[#1a2332] dark:text-white flex-1 truncate">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-[#5a6577] dark:text-[#9aa3b0] capitalize">
                              {lesson.type}
                            </span>
                            <span className="text-xs font-medium text-[#c9a84c]">
                              +{lesson.xp} XP
                            </span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Backend Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-6 bg-[#1a2332] text-white"
        >
          <h3 className="font-semibold text-sm uppercase tracking-wide mb-3 text-[#c9a84c]">
            With Backend, You'd See:
          </h3>
          <ul className="space-y-2 text-sm text-[#9aa3b0]">
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              All cadets' progress in real-time
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Who's struggling with which lessons (failed attempts)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Completion rates per section
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Streak tracking across all users
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Export data to CSV for reports
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              Assign songs/levels to specific cadets
            </li>
          </ul>
          <p className="text-xs text-[#5a6577] mt-4">
            See docs/BACKEND_MIGRATION_GUIDE.md for setup instructions
          </p>
        </motion.div>
        </>)}
      </div>
    </div>
  );
}
