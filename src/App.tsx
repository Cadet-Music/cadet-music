import { useEffect } from 'react';
import { useStore } from './store';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import Settings from './components/Settings';
import Leaderboard from './components/Leaderboard';
import KonamiListener from './components/KonamiListener';

function App() {
  const { user, currentView, darkMode, setDarkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!user) return <><Login /><KonamiListener /></>;
  if (!user.onboarded) return <><Onboarding /><KonamiListener /></>;
  
  switch (currentView) {
    case 'lesson':
      return <><LessonView /><KonamiListener /></>;
    case 'settings':
      return <><Settings /><KonamiListener /></>;
    case 'leaderboard':
      return <><Leaderboard /><KonamiListener /></>;
    default:
      return <><Dashboard /><KonamiListener /></>;
  }
}

export default App;
