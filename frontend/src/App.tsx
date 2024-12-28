import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import HomePage from './components/HomePage';
import Footer from './components/ui/Footer.tsx';
import Header from './components/ui/Header';
// import Login from './components/auth/Login.tsx';
// import Register from './components/auth/Register.tsx';
import SearchAnime from './components/anime';
// import AboutUs from './components/info/AboutUs';
// import ErrorPage from './components/error/ErrorPage';
// import Privacy from './components/info/Privacy';
// import Terms from './components/info/Terms';
import AnimeDetails from './components/anime/details/AnimeDetails';
// import UserProfile from './components/user/profile';
// import PrivateRoute from './components/auth/PrivateRoute';
// import Stats from './components/user/UserStats';
// import Favorite from './components/user/Favorite';
// import Settings from './components/user/settings';
// import AnimeList from './components/anime/MyList/AnimeList';
import GlobalHelmet from './components/GlobalHelmet';
// import Schedule from './pages/Schedule';
import { AnimePage } from './pages/AnimePage.tsx';
import StaffPage from './pages/Staff';

import './index.css';

const App: React.FC = () => {
    return (
        <HelmetProvider>
            <Router>
                <GlobalHelmet />
                <Routes>
                    {/* <Route path="/" element={<HomePage />} /> */}
                    {/* <Route path="/home" element={<HomePage />} /> */}
                    {/* <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} /> */}
                    <Route path="/search/anime" element={<SearchAnime />} />
                    <Route path="/anime/:id_anime/:anime_name" element={<AnimeDetails />} />
                    <Route path="/staff/:id_staff/:staff_name" element={<StaffPage />} />
                    <Route path="/staff/:id_staff" element={<StaffPage />} /> {/* Ruta alternativa para redirigir */}
                    {/* <Route path="/user/:username/" element={<PrivateRoute element={<UserProfile />} />} />
                        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
                        <Route path="/user/:username/stats" element={<PrivateRoute element={<Stats />} />} />
                        <Route path="/user/:username/favorites" element={<PrivateRoute element={<Favorite />} />} />
                        <Route path="/user/:username/mylist" element={<PrivateRoute element={<AnimeList />} />} />
                        <Route path='/Fall2024' element={<Schedule />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/Privacy" element={<Privacy />} />
                        <Route path="/Terms" element={<Terms />} />
                        <Route path="/403" element={<ErrorPage errorType={403} />} />
                        <Route path="/404" element={<ErrorPage errorType={404} />} />
                        <Route path="*" element={<Navigate to="/404" />} /> */}
                    <Route path="/test" element={<AnimePage />} />
                </Routes>
                <Footer />
            </Router>
        </HelmetProvider>
    );
};

export default App;
