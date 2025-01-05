import api from "./api";

export const handleForgotPassword = async (email) => {
    try {
        const response = await api.post("/forgot-password", {email});
        return response.data;
    } catch(error) {
        console.error('Error during password reminding: ', error.response?.data || error.message);
        throw error;
    }
}