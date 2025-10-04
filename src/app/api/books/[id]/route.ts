import { NextResponse } from 'next/server';
import { repo } from '@/lib/repo';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const book = await repo.getBook(params.id);
    if (!book) {
      return NextResponse.json({ message: 'Livro não encontrado' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error(`API Error fetching book ${params.id}:`, error);
    return NextResponse.json({ message: 'Falha ao buscar o livro' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const updatedBook = await repo.updateBook(params.id, data);
    return NextResponse.json(updatedBook);
  } catch (error: any) {
    console.error(`API Error updating book ${params.id}:`, error);
    return NextResponse.json({ message: error.message || 'Falha ao atualizar o livro' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await repo.deleteBook(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`API Error deleting book ${params.id}:`, error);
    return NextResponse.json({ message: 'Falha ao deletar o livro' }, { status: 500 });
  }
}