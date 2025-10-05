import { repo } from "../lib/repo";
import { BookForm } from "../components/BookForm";
import { Header } from "../components/Header";
import { StatsPanel } from "../components/StatsPanel";
import { BookList } from "../components/BookList";
import { Filters } from "@/components/Filters";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    genre?: string;
  }>;
}) {
  // Aguarde os searchParams antes de usar
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const genreId = resolvedSearchParams.genre || '';

  const books = await repo.listBooks(query, genreId);
  const genres = await repo.listGenres();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 flex flex-col gap-8">
          <Suspense fallback={<div>Carregando formulário...</div>}>
            <BookForm genres={genres} />
          </Suspense>
          <StatsPanel books={books} />
        </section>
        <section className="lg:col-span-2">
          <Suspense fallback={<div>Carregando filtros...</div>}>
            <Filters genres={genres} />
          </Suspense>
          <BookList books={books} genres={genres} />
        </section>
      </main>
    </div>
  );
}