import { useState } from "react";
import { FaSearch, FaUser, FaBars, FaTimes, FaStar } from "react-icons/fa";
import CartIcon from "./botones-nav-bar/cart-icon";
import { Link } from "react-router-dom";
import "./nav.css";
import { FaClover, FaHeart, FaHeartCircleCheck } from "react-icons/fa6";
import NavMobile from "./nav/NavMobile";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

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

        {/* Centro: Links informativos (se ocultan antes que las categorías) */}
        <nav className="nav-center">
          <Link to="/guia-de-talles">Guía de talles</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        {/* Derecha: íconos */}
        <div className="nav-right">
          <Link to="/favoritos" onClick={close}><FaHeart size={18} /></Link>
          <FaSearch className="nav-icon" aria-label="Buscar" />
          <Link to="/user"><FaUser className="nav-icon" aria-label="Cuenta" /></Link>
          <CartIcon />
        </div>
      </div>

      <NavMobile/>
    </header>
  );
}
