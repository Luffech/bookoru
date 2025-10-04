// src/components/Header.tsx
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/50 backdrop-blur sticky top-0">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo_bookoru.png" alt="logo" className="h-8 w-8" />
          <h1 className="font-bold">Bookoru</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
