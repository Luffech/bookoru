'use client';

import { useRef, useState } from 'react';
import { createBook } from '../app/actions';
import { AppBook } from '../lib/repo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STATUS_OPTIONS: AppBook['status'][] = ["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"];

export function BookForm() {
  const [rating, setRating] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<AppBook['status']>('QUERO_LER');

  async function handleCreateAction(formData: FormData) {
    formData.append('rating', String(rating));
    formData.append('status', status);

    const promise = createBook(formData).then(result => {
      if (result.success) {
        formRef.current?.reset();
        setRating(0);
        setStatus('QUERO_LER');
        return result;
      } else {
        throw new Error(result.message);
      }
    });

    toast.promise(promise, {
      loading: 'Adicionando livro...',
      success: 'Livro adicionado com sucesso!',
      error: (err) => err.message || 'Erro ao adicionar o livro.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-xl text-primary">Adicionar Livro</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleCreateAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input id="author" name="author" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage">Página Atual</Label>
              <Input id="currentPage" name="currentPage" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPages">Total de Páginas</Label>
              <Input id="totalPages" name="totalPages" type="number" placeholder="0" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" placeholder="978-3-16-148410-0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => setStatus(value as AppBook['status'])} defaultValue="QUERO_LER">
              <SelectTrigger id="status">
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
                  className={`text-2xl transition-transform duration-150 ease-in-out hover:scale-125 ${rating >= n ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  👻
                </button>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={() => setRating(0)} className="text-xs ml-2">
                Limpar
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea id="notes" name="notes" placeholder="Suas anotações sobre o livro..." />
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full">Adicionar Livro</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}