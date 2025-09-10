import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../home.css";

// Hero Slider assets (from public folder)
const heroImages = [
  "/assets/bannerUno.png",
  "/assets/D_NQ_732392-MLA87179087330_072025-OO.webp",
  "/assets/D_NQ_918321-MLA87171246342_072025-OO.webp",
];

// Product Slider assets (from src folder)
import ropa1 from "../../../public/assets/productos/ropa1.webp";
import ropa2 from "../../../public/assets/productos/ropa2.webp";
import ropa3 from "../../../public/assets/productos/ropa3.webp";
import ropa4 from "../../../public/assets/productos/ropa4.webp";
import ropa5 from "../../../public/assets/productos/ropa5.webp";
import ropa6 from "../../../public/assets/productos/ropa6.webp";
import ropa7 from "../../../public/assets/productos/ropa7.webp";
import ropa8 from "../../../public/assets/productos/ropa8.webp";
import ropa9 from "../../../public/assets/productos/ropa9.webp";
import ropa10 from "../../../public/assets/productos/ropa10.webp";

const productImages = [
  { imagen: ropa1 },
  { imagen: ropa2 },
  { imagen: ropa3 },
  { imagen: ropa4 },
  { imagen: ropa5 },
  { imagen: ropa6 },
  { imagen: ropa7 },
  { imagen: ropa8 },
  { imagen: ropa9 },
  { imagen: ropa10 },
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length
    );
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, []);

  return (
    <div
      className="slider-container"
      onMouseEnter={resetTimeout}
      onMouseLeave={() => {
        resetTimeout();
        timeoutRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);
      }}
    >
      <button className="slider-arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <div className="slider-content fade-effect">
        <img
          src={heroImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="slider-image"
        />
      </div>
      <button className="slider-arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
}

function ProductSlider() {
  const sliderRef = useRef();
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 215 + 18; // .product-card width + gap
    slider.scrollBy({
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
          {productImages.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.imagen}
                alt={`Producto ${index + 1}`}
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

export default function Slider() {
  return (
    <div className="sliders-wrapper">
      <div className="hero-section">
        <HeroSlider />
      </div>
      <div className="product-section">
        <ProductSlider />
      </div>
    </div>
  );
}
