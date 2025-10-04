// src/components/EditBookModal.tsx
'use client';

import { useState } from 'react'; // Importe o useState
import type { AppBook } from '../lib/repo';
import { updateBook } from '../app/actions';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

interface EditBookModalProps {
  book: AppBook;
  onClose: () => void;
}

export function EditBookModal({ book, onClose }: EditBookModalProps) {
  const [rating, setRating] = useState(book.rating || 0); // Estado inicial com a nota do livro

  async function handleUpdateAction(formData: FormData) {
    formData.append('rating', String(rating));
    await updateBook(formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-800 rounded-2xl p-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Editar Livro</h2>
          <button onClick={onClose} className="text-sm">Fechar</button>
        </div>
        
        <form action={handleUpdateAction} className="space-y-3">
          <input type="hidden" name="bookId" value={book.id} />
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs mb-1">Título *</label>
              <input name="title" required defaultValue={book.title} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1">Autor *</label>
              <input name="author" required defaultValue={book.author} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm" />
            </div>
             <div>
              <label className="block text-xs mb-1">Status</label>
              <select name="status" defaultValue={book.status} className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm">
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seletor de avaliação com botões */}
          <div className="col-span-2">
            <label className="block text-xs mb-1">Avaliação</label>
            <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`text-lg transition ${rating >= n ? 'text-amber-400' : 'text-zinc-400'}`}
                >
                👻
                </button>
            ))}
            <button
                type="button"
                onClick={() => setRating(0)}
                className="text-xs text-zinc-500 hover:underline ml-2"
            >
                Limpar
            </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button type="submit" className="px-3 py-2 text-sm rounded-lg border">
              Salvar Alterações
            </button>
            <button type="button" onClick={onClose} className="px-3 py-2 text-sm">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}