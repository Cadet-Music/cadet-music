import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStore, User } from '../store';
import { CURRICULUM, getAllLessons } from '../data';
import { CONCEPTS, CONCEPT_NAMES, Concept } from '../competency';
import { generateEnhancedAdminAnalytics, EnhancedConceptAnalytics } from '../adaptive';
import { getInstrument, getTranspositionDescription, concertToWritten, writtenToConcert } from '../instruments';
import { parseUserAgent } from '../utils/telemetry';
import {
  verifyAdminPassword,
  fetchAdminAnalytics,
  AdminAnalyticsReport,
  CadetAnalyticsRow,
  ServerLoginRecord,
} from '../utils/api';

// -----------------------------------------------------------------------------
// Shared bits
// -----------------------------------------------------------------------------

const allLessons = getAllLessons();
const TOTAL_LESSONS = allLessons.length;

type TabId = 'overview' | 'cadets' | 'visitors' | 'device';
type Tone = 'green' | 'red' | 'gold' | 'gray';

const TONE_CLASSES: Record<Tone, string> = {
  green: 'bg-[#3a8a5c]/15 text-[#3a8a5c]',
  red: 'bg-[#c44536]/15 text-[#c44536]',
  gold: 'bg-[#c9a84c]/15 text-[#a68a3a] dark:text-[#c9a84c]',
  gray: 'bg-[#9aa3b0]/15 text-[#5a6577] dark:text-[#9aa3b0]',
};

const MUTED = 'text-[#5a6577] dark:text-[#9aa3b0]';
const STRONG = 'text-[#1a2332] dark:text-white';
const DIVIDER = 'border-[#e2e4e8] dark:border-[#2a3545]';

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}

function StatCard({ label, value, hint, valueClass }: { label: string; value: string | number; hint?: string; valueClass?: string }) {
  return (
    <div className="card">
      <p className={`text-sm ${MUTED}`}>{label}</p>
      <p className={`text-3xl font-bold mt-1 ${valueClass ?? STRONG}`}>{value}</p>
      {hint && <p className={`text-xs mt-1 ${MUTED}`}>{hint}</p>}
    </div>
  );
}

function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h3 className={`font-semibold text-base ${STRONG}`}>{children}</h3>
      {aside}
    </div>
  );
}

const fmtNumber = (n: number) => n.toLocaleString();

const fmtWhen = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

/** Completion is recomputed here from the real curriculum size so it can never
 *  drift from a hard-coded lesson count on the server. */
function completionOf(row: CadetAnalyticsRow): number {
  if (!TOTAL_LESSONS) return row.completionRate;
  return Math.min(100, Math.round((row.lessonsCompleted / TOTAL_LESSONS) * 100));
}

/** CSV export sends the token in an Authorization header (not in the URL, where
 *  it would end up in browser history and server logs) and saves the response. */
async function downloadAnalyticsCsv(token: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/analytics?format=csv', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return {
        ok: false,
        error: res.status === 401
          ? 'Your admin session expired. Sign in again to export.'
          : `CSV export failed (HTTP ${res.status}).`,
      };
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cadet-analytics.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return { ok: true };
  } catch (err) {
    console.warn('csv export failed:', err);
    return { ok: false, error: 'Network error while exporting the CSV.' };
  }
}

// -----------------------------------------------------------------------------
// Visitor data (server report first, this browser's logs as a fallback)
// -----------------------------------------------------------------------------

interface VisitorRow {
  id: string;
  when: string;
  location: string;
  ip: string;
  device: string;
  viewport: string;
  touch: boolean;
}

interface VisitorStats {
  source: 'server' | 'local';
  sessions: number;
  sessionsLast7Days: number;
  uniqueIps: number;
  logins: number;
  touchSessions: number;
  countries: [string, number][];
  cities: [string, number][];
  oses: [string, number][];
  browsers: [string, number][];
  rows: VisitorRow[];
  recentLogins: ServerLoginRecord[];
}

// -----------------------------------------------------------------------------
// Overview tab
// -----------------------------------------------------------------------------

function OverviewTab({
  report,
  loading,
  visitorStats,
  onOpenTab,
}: {
  report: AdminAnalyticsReport | null;
  loading: boolean;
  visitorStats: VisitorStats;
  onOpenTab: (tab: TabId) => void;
}) {
  if (!report) {
    return (
      <div className="card text-center py-10">
        <p className={`font-semibold ${STRONG}`}>{loading ? 'Loading cadet data…' : 'Cadet data isn’t available'}</p>
        <p className={`text-sm mt-1 ${MUTED}`}>
          {loading ? 'This usually takes a second.' : 'Check the error above, then select Refresh to try again.'}
        </p>
      </div>
    );
  }

  const rows = report.cadets;
  const flagged = rows.filter((r) => r.flaggedForHelp);
  const avgCompletion = rows.length ? Math.round(rows.reduce((s, r) => s + completionOf(r), 0) / rows.length) : 0;
  const top = [...rows].sort((a, b) => b.xp - a.xp).slice(0, 5);
  const maxXp = top.length ? Math.max(1, top[0].xp) : 1;

  return (
    <div className="space-y-6">
      {report.meta?.demo && (
        <div className="rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/10 p-4" role="status">
          <p className={`text-sm font-semibold ${STRONG}`}>You’re looking at sample cadets</p>
          <p className={`text-sm mt-1 ${MUTED}`}>
            No real scores have been submitted yet, so these rows are placeholders. They’ll be replaced as soon as a cadet earns XP.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Cadets" value={fmtNumber(report.totals.cadets)} />
        <StatCard label="Average XP" value={fmtNumber(report.totals.avgXP)} hint={`${fmtNumber(report.totals.totalXP)} XP in total`} valueClass="text-[#a68a3a] dark:text-[#c9a84c]" />
        <StatCard label="On a streak" value={fmtNumber(report.totals.activeStreaks)} hint="Cadets practicing recently" valueClass="text-[#3a8a5c]" />
        <StatCard label="Average completion" value={`${avgCompletion}%`} hint={`Of ${TOTAL_LESSONS} lessons`} />
        <StatCard
          label="Need attention"
          value={fmtNumber(flagged.length)}
          hint={flagged.length ? 'See the list below' : 'Everyone is on track'}
          valueClass={flagged.length ? 'text-[#c44536]' : 'text-[#3a8a5c]'}
        />
        <StatCard label="Visits, last 7 days" value={fmtNumber(visitorStats.sessionsLast7Days)} hint={`${fmtNumber(visitorStats.sessions)} total`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <SectionTitle
            aside={
              <button onClick={() => onOpenTab('cadets')} className="text-sm font-semibold text-[#a68a3a] dark:text-[#c9a84c] hover:underline min-h-[40px]">
                View all cadets
              </button>
            }
          >
            Cadets who need attention
          </SectionTitle>
          {flagged.length === 0 ? (
            <p className={`text-sm ${MUTED}`}>Nobody is flagged right now.</p>
          ) : (
            <ul className="space-y-2">
              {flagged.slice(0, 6).map((c) => (
                <li key={c.name} className={`flex items-center justify-between gap-3 border-b last:border-b-0 pb-2 last:pb-0 ${DIVIDER}`}>
                  <span className={`font-medium truncate ${STRONG}`}>{c.name}</span>
                  <span className={`text-xs whitespace-nowrap ${MUTED}`}>
                    {fmtNumber(c.xp)} XP · {c.streak}-day streak · {c.conceptAccuracy === null ? 'no quiz data' : `${c.conceptAccuracy}% accuracy`}
                  </span>
                </li>
              ))}
              {flagged.length > 6 && <li className={`text-xs ${MUTED}`}>and {flagged.length - 6} more</li>}
            </ul>
          )}
          <p className={`text-xs mt-4 ${MUTED}`}>
            A cadet is flagged when quiz accuracy is under 60% across 10 or more answers, or when they have under 500 XP and no active streak.
          </p>
        </div>

        <div className="card">
          <SectionTitle>Top cadets by XP</SectionTitle>
          {top.length === 0 ? (
            <p className={`text-sm ${MUTED}`}>No cadets yet.</p>
          ) : (
            <ol className="space-y-3">
              {top.map((c, i) => (
                <li key={c.name}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className={`font-medium truncate ${STRONG}`}>{i + 1}. {c.name}</span>
                    <span className={MUTED}>{fmtNumber(c.xp)} XP</span>
                  </div>
                  <div className="h-1.5 mt-1 rounded-full bg-[#e2e4e8] dark:bg-[#2a3545] overflow-hidden">
                    <div className="h-full rounded-full bg-[#c9a84c]" style={{ width: `${Math.round((c.xp / maxXp) * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <p className={`text-xs ${MUTED}`}>Updated {new Date(report.generatedAt).toLocaleString()}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Cadets tab (search, filter, sort)
// -----------------------------------------------------------------------------

type SortKey = 'name' | 'xp' | 'streak' | 'completion' | 'accuracy';
type CadetFilter = 'all' | 'help' | 'ok';

function CadetsTab({ rows }: { rows: CadetAnalyticsRow[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CadetFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('xp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = rows.filter(
      (r) =>
        (filter === 'all' || (filter === 'help') === r.flaggedForHelp) &&
        (!q || r.name.toLowerCase().includes(q)),
    );
    const dir = sortDir === 'asc' ? 1 : -1;
    const num = (r: CadetAnalyticsRow): number =>
      sortKey === 'xp' ? r.xp
        : sortKey === 'streak' ? r.streak
        : sortKey === 'completion' ? completionOf(r)
        : r.conceptAccuracy ?? -1;
    return [...filtered].sort((a, b) =>
      sortKey === 'name' ? dir * a.name.localeCompare(b.name) : dir * (num(a) - num(b)),
    );
  }, [rows, query, filter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  };

  const columns: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Cadet' },
    { key: 'xp', label: 'XP' },
    { key: 'streak', label: 'Streak' },
    { key: 'completion', label: 'Lessons done' },
    { key: 'accuracy', label: 'Quiz accuracy' },
  ];

  const filters: { id: CadetFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'help', label: 'Need attention' },
    { id: 'ok', label: 'On track' },
  ];

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          aria-label="Search cadets by name"
          className="input-field sm:max-w-xs"
        />
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter cadets">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`min-h-[40px] px-3 rounded-lg text-sm font-semibold transition-colors ${
                filter === f.id
                  ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#dcdcdc] dark:hover:bg-[#33404f]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className={`text-sm sm:ml-auto ${MUTED}`}>Showing {visible.length} of {rows.length}</p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-sm border-collapse min-w-[680px]">
          <thead>
            <tr className={`text-left border-b ${DIVIDER}`}>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className="py-2 pr-3 font-semibold"
                  aria-sort={sortKey === c.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button
                    onClick={() => toggleSort(c.key)}
                    className={`inline-flex items-center gap-1 min-h-[36px] ${sortKey === c.key ? STRONG : MUTED} hover:underline`}
                  >
                    {c.label}
                    <span aria-hidden="true">{sortKey === c.key ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
                  </button>
                </th>
              ))}
              <th scope="col" className={`py-2 font-semibold ${MUTED}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className={`py-10 text-center ${MUTED}`}>
                  {rows.length === 0
                    ? 'No cadets yet. They appear here after they earn XP and their score is submitted.'
                    : 'No cadets match your search or filter.'}
                </td>
              </tr>
            ) : (
              visible.map((row) => {
                const pct = completionOf(row);
                return (
                  <tr key={row.name} className={`border-b last:border-b-0 ${DIVIDER} ${STRONG}`}>
                    <td className="py-3 pr-3 font-medium whitespace-nowrap">{row.name}</td>
                    <td className="py-3 pr-3">{fmtNumber(row.xp)}</td>
                    <td className="py-3 pr-3">{row.streak} {row.streak === 1 ? 'day' : 'days'}</td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#c9a84c]" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs whitespace-nowrap">{row.lessonsCompleted}/{TOTAL_LESSONS} ({pct}%)</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3">{row.conceptAccuracy === null ? '—' : `${row.conceptAccuracy}%`}</td>
                    <td className="py-3">
                      <Pill tone={row.flaggedForHelp ? 'red' : 'green'}>{row.flaggedForHelp ? 'Needs attention' : 'On track'}</Pill>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className={`text-xs mt-4 ${MUTED}`}>
        Quiz accuracy shows “—” until a cadet has answered quiz questions. Export CSV (top right) includes each cadet’s struggling concepts.
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Visitors tab
// -----------------------------------------------------------------------------

function BreakdownCard({ title, entries, accent }: { title: string; entries: [string, number][]; accent: string }) {
  const max = entries.length ? Math.max(1, entries[0][1]) : 1;
  return (
    <div className="card">
      <h4 className={`text-sm font-semibold mb-3 ${STRONG}`}>{title}</h4>
      {entries.length === 0 ? (
        <p className={`text-sm ${MUTED}`}>No data yet</p>
      ) : (
        <ul className="space-y-2">
          {entries.map(([name, count]) => (
            <li key={name}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className={`truncate ${STRONG}`}>{name}</span>
                <span className={`text-xs font-semibold ${MUTED}`}>{count}</span>
              </div>
              <div className="h-1 mt-1 rounded-full bg-[#e2e4e8] dark:bg-[#2a3545] overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.round((count / max) * 100)}%`, backgroundColor: accent }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VisitorsTab({
  stats,
  loading,
  onClearLogs,
}: {
  stats: VisitorStats;
  loading: boolean;
  onClearLogs: () => void;
}) {
  const isServer = stats.source === 'server';
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Pill tone={isServer ? 'green' : 'gold'}>
          {isServer ? 'All devices' : loading ? 'Connecting to server…' : 'This browser only'}
        </Pill>
        <p className={`text-sm ${MUTED}`}>
          {isServer
            ? 'Visits from every device, stored in Vercel KV.'
            : 'The server report isn’t available, so this shows visits logged in this browser. Connect a Vercel KV store to see every device.'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total visits" value={fmtNumber(stats.sessions)} />
        <StatCard label="Last 7 days" value={fmtNumber(stats.sessionsLast7Days)} valueClass="text-[#3a8a5c]" />
        <StatCard label="Unique IP addresses" value={fmtNumber(stats.uniqueIps)} />
        <StatCard label="Cadet logins" value={fmtNumber(stats.logins)} hint={`${fmtNumber(stats.touchSessions)} visits on touch devices`} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <BreakdownCard title="Countries" entries={stats.countries} accent="#c9a84c" />
        <BreakdownCard title="Cities" entries={stats.cities} accent="#4a7c8a" />
        <BreakdownCard title="Operating systems" entries={stats.oses} accent="#3a8a5c" />
        <BreakdownCard title="Browsers" entries={stats.browsers} accent="#6b4c8a" />
      </div>

      <div className="card">
        <SectionTitle
          aside={
            !isServer && stats.rows.length > 0 ? (
              <button
                onClick={() => { if (confirm('Clear all visit logs saved in this browser?')) onClearLogs(); }}
                className="text-sm font-semibold border border-[#c44536]/40 text-[#c44536] hover:bg-[#c44536]/10 px-3 min-h-[40px] rounded transition-colors"
              >
                Clear logs
              </button>
            ) : undefined
          }
        >
          Recent visits
        </SectionTitle>
        {stats.rows.length === 0 ? (
          <p className={`text-sm ${MUTED}`}>
            No visits recorded yet. Every page visit is sent to /api/telemetry, so rows appear here as cadets open the app.
          </p>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className={`text-left border-b ${DIVIDER} ${MUTED}`}>
                  <th scope="col" className="py-2 pr-3 font-semibold">When</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Location</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">IP address</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Device</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Screen</th>
                  <th scope="col" className="py-2 font-semibold">Touch</th>
                </tr>
              </thead>
              <tbody>
                {stats.rows.map((r) => (
                  <tr key={r.id} className={`border-b last:border-b-0 ${DIVIDER} ${STRONG}`}>
                    <td className="py-2 pr-3 whitespace-nowrap">{fmtWhen(r.when)}</td>
                    <td className="py-2 pr-3">{r.location}</td>
                    <td className="py-2 pr-3 font-mono text-xs">{r.ip}</td>
                    <td className="py-2 pr-3 whitespace-nowrap">{r.device}</td>
                    <td className="py-2 pr-3 font-mono text-xs whitespace-nowrap">{r.viewport}</td>
                    <td className="py-2"><Pill tone={r.touch ? 'green' : 'gray'}>{r.touch ? 'Yes' : 'No'}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className={`text-xs mt-4 ${MUTED}`}>
          Location comes from the visitor’s IP address and can be missing when a lookup is rate-limited. The server keeps the latest 500 records.
        </p>
      </div>

      {isServer && (
        <div className="card">
          <SectionTitle>Recent cadet logins</SectionTitle>
          {stats.recentLogins.length === 0 ? (
            <p className={`text-sm ${MUTED}`}>No cadet logins recorded yet.</p>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-sm border-collapse min-w-[600px]">
                <thead>
                  <tr className={`text-left border-b ${DIVIDER} ${MUTED}`}>
                    <th scope="col" className="py-2 pr-3 font-semibold">When</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">Cadet</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">Instrument</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">Progress</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">XP</th>
                    <th scope="col" className="py-2 font-semibold">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentLogins.map((l) => (
                    <tr key={l.id} className={`border-b last:border-b-0 ${DIVIDER} ${STRONG}`}>
                      <td className="py-2 pr-3 whitespace-nowrap">{fmtWhen(l.timestamp)}</td>
                      <td className="py-2 pr-3 font-medium">{l.username || '—'}</td>
                      <td className="py-2 pr-3">{l.instrument || '—'}</td>
                      <td className="py-2 pr-3">{l.lessonProgress || '—'}</td>
                      <td className="py-2 pr-3">{fmtNumber(l.xp)}</td>
                      <td className="py-2">{l.streak}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// This device tab (the admin's own local profile — NOT cadet data)
// -----------------------------------------------------------------------------

// Read-only demo profile, used only when the unlock gesture happens before any
// login exists, so this tab still works instead of showing nothing.
function makeDemoUser(): User {
  return {
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
}

const CLIENT_DEV_FALLBACK = 'password';

function DeviceTab({ email }: { email: string }) {
  const { user, resetAll } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetting, setResetting] = useState(false);

  const effectiveUser: User = (user as unknown as User) ?? makeDemoUser();
  const progress = effectiveUser.progress;
  const completed = progress.completedLessons;
  const completionPercent = TOTAL_LESSONS ? Math.round((completed.length / TOTAL_LESSONS) * 100) : 0;

  const conceptStats = useMemo(
    () => generateEnhancedAdminAnalytics(progress.conceptMastery, Object.values(CONCEPTS) as Concept[]),
    [progress.conceptMastery],
  );
  const withData = conceptStats.filter((a) => a.attempts > 0).sort((a, b) => b.accuracy - a.accuracy);
  const focus = conceptStats.filter((a) => a.attempts >= 10 && a.accuracy < 70).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  const trouble = conceptStats.filter((a) => a.attempts >= 10 && a.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);

  const closeReset = () => {
    setShowReset(false);
    setResetPassword('');
    setResetError('');
  };

  useEffect(() => {
    if (!showReset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowReset(false);
        setResetPassword('');
        setResetError('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showReset]);

  const confirmReset = async () => {
    if (resetting) return;
    setResetting(true);
    let ok = false;
    try {
      const result = await verifyAdminPassword(email.trim(), resetPassword);
      ok = result.ok;
      if (!ok && import.meta.env.DEV) ok = resetPassword === CLIENT_DEV_FALLBACK; // local dev only
    } catch (err) {
      console.error('reset password check failed:', err);
    }
    setResetting(false);
    if (ok) {
      resetAll();
      closeReset();
    } else {
      setResetError('That password is incorrect.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#c9a84c]/40 bg-[#c9a84c]/10 p-4" role="note">
        <p className={`text-sm font-semibold ${STRONG}`}>This tab shows only this device</p>
        <p className={`text-sm mt-1 ${MUTED}`}>
          It’s the profile saved in this browser, useful for previewing the app as a cadet. For real cadet data, use the Overview and Cadets tabs.
        </p>
      </div>

      <div className="card">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1a2332] dark:bg-[#c9a84c] flex items-center justify-center text-white dark:text-[#1a2332] text-xl font-bold flex-shrink-0">
            {effectiveUser.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`text-xl font-semibold ${STRONG}`}>{effectiveUser.username}</h2>
            <p className={`text-sm ${MUTED}`}>{effectiveUser.email || 'N/A'}</p>
            <p className={`text-sm mt-2 ${MUTED}`}>
              {effectiveUser.instrument} sax · Theory level {effectiveUser.theoryLevel} · Playing level {effectiveUser.instrumentLevel}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <StatCard label="XP" value={fmtNumber(progress.xp)} valueClass="text-[#a68a3a] dark:text-[#c9a84c]" />
          <StatCard label="Level" value={progress.level} />
          <StatCard label="Streak" value={`${progress.streak}d`} valueClass={progress.streak > 0 ? 'text-[#3a8a5c]' : 'text-[#c44536]'} />
          <StatCard label="Lessons done" value={`${completionPercent}%`} hint={`${completed.length} of ${TOTAL_LESSONS}`} />
        </div>
      </div>

      <div className="card">
        <SectionTitle>Concept performance</SectionTitle>
        {withData.length === 0 ? (
          <p className={`text-sm ${MUTED}`}>No quiz answers recorded on this device yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {withData.map((item: EnhancedConceptAnalytics) => {
              const barColor = item.accuracy >= 80 ? '#3a8a5c' : item.accuracy >= 60 ? '#c9a84c' : '#c44536';
              const tone: Tone =
                item.state === 'Mastered' ? 'green'
                  : item.state === 'Proficient' || item.state === 'Developing' ? 'gold'
                  : item.state === 'Learning' ? 'red'
                  : 'gray';
              return (
                <div key={item.concept} className={`border rounded-lg p-3 ${DIVIDER}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-sm font-semibold ${STRONG}`}>{CONCEPT_NAMES[item.concept]}</span>
                    <div className="flex items-center gap-2">
                      <Pill tone={tone}>{item.state}</Pill>
                      <span className="text-sm font-bold" style={{ color: barColor }}>{item.accuracy}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full" style={{ width: `${item.accuracy}%`, backgroundColor: barColor }} />
                  </div>
                  <p className={`text-xs ${MUTED}`}>
                    {item.attempts} attempts · {item.mastery}% mastery
                    {item.lastReviewed ? ` · last reviewed ${new Date(item.lastReviewed).toLocaleDateString()}` : ''}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {focus.length > 0 && (
          <div className="mt-5">
            <p className={`text-sm font-semibold mb-2 ${STRONG}`}>Suggested focus areas</p>
            <div className="flex flex-wrap gap-2">
              {focus.map((item: EnhancedConceptAnalytics) => (
                <Pill key={item.concept} tone="gold">{CONCEPT_NAMES[item.concept]} ({item.accuracy}%)</Pill>
              ))}
            </div>
          </div>
        )}
        {trouble.length > 0 && (
          <div className="mt-5">
            <p className={`text-sm font-semibold mb-2 ${STRONG}`}>Likely trouble areas</p>
            <div className="flex flex-wrap gap-2">
              {trouble.map((item: EnhancedConceptAnalytics) => (
                <Pill key={item.concept} tone="red">{CONCEPT_NAMES[item.concept]} ({item.accuracy}%)</Pill>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <SectionTitle>Curriculum progress</SectionTitle>
        <div className="space-y-2">
          {CURRICULUM.map((section) => {
            const lessons = section.lessons;
            const done = lessons.filter((l) => completed.includes(l.id)).length;
            const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
            const isOpen = expandedSection === section.id;
            return (
              <div key={section.id} className={`border rounded-lg overflow-hidden ${DIVIDER}`}>
                <button
                  onClick={() => setExpandedSection(isOpen ? null : section.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 p-3 min-h-[48px] hover:bg-[#f0f0f0] dark:hover:bg-[#2a3545] transition-colors"
                >
                  <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className={MUTED}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.span>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-semibold ${STRONG}`}>{section.title}</p>
                    <p className={`text-xs ${MUTED}`}>{done} of {lessons.length} lessons · {pct}%</p>
                  </div>
                  <div className="w-16 h-1.5 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#c9a84c]" style={{ width: `${pct}%` }} />
                  </div>
                </button>
                {isOpen && (
                  <div className={`border-t bg-[#fafafa] dark:bg-[#0f1720]/50 ${DIVIDER}`}>
                    {lessons.map((lesson) => {
                      const isDone = completed.includes(lesson.id);
                      return (
                        <div key={lesson.id} className={`flex items-center gap-3 px-3 py-2 pl-10 border-b last:border-b-0 ${DIVIDER}`}>
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                            isDone ? 'bg-[#3a8a5c] text-white' : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0]'
                          }`}>
                            {isDone ? <CheckIcon /> : <span className="text-[8px]">-</span>}
                          </div>
                          <span className={`text-sm flex-1 truncate ${STRONG}`}>{lesson.title}</span>
                          <span className={`text-xs capitalize ${MUTED}`}>{lesson.type}</span>
                          <span className="text-xs font-medium text-[#a68a3a] dark:text-[#c9a84c]">+{lesson.xp} XP</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <details className="card">
        <summary className={`font-semibold text-base cursor-pointer min-h-[40px] ${STRONG}`}>Transposition debug</summary>
        <div className="bg-[#1a2332] dark:bg-[#0f1720] rounded-lg p-4 text-xs font-mono mt-4 space-y-2">
          <div><span className="text-[#9aa3b0]">Instrument ID: </span><span className="text-[#c9a84c] font-semibold">{effectiveUser.instrumentId}</span></div>
          <div><span className="text-[#9aa3b0]">Name: </span><span className="text-white">{getInstrument(effectiveUser.instrumentId)?.name || 'Unknown'}</span></div>
          <div><span className="text-[#9aa3b0]">Transposition: </span><span className="text-white">{getTranspositionDescription(effectiveUser.instrumentId)}</span></div>
          <div><span className="text-[#9aa3b0]">Semitones: </span><span className="text-white">{getInstrument(effectiveUser.instrumentId)?.transpositionSemitones || 0}</span></div>
          <div className="border-t border-[#2a3545] pt-2 mt-2 space-y-1">
            <div><span className="text-[#9aa3b0]">Concert Bb4 → written: </span><span className="text-[#3a8a5c]">{concertToWritten('Bb4', effectiveUser.instrumentId) || 'N/A'}</span></div>
            <div><span className="text-[#9aa3b0]">Concert C5 → written: </span><span className="text-[#3a8a5c]">{concertToWritten('C5', effectiveUser.instrumentId) || 'N/A'}</span></div>
            <div><span className="text-[#9aa3b0]">Written C5 → concert: </span><span className="text-[#c9a84c]">{writtenToConcert('C5', effectiveUser.instrumentId) || 'N/A'}</span></div>
          </div>
        </div>
      </details>

      <div className="card border-[#c44536]/40">
        <SectionTitle>Danger zone</SectionTitle>
        <p className={`text-sm mb-4 ${MUTED}`}>
          Reset clears everything saved in this browser: accounts, progress, XP, stickers, song choices, and banner customizations. Cadet data on the server (leaderboard and visits) is not affected.
        </p>
        <button
          onClick={() => { setShowReset(true); setResetPassword(''); setResetError(''); }}
          className="btn-danger"
        >
          Reset data on this device
        </button>
      </div>

      {showReset && (
        <div
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4"
          onClick={closeReset}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#1a2332] rounded-xl p-6 max-w-md w-full border-2 border-[#c44536]"
          >
            <h3 id="reset-title" className={`text-lg font-bold ${STRONG}`}>Reset data on this device?</h3>
            <p className={`text-sm mt-2 mb-4 ${MUTED}`}>
              This can’t be undone. Enter the admin password to confirm.
            </p>
            <label htmlFor="reset-password" className={`block text-sm font-medium mb-2 ${STRONG}`}>Admin password</label>
            <input
              id="reset-password"
              type="password"
              value={resetPassword}
              onChange={(e) => { setResetPassword(e.target.value); setResetError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmReset(); }}
              className="input-field"
              autoFocus
              autoComplete="current-password"
            />
            {resetError && <p className="text-sm text-[#c44536] mt-2 font-medium" role="alert">{resetError}</p>}
            <div className="flex gap-3 mt-5">
              <button onClick={closeReset} className="flex-1 btn-secondary" disabled={resetting}>Cancel</button>
              <button onClick={confirmReset} className="flex-1 btn-danger" disabled={resetting || !resetPassword}>
                {resetting ? 'Checking…' : 'Reset data'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export default function AdminPanel() {
  // ALL hooks stay at the top, above the login-gate early return (React error
  // #310 happens when a hook runs after a conditional return). Anything with its
  // own hooks lives in a child component instead.
  const { lockAdmin, visitorLogs, clearVisitorLogs } = useStore();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [authed, setAuthed] = useState(false);
  const [gateEmail, setGateEmail] = useState('');
  const [gatePassword, setGatePassword] = useState('');
  const [gateMessage, setGateMessage] = useState<string | null>(null);
  const [gateChecking, setGateChecking] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalyticsReport | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [exporting, setExporting] = useState(false);

  // Live cadet analytics, re-fetched whenever the admin selects Refresh.
  // fetchAdminAnalytics never throws; failures come back as { report: null, error }.
  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    setAnalyticsLoading(true);
    fetchAdminAnalytics(adminToken)
      .then((result) => {
        if (cancelled) return;
        if (result.report) setAnalytics(result.report);
        setApiError(result.report ? null : result.error ?? null);
      })
      .finally(() => {
        if (!cancelled) setAnalyticsLoading(false);
      });
    return () => { cancelled = true; };
  }, [authed, adminToken, refreshKey]);

  // Visitor stats: the server report is the primary source; this browser's
  // localStorage logs are only an offline fallback.
  const serverTelemetry = analytics?.telemetry ?? null;
  const visitorStats = useMemo<VisitorStats>(() => {
    if (serverTelemetry) {
      const rows: VisitorRow[] = serverTelemetry.recentVisitors.map((log) => {
        const parsed = parseUserAgent(log.userAgent);
        const place = [log.city || 'Unknown', log.region].filter(Boolean).join(', ');
        return {
          id: log.id,
          when: log.loggedAt ?? log.timestamp,
          location: log.countryCode ? `${place} (${log.countryCode})` : place,
          ip: log.ip,
          device: `${log.platform || parsed.os} · ${parsed.browser}`,
          viewport: log.viewport,
          touch: log.touch,
        };
      });
      return {
        source: 'server',
        sessions: serverTelemetry.totals.sessions,
        sessionsLast7Days: serverTelemetry.totals.sessionsLast7Days,
        uniqueIps: serverTelemetry.totals.uniqueIps,
        logins: serverTelemetry.totals.logins,
        touchSessions: serverTelemetry.totals.touchSessions,
        countries: serverTelemetry.countries,
        cities: serverTelemetry.cities,
        oses: serverTelemetry.oses,
        browsers: serverTelemetry.browsers,
        rows,
        recentLogins: serverTelemetry.recentLogins,
      };
    }
    const byCountry = new Map<string, number>();
    const byCity = new Map<string, number>();
    const byOS = new Map<string, number>();
    const byBrowser = new Map<string, number>();
    let touchCount = 0;
    const rows: VisitorRow[] = [];
    for (const log of visitorLogs) {
      const country = log.country || 'Unknown';
      byCountry.set(country, (byCountry.get(country) ?? 0) + 1);
      const city = log.city || 'Unknown';
      byCity.set(city, (byCity.get(city) ?? 0) + 1);
      const { os, browser } = parseUserAgent(log.userAgent);
      byOS.set(os, (byOS.get(os) ?? 0) + 1);
      byBrowser.set(browser, (byBrowser.get(browser) ?? 0) + 1);
      if (log.touch) touchCount++;
      const place = [city, log.region].filter(Boolean).join(', ');
      rows.push({
        id: String(log.id),
        when: log.timestamp,
        location: log.countryCode ? `${place} (${log.countryCode.toUpperCase()})` : place,
        ip: log.ip,
        device: `${os} · ${browser}`,
        viewport: log.viewport,
        touch: Boolean(log.touch),
      });
    }
    const topEntries = (m: Map<string, number>): [string, number][] =>
      [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    return {
      source: 'local',
      sessions: visitorLogs.length,
      sessionsLast7Days: visitorLogs.filter(
        (l) => Date.parse(l.timestamp) >= Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).length,
      uniqueIps: new Set(visitorLogs.map((l) => l.ip)).size,
      logins: 0,
      touchSessions: touchCount,
      countries: topEntries(byCountry),
      cities: topEntries(byCity),
      oses: topEntries(byOS),
      browsers: topEntries(byBrowser),
      rows,
      recentLogins: [],
    };
  }, [serverTelemetry, visitorLogs]);

  // Safety net: if the store loses the admin-unlock flag (e.g. a persisted-state
  // migration), leave cleanly instead of rendering a blank screen.
  useEffect(() => {
    if (!useStore.getState().adminUnlocked) lockAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login is verified SERVER-SIDE against ADMIN_PASSWORD (Vercel). The
  // 'password' fallback exists only for local `npm run dev`, where there is no
  // serverless runtime; it's compiled out of production builds.
  const handleGateSubmit = async () => {
    if (!gatePassword || gateChecking) return;
    setGateChecking(true);
    let ok = false;
    let token: string | null = null;
    let loginError: string | undefined;
    try {
      const result = await verifyAdminPassword(gateEmail.trim(), gatePassword);
      ok = result.ok;
      token = result.token;
      loginError = result.error;
      if (!ok && import.meta.env.DEV) ok = gatePassword === CLIENT_DEV_FALLBACK;
    } catch (err) {
      console.error('admin gate check failed:', err);
      ok = false;
      loginError = 'Something went wrong while checking the login. Try again.';
    } finally {
      setGateChecking(false);
    }
    // Production must receive a real bearer token before any data is shown.
    if (ok && !token && !import.meta.env.DEV) {
      ok = false;
      loginError = 'Login worked but no session token came back. Check ADMIN_PASSWORD in Vercel.';
    }
    if (ok) {
      setAdminToken(token);
      setAuthed(true);
      setGateMessage(null);
      setApiError(null);
    } else {
      // Show the real reason (bad email format, wrong password, server not
      // configured) instead of a generic message.
      setGateMessage(loginError ?? 'Login failed. Check your email and password.');
    }
  };

  const handleExport = async () => {
    if (!adminToken || exporting) return;
    setExporting(true);
    const result = await downloadAnalyticsCsv(adminToken);
    setExporting(false);
    if (!result.ok) setApiError(result.error ?? 'CSV export failed.');
  };

  // --- Login gate ------------------------------------------------------------
  if (!authed || (!adminToken && !import.meta.env.DEV)) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#c9a84c]"><ShieldIcon /></span>
            <h1 className={`text-lg font-semibold ${STRONG}`}>Admin sign in</h1>
          </div>
          <p className={`text-sm mb-4 ${MUTED}`}>Enter your cadet email and the admin password.</p>
          <form onSubmit={(e) => { e.preventDefault(); handleGateSubmit(); }}>
            <label htmlFor="admin-email" className={`block text-sm font-medium mb-1 ${STRONG}`}>Cadet email</label>
            <input
              id="admin-email"
              type="email"
              value={gateEmail}
              onChange={(e) => { setGateEmail(e.target.value); setGateMessage(null); }}
              placeholder="name123@cdt.cadets.gc.ca"
              className="input-field mb-3"
              autoFocus
              autoComplete="email"
            />
            <label htmlFor="admin-password" className={`block text-sm font-medium mb-1 ${STRONG}`}>Admin password</label>
            <input
              id="admin-password"
              type="password"
              value={gatePassword}
              onChange={(e) => { setGatePassword(e.target.value); setGateMessage(null); }}
              className="input-field mb-3"
              autoComplete="current-password"
            />
            {gateMessage && (
              <p className="text-sm text-[#c44536] mb-3 font-medium" role="alert">{gateMessage}</p>
            )}
            <div className="flex gap-3">
              <button type="button" onClick={() => lockAdmin()} className="flex-1 btn-secondary" disabled={gateChecking}>
                Exit
              </button>
              <button type="submit" className="flex-1 btn-primary" disabled={gateChecking || !gatePassword}>
                {gateChecking ? 'Checking…' : 'Sign in'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- Panel -----------------------------------------------------------------
  const status: { label: string; tone: Tone } = analyticsLoading
    ? { label: 'Syncing…', tone: 'gray' }
    : apiError
      ? { label: 'Server error', tone: 'red' }
      : analytics
        ? analytics.meta?.demo
          ? { label: 'Sample data', tone: 'gold' }
          : { label: 'Live data', tone: 'green' }
        : import.meta.env.DEV
          ? { label: 'Local mode', tone: 'gray' }
          : { label: 'Connecting…', tone: 'gray' };

  const STATUS_ON_NAVY: Record<Tone, string> = {
    green: 'bg-[#3a8a5c]/25 text-[#8fe0b0]',
    red: 'bg-[#c44536]/30 text-[#ff9b8f]',
    gold: 'bg-[#c9a84c]/25 text-[#e6c872]',
    gray: 'bg-[#2a3545] text-[#9aa3b0]',
  };

  const headerButton =
    'text-sm font-semibold px-3 min-h-[40px] rounded bg-[#2a3545] hover:bg-[#33404f] text-white transition-colors disabled:opacity-50';

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'cadets', label: `Cadets${analytics ? ` (${analytics.totals.cadets})` : ''}` },
    { id: 'visitors', label: `Visitors${visitorStats.sessions > 0 ? ` (${visitorStats.sessions})` : ''}` },
    { id: 'device', label: 'This device' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f1720]">
      <header className="bg-[#1a2332] border-b border-[#2a3545] px-4 py-3 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => lockAdmin()}
              className="text-[#9aa3b0] hover:text-white transition-colors flex items-center gap-1 min-h-[40px]"
            >
              <ChevronLeftIcon />
              <span className="text-sm font-medium">Exit</span>
            </button>
            <span className="text-[#c9a84c]"><ShieldIcon /></span>
            <h1 className="text-lg font-semibold text-white">Admin panel</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_ON_NAVY[status.tone]}`} role="status">
              {status.label}
            </span>
            <button onClick={() => setRefreshKey((k) => k + 1)} disabled={analyticsLoading} className={headerButton}>
              Refresh
            </button>
            {adminToken && (
              <button onClick={handleExport} disabled={exporting} className={headerButton}>
                {exporting ? 'Exporting…' : 'Export CSV'}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#c44536]/10 border border-[#c44536]/40 rounded-lg p-4 mb-6 flex items-start gap-3"
            role="alert"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#c44536]">Couldn’t load data from the server</p>
              <p className={`text-sm break-words ${MUTED}`}>{apiError}</p>
            </div>
            <button
              onClick={() => setApiError(null)}
              aria-label="Dismiss error"
              className={`${MUTED} hover:text-[#1a2332] dark:hover:text-white transition-colors min-h-[40px] min-w-[40px]`}
            >
              ✕
            </button>
          </motion.div>
        )}

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1" role="tablist" aria-label="Admin sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] px-4 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1a2332] dark:bg-[#c9a84c] text-white dark:text-[#1a2332]'
                  : 'bg-[#e8e8e8] dark:bg-[#2a3545] text-[#5a6577] dark:text-[#9aa3b0] hover:bg-[#dcdcdc] dark:hover:bg-[#33404f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div role="tabpanel">
          {activeTab === 'overview' && (
            <OverviewTab report={analytics} loading={analyticsLoading} visitorStats={visitorStats} onOpenTab={setActiveTab} />
          )}
          {activeTab === 'cadets' && (
            analytics ? (
              <CadetsTab rows={analytics.cadets} />
            ) : (
              <div className="card text-center py-10">
                <p className={`font-semibold ${STRONG}`}>{analyticsLoading ? 'Loading cadets…' : 'Cadet data isn’t available'}</p>
                {!analyticsLoading && <p className={`text-sm mt-1 ${MUTED}`}>Select Refresh to try again.</p>}
              </div>
            )
          )}
          {activeTab === 'visitors' && (
            <VisitorsTab stats={visitorStats} loading={analyticsLoading} onClearLogs={clearVisitorLogs} />
          )}
          {activeTab === 'device' && <DeviceTab email={gateEmail} />}
        </div>
      </main>
    </div>
  );
}
