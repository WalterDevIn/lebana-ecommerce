import React, { useState, useEffect, useMemo } from "react";
import CartProduct from "./components/CartProduct";
import { storage, CART } from "../../shared/utils/storage";
import { URL_API } from "../../services/api"; 

import "./cart.css";

function Cart() {
    const [products, setProducts] = useState([]);

    const reload = () => {
        handleCart(products);
        calculeTotal();
    }

    const calculeTotal = () => products.reduce((total, { price, quantity }) => total + +price * +quantity, 0);

    const total = useMemo(calculeTotal, [products]);

    function handleCart(data) {
        const cart = storage.read(CART, []);
        setProducts(cart.map(({ id: index, quantity }) => ({...data.find(({id}) => index == id), quantity})));
    }



    function handleEffect() {
        fetch(API_URL + "/products")
            .then(response => response.json())
            .then(handleCart)
            .catch(console.error);
    }

    useEffect(handleEffect, []);

    const loadCart = item => <CartProduct 
        key={item.id} 
        product={item} 
        reload={reload}
    />

    if (products.length === 0) 
        return <div className="cart-empty">Tu carrito está vacío.</div>;

    return (
        <div className="cart-wrapper">
            <div className="cart-list">
                {products.map(loadCart)}
            </div>

            <div className="cart-summary">
                <h3>Resumen de compra</h3>
                <p>Productos ({products.length})</p>
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
