import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import "../home.css";

const productos = [
  { imagen: "ropa1.webp" },
  { imagen: "ropa2.webp" },
  { imagen: "ropa3.webp" },
  { imagen: "ropa4.webp" },
  { imagen: "ropa5.webp" },
  { imagen: "ropa6.webp" },
  { imagen: "ropa7.webp" },
  { imagen: "ropa8.webp" },
  { imagen: "ropa9.webp" },
  { imagen: "ropa10.webp" }
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
                src={`/lebana-ecommerce/productosImages/${producto.imagen}`}
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
