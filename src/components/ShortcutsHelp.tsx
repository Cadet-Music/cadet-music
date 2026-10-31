import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHORTCUTS, formatShortcut } from '../utils/keyboard';

/**
 * "?" keyboard shortcut reference overlay.
 * Toggle with the ? key (dispatched by useKeyboardShortcuts) or close with Esc.
 */
export default function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setOpen((o) => !o);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('cm:toggle-shortcuts-help', toggle);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('cm:toggle-shortcuts-help', toggle);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <motion.div
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="font-bold text-lg">⌨️ Keyboard Shortcuts</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts help"
                className="text-xl leading-none px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ✕
              </button>
            </div>
            <ul className="px-5 py-3 max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {SHORTCUTS.map((s) => (
                <li key={s.label} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <span>{s.emoji}</span> {s.label}
                  </span>
                  <kbd className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 font-mono text-xs">
                    {formatShortcut(s)}
                  </kbd>
                </li>
              ))}
            </ul>
            <p className="px-5 py-3 text-xs opacity-60 border-t border-gray-200 dark:border-gray-700">
              Tip: shortcuts are disabled while typing in a text field.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
