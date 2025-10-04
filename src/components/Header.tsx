// src/components/Header.tsx
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-border/20 bg-surface/50 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo_bookoru.png" alt="Bookoru Logo" className="h-9 w-9" />
          <h1 className="font-bold text-lg text-text-primary">Bookoru</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}