
import MainSlider from "./components/MainSlider";
import ProductSlider from "./components/ProductSlider";
import "./home.css";

export default function Home() {
  return (
    <div className="sliders-wrapper">
      <div className="hero-section">
        <MainSlider />
      </div>
      <div className="product-section">
        <ProductSlider />
      </div>
    </div>
  );
}