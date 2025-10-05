// prisma/seeds.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER = "https://placehold.co/400x600/png?text=Book+Cover";

async function main() {
  // gêneros
  const genres = await prisma.genre.createMany({
    data: [
      { name: "Ficção" },
      { name: "Fantasia" },
      { name: "Não-ficção" },
      { name: "Tecnologia" },
      { name: "História" },
    ],
    skipDuplicates: true,
  });

  // pega alguns gêneros para referenciar
  const allGenres = await prisma.genre.findMany();
  const first = allGenres[0]?.id ?? null;
  const second = allGenres[1]?.id ?? null;

  // livros (notes/synopsis opcionais)
  await prisma.book.createMany({
    data: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        cover: PLACEHOLDER,
        pages: 464,
        currentPage: 0,
        isbn: "978-0132350884",
        genreId: second,
        status: "QUERO_LER",
        rating: 0,
        notes: null,
        year: 2008,
      },
      {
        title: "O Hobbit",
        author: "J.R.R. Tolkien",
        cover: PLACEHOLDER,
        pages: 352,
        currentPage: 120,
        isbn: "978-0007458424",
        genreId: first,
        status: "LENDO",
        rating: 4,
        notes: "Releitura para revisar o universo antes d'O Senhor dos Anéis.",
        year: 1937,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed finalizado.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
