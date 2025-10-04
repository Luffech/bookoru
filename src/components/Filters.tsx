'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Genre } from '@prisma/client';

interface FiltersProps {
  genres: Genre[];
}

export function Filters({ genres }: FiltersProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleGenreFilter = (genreId: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (genreId) {
      params.set('genre', genreId);
    } else {
      params.delete('genre');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const currentGenreName = genres.find(g => g.id === searchParams.get('genre'))?.name || 'Todos os Gêneros';

  return (
    <div className="flex gap-4 mb-8">
      <Input
        placeholder="Buscar por título ou autor..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        className="flex-grow"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {currentGenreName}
            <span className="ml-2">▼</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleGenreFilter(null)}>
            Todos os Gêneros
          </DropdownMenuItem>
          {genres.map((genre) => (
            <DropdownMenuItem key={genre.id} onSelect={() => handleGenreFilter(genre.id)}>
              {genre.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}