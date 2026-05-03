import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    if (isLight) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    return !isLight;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';

    if (isLight) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newIsDark = !prev;
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newIsDark;
    });
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="glass-card hover:glass-card-hover p-2 rounded-full transition-all duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
      )}
    </button>
  );
}
