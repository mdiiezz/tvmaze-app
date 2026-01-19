// src/components/SearchBar.js
// Componente de UI para búsqueda y filtros (nombre, género y ordenación)

export default function SearchBar({
  // Texto actual del input de búsqueda
  query,
  // Setter/control del input (estado levantado en page.js)
  onQueryChange,
  // Acción al pulsar "Buscar" (carga inicial de /shows)
  onSearch,

  // Lista de géneros (dinámica) y género seleccionado
  genres,
  genre,
  onGenreChange,

  // Extra: ordenar por rating
  sortRating,
  onToggleSortRating,
}) {
  return (
    <section className="rounded-2xl border border-black/10 p-4 space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Input controlado: el valor viene del estado del padre */}
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nombre…"
          className="w-full rounded-xl border border-black/10 bg-transparent px-3 py-2 outline-none"
        />

        {/* Dispara la carga inicial del listado (solo se hace una vez) */}
        <button
          onClick={onSearch}
          className="rounded-xl px-4 py-2 border border-black/10 hover:bg-black/5"
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">Género:</span>

          {/* Select controlado por estado: filtra el listado en cliente */}
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="rounded-xl border border-black/10 bg-transparent px-3 py-2"
          >
            {(genres || ["ALL"]).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Extra: checkbox para ordenar por rating (descendente) */}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sortRating} onChange={onToggleSortRating} />
          Ordenar por rating
        </label>
      </div>
    </section>
  );
}