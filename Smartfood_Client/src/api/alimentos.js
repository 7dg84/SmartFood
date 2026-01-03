import axios from 'axios';
import { API_BASE_URL } from './config';

const alimentApi = axios.create({
    baseURL: API_BASE_URL + 'alimentos/'
})

export const getAllAliments = () => {
    if (localStorage.getItem('token')) {
        return alimentApi.get('/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        });
    }
    return alimentApi.get('/');
};
export const createAliment = (alimentoData) => alimentApi.post('/', alimentoData);
export const searchAliments = (nombre, categoria, permitido, favorite) => {
    let query = [];
    if (nombre) query.push(`search=${nombre}`);
    if (categoria && categoria != 'all') query.push(`categoria=${categoria}`);
    if (permitido && permitido != 'all') query.push(`permitido=${permitido}`);
    if (favorite == true) query.push('favorite=true');

    query = query.join('&');
    if (query.length === 0) {
        return alimentApi.get('/', localStorage.getItem('token') ? {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        } : {});
    }

    const res = alimentApi.get(`/?${query}`, localStorage.getItem('token') ? {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    } : {});
    return res;
};