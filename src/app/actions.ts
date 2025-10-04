// src/app/actions.ts
'use server';

import { z } from 'zod';
import { repo } from '../lib/repo'; // Caminho relativo
import { revalidatePath } from 'next/cache';

const bookSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  author: z.string().min(1, { message: 'Autor é obrigatório' }),
  cover: z.string().url().optional().or(z.literal('')),
  totalPages: z.coerce.number().positive().optional(),
  currentPage: z.coerce.number().nonnegative().optional(),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
  rating: z.coerce.number().min(0).max(5).optional(),
});

export async function createBook(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = bookSchema.safeParse(data);

  if (!validated.success) {
    console.error(validated.error.flatten().fieldErrors);
    throw new Error("Erro de validação");
  }
  
  try {
    await repo.createBook(validated.data);
    revalidatePath('/');
  } catch (error) {
    console.error("Falha ao criar livro:", error);
    throw new Error("Falha ao criar livro");
  }
}

export async function deleteBook(formData: FormData) {
  const id = formData.get('bookId') as string;

  if (!id) {
    throw new Error("ID do livro não encontrado");
  }

  try {
    await repo.deleteBook(id);
    revalidatePath('/');
  } catch (error) {
    console.error("Falha ao excluir livro:", error);
    throw new Error("Falha ao excluir livro");
  }
}

export async function updateBook(formData: FormData) {
  const id = formData.get('bookId') as string;

  if (!id) {
    throw new Error("ID do livro não encontrado para atualização");
  }

  const data = Object.fromEntries(formData);
  const validated = bookSchema.safeParse(data);

  if (!validated.success) {
    console.error(validated.error.flatten().fieldErrors);
    throw new Error("Erro de validação ao atualizar");
  }

  try {
    await repo.updateBook(id, validated.data);
    revalidatePath('/');
  } catch (error) {
    console.error("Falha ao atualizar livro:", error);
    throw new Error("Falha ao atualizar livro");
  }
}