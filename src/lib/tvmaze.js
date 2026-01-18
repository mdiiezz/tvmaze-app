const BASE = "https://api.tvmaze.com";

export async function getShows() {
  const res = await fetch(`${BASE}/shows`);
  if (!res.ok) throw new Error("Error cargando /shows");
  return res.json();
}

export async function getShowById(id) {
  const res = await fetch(`${BASE}/shows/${id}`);
  if (!res.ok) throw new Error("Error cargando /shows/{id}");
  return res.json();
}
