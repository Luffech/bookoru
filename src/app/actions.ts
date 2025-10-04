'use server';

import { z } from 'zod';
import { repo } from '../lib/repo';
import { revalidatePath } from 'next/cache';

const bookSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  author: z.string().min(1, { message: 'Autor é obrigatório' }),
  cover: z.string().url().optional().or(z.literal('')),
  totalPages: z.coerce.number().positive().optional(),
  currentPage: z.coerce.number().nonnegative().optional(),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
  rating: z.coerce.number().min(0).max(5).optional(),
  isbn: z.string().optional(),
  notes: z.string().optional(),
});

export async function createBook(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validated = bookSchema.safeParse(data);

  if (!validated.success) {
    const errorMessages = validated.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages)[0]?.[0] || "Erro de validação";
    return { success: false, message: firstError };
  }
  
  try {
    await repo.createBook(validated.data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Falha ao criar o livro no servidor." };
  }
}

export async function deleteBook(id: string) {
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
    return { success: false, message: "ID do livro não encontrado para atualização" };
  }

  const data = Object.fromEntries(formData);
  const validated = bookSchema.safeParse(data);

  if (!validated.success) {
    const errorMessages = validated.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages)[0]?.[0] || "Erro de validação ao atualizar";
    return { success: false, message: firstError };
  }

  try {
    await repo.updateBook(id, validated.data);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, message: "Falha ao atualizar o livro no servidor." };
  }
}