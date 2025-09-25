import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import Products from '../features/products/Products';
import User from '../features/user/User';
import Nav from '../shared/components/Nav';
import Footer from '../shared/components/Footer';
import Cart from '../features/cart/Cart'; 
import Favorites from '../features/favorites/Favorites';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favoritos" element={<Favorites/>}/>
      </Routes>
      <Footer />
    </HashRouter>
  );
};



export default AppRoutes;
