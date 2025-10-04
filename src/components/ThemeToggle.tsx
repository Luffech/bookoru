'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") !== 'light';
    setDark(isDark);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, themeLoaded]);

  if (!themeLoaded) {
    return <div className="w-16 h-7" />;
  }

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="text-xs px-3 py-1.5 rounded-full border border-[rgb(var(--border-rgb)/0.2)] hover:bg-[rgb(var(--surface-rgb))]"
    >
      {dark ? "Escuro 🌙" : "Claro ☀️"}
    </button>
  );
}