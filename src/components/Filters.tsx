// src/components/Filters.tsx
"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Genre } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "__all"; // valor sentinela para representar "Todos"

export function Filters({ genres }: { genres: Genre[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onQueryChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("query", value);
    else params.delete("query");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onGenreChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) {
      // limpar filtro
      params.delete("genre");
    } else {
      params.set("genre", value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // se não houver ?genre=..., seleciona "__all" para exibir "Todos os gêneros"
  const currentGenre = searchParams.get("genre") ?? ALL;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-4">
      <div>
        <label htmlFor="query" className="sr-only">
          Buscar por título ou autor
        </label>
        <Input
          id="query"
          placeholder="Buscar por título ou autor..."
          defaultValue={searchParams.get("query") ?? ""}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar por título ou autor"
        />
      </div>

      <div>
        <Select onValueChange={onGenreChange} defaultValue={currentGenre}>
          <SelectTrigger aria-label="Filtrar por gênero">
            <SelectValue placeholder="Todos os gêneros" />
          </SelectTrigger>
          <SelectContent>
            {/* NUNCA usar value="" aqui; Radix não permite string vazia */}
            <SelectItem value={ALL}>Todos os gêneros</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
