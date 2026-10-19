import { Badge, Button, Modal } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import MoviePoster from './MoviePoster';
import styles from './Movies.module.css';

const MAX_CAST = 12;

const MovieDetailsModal = ({ movie, show, onHide, favorite }) => {
    const { isFavorite, toggleFavorite, isBusy } = favorite;
    const titleId = `movie-title-${movie.id}`;
    const cast = movie.cast.slice(0, MAX_CAST);
    const moreCast = movie.cast.length - cast.length;

    return (
        <Modal show={show} onHide={onHide} size="lg" centered aria-labelledby={titleId}>
            <Modal.Header closeButton>
                <Modal.Title id={titleId}>
                    {movie.title}
                    {movie.year && <span className={styles.modalYear}> ({movie.year})</span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalLayout}>
                    <MoviePoster movie={movie} className={styles.modalPoster} />
                    <div>
                        {movie.genres.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                {movie.genres.map((genre) => (
                                    <Badge key={genre} bg="secondary" className={styles.genreBadge}>{genre}</Badge>
                                ))}
                            </div>
                        )}
                        <p className={styles.extract}>{movie.extract}</p>
                        {cast.length > 0 && (
                            <>
                                <h4 className={styles.sectionLabel}>Cast</h4>
                                <p className={styles.cast}>
                                    {cast.join(', ')}
                                    {moreCast > 0 && ` and ${moreCast} more`}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={isFavorite ? 'outline-light' : 'primary'} onClick={toggleFavorite} disabled={isBusy}>
                    {isFavorite ? <HeartFill aria-hidden="true" className="me-2" /> : <Heart aria-hidden="true" className="me-2" />}
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MovieDetailsModal;
