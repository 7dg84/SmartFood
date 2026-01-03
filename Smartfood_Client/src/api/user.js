import axios from 'axios';
import { API_BASE_URL } from './config';

const userApi = axios.create({
    baseURL: API_BASE_URL
})

export const login = (userData) => userApi.post('/login/', userData);
export const register = (userData) => userApi.post('/register/', userData);
export const logout = (token) => userApi.post('/logout/', {}, {
    headers: {
        'Authorization': `Token ${token}`
    }
});