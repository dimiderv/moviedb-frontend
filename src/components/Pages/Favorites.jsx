import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Heart, Search } from 'react-bootstrap-icons';
import { selectSearchString } from '../../features/search/searchSlice';
import { useGetFavoritesQuery } from '../../features/movies/moviesApiSlice';
import { filterMovies } from '../../features/movies/filterMovies';
import MovieGrid from '../movies/MovieGrid';
import { EmptyState, ErrorState, PageLoader } from '../PageState/PageState';

const Favorites = () => {
    const search = useSelector(selectSearchString);
    const { data: favorites = [], isLoading, isError, error, refetch } = useGetFavoritesQuery();
    const visibleFavorites = useMemo(() => filterMovies(favorites, search), [favorites, search]);

    if (isLoading) return <PageLoader label="Loading your favorites…" />;
    if (isError) return <ErrorState error={error} title="Couldn't load your favorites" onRetry={refetch} />;

    if (!favorites.length) {
        return (
            <EmptyState
                icon={Heart}
                title="No favorites yet"
                action={<Button as={Link} to="/movies" variant="primary">Browse movies</Button>}
            >
                Tap the heart on any movie to keep it here.
            </EmptyState>
        );
    }

    return (
        <section>
            <header className="page-header">
                <h1 className="page-title">Your favorites</h1>
                <p className="page-subtitle" aria-live="polite">
                    {favorites.length} saved {favorites.length === 1 ? 'film' : 'films'}
                    {search.trim() && ` · ${visibleFavorites.length} matching “${search.trim()}”`}
                </p>
            </header>
            {visibleFavorites.length ? (
                <MovieGrid movies={visibleFavorites} />
            ) : (
                <EmptyState icon={Search} title="No matches in your favorites" />
            )}
        </section>
    );
};

export default Favorites;
