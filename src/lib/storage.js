const KEY = "tvmaze_favoritos_v1";

export function loadFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(favs));
}
