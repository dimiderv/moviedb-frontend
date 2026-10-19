import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'react-bootstrap-icons';
import { selectSearchString } from '../../features/search/searchSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useGetFavoritesQuery, useGetMoviesQuery } from '../../features/movies/moviesApiSlice';
import { byNewest, filterMovies } from '../../features/movies/filterMovies';
import MovieShelf from '../movies/MovieShelf';
import MovieGrid from '../movies/MovieGrid';
import { EmptyState, ErrorState, PageLoader } from '../PageState/PageState';

const SHELF_SIZE = 16;
const FEATURED_GENRES = ['Comedy', 'Drama', 'Action', 'Thriller', 'Horror', 'Animated', 'Science Fiction'];

const Home = () => {
    const search = useSelector(selectSearchString);
    const username = useSelector(selectCurrentUser);
    const { data: movies = [], isLoading, isError, error, refetch } = useGetMoviesQuery();
    const { data: favorites = [] } = useGetFavoritesQuery();

    const shelves = useMemo(() => {
        const newest = [...movies].sort(byNewest);
        const genreShelves = FEATURED_GENRES.map((genre) => ({
            title: genre === 'Animated' ? 'Animation' : genre,
            seeAllTo: `/movies?genre=${encodeURIComponent(genre)}`,
            movies: newest.filter((movie) => movie.genres.includes(genre)).slice(0, SHELF_SIZE),
        })).filter((shelf) => shelf.movies.length >= 4);

        return [
            { title: 'New releases', seeAllTo: '/movies', movies: newest.slice(0, SHELF_SIZE) },
            ...genreShelves,
        ];
    }, [movies]);

    const searchResults = useMemo(() => filterMovies(movies, search), [movies, search]);

    if (isLoading) return <PageLoader label="Loading movies…" />;
    if (isError) return <ErrorState error={error} title="Couldn't load movies" onRetry={refetch} />;

    if (search.trim()) {
        return (
            <section aria-live="polite">
                <h1 className="page-title">Results for “{search.trim()}”</h1>
                {searchResults.length ? (
                    <MovieGrid movies={searchResults} />
                ) : (
                    <EmptyState icon={Search} title="No matches">
                        Try a different title or the name of someone in the cast.
                    </EmptyState>
                )}
            </section>
        );
    }

    if (!movies.length) {
        return (
            <EmptyState title="No movies yet">
                The catalogue is empty. Run the backend seed script to load the movie library.
            </EmptyState>
        );
    }

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">{username ? `Welcome back, ${username}` : 'Welcome back'}</h1>
                <p className="page-subtitle">{movies.length.toLocaleString()} films to explore.</p>
            </header>
            {favorites.length > 0 && (
                <MovieShelf title="Your favorites" movies={favorites.slice(0, SHELF_SIZE)} seeAllTo="/favorites" />
            )}
            {shelves.map((shelf) => (
                <MovieShelf key={shelf.title} {...shelf} />
            ))}
        </>
    );
};

export default Home;
