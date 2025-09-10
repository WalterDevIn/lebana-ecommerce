import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";

import "./cart-icon.css";

const CartIcon = () => {
  const [quantity, setQuantity] = useState([]);

  function handleQuantity() {
    const { lenght } = storage.read(CART, []);
    setQuantity(lenght);
  }

  function handleEffect() {
    window.addEventListener("storage", handleQuantity);
  }

  useEffect(handleEffect, []);

  return (
    <Link to="/cart" className="cart-icon-wrapper">
      <FaShoppingBag size={18} className="nav-icon" />
      {quantity > 0 && <span className="cart-badge">{quantity}</span>}
    </Link>
  );
};

export default CartIcon;
