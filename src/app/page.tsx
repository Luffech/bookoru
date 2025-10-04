import { repo } from "../lib/repo";
import { BookForm } from "../components/BookForm";
import { Header } from "../components/Header";
import { StatsPanel } from "../components/StatsPanel";
import { BookList } from "../components/BookList";
import { Filters } from "@/components/Filters";

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    genre?: string;
  };
}) {
  const query = searchParams.query || '';
  const genreId = searchParams.genre || '';

  const books = await repo.listBooks(query, genreId);
  const genres = await repo.listGenres();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 flex flex-col gap-8">
          <BookForm />
          <StatsPanel books={books} />
        </section>
        <section className="lg:col-span-2">
          <Filters genres={genres} />
          <BookList books={books} />
        </section>
      </main>
    </div>
  );
}