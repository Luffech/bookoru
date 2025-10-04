// src/app/page.tsx
import { repo } from "../lib/repo";
import { BookForm } from "../components/BookForm";
import { Header } from "../components/Header";
import { StatsPanel } from "../components/StatsPanel";
import { BookList } from "../components/BookList"; // <-- Importe o BookList

export default async function HomePage() {
  const books = await repo.listBooks();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-200">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 flex flex-col gap-6">
          <BookForm />
          <StatsPanel books={books} />
        </section>
        <section className="lg:col-span-2">
          {/* Substitua o .map direto pelo nosso novo componente */}
          <BookList books={books} />
        </section>
      </main>
    </div>
  );
}