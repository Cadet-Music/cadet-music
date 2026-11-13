import { useEffect } from 'react';
import { useStore } from '../store';
import { getSessionToken, saveProfile } from '../utils/authApi';

// Waits for changes to settle before saving, so a burst of answers makes one request.
const SAVE_DELAY_MS = 1500;

/**
 * Keeps the cadet's full profile saved on the server while they are signed in.
 * This is what lets progress survive logging out and switching devices.
 */
export default function useProfileSync(): void {
  const user = useStore((s) => s.user);

  useEffect(() => {
    if (!user || !getSessionToken()) return;
    const timer = window.setTimeout(() => {
      const current = useStore.getState().user;
      if (current && getSessionToken()) void saveProfile(current);
    }, SAVE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [user]);
}
