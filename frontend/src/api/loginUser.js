import api from "./api";

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/usernamePasswordLogin', credentials);
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        return token;
    } catch(error) {
        console.error('Error during login: ', error.response.data);
        throw error;
    }
}