import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CameraReels } from 'react-bootstrap-icons';
import { EmptyState } from '../PageState/PageState';

const Missing = () => (
    <EmptyState
        icon={CameraReels}
        title="Page not found"
        action={<Button as={Link} to="/" variant="primary">Back to the homepage</Button>}
    >
        The page you were looking for doesn’t exist or has moved.
    </EmptyState>
);

export default Missing;
