// src/components/EditBookModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AppBook } from "@/lib/repo";
import { updateBook } from "@/app/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Genre } from "@prisma/client";

const STATUS_OPTIONS: Exclude<AppBook["status"], null>[] = [
  "QUERO_LER",
  "LENDO",
  "LIDO",
  "PAUSADO",
  "ABANDONADO",
];

interface EditBookModalProps {
  book: AppBook | null;
  genres: Genre[];
  onClose: () => void;
}

export function EditBookModal({ book, genres, onClose }: EditBookModalProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<AppBook["status"] | undefined>(undefined);

  useEffect(() => {
    if (book) {
      setRating(book.rating || 0);
      setStatus(book.status || "QUERO_LER");
    }
  }, [book]);

  if (!book) return null;

  async function handleUpdateAction(formData: FormData) {
    formData.append("rating", String(rating));
    if (status) formData.append("status", status);

    const promise = updateBook(formData).then((result) => {
      if (result.success) {
        onClose();
        router.refresh();
        return result;
      }
      throw new Error(result.message);
    });

    toast.promise(promise, {
      loading: "Atualizando livro...",
      success: "Livro atualizado com sucesso!",
      error: (err) => err.message || "Erro ao atualizar o livro.",
    });
  }

  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-douro">
            Editar Livro
          </DialogTitle>
        </DialogHeader>

        <form action={handleUpdateAction} className="space-y-4">
          <input type="hidden" name="bookId" value={book.id} />

          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={book.title} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input id="author" name="author" defaultValue={book.author || ""} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage">Página Atual</Label>
              <Input
                id="currentPage"
                name="currentPage"
                type="number"
                defaultValue={book.currentPage ?? 0}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pages">Total de Páginas</Label>
              <Input
                id="pages"
                name="pages"
                type="number"
                defaultValue={book.pages ?? 0}
                min={0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genreId">Gênero</Label>
            <Select name="genreId" defaultValue={book.genreId || undefined}>
              <SelectTrigger id="genreId">
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" defaultValue={book.isbn || ""} />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              defaultValue={status}
              onValueChange={(v) => setStatus(v as AppBook["status"])}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Avaliação</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = rating >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Avaliar ${n}`}
                    onClick={() => setRating(n)}
                    className={`text-3xl transition-transform duration-150 ease-in-out hover:scale-125 ${
                      active
                        ? "text-douro drop-shadow-glow"
                        : "text-muted-foreground ghost-faded"
                    }`}
                  >
                    👻
                  </button>
                );
              })}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRating(0)}
                className="text-xs ml-2"
              >
                Limpar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" name="notes" defaultValue={book.notes || ""} />
          </div>

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
