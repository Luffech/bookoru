'use client';

import { useState } from 'react';
import type { AppBook } from '../lib/repo';
import { updateBook } from '../app/actions';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

interface EditBookModalProps {
  book: AppBook;
  onClose: () => void;
}

export function EditBookModal({ book, onClose }: EditBookModalProps) {
  const [rating, setRating] = useState(book.rating || 0);

  async function handleUpdateAction(formData: FormData) {
    formData.append('rating', String(rating));
    await updateBook(formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-[rgb(var(--background-rgb))] border border-[var(--brand-blue-medium)] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif text-[var(--brand-gold)]">Editar Livro</h2>
          <button onClick={onClose} className="text-sm text-[rgb(var(--text-secondary-rgb))] hover:text-white">Fechar</button>
        </div>
        
        <form action={handleUpdateAction} className="space-y-4">
          <input type="hidden" name="bookId" value={book.id} />
          <div>
            <label className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Título *</label>
            <input name="title" required defaultValue={book.title} />
          </div>
          <div>
            <label className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Autor *</label>
            <input name="author" required defaultValue={book.author} />
          </div>
            <div>
            <label className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Status</label>
            <select name="status" defaultValue={book.status}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Avaliação</label>
            <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`text-2xl transition-transform duration-150 ease-in-out hover:scale-125 ${rating >= n ? 'text-[var(--brand-gold)]' : 'text-[var(--brand-blue-medium)]'}`}
                >
                ★
                </button>
            ))}
            <button
                type="button"
                onClick={() => setRating(0)}
                className="text-xs text-[rgb(var(--text-secondary-rgb))] hover:underline ml-2"
            >
                Limpar
            </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button type="submit" className="px-4 py-2 text-sm rounded-lg border border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[var(--brand-blue-dark)] font-semibold hover:bg-opacity-80 transition-colors">
              Salvar Alterações
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-[rgb(var(--border-rgb))] hover:bg-[rgb(var(--surface-rgb))]">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}