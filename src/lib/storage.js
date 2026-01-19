// src/lib/storage.js
// Helpers para guardar y cargar favoritos en localStorage (persistencia en el navegador)

const KEY = "tvmaze_favoritos_v1";

/**
 * Carga el array de IDs de series favoritas desde localStorage.
 * Devuelve [] si no hay nada guardado o si ocurre un error.
 */
export function loadFavorites() {
  // En Next.js puede ejecutarse en servidor; ahí no existe "window"
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(KEY);
    // Si no hay datos guardados, devolvemos lista vacía
    return raw ? JSON.parse(raw) : [];
  } catch {
    // Si el JSON está corrupto o falla el parseo, evitamos romper la app
    return [];
  }
}

/**
 * Guarda en localStorage el array de IDs favoritos.
 * @param {Array<number|string>} favs - Lista de IDs de series marcadas como favoritas
 */
export function saveFavorites(favs) {
  // Protegemos ejecución en servidor (SSR)
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(favs));
}
