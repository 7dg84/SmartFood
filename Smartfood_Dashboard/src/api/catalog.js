import { API_BASE_URL } from './config'
import axios from 'axios';

const catalogApi = axios.create({
    baseURL: API_BASE_URL + 'alimentos/',
})
const getAliments = () => catalogApi.get('/');
const getAliment = (id) => catalogApi.get(`/${id}/`);
const createAliment = (alimentData, token) => catalogApi.post('/', alimentData, {
    headers: {
        'Authorization': `Token ${token}`
    }
});
const updateAliment = (id, alimentData, token) => catalogApi.put(`/${id}/`, alimentData, {
    headers: {
        'Authorization': `Token ${token}`
    }
});
const deleteAliment = (id, token) => catalogApi.delete(`/${id}/`, {
    headers: {
        'Authorization': `Token ${token}`
    }
});

export {
    getAliments,
    getAliment,
    createAliment,
    updateAliment,
    deleteAliment
};