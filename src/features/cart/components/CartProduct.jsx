import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaVoicemail } from "react-icons/fa";
import { storage, CART, FAVORITES } from "../../../shared/utils/storage";

import "./cart-product.css";

function CartProduct({ product, reload }) {
  const [isFavorite, setIsFavorite] = useState();
  const [quantity, setQuantity] = useState(1);

  const id = product.id_product;

  const handleEffect = () => {
    setQuantity(product.quantity);
    setIsFavorite(storage.read(FAVORITES, []).includes(id));
  }

  useEffect(() => {
    setQuantity(product.quantity);
    setIsFavorite(storage.read(FAVORITES, []).includes(product.id));
  }, [product]);

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
    const index = cart.findIndex(item => item.id == product.id);

    if (+value > 0 && +value <= product.stock) {
      const updatedItem = { ...cart[index], quantity: +value }; // conserva todos los datos
      cart[index] = updatedItem;
      storage.write(CART, cart);

      setQuantity(+value);
      reload();
    }
  };


  const handleDelete = () => {
    const cart = storage.read(CART, []);
    const next = cart.filter(item => item.id !== id);
    storage.write(CART, next);
    reload();
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
      {/* Imagen del producto */}
      {product.image ? (
        <img
          src={`/lebana-ecommerce/productosImages/${product.image}`}
          className="admin-product-image"
          alt={product.name}
          style={{
            display: "block",
            width: 180,
            height: 170,
            objectFit: "cover",
            background: "transparent",
            borderRadius: 8,
            flexShrink: 0,
            margin:0,
            marginLeft: 18,
            verticalAlign: "middle",
            border: "none",
          }}
        />
      ) : (
        <div
          className="product-card-img"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
            color: "#555",
            fontSize: "14px",
            fontStyle: "italic"
          }}
        >
          Sin imagen
        </div>
      )}
      <div className="product-card-body">
        <div className="data">
          <h4>{product.name}</h4>
          <p style={{ fontSize: 14, paddingTop: 8, fontWeight: 400}}>{product.description}</p>
          <p style={{ fontSize: 14, paddingTop: 8, fontWeight: 400}}>Precio por unidad: $ {product.price.toLocaleString()}</p>
        </div>
        <div className="total"><p>Total: $ {(product.price * quantity).toLocaleString()}</p></div>
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
            aria-label="Cantidad"
            onChange={handleQuantity} />
        </div>

        <button className="add-btn" type="button">Comprar</button>
      </aside>
    </div>
  );
}

export default CartProduct;
