import { NextResponse } from 'next/server';
import { repo } from '@/lib/repo';

export async function GET() {
  try {
    const genres = await repo.listGenres();
    return NextResponse.json(genres);
  } catch (error) {
    console.error("API Error fetching genres:", error);
    return NextResponse.json({ message: 'Falha ao buscar os gêneros' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: 'O nome é obrigatório' }, { status: 400 });
    }
    const newGenre = await repo.createGenre({ name });
    return NextResponse.json(newGenre, { status: 201 });
  } catch (error: any) {
    console.error("API Error creating genre:", error);
    return NextResponse.json({ message: error.message || 'Falha ao criar o gênero' }, { status: 400 });
  }
}