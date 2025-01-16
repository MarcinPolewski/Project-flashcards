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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
            if (error.response.status === 401) {
                console.warn("Unauthorized - Redirecting to login");
                localStorage.removeItem("jwtToken");
                sessionStorage.removeItem("jwtToken");
                window.location.replace("/login");
            }
        } else {
            console.error("Network or unknown error:", error.message);
        }
        return Promise.reject(error);
    }
);



export default api;