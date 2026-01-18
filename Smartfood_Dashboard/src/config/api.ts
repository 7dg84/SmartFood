export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login/`,
  alimentos: `${API_BASE_URL}/alimentos/`,
  categorias: `${API_BASE_URL}/categorias/`,
  usuarios: `${API_BASE_URL}/usuarios/`,
};
