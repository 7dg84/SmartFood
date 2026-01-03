import axios from 'axios';
import { API_BASE_URL } from './config';

const userApi = axios.create({
    baseURL: API_BASE_URL
})

export const loginApi = (userData) => userApi.post('/login/', userData);
export const registerApi = (userData) => userApi.post('/register/', userData);
export const logoutApi = (token) => userApi.post('/logout/', {}, {
    headers: {
        'Authorization': `Token ${token}`
    }
});