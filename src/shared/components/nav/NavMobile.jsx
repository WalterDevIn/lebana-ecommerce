import React from "react";
import { Link } from "react-router-dom";
import "../nav.css";

function NavMobile({ open, close }) {
    return (
        <nav className={`nav-mobile ${open ? "open" : ""}`}>
            <div className="nav-mobile-section">
                <span className="nav-mobile-title">Comprar</span>
                <Link to="/productos" onClick={close}>Productos</Link>
                <Link to="/accesorios" onClick={close}>Accesorios</Link>
                <Link to="/ofertas" onClick={close}>Ofertas</Link>
            </div>
            <div className="nav-mobile-section">
                <span className="nav-mobile-title">Información</span>
                <Link to="/guia-de-talles" onClick={close}>Guía de talles</Link>
                <Link to="/blog" onClick={close}>Blog</Link>
            </div>
        </nav>
    )
}

export default NavMobile;