import { useSelector } from 'react-redux';
import { selectSearchString } from '../../features/search/searchSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetFavoritesQuery, useGetMoviesQuery } from '../../features/movies/moviesApiSlice';
import MovieShelf from '../movies/MovieShelf';
import MovieBrowser from '../movies/MovieBrowser';
import { EmptyState, ErrorState, PageLoader } from '../PageState/PageState';

const SHELF_SIZE = 16;
const FEATURED_GENRES = [
    { genre: 'Comedy', title: 'Comedy' },
    { genre: 'Drama', title: 'Drama' },
    { genre: 'Action', title: 'Action' },
    { genre: 'Thriller', title: 'Thriller' },
    { genre: 'Horror', title: 'Horror' },
    { genre: 'Animated', title: 'Animation' },
    { genre: 'Science Fiction', title: 'Science Fiction' },
];

// Each shelf fetches only its own first page.
const GenreShelf = ({ genre, title }) => {
    const { data } = useGetMoviesQuery({ genre, limit: SHELF_SIZE });
    const movies = data?.movies ?? [];
    if (movies.length < 4) return null;
    return <MovieShelf title={title} movies={movies} seeAllTo={`/movies?genre=${encodeURIComponent(genre)}`} />;
};

const Home = () => {
    const search = useSelector(selectSearchString);
    const username = useSelector(selectCurrentUser);
    const { data, isLoading, isError, error, refetch } = useGetMoviesQuery({ limit: SHELF_SIZE });
    const { data: favorites = [] } = useGetFavoritesQuery();

    if (search.trim()) return <MovieBrowser />;
    if (isLoading) return <PageLoader label="Loading movies…" />;
    if (isError) return <ErrorState error={error} title="Couldn't load movies" onRetry={refetch} />;

    if (!data.total) {
        return (
            <EmptyState title="No movies yet">
                The catalogue is empty. It fills automatically the next time the backend starts.
            </EmptyState>
        );
    }

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">{username ? `Welcome back, ${username}` : 'Welcome back'}</h1>
                <p className="page-subtitle">{data.total.toLocaleString()} films to explore.</p>
            </header>
            {favorites.length > 0 && (
                <MovieShelf title="Your favorites" movies={favorites.slice(0, SHELF_SIZE)} seeAllTo="/favorites" />
            )}
            <MovieShelf title="New releases" movies={data.movies} seeAllTo="/movies" />
            {FEATURED_GENRES.map((shelf) => (
                <GenreShelf key={shelf.genre} {...shelf} />
            ))}
        </>
    );
};

export default Home;
