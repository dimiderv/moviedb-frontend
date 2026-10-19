import MovieCard from './MovieCard';
import styles from './Movies.module.css';

const MovieGrid = ({ movies }) => (
    <ul className={styles.grid}>
        {movies.map((movie) => (
            <li key={movie.id}>
                <MovieCard movie={movie} />
            </li>
        ))}
    </ul>
);

export default MovieGrid;
