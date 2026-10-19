# MovieDB frontend

React 18 + Vite app for MovieDB. Talks to the [MovieDB backend](https://github.com/dimiderv/moviedb-backend).

- **State:** Redux Toolkit; RTK Query for all API calls, with automatic access-token refresh
- **UI:** React-Bootstrap 2 / Bootstrap 5 in dark mode, themed through CSS variables in `src/index.css`
- **Forms:** Formik + Yup

## Setup

```bash
cp .env.example .env   # point VITE_API_URL at your backend (optional)
npm install
npm run dev            # http://localhost:3000
npm run build          # production build in ./build
```

The backend must list the frontend origin in `ALLOWED_ORIGINS` (localhost is allowed outside production).

## Structure

```
src/
  app/            store + RTK Query base (token refresh)
  features/       auth, movies/favorites, search slices and API endpoints
  components/
    movies/       MovieCard, MovieGrid, MovieShelf, MovieDetailsModal
    Pages/        Landing, Home, Movies, Favorites, Login, Register, Missing
    UserPanel/    account settings
    PageState/    loading / error / empty states
  context/        toast notifications
```
