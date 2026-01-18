"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ShowGrid from "@/components/ShowGrid";
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

    // Solo llamamos a /shows una vez
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

  const filteredShows = useMemo(() => {
    if (!query.trim()) return shows;
    const q = query.toLowerCase();
    return shows.filter((s) => (s.name || "").toLowerCase().includes(q));
  }, [shows, query]);

  function openDetails(showId) {
    // En el siguiente commit abrimos modal + detalle API
    console.log("Abrir detalle:", showId);
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">TVMaze Explorer</h1>
          <p className="opacity-80">
            Pulsa “Buscar” para cargar el listado, filtra por nombre y abre el detalle.
          </p>
        </header>

        <SearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
            {error}
          </div>
        ) : null}

        {loading ? <div className="text-sm opacity-80">Cargando…</div> : null}

        {/* Enunciado: antes de buscar, no mostramos el listado */}
        {hasSearched && !loading && !error ? (
          <ShowGrid shows={filteredShows} onOpenDetails={openDetails} />
        ) : null}
      </div>
    </main>
  );
}
