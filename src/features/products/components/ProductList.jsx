import React from "react";
import Product from "../../../shared/components/Product";

function ProductsList({ products, loading, error, reload }) {
  const mapProduct = (product) => (
    <Product key={product.id_product} product={product} reload={reload} />
  );

  if (loading) 
    return <p>Cargando productos...</p>;
  if (error) 
    return <p style={{ color: "red" }}>{error}</p>;
  if (products.length <= 0) 
    return <p>No se encontraron productos.</p>;

  return <div className="products-grid">{products.map(mapProduct)}</div>;
}

export default ProductsList;
