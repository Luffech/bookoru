// src/components/ThemeToggle.tsx
'use client';

import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // Roda apenas no cliente, onde 'localStorage' e 'window' existem
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setDark(initialTheme);
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
    return null; // Não mostra nada até o tema ser carregado para evitar piscar
  }

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="text-xs px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
    >
      {dark ? "🌙 Escuro" : "☀️ Claro"}
    </button>
  );
}