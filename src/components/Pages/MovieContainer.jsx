import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { selectSearchString } from '../../features/search/searchSlice';
import { useGetMoviesQuery } from '../../features/movies/moviesApiSlice';
import { byNewest, filterMovies } from '../../features/movies/filterMovies';
import MovieGrid from '../movies/MovieGrid';
import { EmptyState, ErrorState, PageLoader } from '../PageState/PageState';

const MovieContainer = () => {
    const search = useSelector(selectSearchString);
    const [searchParams, setSearchParams] = useSearchParams();
    const genre = searchParams.get('genre') || '';
    const { data: movies = [], isLoading, isError, error, refetch } = useGetMoviesQuery();

    const genres = useMemo(
        () => [...new Set(movies.flatMap((movie) => movie.genres))].sort((a, b) => a.localeCompare(b)),
        [movies]
    );

    const visibleMovies = useMemo(() => {
        const inGenre = genre ? movies.filter((movie) => movie.genres.includes(genre)) : movies;
        return filterMovies(inGenre, search).sort(byNewest);
    }, [movies, genre, search]);

    const handleGenreChange = (e) => {
        const value = e.target.value;
        setSearchParams(value ? { genre: value } : {}, { replace: true });
    };

    if (isLoading) return <PageLoader label="Loading movies…" />;
    if (isError) return <ErrorState error={error} title="Couldn't load movies" onRetry={refetch} />;

    return (
        <section>
            <header className="page-header page-header-row">
                <div>
                    <h1 className="page-title">{genre || 'All movies'}</h1>
                    <p className="page-subtitle" aria-live="polite">
                        {visibleMovies.length.toLocaleString()} {visibleMovies.length === 1 ? 'film' : 'films'}
                        {search.trim() && ` matching “${search.trim()}”`}
                    </p>
                </div>
                <Form.Group controlId="genre-filter" className="genre-filter">
                    <Form.Label className="visually-hidden">Filter by genre</Form.Label>
                    <Form.Select value={genre} onChange={handleGenreChange}>
                        <option value="">All genres</option>
                        {genres.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </header>
            {visibleMovies.length ? (
                <MovieGrid movies={visibleMovies} />
            ) : (
                <EmptyState icon={Search} title="No movies found">
                    Try clearing the search or picking another genre.
                </EmptyState>
            )}
        </section>
    );
};

export default MovieContainer;
