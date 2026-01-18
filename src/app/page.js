"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [query, setQuery] = useState("");

  function handleSearch() {
    // De momento solo comprobamos que el botón funciona
    console.log("Buscar:", query);
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">TVMaze Explorer</h1>
          <p className="opacity-80">Busca series y guarda favoritos.</p>
        </header>

        <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />
      </div>
    </main>
  );
}
