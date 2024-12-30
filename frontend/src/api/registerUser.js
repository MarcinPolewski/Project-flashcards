import api from "./api";

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration: ', error.response.data);
        throw error;
    }
}