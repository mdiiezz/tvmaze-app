import ShowCard from "./ShowCard";

export default function ShowGrid({ shows, onOpenDetails }) {
  if (!shows.length) {
    return <div className="text-sm opacity-80">No hay resultados.</div>;
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {shows.map((s) => (
        <ShowCard key={s.id} show={s} onOpenDetails={() => onOpenDetails(s.id)} />
      ))}
    </section>
  );
}
