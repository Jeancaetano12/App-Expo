import axios from 'axios';
// link da vercel: https://mobile-backend-nu.vercel.app
export const API_URL = 'http://192.168.18.38:3000';

const api = axios.create({
    baseURL: API_URL,
});

export default api;