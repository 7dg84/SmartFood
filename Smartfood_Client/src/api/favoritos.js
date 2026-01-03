import axios from 'axios';
import { API_BASE_URL } from './config';

const favoritosApi = axios.create({
    baseURL: API_BASE_URL + 'favoritos/'
})

export const getAllAliments = () => favoritosApi.get('/');
export const markAsFavorite = (favoritoData) => favoritosApi.post('/', favoritoData, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});
export const unmarkAsFavorite = (id_favorito) => favoritosApi.delete(`/${id_favorito}/`, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});
export const getIdByAlimento = (id_alimento) => favoritosApi.get(`/?id_alimento=${id_alimento}`, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});