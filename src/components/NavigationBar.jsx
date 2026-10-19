import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Film, PersonCircle } from 'react-bootstrap-icons';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearch, selectSearchString, setSearch } from '../features/search/searchSlice';
import { logOut, selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { apiSlice } from '../app/api/apiSlice';

// Pages that filter their list with the navbar search.
const SEARCHABLE_PATHS = ['/home', '/movies', '/favorites'];

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const search = useSelector(selectSearchString);
    const token = useSelector(selectCurrentToken);
    const username = useSelector(selectCurrentUser);
    const [sendLogout] = useSendLogoutMutation();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!SEARCHABLE_PATHS.includes(location.pathname)) navigate('/movies');
    };

    const handleLogout = async () => {
        try {
            await sendLogout().unwrap();
        } catch {
            // Log out locally even if the server can't be reached.
        } finally {
            dispatch(logOut());
            dispatch(clearSearch());
            dispatch(apiSlice.util.resetApiState());
            navigate('/login', { replace: true });
        }
    };

    return (
        <Navbar expand="md" sticky="top" className="app-navbar" collapseOnSelect>
            <Container fluid="xl">
                <Navbar.Brand as={Link} to={token ? '/home' : '/'} className="app-brand">
                    <Film aria-hidden="true" className="me-2" />
                    MovieDB
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    {token ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/home" eventKey="home">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/movies" eventKey="movies">Movies</Nav.Link>
                                <Nav.Link as={NavLink} to="/favorites" eventKey="favorites">Favorites</Nav.Link>
                            </Nav>
                            <Form role="search" className="app-search my-2 my-md-0 me-md-3" onSubmit={handleSearchSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search titles or cast"
                                    aria-label="Search titles or cast"
                                    value={search}
                                    onChange={(e) => dispatch(setSearch(e.target.value))}
                                />
                            </Form>
                            <Nav>
                                <NavDropdown
                                    align="end"
                                    id="account-menu"
                                    title={
                                        <span className="d-inline-flex align-items-center gap-2">
                                            <PersonCircle aria-hidden="true" />
                                            {username || 'Account'}
                                        </span>
                                    }
                                >
                                    <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/favorites">Favorites</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as="button" onClick={handleLogout}>Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </>
                    ) : (
                        <Nav className="ms-auto align-items-md-center gap-2">
                            <Nav.Link as={NavLink} to="/login" eventKey="login">Sign in</Nav.Link>
                            <Button as={Link} to="/register" variant="primary" size="sm">
                                Create account
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
