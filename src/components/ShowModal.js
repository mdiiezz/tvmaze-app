export default function ShowModal({ open, show, onClose }) {
  if (!open || !show) return null;

  const img = show.image?.original || show.image?.medium;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-black/10 bg-white p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">{show.name}</h2>
          <button
            onClick={onClose}
            className="rounded-xl border border-black/10 px-3 py-1 hover:bg-black/5"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-[220px_1fr] gap-4">
          <div className="rounded-2xl overflow-hidden border border-black/10 bg-black/5">
            {img ? (
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

            {show.summary ? (
              <div
                className="prose max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            ) : (
              <div className="text-sm opacity-70">Sin resumen.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
