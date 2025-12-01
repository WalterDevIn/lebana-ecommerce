import React from "react";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import "./admin-product.css";

function AdminProduct({ product, onUpdate, onDelete }) {
    return (
        <div className="admin-product-card">

            {/* Imagen del producto */}
            {product.image ? (
                <img
                    src={`/lebana-ecommerce/productosImages/${product.image}`}
                    className="admin-product-image"
                    alt={product.name}
                />
            ) : (
                <div
                    className="admin-product-image"
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

            <div className="admin-separed">
                {/* Información del producto */}
                <div className="admin-product-card-body">
                    {product.name && (
                        <h4 className="desc">
                            {
                                product.name.length > 42
                                    ? product.name.slice(0, 42) + "..."
                                    : product.name
                            }
                        </h4>
                    )}
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
                            onClick={() => onDelete(product.id_product)}
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
