import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Collection, Heart, PersonGear } from 'react-bootstrap-icons';
import { selectCurrentToken } from '../../features/auth/authSlice';
import styles from './Landing.module.css';

const FEATURES = [
    {
        icon: Collection,
        title: 'Browse the catalogue',
        text: 'Over a thousand recent films with posters, plot summaries and full cast lists.',
    },
    {
        icon: Heart,
        title: 'Keep your favorites',
        text: 'Save the films you love and find them again in one place.',
    },
    {
        icon: PersonGear,
        title: 'Your account',
        text: 'Manage your details and password from the settings panel.',
    },
];

const Landing = () => {
    const token = useSelector(selectCurrentToken);

    return (
        <>
            <section className={styles.hero}>
                <h1 className={styles.title}>Find your next favorite film.</h1>
                <p className={styles.lead}>
                    MovieDB is a simple place to explore recent movies, read about the cast and keep a list of the
                    ones you want to remember.
                </p>
                <div className={styles.actions}>
                    {token ? (
                        <Button as={Link} to="/home" variant="primary" size="lg">Go to your movies</Button>
                    ) : (
                        <>
                            <Button as={Link} to="/register" variant="primary" size="lg">Create a free account</Button>
                            <Button as={Link} to="/login" variant="outline-light" size="lg">Sign in</Button>
                        </>
                    )}
                </div>
            </section>
            <ul className={styles.features}>
                {FEATURES.map(({ icon: Icon, title, text }) => (
                    <li key={title} className={styles.feature}>
                        <Icon className={styles.featureIcon} aria-hidden="true" />
                        <h2 className={styles.featureTitle}>{title}</h2>
                        <p className={styles.featureText}>{text}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Landing;
