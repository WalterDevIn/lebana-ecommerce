import React, { useState, useEffect, useMemo } from "react";
import CartProduct from "./components/CartProduct";
import { storage, CART } from "../../shared/utils/storage";
import { API_URL } from "../../services/api";

import "./cart.css";

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);

    const reload = () => {
        handleCart(cartProducts);
        calculeTotal();
    }

    function clearCart() {
        if (confirm("¿Seguro que deseas vaciar todo el carrito?")) {
            storage.write(CART, []);
            reload();
        }
    }

    const calculeTotal = () => cartProducts.reduce((total, { price, quantity }) => total + +price * +quantity, 0);

    const total = useMemo(calculeTotal, [cartProducts]);

    function handleCart(data) {
        const cart = storage.read(CART, []);
        setCartProducts(cart
            .map(({ id: index, quantity }) => {
                const prodData = data.find(prod => prod.id_product == index);
                return prodData ? { ...prodData, quantity } : null;
            })

            .filter(Boolean)
        );
    }

    function handleEffect() {
        fetch(API_URL + "/products")
            .then(response => response.json())
            .then(handleCart)
            .catch(console.error);
    }

    useEffect(handleEffect, []);

    const loadCart = item => <CartProduct
        key={item.id_product}
        product={item}
        reload={reload}
    />

    if (cartProducts.length === 0)
        return <div className="cart-empty">Tu carrito está vacío.</div>;

    return (
        <div className="cart-wrapper">
            <div className="cart-list">
                <button className="clear-all-btn" onClick={clearCart}>
                    Vaciar carrito
                </button>
                {cartProducts.map(loadCart)}
            </div>

            <div className="cart-summary">
                <h3>Resumen de compra</h3>
                <p>Productos ({cartProducts.length})</p>
                <p>Envío: <span className="envio-gratis">Gratis</span></p>
                <p className="total">Total: ${total.toLocaleString()}</p>
                <button className="confirm-button">
                    Confirmar pedido - Retiro en tienda
                </button>
            </div>
        </div>
    );
};

export default Cart;
