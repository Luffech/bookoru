import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="bg-primary sticky top-0 z-10 border-b-2 border-douro/50 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="font-serif font-bold text-2xl text-douro">BOOkeru</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}