import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genresData = [
  { id: 'cmgcg9aod0000ns3kbayzluxe', name: 'Literatura Brasileira' },
  { id: 'cmgcg9ap40001ns3kz298iz8o', name: 'Ficção Científica' },
  { id: 'cmgcg9apv0002ns3kg0xfhnj6', name: 'Ficção' },
  { id: 'cmgcg9aqj0003ns3kasmpyxul', name: 'Fantasia' },
];

const booksData = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://covers.openlibrary.org/b/id/8745147-L.jpg',
    status: 'LIDO',
    rating: 5,
    notes: 'Um clássico da literatura brasileira, leitura obrigatória.',
    genreId: 'cmgcg9aod0000ns3kbayzluxe',
  },
  {
    id: '2',
    title: 'Neuromancer',
    author: 'William Gibson',
    cover: 'https://covers.openlibrary.org/b/id/13122693-L.jpg',
    status: 'LENDO',
    rating: 4,
    currentPage: 80,
    pages: 320,
    genreId: 'cmgcg9ap40001ns3kz298iz8o',
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/819js3EQwbL._SL1500_.jpg',
    status: 'QUERO_LER',
    genreId: 'cmgcg9apv0002ns3kg0xfhnj6',
  },
  {
    id: '4',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    cover: 'https://covers.openlibrary.org/b/id/10279212-L.jpg',
    status: 'PAUSADO',
    rating: 4,
    currentPage: 120,
    pages: 652,
    genreId: 'cmgcg9aqj0003ns3kasmpyxul',
  },
  {
    id: '5',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/91BsZhxCRjL._SL1500_.jpg',
    status: 'QUERO_LER',
    genreId: 'cmgcg9apv0002ns3kg0xfhnj6',
  },
  {
    id: 'cd606c53-7948-4249-8592-8018086f906e',
    title: 'Vidas secas',
    author: 'Graciliano Ramos',
    cover: 'https://m.media-amazon.com/images/I/618-b9Im6dL._SL1457_.jpg',
    status: 'QUERO_LER',
    notes: 'Um livro que achei na amazon e quero ler',
    genreId: 'cmgcg9apv0002ns3kg0xfhnj6',
  },
];


async function main() {
  console.log(`Iniciando o seed...`);

  console.log('Deletando dados antigos...');
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  console.log('Inserindo gêneros...');
  await prisma.genre.createMany({
    data: genresData,
  });

  console.log('Inserindo livros...');
  for (const book of booksData) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log(`Seed finalizado com sucesso.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });