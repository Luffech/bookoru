'use client';

import { useState, useEffect } from 'react';
import type { AppBook } from '../lib/repo';
import { updateBook } from '../app/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Genre } from '@prisma/client';

const STATUS_OPTIONS: Exclude<AppBook['status'], null>[] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

interface EditBookModalProps {
  book: AppBook | null;
  genres: Genre[];
  onClose: () => void;
}

export function EditBookModal({ book, genres, onClose }: EditBookModalProps) {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<AppBook['status'] | undefined>(undefined);

  useEffect(() => {
    if (book) {
      setRating(book.rating || 0);
      setStatus(book.status || 'QUERO_LER');
    }
  }, [book]);
  
  if (!book) return null;

  async function handleUpdateAction(formData: FormData) {
    formData.append('rating', String(rating));
    if(status) formData.append('status', status);

    const promise = updateBook(formData).then(result => {
      if (result.success) {
        onClose();
        return result;
      } else {
        throw new Error(result.message);
      }
    });

    toast.promise(promise, {
      loading: 'Atualizando livro...',
      success: 'Livro atualizado com sucesso!',
      error: (err) => err.message || 'Erro ao atualizar o livro.',
    });
  }

  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-douro">Editar Livro</DialogTitle>
        </DialogHeader>
        <form action={handleUpdateAction} className="space-y-4 py-4">
          <input type="hidden" name="bookId" value={book.id} />
          <div className="space-y-2">
            <Label htmlFor="title-edit">Título *</Label>
            <Input id="title-edit" name="title" required defaultValue={book.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author-edit">Autor *</Label>
            <Input id="author-edit" name="author" required defaultValue={book.author} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage-edit">Página Atual</Label>
              <Input id="currentPage-edit" name="currentPage" type="number" defaultValue={book.currentPage ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPages-edit">Total de Páginas</Label>
              <Input id="totalPages-edit" name="totalPages" type="number" defaultValue={book.totalPages ?? ''} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="genreId-edit">Gênero</Label>
            <Select name="genreId" defaultValue={book.genreId ?? undefined}>
              <SelectTrigger id="genreId-edit">
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id}>{genre.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn-edit">ISBN</Label>
            <Input id="isbn-edit" name="isbn" defaultValue={book.isbn ?? ''} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status-edit">Status</Label>
            <Select onValueChange={(value) => setStatus(value as AppBook['status'])} defaultValue={book.status ?? 'QUERO_LER'}>
              <SelectTrigger id="status-edit">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Avaliação</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={`text-3xl transition-transform duration-150 ease-in-out hover:scale-125 ${rating >= n ? 'text-douro' : 'text-muted-foreground'}`}
                >
                  ★
                </button>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={() => setRating(0)} className="text-xs ml-2">
                Limpar
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes-edit">Notas</Label>
            <Textarea id="notes-edit" name="notes" defaultValue={book.notes ?? ''} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-secondary hover:bg-primary hover:text-douro">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}