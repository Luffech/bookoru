import { useState, FormEvent, MouseEvent } from 'react'; // Adicionar MouseEvent

// ... (interface Book, availableGenres, availableStatus, initialBooks continuam os mesmos)
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  totalPages?: number;
  currentPage?: number;
  genre?: string;
  rating?: number;
  status?: string;
  notes?: string;
}

const availableGenres = [
  "Literatura Brasileira", "Ficção Científica", "Realismo Mágico", "Ficção", "Fantasia", "Romance",
  "Biografia", "História", "Autoajuda", "Tecnologia", "Programação", "Negócios", "Psicologia",
  "Filosofia", "Poesia"
];

const availableStatus = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    cover: 'https://covers.openlibrary.org/b/id/8745147-L.jpg',
    genre: 'Literatura Brasileira',
    rating: 5,
    status: 'LIDO',
    totalPages: 256,
    currentPage: 256,
    notes: "Um clássico da literatura brasileira, leitura obrigatória."
  },
  {
    id: '2',
    title: 'Neuromancer',
    author: 'William Gibson',
    cover: 'https://covers.openlibrary.org/b/id/13122693-L.jpg',
    genre: 'Ficção Científica',
    rating: 4,
    status: 'LENDO',
    totalPages: 312,
    currentPage: 150,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/819js3EQwbL._SL1500_.jpg',
    genre: 'Ficção',
    status: 'QUERO_LER',
  },
   {
    id: '4',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    cover: 'https://covers.openlibrary.org/b/id/10279212-L.jpg',
    genre: 'Fantasia',
    rating: 5,
    status: 'PAUSADO',
    totalPages: 652,
    currentPage: 300,
  },
   {
    id: '5',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/91BsZhxCRjL._SL1500_.jpg',
    genre: 'Ficção',
    rating: 3,
  },
];


export default function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  // --- NOVO ESTADO PARA O MODAL DE DETALHES ---
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // ... (outros estados do formulário)
  const [cover, setCover] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');


  const resetFormFields = () => {
    setTitle(''); setAuthor(''); setCover(''); setTotalPages(''); setCurrentPage('');
    setGenre(''); setRating(0); setStatus(''); setNotes('');
  };

  const handleOpenAddForm = () => {
    resetFormFields();
    setEditingBook(null);
    setIsFormVisible(true);
  };
  
  const handleOpenEditForm = (book: Book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setCover(book.cover);
    setTotalPages(book.totalPages?.toString() || '');
    setCurrentPage(book.currentPage?.toString() || '');
    setGenre(book.genre || '');
    setRating(book.rating || 0);
    setStatus(book.status || '');
    setNotes(book.notes || '');
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setEditingBook(null);
    resetFormFields();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      alert('Título e Autor são obrigatórios!');
      return;
    }

    if (editingBook) {
      const updatedBook: Book = {
        ...editingBook, title, author, cover,
        totalPages: totalPages ? Number(totalPages) : undefined,
        currentPage: currentPage ? Number(currentPage) : undefined,
        genre: genre || undefined, rating: rating > 0 ? rating : undefined,
        status: status || undefined, notes: notes || undefined,
      };
      setBooks(books.map(book => book.id === editingBook.id ? updatedBook : book));
    } else {
      const newBook: Book = {
        id: crypto.randomUUID(), title, author,
        cover: cover || 'https://via.placeholder.com/400x600.png?text=Sem+Capa',
        totalPages: totalPages ? Number(totalPages) : undefined,
        currentPage: currentPage ? Number(currentPage) : undefined,
        genre: genre || undefined, rating: rating > 0 ? rating : undefined,
        status: status || undefined, notes: notes || undefined,
      };
      setBooks([...books, newBook]);
    }
    handleCloseForm();
  };

  const handleDeleteBook = (e: MouseEvent, bookId: string) => {
    e.stopPropagation(); // Impede que o clique no botão abra o modal
    const isConfirmed = window.confirm('Tem certeza de que deseja excluir este livro?');
    if (isConfirmed) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleOpenEditModal = (e: MouseEvent, book: Book) => {
    e.stopPropagation(); // Impede que o clique no botão abra o modal
    handleOpenEditForm(book);
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
          <button onClick={handleOpenAddForm} className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors">
            Adicionar Livro
          </button>
        </div>

        {isFormVisible && (
          // ... (o formulário completo continua o mesmo)
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">{editingBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-slate-400 mb-1">Título (Obrigatório)</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-slate-400 mb-1">Autor (Obrigatório)</label>
                <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="cover" className="block text-slate-400 mb-1">URL da Capa (Opcional)</label>
                <input type="url" id="cover" value={cover} onChange={(e) => setCover(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
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
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="genre" className="block text-slate-400 mb-1">Gênero</label>
                  <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Selecione um gênero</option>
                    {availableGenres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-slate-400 mb-1">Status de Leitura</label>
                  <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Selecione um status</option>
                    {availableStatus.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-slate-400 mb-1">Avaliação</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (<button type="button" key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-slate-600'} transition-colors`}>★</button>))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block text-slate-400 mb-1">Notas Pessoais</label>
                <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseForm} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        )}

        {/* Listagem de Livros em Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div 
              key={book.id}
              onClick={() => setSelectedBook(book)} // Adiciona o clique para abrir o modal
              className="group bg-slate-800 rounded-lg overflow-hidden shadow-lg flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="relative aspect-[2/3] w-full bg-slate-700 flex items-center justify-center text-center">
                <img src={book.cover} alt={`Capa de '${book.title}'`} className="w-full h-full object-cover text-xs text-slate-400" />
                 {book.rating && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white font-bold text-sm">{book.rating}</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={(e) => handleOpenEditModal(e, book)} className="bg-blue-600/80 hover:bg-blue-500 text-white p-2 rounded-full" aria-label="Editar livro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>
                  </button>
                  <button onClick={(e) => handleDeleteBook(e, book.id)} className="bg-red-600/80 hover:bg-red-500 text-white p-2 rounded-full" aria-label="Excluir livro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                  </button>
                </div>
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-bold text-md truncate">{book.title}</h3>
                  <p className="text-sm text-slate-400 truncate">{book.author}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {book.genre && (<span className="bg-cyan-800 text-cyan-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{book.genre}</span>)}
                  {book.status && (<span className="bg-purple-800 text-purple-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{book.status}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- CÓDIGO DO NOVO MODAL DE DETALHES --- */}
      {selectedBook && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedBook(null)} // Fecha ao clicar no fundo
        >
          <div 
            className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">{selectedBook.title}</h2>
              <button onClick={() => setSelectedBook(null)} className="text-2xl text-slate-500 hover:text-white">&times;</button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <img src={selectedBook.cover} alt={`Capa de ${selectedBook.title}`} className="w-full md:w-1/3 h-auto object-cover rounded-md" />
              <div className="flex-1">
                <p className="text-lg text-slate-300 mb-4">{selectedBook.author}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedBook.genre && <span className="bg-cyan-800 text-cyan-200 text-sm font-semibold px-3 py-1 rounded-full">{selectedBook.genre}</span>}
                  {selectedBook.status && <span className="bg-purple-800 text-purple-200 text-sm font-semibold px-3 py-1 rounded-full">{selectedBook.status}</span>}
                </div>
                {selectedBook.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(star => <span key={star} className={`text-2xl ${star <= (selectedBook.rating || 0) ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>)}
                  </div>
                )}
                {(selectedBook.totalPages || selectedBook.currentPage) && (
                  <div className="text-slate-400">
                    <p>Progresso: {selectedBook.currentPage || 0} / {selectedBook.totalPages || '?'} páginas</p>
                  </div>
                )}
                {selectedBook.notes && (
                  <div className="mt-4">
                    <h3 className="font-bold text-slate-300 mb-2">Notas:</h3>
                    <p className="bg-slate-700 p-3 rounded-md text-slate-300 whitespace-pre-wrap">{selectedBook.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}