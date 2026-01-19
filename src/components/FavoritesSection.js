// src/components/FavoritesSection.js
// Sección que muestra favoritos guardados (IDs) y permite abrir detalle o quitar favoritos

export default function FavoritesSection({ favorites, shows, onOpenDetails, onToggleFavorite }) {
  // Si no hay favoritos, no mostramos la sección
  if (!favorites.length) return null;

  // Convertimos IDs favoritos -> objetos show (solo si ya cargamos /shows)
  const favShows = shows.filter((s) => favorites.includes(s.id));

  return (
    <section className="rounded-2xl border border-black/10 p-4">
      <h2 className="text-sm font-medium mb-3">Favoritos</h2>

      {favShows.length ? (
        // Lista horizontal para que sea cómoda en móvil (scroll horizontal)
        <div className="flex gap-2 overflow-x-auto pb-1">
          {favShows.map((s) => (
            <div
              key={s.id}
              className="shrink-0 rounded-xl border border-black/10 px-3 py-2 text-xs"
            >
              {/* Click en el nombre -> abre el modal de detalle */}
              <button onClick={() => onOpenDetails(s.id)} className="hover:underline">
                {s.name}
              </button>

              {/* Botón rápido para quitar de favoritos */}
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
        // Caso especial: hay favoritos en localStorage pero aún no se cargó el listado (/shows)
        <div className="text-xs opacity-70">
          Favoritos guardados, pero aún no cargaste el listado. Pulsa “Buscar” para cargar.
        </div>
      )}
    </section>
  );
}