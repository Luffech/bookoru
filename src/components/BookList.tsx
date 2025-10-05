'use client';

import { useState } from 'react';
import type { AppBook } from '../lib/repo';
import { BookCard } from './BookCard';
import { EditBookModal } from './EditBookModal';
import { Genre } from '@prisma/client';

interface BookListProps {
  books: AppBook[];
  genres: Genre[];
}

export function BookList({ books, genres }: BookListProps) {
  const [editingBook, setEditingBook] = useState<AppBook | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onEdit={() => setEditingBook(book)} />
        ))}
        {books.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full text-center py-10">
            Nenhum livro encontrado. Tente ajustar sua busca ou adicione um novo livro!
          </p>
        )}
      </div>

      {editingBook && (
        <EditBookModal 
          book={editingBook} 
          genres={genres}
          onClose={() => setEditingBook(null)} 
        />
      )}
    </>
  );
}