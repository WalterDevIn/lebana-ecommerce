import React, { useState, useEffect } from "react";
import { products } from "../../services/api";

import AdminProduct from "./components/AdminProduct";
import Search from "./components/Search";
import ProductModal from "./components/ProductModal";

import "./admin.css";

export default function Admin() {
    const [adminProducts, setAdminProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Obtener productos desde el backend
    async function fetchProducts() {
        try {
            const data = await products.getAll();
            setAdminProducts(data);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // Crear o actualizar producto
    async function saveProduct(product) {
        const isNew = product.id_product === null;

        if (product.id_product === null) {
            await products.create(product);
        } else {
            await products.update(product.id_product, product);
        }

        fetchProducts();
        setModalOpen(false);
    }

    // Eliminar producto
    async function handleDelete(id_product) {
        await products.delete(id_product);
        fetchProducts();
    }

    // Abrir modal para agregar producto
    function handleAdd() {
        setEditingProduct({
            id_product: null,
            name: "",
            price: 0,
            stock: 0,
            description: "",
            image: ""
        });
        setModalOpen(true);
    }

    // Abrir modal para editar producto
    function openEdit(product) {
        setEditingProduct(product);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setEditingProduct(null);
    }

    return (
        <div className="admin-wrapper">

            <div className="admin-header">
                <Search value={query} onChange={setQuery} />
                <button className="admin-add-btn" onClick={handleAdd}>
                    + Agregar producto
                </button>
            </div>

            <div className="admin-product-list">
                {adminProducts.map(product => (
                    <AdminProduct
                        key={product.id_product}
                        product={product}
                        onUpdate={() => openEdit(product)}
                        onDelete={() => handleDelete(product.id_product)}
                    />
                ))}
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={saveProduct}
                initialData={editingProduct}
            />

        </div>
    );
}
