import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PersistLogin from './components/authComponents/PersistLogin';
import RequireAuth from './components/authComponents/RequireAuth';
import Landing from './components/Pages/Landing';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Home from './components/Pages/Home';
import MovieContainer from './components/Pages/MovieContainer';
import Favorites from './components/Pages/Favorites';
import Missing from './components/Pages/Missing';
import Panel from './components/UserPanel/Panel/Panel';

function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route element={<Layout />}>
                    {/* public routes */}
                    <Route index element={<Landing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="linkpage" element={<Navigate to="/" replace />} />

                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path="home" element={<Home />} />
                        <Route path="movies" element={<MovieContainer />} />
                        <Route path="auth" element={<Navigate to="/movies" replace />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="settings" element={<Panel />} />
                    </Route>

                    <Route path="*" element={<Missing />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
