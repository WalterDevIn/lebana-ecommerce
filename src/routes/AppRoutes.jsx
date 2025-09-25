import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../features/home/Home';
import Products from '../features/products/Products';
import User from '../features/user/User';
import Nav from '../shared/components/Nav';
import Footer from '../shared/components/Footer';
import Cart from '../features/cart/Cart'; 
import Favorites from '../features/favorites/Favorites';

function AppContent() {
  const { pathname } = useLocation();
  const hideFooterOn = ["/user"]; // rutas donde ocultar footer
  const hideFooter = hideFooterOn.includes(pathname);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favoritos" element={<Favorites />} />
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
