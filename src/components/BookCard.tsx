import type { AppBook } from "../lib/repo";
import { deleteBook } from '../app/actions';

interface BookCardProps {
  book: AppBook;
  onEdit: () => void;
}

export function BookCard({ book, onEdit }: BookCardProps) {
  return (
    <article className="bg-[rgb(var(--surface-rgb))] border border-[var(--brand-blue-medium)]/50 rounded-lg overflow-hidden shadow-lg flex flex-col hover:border-[var(--brand-gold)]/70 transition-colors duration-300">
      <div className="aspect-[2/3] bg-[var(--brand-blue-dark)] overflow-hidden">
        <img src={book.cover || "https://via.placeholder.com/400x600.png?text=Sem+Capa"} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-grow bg-[rgb(var(--surface-rgb))]">
        <h3 className="font-serif text-lg font-semibold line-clamp-2 text-[var(--brand-gold)]">{book.title}</h3>
        <p className="text-sm text-[rgb(var(--text-secondary-rgb))] mt-1">{book.author}</p>
        <div className="mt-3 flex-grow content-start">
          {book.rating ? (
            <span className="text-xl text-[var(--brand-gold)]">
              {'★'.repeat(book.rating)}
              <span className="text-[var(--brand-blue-medium)]/50">{'☆'.repeat(5 - book.rating)}</span>
            </span>
          ) : null}
        </div>
        <div className="mt-4 border-t border-[var(--brand-blue-medium)]/20 pt-3 flex items-center justify-end gap-2">
            <button onClick={onEdit} className="text-xs px-3 py-1.5 rounded-md border border-[var(--brand-blue-medium)]/50 hover:bg-[var(--brand-blue-medium)] hover:text-white transition-colors">
              Editar
            </button>
            <form action={deleteBook}>
              <input type="hidden" name="bookId" value={book.id} />
              <button type="submit" className="text-xs px-3 py-1.5 rounded-md border border-[var(--brand-blue-medium)]/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 transition-colors">
                Excluir
              </button>
            </form>
        </div>
      </div>
    </article>
  );
}