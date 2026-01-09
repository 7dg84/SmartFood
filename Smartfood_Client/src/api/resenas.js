import axios from 'axios';
import { API_BASE_URL } from './config';

const resenasApi = axios.create({
    baseURL: API_BASE_URL + 'resenas/'
})

export const createResena = (data) => resenasApi.post('/', data, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});
export const getResenas = () => resenasApi.get('/');