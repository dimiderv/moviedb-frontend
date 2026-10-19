import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import ToastMsgContainer from './ToastMsgContainer';

function Layout() {
    return (
        <div className="app-shell">
            <a href="#main" className="skip-link">Skip to content</a>
            <NavigationBar />
            <main id="main" className="app-main">
                <Container fluid="xl">
                    <Outlet />
                </Container>
            </main>
            <Footer />
            <ToastMsgContainer />
        </div>
    );
}

export default Layout;
