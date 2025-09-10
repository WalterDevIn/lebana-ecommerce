import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaVoicemail } from "react-icons/fa";
import { storage, CART, FAVORITES } from "../../../shared/utils/storage";

import "./cart-product.css";

function CartProduct({ product, reload }) {
  const [isFavorite, setIsFavorite] = useState();
  const [quantity, setQuantity] = useState(1);
  
  const { id } = product; 

  const handleEffect = () => {
    setQuantity(product.quantity);
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
  }

  function handleQuantity({ target: { value } }) { 
    const cart = storage.read(CART, []);
    const index = cart.findIndex(item => item.id == id);
    if(+value <= product.stock) {
      storage.write(CART, cart.with(index, { id, quantity: +value }));
      setQuantity(+value)
      reload()
    }
  };

    const handleDelete = () => {
    const cart = storage.read(CART, []);
    const next = cart.filter(item => item.id !== id);
    storage.write(CART, next);
    reload(); // refresca la lista de productos
  };

  return (
    <div className="product-card">
      <div className="action-icons">
        <button 
          className={"fav-btn " + (isFavorite ? "toggled" : "")} 
          aria-label="Agregar a favoritos" 
          onClick={handleToggleFavorites}
        >
          ❤
        </button>
        <button 
          className="delete-btn" 
          aria-label="Eliminar del carrito" 
          onClick={handleDelete}
        >
          ✖
        </button>
      </div>
      <img src={product.image} alt={product.title} />
      <div className="product-card-body">
        <div className="data">
        <h4>{product.title}</h4>
        <p>$ {product.price}</p>
        </div>
        <div className="total"><p>Total: $ {product.price * quantity}</p></div>
      </div>
      <aside className="product-actions">
        <div className="action-row">
          <p className="left">{product.stock - product.quantity} disponibles</p>
          <input 
            className="qty-input"
            type="number" 
            min="1" 
            max={product.stock}
            value={quantity}
            defaultValue="1" 
            aria-label="Cantidad"
            onChange={handleQuantity} />
        </div>

        <button className="add-btn" type="button">Comprar</button>
      </aside>
    </div>
  );
}

export default CartProduct;
