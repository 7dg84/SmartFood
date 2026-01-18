export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login/`,
  products: `${API_BASE_URL}/productos/`,
  sales: `${API_BASE_URL}/ventas/`,
  inventory: `${API_BASE_URL}/inventario/`,
};
