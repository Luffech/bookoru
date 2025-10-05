// src/components/BookCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AppBook } from "@/lib/repo";
import type { Genre } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditBookModal } from "@/components/EditBookModal";
import { useState } from "react";
import { deleteBook } from "@/app/actions";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";

export function BookCard({ book, genres }: { book: AppBook; genres: Genre[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const progress =
    book.pages && book.currentPage
      ? Math.round((book.currentPage / book.pages) * 100)
      : 0;

  const onDelete = () => {
    const promise = deleteBook(book.id).then((res) => {
      if (res.success) {
        router.refresh();
        return res;
      }
      throw new Error(res.message);
    });

    toast.promise(promise, {
      loading: "Excluindo livro...",
      success: "Livro excluído!",
      error: (err) => err.message || "Erro ao excluir o livro.",
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[110px_1fr] gap-4 p-4">
          <div className="relative w-[110px] h-[160px] overflow-hidden rounded-md">
            <Image
              src={book.cover}
              alt={`Capa de ${book.title}`}
              fill
              sizes="110px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <CardHeader className="p-0">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="font-serif text-lg leading-tight">
                  <Link href={`/books/${book.id}`} className="hover:underline">
                    {book.title}
                  </Link>
                </CardTitle>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" aria-label="Ações">
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditing(true)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={onDelete}>
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground">
                {book.author || "Autor desconhecido"}
              </p>

              {book.genre?.name && (
                <p className="text-xs mt-1">
                  Gênero: <span className="font-medium">{book.genre.name}</span>
                </p>
              )}

              {book.status && (
                <p className="text-xs mt-1">
                  Status: <span className="font-medium">{book.status.replace("_", " ")}</span>
                </p>
              )}

              {book.rating !== null && book.rating !== undefined && (
                <div className="text-douro mt-1">{`★`.repeat(book.rating)}<span className="text-border/50">{`★`.repeat(5 - book.rating)}</span></div>
              )}

              {progress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {progress}% ({book.currentPage}/{book.pages})
                  </p>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>

      {editing && (
        <EditBookModal
          book={book}
          genres={genres}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
