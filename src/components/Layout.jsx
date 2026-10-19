import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import ToastMsgContainer from './ToastMsgContainer';
import ErrorBoundary from './ErrorBoundary';

function Layout() {
    const location = useLocation();

    return (
        <div className="app-shell">
            <a href="#main" className="skip-link">Skip to content</a>
            <NavigationBar />
            <main id="main" className="app-main">
                <Container fluid="xl">
                    <ErrorBoundary resetKey={location.pathname}>
                        <Outlet />
                    </ErrorBoundary>
                </Container>
            </main>
            <Footer />
            <ToastMsgContainer />
        </div>
    );
}

export default Layout;
