import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { getAllLessons } from '../data';
import { SHORTCUTS, isEditableTarget, formatShortcut } from '../utils/keyboard';

interface PaletteItem {
  id: string;
  label: string;
  hint?: string;
  emoji: string;
  keywords: string;
  action: () => void;
}

/**
 * ⌘K Command Palette — fuzzy-jump to any view or lesson, plus quick actions
 * (dark mode toggle) and a built-in shortcut reference ("?" tab style footer).
 */
export default function CommandPalette() {
  const { user, setCurrentView, setCurrentLesson, setDarkMode, darkMode } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === 'Escape') setOpen(false);
      // Alt+Shift+P as an accessible fallback for opening
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      // focus after paint
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const items = useMemo<PaletteItem[]>(() => {
    const out: PaletteItem[] = [];

    const views: Array<{ id: string; view: string; label: string; emoji: string; kw: string }> = [
      { id: 'v-dash', view: 'dashboard', label: 'Go to Dashboard', emoji: '🏠', kw: 'home progress path' },
      { id: 'v-tone', view: 'tone-coach', label: 'Open Tone Coach', emoji: '🎓', kw: 'microphone pitch long tone practice' },
      { id: 'v-analytics', view: 'analytics', label: 'Open Analytics', emoji: '📊', kw: 'mastery weak topics concepts' },
      { id: 'v-leader', view: 'leaderboard', label: 'Open Leaderboard', emoji: '🏆', kw: 'rank squad competition' },
      { id: 'v-banner', view: 'banner', label: 'Customize Banner', emoji: '🎖️', kw: 'stickers badges decorate' },
      { id: 'v-songs', view: 'songs', label: 'My Songs', emoji: '🎵', kw: 'repertoire prepared music list a b' },
      { id: 'v-settings', view: 'settings', label: 'Settings', emoji: '⚙️', kw: 'instrument level dark mode account' },
    ];
    for (const v of views) {
      out.push({
        id: v.id,
        label: v.label,
        emoji: v.emoji,
        keywords: v.kw,
        action: () => setCurrentView(v.view as any),
      });
    }

    out.push({
      id: 'a-theme',
      label: darkMode ? 'Switch to light mode' : 'Switch to dark mode',
      emoji: darkMode ? '☀️' : '🌙',
      hint: 'toggle',
      keywords: 'theme dark light appearance',
      action: () => setDarkMode(!darkMode),
    });

    if (user) {
      const lessons = getAllLessons();
      const completed = new Set(user.progress.completedLessons);
      lessons.forEach((l) => {
        out.push({
          id: `l-${l.id}`,
          label: l.title,
          emoji: l.emoji,
          hint: completed.has(l.id) ? 'completed ✓' : `level ${l.level ?? ''}`.trim(),
          keywords: `${l.topic ?? ''} ${l.type ?? ''} lesson`,
          action: () => {
            setCurrentLesson(l.id);
            setCurrentView('lesson');
          },
        });
      });
    }
    return out;
  }, [user, darkMode, setCurrentView, setCurrentLesson, setDarkMode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    // simple subsequence scoring: prefix matches rank higher
    return items
      .map((it) => {
        const hay = `${it.label} ${it.keywords}`.toLowerCase();
        let score = -1;
        if (hay.startsWith(q)) score = 0;
        else if (hay.includes(q)) score = 1;
        else {
          // subsequence match
          let i = 0;
          for (const ch of hay) if (ch === q[i]) i++;
          if (i === q.length) score = 2;
        }
        return { it, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.it);
  }, [items, query]);

  useEffect(() => setActiveIndex(0), [query]);

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const run = (item: PaletteItem | undefined) => {
    if (!item) return;
    item.action();
    setOpen(false);
  };

  return (
    <>
      {/* Small trigger button so the feature is discoverable */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        title="Command palette (Ctrl+K)"
        className="fixed bottom-4 right-4 z-50 w-11 h-11 rounded-full bg-accent text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center font-bold"
      >
        ⌘
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
              initial={{ y: -20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex((i) => Math.max(i - 1, 0));
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    run(filtered[activeIndex]);
                  }
                }}
                placeholder="Type to search lessons, views, actions…"
                className="w-full px-4 py-3 text-base outline-none bg-transparent border-b border-gray-200 dark:border-gray-700"
              />
              <div ref={listRef} className="max-h-80 overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm opacity-60">No matches.</div>
                )}
                {filtered.map((it, idx) => (
                  <button
                    key={it.id}
                    data-idx={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => run(it)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm ${
                      idx === activeIndex ? 'bg-accent/15' : ''
                    }`}
                  >
                    <span className="text-lg">{it.emoji}</span>
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.hint && <span className="text-xs opacity-50">{it.hint}</span>}
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 flex items-center justify-between text-[11px] opacity-60 border-t border-gray-200 dark:border-gray-700">
                <span>↑↓ navigate · ↵ open · Esc close</span>
                <span>Try: {SHORTCUTS.slice(1, 3).map((s) => formatShortcut(s)).join(', ')}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
