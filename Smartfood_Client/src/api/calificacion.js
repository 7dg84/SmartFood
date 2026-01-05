import axios from 'axios';
import { API_BASE_URL } from './config';

const calificacionApi = axios.create({
    baseURL: API_BASE_URL + 'calificaciones/'
})

export const createCalificacion = (data) => calificacionApi.post('/logout/', data, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});
// export const loginApi = (userData) => calificacionApi.post('/login/', userData);
// export const registerApi = (userData) => calificacionApi.post('/register/', userData);