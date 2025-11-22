import React, { useState, useEffect } from "react";
import { FaRegFloppyDisk } from "react-icons/fa6";

import "./product-modal.css";

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
    const [product, setProduct] = useState(
    initialData || {
        title: "",
        price: 0,
        stock: 0,
        description: ""
    }
);

    useEffect(() => {
    setProduct(initialData);
}, [initialData]);


    if (!isOpen || !product) return null;


    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(product);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h1>{product.id ? "Editar Producto" : "Nuevo Producto"}</h1>
                <h2>{product.id ? "Ingresa los detalles para modificar el producto." : "Ingresa los detalles para nuevo el producto."}</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-content-input">
                        <label>Nombre del Producto</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="ej. Buzo Oversize"
                            value={product.title}
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div className="modal-content-input">
                            <label>Precio ($)</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="0"
                                value={product.price}
                                onChange={handleChange}
                                className="modal-input-row modal-input"
                            />
                        </div>

                        <div className="modal-content-input">
                            <label>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                placeholder="0"
                                value={product.stock}
                                onChange={handleChange}
                                className="modal-input-row modal-input"
                            />
                        </div>
                    </div>


                    <div className="modal-content-input">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={product.description}
                            placeholder="Descripcion del producto..."
                            onChange={handleChange}
                            className="modal-input"
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button type="submit" className="save-btn">
                            <FaRegFloppyDisk size={14} />
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
