import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Titles from '../../Titles/Titles';
import { useGetFavoritesQuery } from '../../../../features/movies/moviesApiSlice';
import styles from './Profile.module.css';

const TOP_GENRES = 5;

// Account activity built from the user's real favorites.
function Profile({ user }) {
    const { data: favorites = [], isLoading } = useGetFavoritesQuery();

    const topGenres = useMemo(() => {
        const counts = new Map();
        favorites.forEach((movie) => movie.genres.forEach((genre) => counts.set(genre, (counts.get(genre) || 0) + 1)));
        return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP_GENRES);
    }, [favorites]);

    const days = user.entryDate
        ? Math.max(1, Math.round((Date.now() - new Date(user.entryDate).getTime()) / 86_400_000))
        : null;

    return (
        <>
            <Titles title="Activity" text="A quick look at what you’ve saved." />
            <dl className={styles.stats}>
                <div className={styles.stat}>
                    <dt>Favorites</dt>
                    <dd>{isLoading ? '…' : favorites.length}</dd>
                </div>
                {days && (
                    <div className={styles.stat}>
                        <dt>Days on MovieDB</dt>
                        <dd>{days.toLocaleString()}</dd>
                    </div>
                )}
            </dl>
            <h3 className={styles.heading}>Favorite genres</h3>
            {topGenres.length ? (
                <div className="d-flex flex-wrap gap-2">
                    {topGenres.map(([genre, count]) => (
                        <Badge key={genre} bg="secondary" className={styles.badge}>
                            {genre} · {count}
                        </Badge>
                    ))}
                </div>
            ) : (
                <p className={styles.muted}>
                    Add a few <Link to="/movies">movies</Link> to your favorites to see your top genres here.
                </p>
            )}
        </>
    );
}

export default Profile;
