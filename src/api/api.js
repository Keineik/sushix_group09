import axios from 'axios';

const BASE_URL = 'http://localhost:8080/sushix_api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;