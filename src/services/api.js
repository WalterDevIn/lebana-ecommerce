const API_URL = 'http://localhost:4000/api'; 

export const getProducts = async () => {
  try { 
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  } catch (error) {
    console.error('Error en getProducts:', error);
    throw error;
  }
};
