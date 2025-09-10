import React, { useState, useEffect } from "react";
import { storage, FAVORITES } from "../../shared/utils/storage";
import Product from "../../shared/components/Product";

import "./favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  function handleFavorites(products) {
    const favoritesIds = storage.read(FAVORITES, []).map(i => Number(i));
    setFavorites(products.filter(item => favoritesIds.includes(item.id)));
  }

  function handleEffect() {
    fetch("/lebana-ecommerce/fakeProducts.json")
      .then(response => response.json())
      .then(handleFavorites)
      .catch(console.error);
  }

  useEffect(handleEffect, []);

  const loadFavorites = item => (
    <Product key={item.id} product={item} reload={handleEffect}/>
  );

  if (favorites.length === 0)
    return <div className="favorites-empty">No hay favoritos.</div>;

  return (
    <div className="favorites-wrapper">
      <div className="favorites-list">
        {favorites.map(loadFavorites)}
      </div>
    </div>
  );
};

export default Favorites;
