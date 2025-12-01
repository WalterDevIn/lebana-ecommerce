import { useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes, FaStar } from "react-icons/fa";
import { FaHeart, FaUserCircle, FaShieldAlt } from "react-icons/fa";
import CartIcon from "./botones-nav-bar/cart-icon";
import { Link } from "react-router-dom";
import "./nav.css";
import NavMobile from "./nav/NavMobile";

export default function Nav({ user }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  const isAuth = Boolean(user);
  const isAdmin = user?.Type_user === 1;

  return (
    <header className="nav-container">

      <div className="nav-topbar">
        ENVÍOS GRATIS EN ARGENTINA PARA PEDIDOS SUPERIORES A $30.000
      </div>

      <div className="nav-main">
        {/* Izquierda: Burger + Logo + Menú categorías */}
        <div className="nav-left">
          <button
            className="nav-burger"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={toggle}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/" className="nav-logo" onClick={close}>
            Lebana
          </Link>

          <nav className="nav-menu">
            <Link to="/productos">Productos</Link>
            <Link to="/accesorios">Accesorios</Link>
            <Link to="/ofertas">Ofertas</Link>
          </nav>
        </div>

        {/* Centro */}
        <nav className="nav-center">
          <Link to="/guia-de-talles">Guía de talles</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        {/* Derecha: íconos */}
        <div className="nav-right">

          <Link to="/favoritos" onClick={close}>
            <FaHeart size={18} />
          </Link>

          <FaSearch className="nav-icon" aria-label="Buscar" />

          {/* BOTÓN ADMIN (solo admin) */}
          {isAdmin && (
            <Link to="/admin" className="nav-icon" title="Panel Admin">
              <FaShieldAlt size={18} />
            </Link>
          )}

          {/* PERFIL / LOGIN DEPENDIENDO DE isAuth */}
          {!isAuth ? (
            <Link to="/user">
              <FaUser className="nav-icon" aria-label="Cuenta" />
            </Link>
          ) : (
            <Link to="/profile">
              <FaUserCircle className="nav-icon" aria-label="Perfil" size={18} />
            </Link>
          )}

          <CartIcon />
        </div>
      </div>

      <NavMobile open={open} close={close} user={user} />
    </header>
  );
};
