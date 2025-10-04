// src/components/BookCard.tsx
import type { AppBook } from "../lib/repo";
import { deleteBook } from '../app/actions';

interface BookCardProps {
    book: AppBook;
    onEdit: () => void;
}

export function BookCard({ book, onEdit }: BookCardProps) {
    return (
        <article
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-fade-in transition-colors duration-200 flex flex-col"
        >
            <div className="aspect-[2/3] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                <img
                    src={book.cover || "https://via.placeholder.com/400x600.png?text=Sem+Capa"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold line-clamp-2">{book.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{book.author}</p>

                <div className="mt-2 flex flex-wrap items-center gap-1.5 flex-grow content-start">
                    {book.genre && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
                            {book.genre}
                        </span>
                    )}
                    {book.status && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
                            {book.status}
                        </span>
                    )}
                    {book.rating ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-500 text-amber-600">
                            {'👻'.repeat(book.rating)}
                        </span>
                    ) : null}
                </div>

                <div className="mt-3 border-t border-zinc-200 dark:border-zinc-800 pt-3 flex items-center justify-end gap-2">
                    <button onClick={onEdit} className="text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        Editar
                    </button>
                    <form action={deleteBook}>
                        <input type="hidden" name="bookId" value={book.id} />
                        <button
                            type="submit"
                            className="text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            Excluir
                        </button>
                    </form>
                </div>
            </div>
        </article>
    );
}