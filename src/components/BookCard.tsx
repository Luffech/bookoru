import type { AppBook } from "../lib/repo";
import { deleteBook } from '../app/actions';

interface BookCardProps {
  book: AppBook;
  onEdit: () => void;
}

const statusStyles: { [key: string]: string } = {
  LENDO: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  LIDO: 'bg-green-500/20 text-green-300 border-green-500/30',
  PAUSADO: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  ABANDONADO: 'bg-red-500/20 text-red-300 border-red-500/30',
  QUERO_LER: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export function BookCard({ book, onEdit }: BookCardProps) {
  const progress = book.totalPages && book.currentPage ? Math.round((book.currentPage / book.totalPages) * 100) : 0;

  return (
    <article className="bg-[rgb(var(--surface-rgb))] border border-[var(--brand-blue-medium)]/50 rounded-lg overflow-hidden shadow-lg flex flex-col hover:border-[var(--brand-gold)]/70 transition-colors duration-300">
      <div className="relative aspect-[2/3] bg-[var(--brand-blue-dark)] overflow-hidden">
        <img src={book.cover || "https://via.placeholder.com/400x600.png?text=Sem+Capa"} alt={book.title} className="w-full h-full object-cover" />
        {book.status && (
          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full border ${statusStyles[book.status] || statusStyles.QUERO_LER}`}>
            {book.status.replace('_', ' ')}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow bg-[rgb(var(--surface-rgb))]">
        <h3 className="font-serif text-lg font-semibold line-clamp-2 text-[var(--brand-gold)]">{book.title}</h3>
        <p className="text-sm text-[rgb(var(--text-secondary-rgb))] mt-1">{book.author}</p>
        
        {book.status === 'LENDO' && progress > 0 && (
          <div className="mt-3">
            <div className="w-full bg-[var(--brand-blue-medium)]/20 rounded-full h-2">
              <div className="bg-[var(--brand-gold)] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-right text-[rgb(var(--text-secondary-rgb))] mt-1">{progress}%</p>
          </div>
        )}

        <div className="flex-grow content-end">
          {book.rating ? (
            <div className="flex items-center gap-1 mt-3">
              <span className="text-xl text-[var(--brand-gold)]">
                {'👻'.repeat(book.rating)}
              </span>
              <span className="text-xl text-[rgb(var(--border-rgb))] opacity-30">
                {'👻'.repeat(5 - book.rating)}
              </span>
            </div>
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