// src/components/BookList.tsx
'use client';

import { useState } from 'react';
import type { AppBook } from '../lib/repo';
import { BookCard } from './BookCard';
import { EditBookModal } from './EditBookModal';

interface BookListProps {
  books: AppBook[];
}

export function BookList({ books }: BookListProps) {
  // 1. Estado para controlar qual livro está sendo editado
  const [editingBook, setEditingBook] = useState<AppBook | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {books.map((book) => (
          // 2. Passamos a função para o BookCard para que ele possa abrir o modal
          <BookCard key={book.id} book={book} onEdit={() => setEditingBook(book)} />
        ))}
        {books.length === 0 && (
          <p className="text-sm text-zinc-500">
            Nenhum livro ainda. Adicione o primeiro no formulário!
          </p>
        )}
      </div>

      {/* 3. Se houver um livro sendo editado, renderize o modal */}
      {editingBook && (
        <EditBookModal 
          book={editingBook} 
          onClose={() => setEditingBook(null)} 
        />
      )}
    </>
  );
}