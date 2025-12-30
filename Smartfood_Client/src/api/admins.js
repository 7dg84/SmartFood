import axios from 'axios';

export const getAllAdmins = () => {
    return axios.get('http://127.0.0.1:8000/API/v1/admins/')
}