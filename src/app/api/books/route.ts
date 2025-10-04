import { NextResponse } from 'next/server';
import { repo } from '@/lib/repo';

export async function GET() {
  try {
    const books = await repo.listBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error("API Error fetching books:", error);
    return NextResponse.json({ message: 'Falha ao buscar os livros' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newBook = await repo.createBook(data);
    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    console.error("API Error creating book:", error);
    return NextResponse.json({ message: error.message || 'Falha ao criar o livro' }, { status: 400 });
  }
}