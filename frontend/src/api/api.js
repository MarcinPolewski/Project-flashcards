import axios from 'axios'

export const API_BASE_URL = 'http://localhost:8080/api/auth';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthorizationHeader = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};


const setupInterceptor = () => {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
};

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.warn("Unauthorized - Redirecting to login");
//             localStorage.removeItem("jwtToken");
//             sessionStorage.removeItem("jwtToken");
//             window.location.replace("/login");
//         }
//         return Promise.reject(error);
//     }
// );

if (localStorage.getItem('jwtToken')) {
    setAuthorizationHeader();
    setupInterceptor();
}

export default api;