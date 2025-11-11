import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mobile-backend-nu.vercel.app',
});

export default api;