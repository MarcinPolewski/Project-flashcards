import api from "./api";

export const handleOAuth2Login = async (OAuth2Res) => {
    try {
        const { token } = OAuth2Res;
        localStorage.setItem('jwtToken', token);
        return token;
    } catch (error) {
        console.error('Error during OAuth2 authentication:', error.response.data);
        throw error;
    }
}