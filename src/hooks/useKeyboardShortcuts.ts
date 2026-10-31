import { useEffect } from 'react';
import { useStore } from '../store';
import { getAllLessons } from '../data';
import { SHORTCUTS, isEditableTarget } from '../utils/keyboard';

/**
 * Global keyboard shortcuts (see utils/keyboard.ts for the list).
 * Mounted once in App. Typing inside inputs/textareas never triggers actions.
 */
export default function useKeyboardShortcuts() {
  const { user, currentView, setCurrentView, setCurrentLesson, setDarkMode, darkMode } = useStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Never hijack while typing, or when a modifier (other than shift for '?') is held
      if (isEditableTarget(e.target)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (user === null) return; // login screen handles its own keys

      const key = e.key.toLowerCase();

      // '?' toggles the help overlay via a custom event (overlay listens for it)
      if (e.key === '?') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('cm:toggle-shortcuts-help'));
        return;
      }

      // 'm' toggles dark mode
      if (key === 'm') {
        e.preventDefault();
        setDarkMode(!darkMode);
        return;
      }

      // 'n' starts / resumes the next incomplete lesson
      if (key === 'n') {
        e.preventDefault();
        const lessons = getAllLessons();
        const completed = new Set(user.progress.completedLessons);
        const next = lessons.find((l) => !completed.has(l.id));
        if (next) {
          setCurrentLesson(next.id);
          setCurrentView('lesson');
        } else {
          setCurrentView('dashboard');
        }
        return;
      }

      // Plain view navigation shortcuts
      const match = SHORTCUTS.find((s) => s.view && s.key === key);
      if (match && match.view !== currentView) {
        e.preventDefault();
        setCurrentView(match.view as any);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [user, currentView, darkMode, setCurrentView, setCurrentLesson, setDarkMode]);
}
