// src/lib/repo.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Tipos do app (iguais ao front)
type Status = 'QUERO_LER' | 'LENDO' | 'LIDO' | 'PAUSADO' | 'ABANDONADO';
export interface AppBook {
  id: string;
  title: string;
  author: string;
  cover?: string;        // opcional no app
  totalPages?: number;   // <— nome do front
  currentPage?: number;
  genre?: string;        // label opcional (se usar relação, vamos por genreId)
  rating?: number;
  status?: Status;
  notes?: string;
  year?: number;
  synopsis?: string;
  isbn?: string;
  genreId?: string;      // se vier id, usa relação
}

// fallback de capa para satisfazer coluna NOT NULL do DB
const DEFAULT_COVER = 'https://via.placeholder.com/400x600.png?text=Sem+Capa';

// mapping DB -> App
function toAppBook(db: any): AppBook {
  return {
    id: db.id,
    title: db.title,
    author: db.author,
    cover: db.cover || undefined,
    totalPages: db.pages ?? undefined,
    currentPage: db.currentPage ?? undefined,
    rating: db.rating ?? undefined,
    status: db.status ?? undefined,
    notes: db.notes ?? undefined,
    year: db.year ?? undefined,
    synopsis: db.synopsis ?? undefined,
    isbn: db.isbn ?? undefined,
    genreId: db.genreId ?? undefined,
    genre: db.genre?.name ?? undefined,
  };
}

// mapping App -> DB
function toDbBook(payload: Partial<AppBook>) {
  return {
    title: payload.title?.trim(),
    author: payload.author?.trim(),
    cover: (payload.cover && payload.cover.trim()) || DEFAULT_COVER,
    pages: payload.totalPages ?? null,
    currentPage: payload.currentPage ?? null,
    rating: payload.rating ?? null,
    status: payload.status ?? 'QUERO_LER',
    notes: payload.notes ?? null,
    year: payload.year ?? null,
    synopsis: payload.synopsis ?? null,
    isbn: payload.isbn ?? null,
    genreId: payload.genreId ?? null,
  };
}

export const repo = {
  async listBooks(): Promise<AppBook[]> {
    const rows = await prisma.book.findMany({
      include: { genre: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toAppBook);
  },

  async createBook(payload: Partial<AppBook>): Promise<AppBook> {
    if (!payload.title?.trim() || !payload.author?.trim()) {
      const err = new Error('Título e autor são obrigatórios');
      // @ts-ignore
      err.status = 400;
      throw err;
    }
    const data = toDbBook(payload);
    const created = await prisma.book.create({
      data,
      include: { genre: true },
    });
    return toAppBook(created);
  },

  async updateBook(id: string, payload: Partial<AppBook>): Promise<AppBook> {
    const data = toDbBook(payload);
    const updated = await prisma.book.update({
      where: { id },
      data,
      include: { genre: true },
    });
    return toAppBook(updated);
  },

  async deleteBook(id: string): Promise<void> {
    await prisma.book.delete({ where: { id } });
  },

  async listGenres() {
    return prisma.genre.findMany({ orderBy: { name: 'asc' } });
  },

  async createGenre(payload: { name?: string }) {
    const name = payload?.name?.trim();
    if (!name) {
      const err = new Error('Nome é obrigatório');
      // @ts-ignore
      err.status = 400;
      throw err;
    }
    return prisma.genre.create({ data: { name } });
  },
};
