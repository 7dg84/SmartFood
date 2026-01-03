import axios from 'axios';
import { API_BASE_URL } from './config';

const adminsApi = axios.create({
    baseURL: API_BASE_URL + 'admins/',
    headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
    }
})

export const getAllAdmins = () => adminsApi.get('/');
export const createAdmin = (adminData) => adminsApi.post('/', adminData);