const API = 'http://localhost:4000/api'; 

// src/api/products.js
// Revisar: http://localhost:3000/productos
// Revisar: http://localhost:3000/productos?title=campera&minPrice=10000

class Products {
  route = "products";

  async getAll(filter = {}) {
    const query = new URLSearchParams(filter).toString();
    const url = `${API}/${route}${query ? "?" + query : ""}`;
    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Error HTTP ${response.status}`);

    return await response.json();
  }
}

const API_URL = API;
const products = new Products();

export default { API_URL, products };

