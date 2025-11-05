import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark

  useEffect(() => {
    // Check localStorage on mount
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

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
