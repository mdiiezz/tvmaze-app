// src/lib/tvmaz.js
// URL base de la API pública de TVMaze
const BASE = "https://api.tvmaze.com";

/**
 * Obtiene el listado completo de series.
 * Endpoint: GET /shows
 * Devuelve un array de objetos "show".
 */
export async function getShows() {
  const res = await fetch(`${BASE}/shows`);

  // Si la API responde con error (4xx/5xx), lanzamos excepción para manejarla en la UI
  if (!res.ok) throw new Error("Error cargando /shows");

  // Parseamos el JSON y lo devolvemos al componente que lo llamó
  return res.json();
}

/**
 * Obtiene el detalle de una serie concreta por id.
 * Endpoint: GET /shows/{id}
 * @param {number|string} id - Identificador de la serie en TVMaze
 */
export async function getShowById(id) {
  const res = await fetch(`${BASE}/shows/${id}`);

  if (!res.ok) throw new Error("Error cargando /shows/{id}");

  return res.json();
}
