import axios from 'axios'

export const API_BASE_URL = 'http://localhost:8080/api/auth';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        if (token) {
            console.log("JWT Token: ", token);

            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default api;