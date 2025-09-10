import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import "../home.css";

import img1 from "../../../../public/assets/productos/ropa1.webp";
import img2 from "../../../../public/assets/productos/ropa2.webp";
import img3 from "../../../../public/assets/productos/ropa3.webp";
import img4 from "../../../../public/assets/productos/ropa4.webp";
import img5 from "../../../../public/assets/productos/ropa5.webp";
import img6 from "../../../../public/assets/productos/ropa6.webp";
import img7 from "../../../../public/assets/productos/ropa7.webp";
import img8 from "../../../../public/assets/productos/ropa8.webp";
import img9 from "../../../../public/assets/productos/ropa9.webp";
import img10 from "../../../../public/assets/productos/ropa10.webp";

const productos = [
  { imagen: img1 },
  { imagen: img2 },
  { imagen: img3 },
  { imagen: img4 },
  { imagen: img5 },
  { imagen: img6 },
  { imagen: img7 },
  { imagen: img8 },
  { imagen: img9 },
  { imagen: img10 }
];

export default function ProductSlider() {
  const sliderRef = useRef();

  const scroll = (direction) => {
    const container = sliderRef.current;
    const cardWidth = 220;
    const gap = 16;
    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-slider-wrapper">
      <button className="slider-arrow left" onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      <div className="product-slider" ref={sliderRef}>
        <div className="product-slider-inner">
          {productos.map((producto, idx) => (
            <div className="product-card" key={idx}>
              <img
                src={producto.imagen}
                alt={`Producto ${idx + 1}`}
                className="product-image"
              />
            </div>
          ))}
        </div>
      </div>

      <button className="slider-arrow right" onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
}
