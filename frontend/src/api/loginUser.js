import api from "./api";

export const loginUser = async (credentials, remember) => {
    try {
        const response = await api.post('/usernamePasswordLogin', credentials);
        const { token } = response.data;

        if (remember) {
            localStorage.setItem('jwtToken', token);
        } else {
            sessionStorage.setItem('jwtToken', token);
        }

        return token;
    } catch(error) {
        console.error('Error during login: ', error.response?.data || error.message);
        throw error;
    }
}