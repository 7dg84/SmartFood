import axios from 'axios';
import { API_BASE_URL } from './config';

const recomendationApi = axios.create({
    baseURL: API_BASE_URL + 'recomendaciones/'
})

export const createRecomendation = (data) => recomendationApi.post('/', data, {
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
});