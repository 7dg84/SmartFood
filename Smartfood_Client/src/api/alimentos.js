import axios from 'axios';

const alimentApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/API/v1/alimentos/'
})

export const getAllAliments = () => alimentApi.get('/');
export const createAliment = (alimentoData) => alimentApi.post('/', alimentoData);