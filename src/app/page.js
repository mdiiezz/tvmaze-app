"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { getShows } from "@/lib/tvmaze";

export default function Home() {
  const [query, setQuery] = useState("");

  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    setHasSearched(true);
    setError("");

    // Importante: solo llamamos a /shows una vez
    if (shows.length > 0) return;

    try {
      setLoading(true);
      const data = await getShows();
      setShows(data);
    } catch (e) {
      setError(e?.message ?? "Error cargando series");
    } finally {
      setLoading(false);
    }
  }

  // Por ahora NO filtramos ni pintamos grid (eso es el siguiente commit)
  // Solo mostramos cuántas series hay cargadas para comprobar que funciona.

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">TVMaze Explorer</h1>
          <p className="opacity-80">Busca series y guarda favoritos.</p>
        </header>

        <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
            {error}
          </div>
        ) : null}

        {loading ? <div className="text-sm opacity-80">Cargando…</div> : null}

        {hasSearched && !loading && !error ? (
          <div className="text-sm opacity-80">
            Series cargadas: <span className="font-medium">{shows.length}</span>
          </div>
        ) : null}
      </div>
    </main>
  );
}
