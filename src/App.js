import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import MovieContainer from "./components/Pages/MovieContainer";
import NavigationBar from "./components/NavigationBar";
// import Cookies from "universal-cookie";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Favorites from "./components/Pages/Favorites";
import Layout from "./components/Layout";
import AddGenres from "./components/add/AddGenres";
import AddMovies from "./components/add/AddMovies";
import RequireAuth from "./components/authComponents/RequireAuth";
import LinkPage from "./components/Pages/LinkPage";
import Home from "./components/Pages/Home";
import Missing from "./components/Pages/Missing";
import PersistLogin from "./components/authComponents/PersistLogin";
import Footer from "./components/Footer";
import Panel from "./components/UserPanel/Panel/Panel";
import ToastMsgContainer from "./components/ToastMsgContainer";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./features/auth/authSlice";
import Welcome from "./components/Welcome";


function App() {

  const token = useSelector(selectCurrentToken)
  document.body.style.backgroundColor = "rgb(25, 25, 37)";
  return (
    <Container className='container' flex='1'>
      {token &&  <NavigationBar />}
      <ToastMsgContainer/>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<PersistLogin />}>
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<LinkPage />} />\
            <Route path='/initMovies' element={<AddMovies />}/>
            <Route path='/initGenres' element={<AddGenres />}/>
            {/* Protected Routes */}
          
            <Route element={<RequireAuth />}>
              <Route path={'welcome'}  element={<Welcome />}/>
              <Route path="home" element={<Home />} />
              <Route path="genre" element={<AddGenres />} />
              <Route path="addmovies" element={<AddMovies />} />
              <Route path="auth" element={<MovieContainer />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Panel />} />
            </Route>
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
