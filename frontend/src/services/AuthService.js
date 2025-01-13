import api from "../api/api";

const AuthService = {
    loginUser: async (credentials, remember) => {
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
    },

    registerUser: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch(error) {
            console.error('Error during registration: ', error.response?.data || error.message);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('jwtToken');
    },

    handleForgotPassword: async (email) => {
        try {
            const response = await api.post("/forgot-password", {email});
            return response.data;
        } catch(error) {
            console.error('Error during password reminding: ', error.response?.data || error.message);
            throw error;
        }
    },

    handleOAuth2Login: async (OAuth2Res) => {
        try {
            const { token } = OAuth2Res;
            localStorage.setItem('jwtToken', token);
            return token;
        } catch (error) {
            console.error('Error during OAuth2 authentication:', error.response.data);
            throw error;
        }
    },

    handleOAuth2: (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    },

    handlePasswordReset: async (password) => {
        try {
            const response = await api.post("/password-reset", password);
            return response.data;
        } catch(error) {
            console.error('Error during password reset: ', error.response?.data || error.message);
            throw error;
        }
    }
}

export default AuthService;