import React from "react";
import "./confirmModal.css";

export default function ConfirmModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <p>¿Estás segura/o de que quieres eliminar este producto?</p>

                <div className="confirm-buttons">
                    <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
                    <button className="btn-confirm" onClick={onConfirm}>Eliminar</button>
                </div>
            </div>
        </div>
    );
}
