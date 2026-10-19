import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { selectSearchString } from '../../features/search/searchSlice';
import useDebouncedValue from '../../features/search/useDebouncedValue';
import { useGetGenresQuery, useGetMoviesQuery } from '../../features/movies/moviesApiSlice';
import MovieGrid from './MovieGrid';
import Paginator from './Paginator';
import { EmptyState, ErrorState, PageLoader } from '../PageState/PageState';
import styles from './Movies.module.css';

export const PAGE_SIZE = 24;

// Server-paginated movie grid. Genre and page live in the URL (?genre=&page=); search comes from the navbar.
const MovieBrowser = () => {
    const rawSearch = useSelector(selectSearchString).trim();
    const search = useDebouncedValue(rawSearch, 350);
    const [searchParams, setSearchParams] = useSearchParams();
    const genre = searchParams.get('genre') || '';
    const page = Math.max(1, Number.parseInt(searchParams.get('page'), 10) || 1);

    const { data, isLoading, isFetching, isError, error, refetch } = useGetMoviesQuery({
        page,
        limit: PAGE_SIZE,
        genre,
        search,
    });
    const { data: genres = [] } = useGetGenresQuery();

    const updateParams = (changes) => {
        const next = new URLSearchParams(searchParams);
        Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
        setSearchParams(next, { replace: true });
    };

    // A new search starts again from page 1.
    const lastSearch = useRef(search);
    useEffect(() => {
        if (lastSearch.current === search) return;
        lastSearch.current = search;
        if (page !== 1) updateParams({ page: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Stay inside the valid range if the result set shrank (e.g. an old ?page= link).
    const totalPages = data?.totalPages ?? 0;
    useEffect(() => {
        if (totalPages && page > totalPages) updateParams({ page: totalPages > 1 ? String(totalPages) : null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, totalPages]);

    const goToPage = (nextPage) => {
        updateParams({ page: nextPage > 1 ? String(nextPage) : null });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <PageLoader label="Loading movies…" />;
    if (isError && !data) return <ErrorState error={error} title="Couldn't load movies" onRetry={refetch} />;

    const { movies = [], total = 0 } = data ?? {};
    const heading = search ? `Results for “${search}”` : genre || 'All movies';

    return (
        <section>
            <header className="page-header page-header-row">
                <div>
                    <h1 className="page-title">{heading}</h1>
                    <p className="page-subtitle" aria-live="polite">
                        {total.toLocaleString()} {total === 1 ? 'film' : 'films'}
                        {search && genre && ` in ${genre}`}
                        {totalPages > 1 && ` · page ${page} of ${totalPages}`}
                        {(isFetching || rawSearch !== search) && (
                            <Spinner animation="border" size="sm" className="ms-2" role="status">
                                <span className="visually-hidden">Updating results…</span>
                            </Spinner>
                        )}
                    </p>
                </div>
                <Form.Group controlId="genre-filter" className="genre-filter">
                    <Form.Label className="visually-hidden">Filter by genre</Form.Label>
                    <Form.Select value={genre} onChange={(e) => updateParams({ genre: e.target.value, page: null })}>
                        <option value="">All genres</option>
                        {genres.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </header>
            {movies.length ? (
                <div className={isFetching ? styles.refreshing : undefined} aria-busy={isFetching}>
                    <MovieGrid movies={movies} />
                </div>
            ) : (
                <EmptyState icon={Search} title="No movies found">
                    Try a different title, a cast member’s name, or another genre.
                </EmptyState>
            )}
            <Paginator page={page} totalPages={totalPages} onChange={goToPage} />
        </section>
    );
};

export default MovieBrowser;
