import axios from 'axios';

const alimentApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/API/v1/alimentos/'
})

export const getAllAliments = () => alimentApi.get('/');
export const createAliment = (alimentoData) => alimentApi.post('/', alimentoData);
export const searchAliments = (nombre, categoria, permitido) => {
    let query = [];
    if (nombre) query.push(`search=${nombre}`);
    if (categoria && categoria != 'all') query.push(`categoria=${categoria}`);
    if (permitido && permitido != 'all') query.push(`permitido=${permitido}`);
    query = query.join('&');
    console.log('Search query:', query);
    if (query.length === 0) {
        return alimentApi.get('/');
    }

    const res = alimentApi.get(`/?${query}`)
    return res;
};