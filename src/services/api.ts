import axios from 'axios';
// Link do local: http://192.168.18.38:3000
// link da vercel: https://mobile-backend-nu.vercel.app
export const API_URL = 'https://mobile-backend-nu.vercel.app';

const api = axios.create({
    baseURL: API_URL,
});

export default api;