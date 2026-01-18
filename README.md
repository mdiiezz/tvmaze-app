# Práctica TVMaze (Next.js + Tailwind)

Aplicación en una sola página que consume la API de TVMaze para mostrar series, ver detalle en modal y gestionar favoritos con persistencia.

## Funcionalidades (requisitos)
- Carga de series: `https://api.tvmaze.com/shows`
- Búsqueda por nombre (filtro dinámico)
- Listado con **imagen + nombre**
- Detalle en **modal** usando: `https://api.tvmaze.com/shows/{id}`
- Favoritos con persistencia en `localStorage`
- Sección de favoritos en la página
- Extra: filtro por **género** y ordenación por **rating**

## Tecnologías
- Next.js (App Router)
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Tailwind CSS
- Fetch API

## Instalación y ejecución
```bash
npm install
npm run dev
