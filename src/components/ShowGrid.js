// src/components/ShowGrid.js
// Renderiza un grid responsive de series usando ShowCard

import ShowCard from "./ShowCard";

export default function ShowGrid({ shows, favorites, onOpenDetails, onToggleFavorite }) {
  // Mensaje simple cuando no hay resultados tras aplicar filtros
  if (!shows.length) {
    return <div className="text-sm opacity-80">No hay resultados.</div>;
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {shows.map((s) => (
        <ShowCard
          key={s.id} // key estable para React (id de TVMaze)
          show={s}
          // Calculamos si la serie está en favoritos (array de IDs)
          isFavorite={favorites.includes(s.id)}
          // Delegamos en el padre la acción de abrir detalle (modal)
          onOpenDetails={() => onOpenDetails(s.id)}
          // Delegamos en el padre la acción de añadir/quitar favorito
          onToggleFavorite={() => onToggleFavorite(s.id)}
        />
      ))}
    </section>
  );
}
