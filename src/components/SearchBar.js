export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
  genres,
  genre,
  onGenreChange,
  sortRating,
  onToggleSortRating,
}) {
  return (
    <section className="rounded-2xl border border-black/10 p-4 space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nombre…"
          className="w-full rounded-xl border border-black/10 bg-transparent px-3 py-2 outline-none"
        />

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

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sortRating} onChange={onToggleSortRating} />
          Ordenar por rating (extra)
        </label>
      </div>
    </section>
  );
}
