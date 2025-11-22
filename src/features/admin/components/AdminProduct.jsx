import React from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import "./admin-product.css";

function AdminProduct({ product, onUpdate, onDelete }) {
    return (
        <div className="admin-product-card">

                {/* Imagen del producto */}
                <img
                    src={`/assets/productos/${product.image}`}
                    className="admin-product-image"
                    alt={product.title}
                />
                
            <div className="admin-separed">
                {/* Información del producto */}
                <div className="admin-product-card-body">
                    <h4>{product.title}</h4>
                    <p>Stock: {product.stock}</p>
                    {product.description && (
                        <p className="desc">
                            {
                                product.description.length > 60
                                ? product.description.slice(0, 60) + "..."
                                : product.description
                            }
                        </p>
                    )}
                </div>
                <div className="admin-product-card-body-bottom">
                    <p>{product.price}<span style={{ fontSize: 16, fontWeight: 400 }}>$</span></p>

                    {/* Acciones */}
                    <div className="admin-action-icons">
                        <button
                            className="admin-edit-btn"
                            aria-label="Editar producto"
                            onClick={() => onUpdate(product)}
                        >
                            <FaRegPenToSquare size={14} />
                        </button>

                        <button
                            className="admin-delete-btn"
                            aria-label="Eliminar producto"
                            onClick={() => onDelete(product.id)}
                        >
                            <FaRegTrashCan size={14} />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AdminProduct;
