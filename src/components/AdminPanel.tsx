import { useState, useEffect, useMemo, Fragment } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AccountTools from './AccountTools';
import { useStore } from '../store';
import { getAllLessons } from '../curriculum';
import { CONCEPT_NAMES, Concept } from '../competency';
import {
  verifyAdminPassword,
  fetchAdminAnalytics,
  AccountActivity,
  AdminAnalyticsReport,
  CadetAnalyticsRow,
  CadetConceptStat,
  FlagReason,
  ServerTelemetryReport,
} from '../utils/api';

// -----------------------------------------------------------------------------
// Shared bits
// -----------------------------------------------------------------------------

// Both instrument paths have the same number of lessons. Completion is computed here from the
// real curriculum so it can never drift from a number hard-coded on the server.
const TOTAL_LESSONS = getAllLessons('alto-sax').length;

type TabId = 'overview' | 'cadets' | 'activity' | 'accounts';
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
// Struggle summaries
// -----------------------------------------------------------------------------

// A concept only counts once a cadet has answered at least this many questions
// on it; below that, one wrong answer would look like a weakness.
const MIN_ANSWERS = 5;
const STRUGGLE_BELOW = 60;
const STRONG_AT_LEAST = 85;

const conceptName = (id: string): string => CONCEPT_NAMES[id as Concept] ?? id;

function joinNames(items: CadetConceptStat[]): string {
  const parts = items.map((c) => `${conceptName(c.concept)} (${c.accuracy}%)`);
  if (parts.length <= 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

interface CadetSummary {
  sentences: string[];
  struggling: CadetConceptStat[];
  strong: CadetConceptStat[];
}

function summarizeCadet(row: CadetAnalyticsRow): CadetSummary {
  const enough = row.concepts.filter((c) => c.attempts >= MIN_ANSWERS);
  const struggling = enough.filter((c) => c.accuracy < STRUGGLE_BELOW).sort((a, b) => a.accuracy - b.accuracy);
  const strong = enough.filter((c) => c.accuracy >= STRONG_AT_LEAST).sort((a, b) => b.accuracy - a.accuracy);

  const sentences: string[] = [];
  if (row.concepts.length === 0) {
    sentences.push('No quiz answers have been recorded yet, so there’s nothing to assess.');
  } else {
    if (struggling.length > 0) {
      sentences.push(`Struggling with ${joinNames(struggling.slice(0, 3))}.`);
    } else if (enough.length > 0) {
      sentences.push(`No concept is below ${STRUGGLE_BELOW}%.`);
    } else {
      sentences.push(`Not enough answers yet to judge any single concept (it takes ${MIN_ANSWERS} or more per concept).`);
    }
    if (strong.length > 0) sentences.push(`Doing well in ${joinNames(strong.slice(0, 3))}.`);
  }
  if (row.daysInactive !== null && row.daysInactive >= 14) {
    sentences.push(`Hasn’t practiced in ${row.daysInactive} days.`);
  } else if (row.daysInactive !== null && row.daysInactive >= 3) {
    sentences.push(`Last practiced ${row.daysInactive} days ago.`);
  }
  sentences.push(`Has finished ${row.lessonsCompleted} of ${TOTAL_LESSONS} lessons (${completionOf(row)}%).`);
  return { sentences, struggling, strong };
}

/** One short line for lists: why this cadet is flagged. */
function attentionReason(row: CadetAnalyticsRow): string {
  const parts: string[] = [];
  const struggling = summarizeCadet(row).struggling.slice(0, 2);
  if (struggling.length > 0) {
    parts.push(`Struggling with ${joinNames(struggling)}`);
  } else if (row.flagReasons.includes('low-accuracy') && row.conceptAccuracy !== null) {
    parts.push(`${row.conceptAccuracy}% accuracy overall`);
  }
  if (row.flagReasons.includes('inactive') && row.daysInactive !== null) {
    parts.push(`inactive for ${row.daysInactive} days`);
  }
  return parts.join(' · ') || 'Needs a check-in';
}

const FLAG_HELP =
  `Flagged when a concept is under ${STRUGGLE_BELOW}% after ${MIN_ANSWERS}+ answers, overall accuracy is under ${STRUGGLE_BELOW}% after 10+ answers, or there’s been no practice for 14+ days.`;

const accuracyColor = (pct: number) => (pct >= 80 ? '#3a8a5c' : pct >= 60 ? '#c9a84c' : '#c44536');

// -----------------------------------------------------------------------------
// Overview tab
// -----------------------------------------------------------------------------

function OverviewTab({
  report,
  loading,
  telemetry,
  onOpenTab,
}: {
  report: AdminAnalyticsReport | null;
  loading: boolean;
  telemetry: ServerTelemetryReport | null;
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
  if (rows.length === 0) {
    return (
      <div className="card text-center py-10">
        <p className={`font-semibold ${STRONG}`}>No cadets have synced yet</p>
        <p className={`text-sm mt-1 ${MUTED}`}>Cadets appear here after they sign in and earn their first XP.</p>
      </div>
    );
  }

  const flagged = rows.filter((r) => r.flaggedForHelp);
  const avgCompletion = Math.round(rows.reduce((s, r) => s + completionOf(r), 0) / rows.length);
  const top = [...rows].sort((a, b) => b.xp - a.xp).slice(0, 5);
  const maxXp = Math.max(1, top[0].xp);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard label="Cadets" value={fmtNumber(report.totals.cadets)} />
        <StatCard label="Average XP" value={fmtNumber(report.totals.avgXP)} hint={`${fmtNumber(report.totals.totalXP)} XP in total`} valueClass="text-[#a68a3a] dark:text-[#c9a84c]" />
        <StatCard label="On a streak" value={fmtNumber(report.totals.activeStreaks)} hint="Practiced in the last day" valueClass="text-[#3a8a5c]" />
        <StatCard label="Average completion" value={`${avgCompletion}%`} hint={`Of ${TOTAL_LESSONS} lessons`} />
        <StatCard
          label="Need attention"
          value={fmtNumber(flagged.length)}
          hint={flagged.length ? 'See the list below' : 'Everyone is on track'}
          valueClass={flagged.length ? 'text-[#c44536]' : 'text-[#3a8a5c]'}
        />
        <StatCard
          label="Sign-ins, last 7 days"
          value={fmtNumber(telemetry?.totals.sessionsLast7Days ?? 0)}
          hint={telemetry ? `${fmtNumber(telemetry.totals.accounts)} cadets have signed in` : 'No sign-in data yet'}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <SectionTitle
            aside={
              <button onClick={() => onOpenTab('cadets')} className="text-sm font-semibold text-[#a68a3a] dark:text-[#c9a84c] hover:underline min-h-[40px]">
                Open cadet details
              </button>
            }
          >
            Cadets who need attention
          </SectionTitle>
          {flagged.length === 0 ? (
            <p className={`text-sm ${MUTED}`}>Nobody is flagged right now.</p>
          ) : (
            <ul className="space-y-3">
              {flagged.slice(0, 6).map((c) => (
                <li key={c.name} className={`border-b last:border-b-0 pb-3 last:pb-0 ${DIVIDER}`}>
                  <p className={`font-medium ${STRONG}`}>{c.name}</p>
                  <p className={`text-sm ${MUTED}`}>{attentionReason(c)}</p>
                </li>
              ))}
              {flagged.length > 6 && <li className={`text-xs ${MUTED}`}>and {flagged.length - 6} more</li>}
            </ul>
          )}
          <p className={`text-xs mt-4 ${MUTED}`}>{FLAG_HELP}</p>
        </div>

        <div className="card">
          <SectionTitle>Where cadets are struggling</SectionTitle>
          {report.commonStruggles.length === 0 ? (
            <p className={`text-sm ${MUTED}`}>
              No concept is a problem yet. This fills in once cadets have answered {MIN_ANSWERS}+ questions on a concept.
            </p>
          ) : (
            <ul className="space-y-3">
              {report.commonStruggles.map((s) => (
                <li key={s.concept}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className={`font-medium ${STRONG}`}>{conceptName(s.concept)}</span>
                    <span className={MUTED}>
                      {s.cadets} {s.cadets === 1 ? 'cadet' : 'cadets'} · {s.avgAccuracy}% average
                    </span>
                  </div>
                  <div className="h-1.5 mt-1 rounded-full bg-[#e2e4e8] dark:bg-[#2a3545] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.round((s.cadets / rows.length) * 100)}%`, backgroundColor: '#c44536' }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className={`text-xs mt-4 ${MUTED}`}>Bars show the share of all cadets who are under {STRUGGLE_BELOW}% on that concept.</p>
        </div>

        <div className="card lg:col-span-2">
          <SectionTitle>Top cadets by XP</SectionTitle>
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
        </div>
      </div>

      <p className={`text-xs ${MUTED}`}>Updated {new Date(report.generatedAt).toLocaleString()}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Cadets tab (search, filter, sort, per-cadet summary)
// -----------------------------------------------------------------------------

type SortKey = 'name' | 'xp' | 'streak' | 'completion' | 'accuracy';
type CadetFilter = 'all' | 'help' | 'ok';

const FLAG_REASON_TEXT: Record<FlagReason, string> = {
  'low-accuracy': 'Low accuracy overall',
  'struggling-concepts': 'Struggling with a concept',
  inactive: 'Not practicing lately',
};

function CadetDetail({ row, account }: { row: CadetAnalyticsRow; account: AccountActivity | null }) {
  const summary = summarizeCadet(row);
  const weakestFirst = [...row.concepts].sort((a, b) => a.accuracy - b.accuracy);
  return (
    <div className={`rounded-lg border p-4 bg-[#fafafa] dark:bg-[#0f1720]/60 ${DIVIDER}`}>
      <p className={`text-sm leading-relaxed ${STRONG}`}>{summary.sentences.join(' ')}</p>

      {account && (
        <p className={`text-xs mt-3 ${MUTED}`}>
          Signed in {account.sessions} {account.sessions === 1 ? 'time' : 'times'}, last on {fmtWhen(account.lastSeen)}
          {account.places.length > 0 ? ` from ${account.places.join(', ')}` : ''}
          {account.devices.length > 0 ? ` on ${account.devices.join(', ')}` : ''}.
        </p>
      )}

      {row.flagReasons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {row.flagReasons.map((r) => (
            <Pill key={r} tone="red">{FLAG_REASON_TEXT[r]}</Pill>
          ))}
        </div>
      )}

      {weakestFirst.length > 0 && (
        <div className="mt-4">
          <p className={`text-sm font-semibold mb-2 ${STRONG}`}>Every concept, weakest first</p>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2">
            {weakestFirst.map((c) => (
              <li key={c.concept}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className={STRONG}>{conceptName(c.concept)}</span>
                  <span className={`text-xs ${MUTED}`}>
                    {c.correct}/{c.attempts} correct
                    {c.attempts < MIN_ANSWERS ? ' · too few answers' : ''}
                  </span>
                </div>
                <div className="h-1.5 mt-1 rounded-full bg-[#e2e4e8] dark:bg-[#2a3545] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.accuracy}%`,
                      backgroundColor: c.attempts < MIN_ANSWERS ? '#9aa3b0' : accuracyColor(c.accuracy),
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={`text-xs mt-4 ${MUTED}`}>
        Last synced {row.lastActive ? fmtWhen(row.lastActive) : 'unknown'} · best streak {row.bestStreak} {row.bestStreak === 1 ? 'day' : 'days'}
      </p>
    </div>
  );
}

function CadetsTab({ rows, activity }: { rows: CadetAnalyticsRow[]; activity: Map<string, AccountActivity> }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CadetFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('xp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [openName, setOpenName] = useState<string | null>(null);

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
        <table className="w-full text-sm border-collapse min-w-[820px]">
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
              <th scope="col" className={`py-2 pr-3 font-semibold ${MUTED}`}>Struggling with</th>
              <th scope="col" className={`py-2 font-semibold ${MUTED}`}>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className={`py-10 text-center ${MUTED}`}>
                  {rows.length === 0
                    ? 'No cadets yet. They appear here after they sign in and earn XP.'
                    : 'No cadets match your search or filter.'}
                </td>
              </tr>
            ) : (
              visible.map((row) => {
                const pct = completionOf(row);
                const isOpen = openName === row.name;
                const struggling = summarizeCadet(row).struggling;
                return (
                  <Fragment key={row.name}>
                    <tr className={`border-b last:border-b-0 ${DIVIDER} ${STRONG}`}>
                      <td className="py-3 pr-3 font-medium whitespace-nowrap">
                        <button
                          onClick={() => setOpenName(isOpen ? null : row.name)}
                          aria-expanded={isOpen}
                          className="inline-flex items-center gap-2 min-h-[36px] hover:underline"
                        >
                          <span aria-hidden="true" className={MUTED}>{isOpen ? '▾' : '▸'}</span>
                          {row.name}
                        </button>
                      </td>
                      <td className="py-3 pr-3">{fmtNumber(row.xp)}</td>
                      <td className="py-3 pr-3">{row.streak} {row.streak === 1 ? 'day' : 'days'}</td>
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#e2e4e8] dark:bg-[#2a3545] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#c9a84c]" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs whitespace-nowrap">{row.lessonsCompleted}/{TOTAL_LESSONS}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-3">{row.conceptAccuracy === null ? '—' : `${row.conceptAccuracy}%`}</td>
                      <td className="py-3 pr-3 max-w-[220px]">
                        {struggling.length === 0 ? (
                          <span className={MUTED}>—</span>
                        ) : (
                          <span className="text-[#c44536] font-medium">
                            {struggling.slice(0, 2).map((c) => conceptName(c.concept)).join(', ')}
                            {struggling.length > 2 ? ` +${struggling.length - 2}` : ''}
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <Pill tone={row.flaggedForHelp ? 'red' : 'green'}>{row.flaggedForHelp ? 'Needs attention' : 'On track'}</Pill>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className={`border-b ${DIVIDER}`}>
                        <td colSpan={7} className="pb-4">
                          <CadetDetail row={row} account={activity.get(row.name.toLowerCase()) ?? null} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <p className={`text-xs mt-4 ${MUTED}`}>
        Select a cadet’s name for a plain-language summary and a breakdown of every concept. {FLAG_HELP}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Activity tab: sign-ins grouped by cadet account
// -----------------------------------------------------------------------------

const relTime = (iso: string): string => {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return '—';
  const mins = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (mins < 60) return mins <= 1 ? 'Just now' : `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'Yesterday' : `${days} days ago`;
};

function ActivityTab({ telemetry, loading }: { telemetry: ServerTelemetryReport | null; loading: boolean }) {
  const [query, setQuery] = useState('');
  const [openName, setOpenName] = useState<string | null>(null);

  if (!telemetry) {
    return (
      <div className="card text-center py-10">
        <p className={`font-semibold ${STRONG}`}>{loading ? 'Loading activity…' : 'Activity isn’t available'}</p>
        {!loading && <p className={`text-sm mt-1 ${MUTED}`}>Select Refresh to try again.</p>}
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const accounts = telemetry.accounts.filter((a) => !q || a.username.toLowerCase().includes(q));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Cadets signed in" value={fmtNumber(telemetry.totals.accounts)} />
        <StatCard label="Sign-ins, last 7 days" value={fmtNumber(telemetry.totals.sessionsLast7Days)} valueClass="text-[#3a8a5c]" />
        <StatCard label="Sign-ins, all time" value={fmtNumber(telemetry.totals.sessions)} />
        <StatCard label="Unidentified visits" value={fmtNumber(telemetry.totals.anonymousVisits)} hint="Page loads with no account" />
      </div>

      <div className="card">
        <SectionTitle
          aside={<p className={`text-sm ${MUTED}`}>Showing {accounts.length} of {telemetry.accounts.length}</p>}
        >
          Who is signing in
        </SectionTitle>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          aria-label="Search accounts by name"
          className="input-field sm:max-w-xs mb-4"
        />

        {accounts.length === 0 ? (
          <p className={`py-8 text-center text-sm ${MUTED}`}>
            {telemetry.accounts.length === 0
              ? 'No sign-ins recorded yet. They appear here as cadets open the app and sign in.'
              : 'No accounts match your search.'}
          </p>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm border-collapse min-w-[760px]">
              <thead>
                <tr className={`text-left border-b ${DIVIDER} ${MUTED}`}>
                  <th scope="col" className="py-2 pr-3 font-semibold">Cadet</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Instrument</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Sign-ins</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Last seen</th>
                  <th scope="col" className="py-2 pr-3 font-semibold">Usual places</th>
                  <th scope="col" className="py-2 font-semibold">Devices</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => {
                  const isOpen = openName === a.username;
                  return (
                    <Fragment key={a.username}>
                      <tr className={`border-b last:border-b-0 ${DIVIDER} ${STRONG}`}>
                        <td className="py-3 pr-3 font-medium whitespace-nowrap">
                          <button
                            onClick={() => setOpenName(isOpen ? null : a.username)}
                            aria-expanded={isOpen}
                            className="inline-flex items-center gap-2 min-h-[36px] hover:underline"
                          >
                            <span aria-hidden="true" className={MUTED}>{isOpen ? '▾' : '▸'}</span>
                            {a.username}
                          </button>
                        </td>
                        <td className="py-3 pr-3">{a.instrument || '—'}</td>
                        <td className="py-3 pr-3 whitespace-nowrap">
                          {a.sessions} <span className={`text-xs ${MUTED}`}>({a.sessionsLast7Days} this week)</span>
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap" title={fmtWhen(a.lastSeen)}>{relTime(a.lastSeen)}</td>
                        <td className="py-3 pr-3">{a.places.join(', ') || '—'}</td>
                        <td className="py-3">{a.devices.join(', ') || '—'}</td>
                      </tr>
                      {isOpen && (
                        <tr className={`border-b ${DIVIDER}`}>
                          <td colSpan={6} className="pb-4">
                            <div className={`rounded-lg border p-4 bg-[#fafafa] dark:bg-[#0f1720]/60 ${DIVIDER}`}>
                              <p className={`text-sm font-semibold mb-1 ${STRONG}`}>Recent sign-ins for {a.username}</p>
                              <p className={`text-xs mb-3 ${MUTED}`}>
                                First seen {fmtWhen(a.firstSeen)} · {a.ipCount} {a.ipCount === 1 ? 'IP address' : 'different IP addresses'}
                                {a.ipCount > 2 ? ' (several devices or networks)' : ''}
                              </p>
                              <ul className="space-y-2">
                                {a.recent.map((r, i) => (
                                  <li key={`${r.when}-${i}`} className={`text-sm flex flex-wrap gap-x-4 gap-y-1 ${STRONG}`}>
                                    <span className="whitespace-nowrap">{fmtWhen(r.when)}</span>
                                    <span>{r.place}</span>
                                    <span>{r.device}</span>
                                    {r.ip && <span className="font-mono text-xs">{r.ip}</span>}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className={`text-xs mt-4 ${MUTED}`}>
          Each sign-in is tied to the cadet’s account, so you can see who was on, from roughly where, and on what device. Place comes from the IP address and can be missing or approximate. The server keeps the latest 500 records.
        </p>
      </div>
    </div>
  );
}

const CLIENT_DEV_FALLBACK = 'password';

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export default function AdminPanel() {
  // ALL hooks stay at the top, above the login-gate early return (React error
  // #310 happens when a hook runs after a conditional return). Anything with its
  // own hooks lives in a child component instead.
  const { lockAdmin } = useStore();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [authed, setAuthed] = useState(false);
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

  // Activity grouped by cadet account (from the server). Also indexed by lowercase name so
  // the Cadets tab can show where and how often each cadet signs in.
  const telemetry = analytics?.telemetry ?? null;
  const activityByName = useMemo(
    () => new Map<string, AccountActivity>((telemetry?.accounts ?? []).map((a) => [a.username.toLowerCase(), a])),
    [telemetry],
  );

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
      const result = await verifyAdminPassword(gatePassword);
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
      setGateMessage(loginError ?? 'Login failed. Check the password and try again.');
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
          <p className={`text-sm mb-4 ${MUTED}`}>Enter the admin password to continue.</p>
          <form onSubmit={(e) => { e.preventDefault(); handleGateSubmit(); }}>
            <label htmlFor="admin-password" className={`block text-sm font-medium mb-1 ${STRONG}`}>Admin password</label>
            <input
              id="admin-password"
              type="password"
              autoFocus
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
        ? { label: 'Live data', tone: 'green' }
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
    { id: 'accounts', label: 'Accounts' },
    { id: 'activity', label: `Activity${telemetry && telemetry.totals.accounts > 0 ? ` (${telemetry.totals.accounts})` : ''}` },
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
            <OverviewTab report={analytics} loading={analyticsLoading} telemetry={telemetry} onOpenTab={setActiveTab} />
          )}
          {activeTab === 'cadets' && (
            analytics ? (
              <CadetsTab rows={analytics.cadets} activity={activityByName} />
            ) : (
              <div className="card text-center py-10">
                <p className={`font-semibold ${STRONG}`}>{analyticsLoading ? 'Loading cadets…' : 'Cadet data isn’t available'}</p>
                {!analyticsLoading && <p className={`text-sm mt-1 ${MUTED}`}>Select Refresh to try again.</p>}
              </div>
            )
          )}
          {activeTab === 'activity' && <ActivityTab telemetry={telemetry} loading={analyticsLoading} />}
          {activeTab === 'accounts' && <AccountTools adminToken={adminToken} />}
        </div>
      </main>
    </div>
  );
}
