// src/components/ShowCard.js
// Card individual de una serie: imagen + nombre + botón de favoritos

export default function ShowCard({ show, isFavorite, onOpenDetails, onToggleFavorite }) {
  // TVMaze puede devolver image.medium/original o null
  const img = show.image?.medium || show.image?.original;

  return (
    <article className="rounded-2xl border border-black/10 overflow-hidden hover:bg-black/5">
      {/* Click en la tarjeta -> abre el detalle en modal */}
      <button onClick={onOpenDetails} className="w-full text-left">
        <div className="aspect-[3/4] bg-black/5">
          {img ? (
            // Usamos <img> directo para simplificar (TVMaze sirve URLs externas)
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={show.name} className="h-full w-full object-cover" />
          ) : (
            // Fallback si la serie no tiene imagen
            <div className="h-full w-full flex items-center justify-center text-xs opacity-70">
              Sin imagen
            </div>
          )}
        </div>

        <div className="p-3">
          {/* Limitamos líneas para que todas las cards tengan altura coherente */}
          <h3 className="text-sm font-medium line-clamp-2">{show.name}</h3>
        </div>
      </button>

      <div className="px-3 pb-3">
        {/* Botón separado del click general para añadir/quitar de favoritos */}
        <button
          onClick={onToggleFavorite}
          className="w-full rounded-xl border border-black/10 py-2 text-xs hover:bg-black/5"
        >
          {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
      </div>
    </article>
  );
}