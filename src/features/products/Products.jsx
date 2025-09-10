import React, { useState, useEffect } from "react";

import "./products.css";

import Filter from "./components/Filter";
import Product from "../../shared/components/Product";

/*
    Todo
    - Filters
    - Pagination
*/

function Products() {
    const [products, setProducts] = useState([]);

    function handleEffect() {
        fetch("/lebana-ecommerce/fakeProducts.json")
            .then(response => response.json())
            .then(setProducts)
            .catch(console.error);
    }

    useEffect(handleEffect, []);

    const loadProducts = product => <Product key={product.id} product={product} reload={() => {}} /> 

    return (
        <div className="products-wrapper">
            <div className="products-layout">
                <Filter/>

                <main className="products-main">
                    <div className="products-grid">
                        {products.map(loadProducts)}
                    </div>

                    {/* <div className="pagination"></div> */}
                </main>
            </div>
        </div>
    );
}

export default Products;