import React, { useState, useEffect } from "react";
import "./products.css";

import Filter from "./components/Filter";
import { products as productsAPI } from "../../services/api";
import ProductsList from "./components/ProductList";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {

  try {
    setLoading(true);
    const data = await productsAPI.getAll();
    setProducts(data);
  } catch (err) {
    setError("No se pudieron cargar los productos");
  } finally {
    setLoading(false);
  }
}


  useEffect(() => {
    load();
  }, []);

  return (
    <div className="products-wrapper">
      <div className="products-layout">
        <Filter onFilter={load} />
        <main className="products-main">
          <ProductsList
            products={products}
            loading={loading}
            error={error}
            reload={load}
          />
        </main>
      </div>
    </div>
  );
}

export default Products;
