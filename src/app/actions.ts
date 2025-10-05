// src/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const ALLOWED_STATUS = new Set([
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
]);

const PLACEHOLDER_COVER = "https://placehold.co/400x600/png?text=Book+Cover";

function toInt(value: FormDataEntryValue | null, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normStr(v: FormDataEntryValue | null) {
  return (typeof v === "string" ? v : "").trim();
}

export async function createBook(formData: FormData) {
  try {
    const title = normStr(formData.get("title"));
    const author = normStr(formData.get("author"));
    const cover = normStr(formData.get("cover")) || PLACEHOLDER_COVER;

    if (!title || !author) {
      return { success: false, message: "Título e Autor são obrigatórios." };
    }

    const currentPage = toInt(formData.get("currentPage"), 0);
    const pages = toInt(formData.get("pages"), 0);
    const isbn = normStr(formData.get("isbn")) || null;
    const genreId = normStr(formData.get("genreId")) || null;

    const rawStatus = normStr(formData.get("status")) || "QUERO_LER";
    const status = ALLOWED_STATUS.has(rawStatus) ? rawStatus : "QUERO_LER";

    let rating = toInt(formData.get("rating"), 0);
    rating = Math.max(0, Math.min(5, rating));

    const notes = normStr(formData.get("notes")) || null;

    const safeCurrent = Math.max(0, Math.min(currentPage, Math.max(0, pages)));

    const book = await prisma.book.create({
      data: {
        title,
        author,
        cover,
        currentPage: safeCurrent,
        pages,
        isbn,
        genreId,
        status,
        rating,
        notes,
      },
    });

    revalidatePath("/");
    if (book?.id) revalidatePath(`/books/${book.id}`);

    return { success: true, id: book.id };
  } catch (err: any) {
    return { success: false, message: err?.message || "Erro ao criar o livro." };
  }
}

export async function updateBook(formData: FormData) {
  try {
    const id = normStr(formData.get("bookId"));
    if (!id) return { success: false, message: "ID do livro ausente." };

    const title = normStr(formData.get("title"));
    const author = normStr(formData.get("author"));

    const currentPage = toInt(formData.get("currentPage"), 0);
    const pages = toInt(formData.get("pages"), 0);
    const isbn = normStr(formData.get("isbn")) || null;
    const genreId = normStr(formData.get("genreId")) || null;

    const rawStatus = normStr(formData.get("status")) || undefined;
    const status =
      rawStatus && ALLOWED_STATUS.has(rawStatus) ? rawStatus : undefined;

    let rating = toInt(formData.get("rating"), 0);
    rating = Math.max(0, Math.min(5, rating));

    const notes = normStr(formData.get("notes")) || null;

    const safeCurrent = Math.max(0, Math.min(currentPage, Math.max(0, pages)));

    await prisma.book.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(author ? { author } : {}),
        currentPage: safeCurrent,
        pages,
        isbn,
        genreId,
        ...(status ? { status } : {}),
        rating,
        notes,
      },
    });

    revalidatePath("/");
    revalidatePath(`/books/${id}`);

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro ao atualizar o livro.",
    };
  }
}

export async function deleteBook(id: string) {
  try {
    if (!id) return { success: false, message: "ID do livro ausente." };

    await prisma.book.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath(`/books/${id}`);

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "Erro ao excluir o livro.",
    };
  }
}
