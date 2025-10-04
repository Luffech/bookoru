// src/components/StatsPanel.tsx
'use client'; // Usamos 'use client' porque ele usa useMemo, um hook do React.

import { useMemo } from 'react';
import type { AppBook } from '../lib/repo';
import { StatCard } from './StatCard';

interface StatsPanelProps {
  books: AppBook[];
}

export function StatsPanel({ books }: StatsPanelProps) {
  const stats = useMemo(() => {
    const total = books.length;
    const lendo = books.filter((b) => b.status === "LENDO").length;
    const lidos = books.filter((b) => b.status === "LIDO").length;
    const paginas = books.reduce((acc, b) => acc + (b.currentPage || 0), 0);
    return { total, lendo, lidos, paginas };
  }, [books]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="Total" value={stats.total} />
      <StatCard label="Lendo" value={stats.lendo} />
      <StatCard label="Lidos" value={stats.lidos} />
      <StatCard label="Páginas lidas" value={stats.paginas} />
    </div>
  );
}