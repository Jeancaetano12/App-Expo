import axios from 'axios';

const api = axios.create({
    // link da vercel: https://mobile-backend-nu.vercel.app
    baseURL: 'http://192.168.18.38:3000',
});

export default api;