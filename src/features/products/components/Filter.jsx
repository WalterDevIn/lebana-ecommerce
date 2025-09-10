import React, { useState } from "react";

function Filter() {
    const [priceRange, setPriceRange] = useState([0, 9999999]);
    const [sizeFilter, setSizeFilter] = useState("");

    {/*
    function handleFilter() {
         const filtered = products.filter((p) => {
             const precioNum = Number(String(p.precio).replace(",", "."));
             const precioOK = precioNum >= Number(priceRange[0]) && precioNum <= Number(priceRange[1]);

             // Compatibilidad: p.talle (string) o p.talles (array)
             const talleOK =
                 !sizeFilter ||
                 p.talle === sizeFilter ||
                 (Array.isArray(p.talles) && p.talles.includes(sizeFilter));

             return precioOK && talleOK;
         });
         setFilteredProducts(filtered);
         setCurrentPage(1);
    }
    */}

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

            <button onClick={{/* handleFilter */}}>Aplicar Filtros</button>
        </aside>
    );
}

export default Filter;