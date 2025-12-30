import axios from 'axios';

const adminsApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/API/v1/admins/'
})

export const getAllAdmins = () => adminsApi.get('/');
export const createAdmin = (adminData) => adminsApi.post('/', adminData);