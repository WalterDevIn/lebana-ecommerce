import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

// Pages
import Home from '../features/home/Home';
import Products from '../features/products/Products';
import User from '../features/user/login-sign-up/User';
import Profile from '../features/user/profile/Profile';
import Nav from '../shared/components/Nav';
import Footer from '../shared/components/Footer';
import Cart from '../features/cart/Cart';
import Favorites from '../features/favorites/Favorites';
import Admin from "../features/admin/Admin";

// Private route
import PrivateRoute from "./PrivateRoute";

// API connector
import { auth } from "../services/api";

function AppContent() {

  const { pathname } = useLocation();
  const hideFooterOn = ["/user"];
  const hideFooter = hideFooterOn.includes(pathname);

  const [user, setUser] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await auth.getProfile();
        setUser(profile.data || profile);
        console.log(profile);
      } catch (err) {
        setUser(null);
      }

      setLoaded(true);
    };


    loadUser();
  }, []);

  const isAuth = Boolean(user);

  return (
    <>
      <Nav user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />

        <Route
          path="/user"
          element={
            <PublicOnlyRoute isAuth={isAuth}>
              <User onLogin={setUser} />
            </PublicOnlyRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/favoritos" element={<Favorites />} />

        {/* SOLO LOGUEADOS */}
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuth={isAuth} user={user}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* SOLO ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuth={isAuth} user={user} roles={[1]}>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

const AppRoutes = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default AppRoutes;