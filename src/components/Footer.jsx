import { Container } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

const Footer = () => (
    <footer className="app-footer">
        <Container fluid="xl" className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-center">
            <span>© {new Date().getFullYear()} MovieDB · Movie data from Wikipedia</span>
            <a
                href="https://github.com/dimiderv"
                target="_blank"
                rel="noreferrer"
                className="app-footer-link"
                aria-label="MovieDB on GitHub"
            >
                <Github aria-hidden="true" size={20} />
            </a>
        </Container>
    </footer>
);

export default Footer;
