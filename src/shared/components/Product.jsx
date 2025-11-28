import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaVoicemail } from "react-icons/fa";
import { storage, FAVORITES, CART } from "../utils/storage";

import "./product.css";

function Product({ product, reload }) {
  const [isFavorite, setIsFavorite] = useState();
  const [quantity, setQuantity] = useState(1);

  const { id } = product;

  const handleEffect = () => {
    setIsFavorite(storage.read(FAVORITES, []).includes(id));
  }

  useEffect(handleEffect, [id]);

  const handleToggleFavorites = () => {
    const favorites = storage.read(FAVORITES, []);
    const exist = favorites.includes(id);

    storage.write(
      FAVORITES,
      exist
        ? favorites.filter(i => i != id)
        : [...favorites, id]
    );

    setIsFavorite(!exist);
    reload();
  }

  function handleAddToCart() {
    console.log("PRODUCT RECIBIDO:", product);

    if (quantity <= 0) {
      alert("Debes agregar al menos 1 unidad");
      return;
    }
    const
      cart = storage.read(CART, []),
      productId = product.id_product,
      index = cart.findIndex(item => item.id === productId),
      exist = index != -1,
      currentQuantity = (exist ? cart[index].quantity : 0) + quantity,
      item = {
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: currentQuantity,
        stock: product.stock
      };

    if (currentQuantity <= product.stock) {
      if (exist) {
        cart[index] = item; // actualizar cantidad
      } else {
        cart.push(item); // agregar al carrito
      }

      storage.write(CART, cart);
      const test = storage.read(CART, []);
      console.log("CARRITO DESPUÉS DE GUARDAR:", test);
      alert(`${product.name} se agregó al carrito!`);
    } else {
      alert(`No se puede agregar más de ${product.stock} unidades de ${product.name}`);
    }
  }

  const handleQuantity = ({ target: { value } }) => +value > product.stock || setQuantity(+value);

  return (
    <div className="product-card">
      <button className={"fav-btn " + (isFavorite ? "toggled" : "")} aria-label="Agregar a favoritos" onClick={handleToggleFavorites}>❤</button>
      <img src={product.image} alt={product.name} />
      <div className="product-card-body">
        <div className="product-name">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
        </div>
        <p>$ {product.price.toLocaleString()}</p>
      </div>
      <aside className="product-actions">
        <div className="action-row">
          {/* <select className="select-input" aria-label="Color" defaultValue="">
            <option value="" disabled>Color</option>
            <option>Negro</option>
            <option>Azul</option>
            <option>Beige</option>
          </select> */}

          {/* <select className="select-input" aria-label="Talle" defaultValue="">
            <option value="" disabled>Talle</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select> */}

          <input
            className="qty-input"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            aria-label="Cantidad"
            onChange={handleQuantity} />
        </div>

        <button className="add-btn" type="button" onClick={handleAddToCart}><FaShoppingBag /> Agregar al carrito</button>
      </aside>
    </div>
  );
}

export default Product;
