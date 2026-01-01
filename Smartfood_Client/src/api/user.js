import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/API/v1/'
})

export const login = (userData) => userApi.post('/login/', userData);
export const register = (userData) => userApi.post('/register/', userData);
export const logout = (token) => userApi.post('/logout/', {}, {
    headers: {
        'Authorization': `Token ${token}`
    }
});