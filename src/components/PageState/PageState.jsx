import { Button, Spinner } from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './PageState.module.css';

export const PageLoader = ({ label = 'Loading…', fullscreen = false }) => (
    <div className={`${styles.state} ${fullscreen ? styles.fullscreen : ''}`} role="status" aria-live="polite">
        <Spinner animation="border" className={styles.spinner} aria-hidden="true" />
        <p className={styles.text}>{label}</p>
    </div>
);

export const ErrorState = ({ error, title = 'Something went wrong', onRetry }) => (
    <div className={styles.state} role="alert">
        <ExclamationTriangle className={styles.icon} aria-hidden="true" />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{getErrorMessage(error)}</p>
        {onRetry && (
            <Button variant="outline-light" onClick={onRetry}>
                Try again
            </Button>
        )}
    </div>
);

export const EmptyState = ({ icon: Icon, title, children, action }) => (
    <div className={styles.state}>
        {Icon && <Icon className={styles.icon} aria-hidden="true" />}
        <h2 className={styles.title}>{title}</h2>
        {children && <p className={styles.text}>{children}</p>}
        {action}
    </div>
);
