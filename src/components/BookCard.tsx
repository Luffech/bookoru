// src/components/BookCard.tsx
import type { AppBook } from "../lib/repo";
import { deleteBook } from '../app/actions';

interface BookCardProps {
  book: AppBook;
  onEdit: () => void;
}

export function BookCard({ book, onEdit }: BookCardProps) {
  return (
    <article className="bg-surface border border-border/20 rounded-2xl overflow-hidden shadow-lg animate-fade-in flex flex-col hover:border-accent/50 transition-colors duration-300">
      <div className="aspect-[2/3] bg-background overflow-hidden">
        <img src={book.cover || "https://via.placeholder.com/400x600.png?text=Sem+Capa"} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold line-clamp-2 text-accent">{book.title}</h3>
        <p className="text-xs text-text-secondary mt-0.5">{book.author}</p>
        <div className="mt-3 flex-grow content-start">
          {book.rating ? (
            <span className="text-sm text-accent">
              {'👻'.repeat(book.rating)}
            </span>
          ) : null}
        </div>
        <div className="mt-4 border-t border-border/10 pt-3 flex items-center justify-end gap-2">
            <button onClick={onEdit} className="text-xs px-3 py-1.5 rounded-md border border-border/20 hover:bg-background hover:border-accent">
              Editar
            </button>
            <form action={deleteBook}>
              <input type="hidden" name="bookId" value={book.id} />
              <button type="submit" className="text-xs px-3 py-1.5 rounded-md border border-border/20 hover:bg-background hover:border-accent">
                Excluir
              </button>
            </form>
        </div>
      </div>
    </article>
  );
}