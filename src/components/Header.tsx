import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-[var(--brand-blue-medium)]/30 bg-[var(--brand-blue-dark)] sticky top-0 z-10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo_bookoru.png" alt="Bookoru Logo" className="h-9 w-9" />
          <h1 className="font-serif font-bold text-xl text-[var(--brand-gold)]">Bookoru</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}