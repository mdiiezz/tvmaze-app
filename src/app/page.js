// src/app/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ShowGrid from "@/components/ShowGrid";
import ShowModal from "@/components/ShowModal";
import FavoritesSection from "@/components/FavoritesSection";

import { getShowById, getShows } from "@/lib/tvmaze";
import { loadFavorites, saveFavorites } from "@/lib/storage";

export default function Home() {
  // Texto de búsqueda por nombre
  const [query, setQuery] = useState("");

  // Listado completo cargado desde /shows (se carga una sola vez)
  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Filtros extra
  const [genre, setGenre] = useState("ALL");
  const [sortRating, setSortRating] = useState(false);

  // IDs de series favoritas (persisten en localStorage)
  const [favorites, setFavorites] = useState([]);

  // Control del modal y la serie seleccionada (detalle)
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados de UI para peticiones y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar favoritos guardados al iniciar la app
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  // Guardar favoritos cada vez que cambien
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  /**
   * Acción principal: cargar series desde la API.
   * Se llama al pulsar "Buscar". Solo hace fetch una vez y luego se filtra en cliente.
   */
  async function handleSearch() {
    setHasSearched(true);
    setError("");

    // Evitamos volver a pedir /shows si ya lo tenemos en memoria
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

  /**
   * Añade o quita una serie del array de favoritos.
   * Guardamos solo los IDs para poder persistirlos fácil en localStorage.
   */
  function toggleFavorite(showId) {
    setFavorites((prev) =>
      prev.includes(showId) ? prev.filter((id) => id !== showId) : [...prev, showId]
    );
  }

  /**
   * Abre el modal y carga el detalle real de la serie:
   * Endpoint: GET /shows/{id}
   */
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

  // Cierra el modal (no borramos selectedShow para no “parpadear” el contenido)
  function closeModal() {
    setIsModalOpen(false);
  }

  // Lista de géneros dinámica a partir del listado cargado (/shows)
  const genres = useMemo(() => {
    const set = new Set();
    shows.forEach((s) => (s.genres || []).forEach((g) => set.add(g)));
    return ["ALL", ...Array.from(set).sort()];
  }, [shows]);

  // Filtrado (nombre + género) y ordenación por rating (extra)
  const filteredShows = useMemo(() => {
    let list = shows;

    // Filtro por nombre
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) => (s.name || "").toLowerCase().includes(q));
    }

    // Filtro por género
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

  // Para pintar el botón del modal según si la serie seleccionada está en favoritos
  const isSelectedFavorite = selectedShow ? favorites.includes(selectedShow.id) : false;

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">TVMaze Explorer</h1>
          <p className="opacity-80">
            Buscador de series de TV usando la API pública de TVMaze
          </p>
        </header>

        {/* Favoritos visibles siempre (si hay). Permite abrir detalle y quitar favoritos */}
        <FavoritesSection
          favorites={favorites}
          shows={shows}
          onOpenDetails={openDetails}
          onToggleFavorite={toggleFavorite}
        />

        {/* Barra de búsqueda + filtros (género y ordenación por rating) */}
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

        {/* Error de red/API */}
        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
            {error}
          </div>
        ) : null}

        {/* Estado de carga */}
        {loading ? <div className="text-sm opacity-80">Cargando…</div> : null}

        {/* Listado solo después de pulsar Buscar (requisito) */}
        {hasSearched && !error && !loading ? (
          <ShowGrid
            shows={filteredShows}
            favorites={favorites}
            onOpenDetails={openDetails}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}

        {/* Modal con detalle de serie + botón de favoritos */}
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