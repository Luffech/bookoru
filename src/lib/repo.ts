import { PrismaClient, Book, Genre } from '@prisma/client';

export const prisma = new PrismaClient();

export type AppBook = Book & { genre?: Genre | null };

const DEFAULT_COVER = '/bookoru_favicon.png';

function toAppBook(db: any): AppBook {
  return {
    ...db,
    cover: db.cover.includes('via.placeholder.com') ? DEFAULT_COVER : db.cover,
    totalPages: db.pages ?? undefined,
  };
}

function toDbBook(payload: Partial<AppBook>) {
  const { totalPages, ...rest } = payload;
  return {
    ...rest,
    title: payload.title?.trim(),
    author: payload.author?.trim(),
    cover: (payload.cover && payload.cover.trim()) || DEFAULT_COVER,
    pages: totalPages ?? null,
  };
}

export const repo = {
  async listBooks(query?: string, genreId?: string): Promise<AppBook[]> {
    const where: any = {};
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { author: { contains: query } },
      ];
    }
    if (genreId) {
      where.genreId = genreId;
    }

    const rows = await prisma.book.findMany({
      where,
      include: { genre: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toAppBook);
  },

  async getBook(id: string): Promise<AppBook | null> {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
    return book ? toAppBook(book) : null;
  },

  async createBook(payload: Partial<AppBook>): Promise<AppBook> {
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

  async listGenres(): Promise<Genre[]> {
    return prisma.genre.findMany({ orderBy: { name: 'asc' } });
  },

  async createGenre(payload: { name?: string }): Promise<Genre> {
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