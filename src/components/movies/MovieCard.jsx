import { useState } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import MovieDetailsModal from './MovieDetailsModal';
import MoviePoster from './MoviePoster';
import { useFavorite } from '../../features/movies/useFavorite';
import styles from './Movies.module.css';

const MovieCard = ({ movie }) => {
    const [showDetails, setShowDetails] = useState(false);
    const favorite = useFavorite(movie);
    const { isFavorite, toggleFavorite, isBusy } = favorite;
    const subtitle = [movie.year, movie.genres.slice(0, 2).join(', ')].filter(Boolean).join(' · ');

    return (
        <article className={styles.card}>
            <button
                type="button"
                className={styles.posterButton}
                onClick={() => setShowDetails(true)}
                aria-label={`Show details for ${movie.title}`}
            >
                <MoviePoster movie={movie} />
            </button>
            <div className={styles.cardBody}>
                <div className={styles.cardText}>
                    <h3 className={styles.cardTitle} title={movie.title}>{movie.title}</h3>
                    {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
                </div>
                <button
                    type="button"
                    className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                    onClick={toggleFavorite}
                    disabled={isBusy}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <HeartFill aria-hidden="true" /> : <Heart aria-hidden="true" />}
                </button>
            </div>
            <MovieDetailsModal
                movie={movie}
                show={showDetails}
                onHide={() => setShowDetails(false)}
                favorite={favorite}
            />
        </article>
    );
};

export default MovieCard;
