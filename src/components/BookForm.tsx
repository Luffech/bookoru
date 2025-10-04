// src/components/BookForm.tsx
'use client';

import { useRef, useState } from 'react'; // Importe o useState
import { createBook } from '../app/actions';
import type { AppBook } from '../lib/repo';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

export function BookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0); // Estado para a avaliação

  async function handleAction(formData: FormData) {
    // Adiciona a avaliação ao formData antes de enviar
    formData.append('rating', String(rating));
    await createBook(formData);
    formRef.current?.reset();
    setRating(0); // Reseta a avaliação no estado local
  }

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm">
      <h2 className="text-base font-semibold mb-3">Adicionar livro</h2>
      
      <form ref={formRef} action={handleAction} className="space-y-3">
        {/* ... (inputs de title, author, etc, continuam iguais) ... */}
        <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
                <label className="block text-xs mb-1">Título *</label>
                <input name="title" required className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm" />
            </div>

            <div className="col-span-2">
                <label className="block text-xs mb-1">Autor *</label>
                <input name="author" required className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm" />
            </div>
            
            {/* ...outros campos que você tenha... */}

            <div>
                <label className="block text-xs mb-1">Status</label>
                <select name="status" defaultValue="QUERO_LER" className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm">
                {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </select>
            </div>
        </div>

        {/* Novo seletor de avaliação com botões */}
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
          <button type="submit" className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100">
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}