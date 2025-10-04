'use client';

import type { AppBook } from "../lib/repo";
import { deleteBook } from '../app/actions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface BookCardProps {
  book: AppBook;
  onEdit: () => void;
}

const statusStyles: { [key: string]: string } = {
  LENDO: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  LIDO: 'bg-green-500/20 text-green-300 border-green-500/30',
  PAUSADO: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  ABANDONADO: 'bg-red-500/20 text-red-300 border-red-500/30',
  QUERO_LER: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

export function BookCard({ book, onEdit }: BookCardProps) {
  const progress = book.totalPages && book.currentPage ? Math.round((book.currentPage / book.totalPages) * 100) : 0;

  async function handleDelete() {
    const promise = deleteBook(book.id);
    toast.promise(promise, {
      loading: 'Excluindo livro...',
      success: 'Livro excluído com sucesso!',
      error: 'Erro ao excluir o livro.',
    });
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative aspect-[2/3] bg-muted overflow-hidden">
        <img src={book.cover || "https://via.placeholder.com/400x600.png?text=Sem+Capa"} alt={book.title} className="w-full h-full object-cover" />
        {book.status && (
          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full border ${statusStyles[book.status] || statusStyles.QUERO_LER}`}>
            {book.status.replace('_', ' ')}
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-lg text-primary">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{book.author}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        {book.status === 'LENDO' && progress > 0 && (
          <div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-right text-muted-foreground mt-1">{progress}%</p>
          </div>
        )}
        <div className="mt-3">
          {book.rating ? (
            <div className="flex items-center gap-1">
              <span className="text-2xl text-primary">
                {'👻'.repeat(book.rating)}
              </span>
              <span className="text-2xl text-border opacity-30">
                {'👻'.repeat(5 - book.rating)}
              </span>
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>Editar</Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">Excluir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso irá deletar permanentemente o livro "{book.title}" da sua estante.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}