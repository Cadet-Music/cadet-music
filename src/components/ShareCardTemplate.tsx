import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useStore, STICKER_DEFS } from '../store';
import { LEVEL_INFO } from '../data';
import { CONCEPT_NAMES, getMasteryLevel } from '../competency';
import type { Concept } from '../competency';
import { getSongById } from '../songs';
import {
  detectShareSupport,
  pickShareMethod,
  hasUserActivationWindow,
  shareFileName,
} from '../utils/shareCard';

/** Fixed export ratio: 1200x630 (OG image size), rendered at 1x and scaled up for DPI. */
const CARD_W = 1200;
const CARD_H = 630;
const PIXEL_RATIO = 2; // high-DPI rasterization

export type ShareStatus = 'idle' | 'busy' | 'shared' | 'copied' | 'downloaded' | 'error';

interface ShareCardTemplateProps {
  onStatus?: (status: ShareStatus, detail?: string) => void;
}

/**
 * Hidden 1200x630 progress card fed by live Zustand state.
 * All visuals are inline SVG / emoji / CSS gradients — no external assets —
 * so the serialized canvas is never tainted and export works offline.
 */
export default function ShareCardTemplate({ onStatus }: ShareCardTemplateProps) {
  const user = useStore((s) => s.user);
  const darkMode = useStore((s) => s.darkMode);
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const { progress } = user;
  const levelNum = LEVEL_INFO[user.theoryLevel].number;

  // Top song masteries: active songs whose lesson ids appear in completedLessons
  const masteredSongs = user.activeSongs
    .map((id) => getSongById(id))
    .filter((song): song is NonNullable<typeof song> => !!song)
    .slice(0, 3);

  // Top concept masteries ranked by score
  const topConcepts = Object.entries(progress.conceptMastery)
    .map(([concept, stats]) => ({
      concept: concept as Concept,
      score: stats.masteryScore,
      level: getMasteryLevel(stats.masteryScore),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const achievements = progress.stickers
    .map((k) => STICKER_DEFS[k])
    .filter(Boolean)
    .slice(0, 8);

  const emit = (status: ShareStatus, detail?: string) => onStatus?.(status, detail);

  /** Rasterize the hidden template into a PNG blob. ~50-300 ms on typical devices. */
  const renderBlob = async (): Promise<Blob | null> => {
    const node = cardRef.current;
    if (!node) return null;
    try {
      const dataUrl = await toPng(node, {
        width: CARD_W,
        height: CARD_H,
        pixelRatio: PIXEL_RATIO,
        cacheBust: true,
        backgroundColor: darkMode ? '#0f1720' : '#f5f5f5',
      });
      const res = await fetch(dataUrl);
      return await res.blob();
    } catch {
      return null;
    }
  };

  const downloadFallback = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  /**
   * Main entry point — MUST be called directly from a click handler.
   * iOS Safari's transient user activation expires quickly, so we measure
   * elapsed time and skip navigator.share() if the window has closed.
   */
  const handleShare = async () => {
    if (busy || !cardRef.current) return;
    const startedAt = Date.now();
    setBusy(true);
    emit('busy');
    try {
      const blob = await renderBlob();
      if (!blob) {
        emit('error', 'Could not render the card image.');
        return;
      }
      const filename = shareFileName(user.username, 'streak');
      const support = detectShareSupport();
      const method = pickShareMethod(support);

      if (method === 'web-share' && hasUserActivationWindow(startedAt)) {
        try {
          const file = new File([blob], filename, { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: `${user.username}'s Cadet Music progress`,
            text: `🔥 ${progress.streak}-day streak · Level ${levelNum} · ${progress.xp} XP on Cadet Music`,
          });
          emit('shared');
          return;
        } catch (err) {
          // AbortError = user dismissed the sheet; anything else falls through
          if ((err as DOMException)?.name !== 'AbortError') {
            /* fall through to next channel */
          } else {
            emit('idle');
            return;
          }
        }
      }

      if (method === 'clipboard' || (method === 'web-share')) {
        // Clipboard path (also used when the share window expired but clipboard is available)
        try {
          const ClipboardItemCtor = (window as unknown as { ClipboardItem?: typeof ClipboardItem }).ClipboardItem;
          if (method === 'clipboard' && ClipboardItemCtor) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            emit('copied');
            return;
          }
        } catch {
          /* fall through to download */
        }
      }

      downloadFallback(blob, filename);
      emit('downloaded');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Trigger button — reusable anywhere (Dashboard, Leaderboard) */}
      <button
        onClick={handleShare}
        disabled={busy}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform active:scale-95 disabled:opacity-60"
        aria-label="Share my progress card"
      >
        <span aria-hidden>📤</span>
        {busy ? 'Generating…' : 'Share Progress'}
      </button>

      {/* Hidden fixed-size template. Positioned off-screen (not display:none,
          which html-to-image cannot rasterize). */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: -CARD_W * 2,
          width: CARD_W,
          height: CARD_H,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: CARD_W,
            height: CARD_H,
            background: darkMode
              ? 'linear-gradient(135deg, #0f1720 0%, #1a2332 100%)'
              : 'linear-gradient(135deg, #1a2332 0%, #2d3a4a 100%)',
            color: '#f5f5f5',
            fontFamily: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif",
            padding: 56,
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 44,
                }}
              >
                🎵
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 800 }}>{user.username}</div>
                <div style={{ fontSize: 22, opacity: 0.75, marginTop: 4 }}>
                  Air Cadet Band · {user.rank || LEVEL_INFO[user.theoryLevel].description} · Level {levelNum}
                </div>
              </div>
            </div>
            <svg width="120" height="90" viewBox="0 0 120 90" aria-hidden>
              {/* Inline beamed-eighth-notes brand mark (mirrors favicon.svg) */}
              <path
                d="M30 70a10 8 0 1 1-4-6V22l58-12v42a10 8 0 1 1-4-6V22L30 32Z"
                transform="translate(6 6)"
                fill="#f59e0b"
              />
            </svg>
          </div>

          {/* Stat band */}
          <div style={{ display: 'flex', gap: 24, marginTop: 44 }}>
            {[
              { label: 'Day Streak', value: `🔥 ${progress.streak}`, sub: `best ${progress.longestStreak}` },
              { label: 'XP Earned', value: `⚡ ${progress.xp}`, sub: '' },
              { label: 'Lessons', value: `📖 ${progress.completedLessons.length}`, sub: '' },
              { label: 'Accuracy', value: `🎯 ${Math.round(progress.accuracy)}%`, sub: '' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 16,
                  padding: '20px 24px',
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 18, opacity: 0.7, marginTop: 6 }}>
                  {s.label}
                  {s.sub ? ` (${s.sub})` : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Mastered concepts + songs */}
          <div style={{ display: 'flex', gap: 32, marginTop: 40, flex: 1 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, opacity: 0.85, marginBottom: 12 }}>
                Top skills
              </div>
              {topConcepts.map((c) => (
                <div key={c.concept} style={{ fontSize: 20, marginBottom: 8 }}>
                  <span style={{ opacity: 0.85 }}>{CONCEPT_NAMES[c.concept]}</span>
                  <span style={{ float: 'right', color: '#e0c36a', fontWeight: 700 }}>
                    {Math.round(c.score)} · {c.level}
                  </span>
                </div>
              ))}
              {topConcepts.length === 0 && (
                <div style={{ fontSize: 20, opacity: 0.6 }}>Answer questions to build mastery!</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, opacity: 0.85, marginBottom: 12 }}>
                Repertoire
              </div>
              {masteredSongs.map((s) => (
                <div key={s.id} style={{ fontSize: 20, marginBottom: 8 }}>
                  🎶 {s.title}
                  <span style={{ float: 'right', opacity: 0.65 }}>{s.composer}</span>
                </div>
              ))}
              {masteredSongs.length === 0 && (
                <div style={{ fontSize: 20, opacity: 0.6 }}>Pick your first songs to start practising.</div>
              )}
            </div>
          </div>

          {/* Footer: achievements + wordmark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: 20,
            }}
          >
            <div style={{ fontSize: 30, letterSpacing: 6 }}>
              {achievements.length > 0
                ? achievements.map((a) => a.icon).join(' ')
                : '🎼'}
            </div>
            <div style={{ fontSize: 22, opacity: 0.8, fontWeight: 600 }}>
              Cadet Music · Practice like it counts
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
