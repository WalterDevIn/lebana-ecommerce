import React, { useState } from "react";

function Filter({ onFilter }) {
    const [priceRange, setPriceRange] = useState([0, 9999999]);
    const [sizeFilter, setSizeFilter] = useState("");

    function handleFilter() {
        // Llamás al callback que viene desde Products
        if (typeof onFilter === "function") {
            onFilter({
                priceRange,
                sizeFilter
            });
        }
    }

    return (
        <aside className="products-sidebar">
            <h4>Precio</h4>
            <input
                type="number"
                placeholder="Mínimo"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value || 0, priceRange[1]])}
            />
            <input
                type="number"
                placeholder="Máximo"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value || 0])}
            />

            <h4>Talle</h4>
            <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
                <option value="">Todos</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="Único">Único</option>
            </select>

            <button onClick={handleFilter}>
                Aplicar Filtros
            </button>
        </aside>
    );
}

export default Filter;
