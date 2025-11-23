import axios from 'axios';
// link da vercel: https://mobile-backend-nu.vercel.app
export const API_URL = 'https://mobile-backend-nu.vercel.app';

const api = axios.create({
    baseURL: API_URL,
});

export default api;