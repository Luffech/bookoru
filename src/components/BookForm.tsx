// src/components/BookForm.tsx
'use client';
import { useRef, useState } from 'react';
import { createBook } from '../app/actions';
import type { AppBook } from '../lib/repo';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

export function BookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0);

  async function handleAction(formData: FormData) {
    formData.append('rating', String(rating));
    await createBook(formData);
    formRef.current?.reset();
    setRating(0);
  }

  return (
    <div className="bg-surface border border-border/20 rounded-2xl p-4 shadow-sm">
      <h2 className="text-base font-semibold mb-4 text-text-primary">Adicionar Livro</h2>
      <form ref={formRef} action={handleAction} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1 text-text-secondary">Título *</label>
            <input name="title" required />
          </div>
          <div>
            <label className="block text-xs mb-1 text-text-secondary">Autor *</label>
            <input name="author" required />
          </div>
          <div>
            <label className="block text-xs mb-1 text-text-secondary">Status</label>
            <select name="status" defaultValue="QUERO_LER">
              {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1 text-text-secondary">Avaliação</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className={`text-xl transition ${rating >= n ? 'text-accent' : 'text-text-secondary/50'}`}>
                  👻
                </button>
              ))}
              <button type="button" onClick={() => setRating(0)} className="text-xs text-text-secondary hover:underline ml-2">
                Limpar
              </button>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" className="px-4 py-2 text-sm rounded-lg border border-border/30 hover:bg-background font-semibold">
            Adicionar Livro
          </button>
        </div>
      </form>
    </div>
  );
}