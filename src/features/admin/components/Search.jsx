import React from "react";
import { FaSearch } from "react-icons/fa";

import "./search.css";

export default function Search({ value, onChange }) {
    return (
        <div style={{ position: "relative" }}>
            <FaSearch className="search-icon" />
            
            <input
                type="text"
                placeholder="Buscar productos..."
                value={value}
                onChange={e => onChange(e.target.value)}
                className="admin-search-input"
            />

        </div>
    );
}
