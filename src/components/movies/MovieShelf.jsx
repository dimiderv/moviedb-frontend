import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import styles from './Movies.module.css';

// A horizontally scrolling row of movies with an optional "See all" link.
const MovieShelf = ({ title, movies, seeAllTo }) => {
    if (!movies.length) return null;
    const headingId = `shelf-${title.toLowerCase().replace(/\W+/g, '-')}`;

    return (
        <section className={styles.shelf} aria-labelledby={headingId}>
            <div className={styles.shelfHeader}>
                <h2 id={headingId} className="section-title">{title}</h2>
                {seeAllTo && <Link to={seeAllTo} className={styles.seeAll}>See all</Link>}
            </div>
            <ul className={styles.shelfRow}>
                {movies.map((movie) => (
                    <li key={movie.id} className={styles.shelfItem}>
                        <MovieCard movie={movie} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MovieShelf;
