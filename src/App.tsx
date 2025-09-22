import { useState, FormEvent } from 'react';


interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  totalPages?: number;
  currentPage?: number;
}

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://covers.openlibrary.org/b/id/8745147-L.jpg',
    totalPages: 256,
    currentPage: 120,
  },
  {
    id: '2',
    title: 'Neuromancer',
    author: 'William Gibson',
    cover: 'https://covers.openlibrary.org/b/id/13122693-L.jpg',
    totalPages: 312,
    currentPage: 312,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/819js3EQwbL._SL1500_.jpg',
  },
  {
    id: '4',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    cover: 'https://covers.openlibrary.org/b/id/10279212-L.jpg',
    totalPages: 652,
    currentPage: 250,
  },
  {
    id: '5',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/91BsZhxCRjL._SL1500_.jpg',
  },
];


export default function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCover, setNewCover] = useState('');

  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');

  const handleAddBook = (e: FormEvent) => {
    e.preventDefault();

    if (!newTitle || !newAuthor) {
      alert('Título e Autor são obrigatórios!');
      return;
    }

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: newTitle,
      author: newAuthor,
      cover: newCover || 'https://via.placeholder.com/400x600.png?text=Sem+Capa',

      totalPages: totalPages ? Number(totalPages) : undefined,
      currentPage: currentPage ? Number(currentPage) : undefined,
    };

    setBooks([...books, newBook]);


    setNewTitle('');
    setNewAuthor('');
    setNewCover('');
    setTotalPages('');
    setCurrentPage('');
    setIsFormVisible(false);
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans p-4 sm:p-8">

      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">bookoru</h1>
        <p className="text-slate-400">Sua biblioteca pessoal.</p>
      </header>

      <main className="max-w-5xl mx-auto">

        <div className="bg-slate-800 p-4 rounded-lg mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">Dashboard</h2>
            <p className="text-slate-300">Total de livros: {books.length}</p>
          </div>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Adicionar Livro
          </button>
        </div>

        {isFormVisible && (
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Livro</h2>
            <form onSubmit={handleAddBook}>

              <div className="mb-4">
                <label htmlFor="title" className="block text-slate-400 mb-1">Título (Obrigatório)</label>
                <input type="text" id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-slate-400 mb-1">Autor (Obrigatório)</label>
                <input type="text" id="author" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="cover" className="block text-slate-400 mb-1">URL da Capa (Opcional)</label>
                <input type="url" id="cover" value={newCover} onChange={(e) => setNewCover(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="totalPages" className="block text-slate-400 mb-1">Total de Páginas</label>
                  <input type="number" id="totalPages" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label htmlFor="currentPage" className="block text-slate-400 mb-1">Página Atual</label>
                  <input type="number" id="currentPage" value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsFormVisible(false)} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        )}


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg flex flex-col hover:scale-105 transition-transform duration-300">
              <div className="aspect-[2/3] w-full bg-slate-700 flex items-center justify-center text-center">
                <img src={book.cover} alt={`Capa de '${book.title}'`} className="w-full h-full object-cover text-xs text-slate-400" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-md truncate">{book.title}</h3>
                <p className="text-sm text-slate-400 truncate">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}