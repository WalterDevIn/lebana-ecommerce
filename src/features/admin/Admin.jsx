import React, { useState, useEffect } from "react";
import AdminProduct from "./components/AdminProduct";
import Search from "./components/Search";
import { API_URL } from "../../services/api";

import productsData from "./products/products.json";
import "./admin.css";

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");


    // Obtener productos desde el servidor
    /* async function fetchProducts() {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    }
    */

    // Crear un producto vacío (ej: abrir modal de creación)
    function handleAdd() {
        const newProduct = {
            title: "Nuevo producto",
            price: 0,
            image: "",
            stock: 0,
            description: "",
        };

        //JSON
        setProducts([...products, newProduct]);

        // Crear POST (BD)
        /*fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        })
            .then(() => fetchProducts())
            .catch(console.error);
        */
    }

    // Actualizar producto (viene desde AdminProduct)
    function handleUpdate(updated) {
        /*fetch(`${API_URL}/products/${updated.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        })
            .then(fetchProducts)
            .catch(console.error);
        */

        setProducts(products.map(p => p.id === updated.id ? updated : p));
    }

    // Eliminar producto
    function handleDelete(id) {
        /*fetch(`${API_URL}/products/${id}`, {
            method: "DELETE"
        })
            .then(fetchProducts)
            .catch(console.error);
        */

        setProducts(products.filter(p => p.id !== id));
    }

    useEffect(() => {
        //BD
        //fetchProducts();

        //JSON
        setProducts(productsData);
    }, []);

    return (
        <div className="admin-wrapper">

            <div className="admin-header">
                <Search value={query} onChange={setQuery} />
                <button className="add-btn" onClick={handleAdd}>
                    + Agregar producto
                </button>
            </div>

            <div className="admin-product-list">
                {products.map(product => (
                    <AdminProduct
                        key={product.id}
                        product={product}
                        onUpdate={handleUpdate}
                        onDelete={() => handleDelete(product.id)}
                    />
                ))}
            </div>

        </div>
    );
}
