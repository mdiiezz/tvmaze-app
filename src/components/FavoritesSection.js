export default function FavoritesSection({ favorites, shows, onOpenDetails, onToggleFavorite }) {
  if (!favorites.length) return null;

  const favShows = shows.filter((s) => favorites.includes(s.id));

  return (
    <section className="rounded-2xl border border-black/10 p-4">
      <h2 className="text-sm font-medium mb-3">Favoritos</h2>

      {favShows.length ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {favShows.map((s) => (
            <div
              key={s.id}
              className="shrink-0 rounded-xl border border-black/10 px-3 py-2 text-xs"
            >
              <button onClick={() => onOpenDetails(s.id)} className="hover:underline">
                {s.name}
              </button>
              <button
                onClick={() => onToggleFavorite(s.id)}
                className="ml-2 opacity-70 hover:opacity-100"
                title="Quitar de favoritos"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs opacity-70">
          Favoritos guardados, pero aún no cargaste el listado. Pulsa “Buscar” para cargar.
        </div>
      )}
    </section>
  );
}
