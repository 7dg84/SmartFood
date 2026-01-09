import axios from 'axios';
import { API_BASE_URL } from './config';

const contentApi = axios.create({
    baseURL: API_BASE_URL,
});

export const getContent = () => contentApi.get('/recursos/');

export const getInfografias = (token) => contentApi.get('/infografias/');

export const downloadInfografiaFile = (id) => contentApi.get(`infografia/${id}/file/`, { responseType: 'blob' });

export const getVideos = () => contentApi.get('/videos/');

export const getVideo = (id) => contentApi.get(`/videos/${id}/`);

export const getTrivias = () => contentApi.get('/trivias/');
export const getTrivia = (id) => contentApi.get(`/trivias/${id}/`);
export const getPreguntasTrivia = (triviaId) => contentApi.get(`/preguntas/?id_trivia=${triviaId}`);

export const getConsejos = () => contentApi.get('/consejos/');

export default contentApi;
