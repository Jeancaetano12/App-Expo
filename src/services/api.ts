import axios from 'axios';

const api = axios.create({
    // link da vercel: https://mobile-backend-nu.vercel.app
    baseURL: 'https://mobile-backend-nu.vercel.app',
});

export default api;