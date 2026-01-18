"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ShowGrid from "@/components/ShowGrid";
import ShowModal from "@/components/ShowModal";
import FavoritesSection from "@/components/FavoritesSection";

import { getShowById, getShows } from "@/lib/tvmaze";
import { loadFavorites, saveFavorites } from "@/lib/storage";

export default function Home() {
  const [query, setQuery] = useState("");

  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [genre, setGenre] = useState("ALL");
  const [sortRating, setSortRating] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  async function handleSearch() {
    setHasSearched(true);
    setError("");

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

  function toggleFavorite(showId) {
    setFavorites((prev) =>
      prev.includes(showId) ? prev.filter((id) => id !== showId) : [...prev, showId]
    );
  }

  async function openDetails(showId) {
    setError("");
    try {
      setLoading(true);
      const detail = await getShowById(showId);
      setSelectedShow(detail);
      setIsModalOpen(true);
    } catch (e) {
      setError(e?.message ?? "Error cargando detalle");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Lista de géneros dinámica a partir de /shows
  const genres = useMemo(() => {
    const set = new Set();
    shows.forEach((s) => (s.genres || []).forEach((g) => set.add(g)));
    return ["ALL", ...Array.from(set).sort()];
  }, [shows]);

  // Filtrado + ordenación final
  const filteredShows = useMemo(() => {
    let list = shows;

    // Nombre
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => (s.name || "").toLowerCase().includes(q));
    }

    // Género
    if (genre !== "ALL") {
      list = list.filter((s) => (s.genres || []).includes(genre));
    }

    // Ordenación por rating (extra)
    if (sortRating) {
      list = [...list].sort(
        (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0)
      );
    }

    return list;
  }, [shows, query, genre, sortRating]);

  const isSelectedFavorite = selectedShow ? favorites.includes(selectedShow.id) : false;

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">TVMaze Explorer</h1>
          <p className="opacity-80">
            Búsqueda + filtros + detalle en modal + favoritos (persisten en localStorage).
          </p>
        </header>

        <FavoritesSection
          favorites={favorites}
          shows={shows}
          onOpenDetails={openDetails}
          onToggleFavorite={toggleFavorite}
        />

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          genres={genres}
          genre={genre}
          onGenreChange={setGenre}
          sortRating={sortRating}
          onToggleSortRating={() => setSortRating((v) => !v)}
        />

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
            {error}
          </div>
        ) : null}

        {loading ? <div className="text-sm opacity-80">Cargando…</div> : null}

        {hasSearched && !error ? (
          <ShowGrid
            shows={filteredShows}
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}

        <ShowModal
          open={isModalOpen}
          show={selectedShow}
          onClose={closeModal}
          isFavorite={isSelectedFavorite}
          onToggleFavorite={() => selectedShow && toggleFavorite(selectedShow.id)}
        />
      </div>
    </main>
  );
}
