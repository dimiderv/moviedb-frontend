import { useState } from 'react';
import { Film } from 'react-bootstrap-icons';
import styles from './Movies.module.css';

const MoviePoster = ({ movie, className = '' }) => {
    const [failed, setFailed] = useState(false);
    if (failed || !movie.thumbnail) {
        return (
            <div className={`${styles.posterFallback} ${className}`} aria-hidden="true">
                <Film />
            </div>
        );
    }
    return (
        <img
            src={movie.thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className={`${styles.poster} ${className}`}
            onError={() => setFailed(true)}
        />
    );
};

export default MoviePoster;
