import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3 className="footer-heading">SOBRE NOSOTROS</h3>
          <p className="footer-text">
            Tienda online de moda femenina, especializada en venta minorista y mayorista en toda Argentina. Elegancia, calidad y diseño en cada prenda.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">ATENCIÓN AL CLIENTE</h3>
          <ul className="footer-links">
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Envíos y entregas</a></li>
            <li><a href="#">Política de devoluciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">SUSCRIBITE A NUESTRO NEWSLETTER</h3>
          <p className="footer-text">Recibí ofertas exclusivas, novedades y promociones directamente en tu correo.</p>
          <form className="footer-form">
            <input type="email" placeholder="Tu correo electrónico" />
            <button type="submit">SUSCRIBIRME</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Lebana Atelier</span>
        <div className="footer-legal-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
