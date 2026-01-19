// src/components/ShowModal.js
// Modal de detalle de serie: muestra info completa y permite cerrar con ESC/click fuera

"use client";

import { useEffect } from "react";

export default function ShowModal({
  open, // controla si el modal está visible
  show, // objeto detalle de la serie (viene de GET /shows/{id})
  onClose, // función para cerrar el modal
  isFavorite, // indica si la serie actual está en favoritos
  onToggleFavorite, // añade/quita de favoritos desde el modal
}) {
  useEffect(() => {
    if (!open) return;

    // Cerrar con ESC (atajo de UX)
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    // Bloquear scroll del body mientras el modal está abierto
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    // Cleanup: restauramos estado anterior al cerrar el modal
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Si no está abierto o no hay datos, no renderizamos nada
  if (!open || !show) return null;

  // Imagen grande si existe (fallback a medium)
  const img = show.image?.original || show.image?.medium;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        // Click fuera (overlay) para cerrar: solo si se hace click en el fondo
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Contenedor principal del modal */}
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 bg-white text-black p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">{show.name}</h2>

          {/* Botón de cierre explícito */}
          <button
            onClick={onClose}
            className="rounded-xl border border-black/70 px-3 py-1 hover:bg-black/70 hover:text-white text-sm"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-[220px_1fr] gap-4">
          <div className="rounded-2xl overflow-hidden border border-black/10 bg-black/5">
            {img ? (
              // Usamos <img> directo para URLs externas de TVMaze
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={show.name} className="w-full h-full object-cover" />
            ) : (
              <div className="p-6 text-sm opacity-70">Sin imagen</div>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm">
              <span className="opacity-70">Géneros:</span>{" "}
              {(show.genres || []).join(", ") || "—"}
            </p>

            <p className="text-sm">
              <span className="opacity-70">Rating:</span> {show.rating?.average ?? "—"}
            </p>

            {/* TVMaze devuelve summary en HTML -> usamos dangerouslySetInnerHTML */}
            {show.summary ? (
              <div
                className="prose max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            ) : (
              <div className="text-sm opacity-70">Sin resumen.</div>
            )}

            {/* Botón de favoritos dentro del modal */}
            <button
              onClick={onToggleFavorite}
              className="rounded-xl border border-black/70 px-3 py-1 hover:bg-black/70 hover:text-white text-sm"
            >
              {isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            </button>

            <p className="text-xs opacity-60">
              Tip: puedes cerrar con ESC o haciendo click fuera.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}