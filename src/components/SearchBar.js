export default function SearchBar({ query, onQueryChange, onSearch }) {
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
    </section>
  );
}
