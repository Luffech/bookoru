'use client';

import { useState } from 'react';
import { createBook } from '../app/actions';
import { AppBook } from '../lib/repo';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

export function BookForm() {
  const [rating, setRating] = useState(0);

  async function handleCreateAction(formData: FormData) {
    formData.append('rating', String(rating));
    await createBook(formData);
  }

  return (
    <div className="bg-[rgb(var(--surface-rgb))] border border-[var(--brand-blue-medium)] rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-serif text-[var(--brand-gold)] mb-4">Adicionar Livro</h2>
      <form action={handleCreateAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Título *</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author" className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Autor *</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="status" className="block text-xs mb-1 text-[rgb(var(--text-secondary-rgb))]">Status</label>
          <select id="status" name="status" defaultValue="QUERO_LER">
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
                className={`text-2xl transition-transform duration-150 ease-in-out hover:scale-125 ${rating >= n ? 'text-[var(--brand-gold)]' : 'text-[rgb(var(--text-secondary-rgb))]'}`}
              >
                👻
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
        <button type="submit" className="w-full px-4 py-2 text-sm rounded-lg border border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[var(--brand-blue-dark)] font-semibold hover:bg-opacity-80 transition-colors">
          Adicionar Livro
        </button>
      </form>
    </div>
  );
}