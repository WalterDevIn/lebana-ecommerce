import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import banner1 from "../../../../public/assets/banners/bannerUno.png";
import banner2 from "../../../../public/assets/banners/D_NQ_732392-MLA87179087330_072025-OO.webp";
import banner3 from "../../../../public/assets/banners/D_NQ_918321-MLA87171246342_072025-OO.webp";
import "../home.css";

export default function MainSlider() {
  const banners = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
  };

  const stopAutoplay = () => clearInterval(intervalRef.current);

  return (
    <div
      className="slider-container"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <button className="slider-arrow left" onClick={prev}>
        <FaChevronLeft />
      </button>
      <div className="slider-content fade-effect">
        <img
          src={banners[current]}
          alt={`Banner ${current + 1}`}
          className="slider-image"
        />
      </div>
      <button className="slider-arrow right" onClick={next}>
        <FaChevronRight />
      </button>
    </div>
  );
}