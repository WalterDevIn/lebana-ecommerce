export const API_URL = import.meta.env.VITE_API_URL;

function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function clearToken() {
  localStorage.removeItem("token");
}

function authHeaders() {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

const products = {
  getAll: async () => {
    const response = await fetch(API_URL + "/products");
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();
    
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Producto no encontrado");
    return await response.json();
  },

  create: async (product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Error al crear producto");
    return await response.json();
  },

  update: async (id, product) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error("Error al actualizar producto");
    return await response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (!response.ok) throw new Error("Error al borrar producto");
    return await response.json();
  },
};

const auth = {

  login: async (Email, Pass) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email, Pass }),
    });

    if (!response.ok) throw new Error("Credenciales inválidas");

    const data = await response.json();

    // El backend te devuelve user.data + token
    // (Aunque el token también va en cookie HTTP-only)
    setToken(data.token);

    return data;
  },

  register: async (user) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Error al registrar usuario");
    return await response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/account`, {
      credentials: "include", // necesario para enviar la cookie
      headers: authHeaders(),
    });

    if (!response.ok) throw new Error("No se pudo obtener el perfil");

    return await response.json();
  },

  logout: async () => {
    await fetch(`${API_URL}/users/logout`, {
      credentials: "include",
    });

    clearToken();
  },
};

export { products, auth };