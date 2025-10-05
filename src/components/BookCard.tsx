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
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: AppBook;
  onEdit: () => void;
}

export function BookCard({ book, onEdit }: BookCardProps) {
  async function handleDelete() {
    const promise = deleteBook(book.id);
    toast.promise(promise, {
      loading: 'Excluindo livro...',
      success: 'Livro excluído com sucesso!',
      error: 'Erro ao excluir o livro.',
    });
  }

  return (
    <Card className="overflow-hidden flex flex-col group">
      <Link href={`/books/${book.id}`} className="contents">
        <div className="relative aspect-[2/3] bg-muted overflow-hidden">
          <Image 
            src={book.cover} 
            alt={book.title}
            width={400}
            height={600}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {book.genre && (
            <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full bg-vinho text-white">
              {book.genre.name}
            </span>
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-serif text-lg text-primary">{book.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{book.author}{book.year && `, ${book.year}`}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div>
            {book.rating ? (
              <div className="flex items-center gap-1 text-2xl text-douro">
                {'★'.repeat(book.rating)}
                <span className="text-border opacity-30">
                  {'★'.repeat(5 - (book.rating || 0))}
                </span>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Link>
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