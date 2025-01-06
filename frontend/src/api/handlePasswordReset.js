import api from "./api";

export const handlePasswordReset = async (password) => {
    try {
        const response = await api.post("/password-reset", password);
        return response.data;
    } catch(error) {
        console.error('Error during password reset: ', error.response?.data || error.message);
        throw error;
    }
}