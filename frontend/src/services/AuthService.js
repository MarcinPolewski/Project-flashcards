import api from "../api/api";

const API_AUTH = '/api/auth';

const AuthService = {
    loginUser: async (credentials, remember) => {
        try {
            const response = await api.post(API_AUTH + '/usernamePasswordLogin', credentials);
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
            const response = await api.post(API_AUTH + '/register', userData);
            return response.data;
        } catch(error) {
            console.error('Error during registration: ', error.response?.data || error.message);
            throw error;
        }
    },

    verifyEmail: async (verificationRequest) => {
        try {
            const response = await api.post(API_AUTH + '/verifyUser', verificationRequest);
            return response.data;
        } catch(error) {
            console.error('Error during registration: ', error.response?.data || error.message);
            throw error;
        }
    },

    logout: () => {
        console.log("logging out !!");
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");

        window.location.reload(true);

        window.location.href = "/login";
    },

    handleForgotPassword: async (email) => {
        try {
            const response = await api.post(API_AUTH + '/forgotPasswordRequest', { email });
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

    handlePasswordReset: async (email, code, newPassword) => {
        try {
            const response = await api.post(API_AUTH + '/forgotPassword', { email, code, newPassword });
            return response.data;
        } catch(error) {
            console.error('Error during password reset: ', error.response?.data || error.message);
            throw error;
        }
    },

    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await api.post(API_AUTH + '/changePassword', { oldPassword, newPassword });
            return response.data;
        } catch(error) {
            console.error('Error during password change: ', error.response?.data || error.message);
            throw error;
        }
    },

    changeEmail: async (newEmail) => {
        try {
            const response = await api.post(API_AUTH + '/changeEmail', { newEmail });
            return response.data;
        } catch(error) {
            console.error('Error during email change: ', error.response?.data || error.message);
            throw error;
        }
    },

    handleOAuth2: (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    },

    verifyPasswordResetCode: async (email, code) => {
        try {
            const response = await api.post(API_AUTH + '/verifyUser', { email, code });
            return response.data;
        } catch(error) {
            console.error('Error during email change: ', error.response?.data || error.message);
            throw error;
        }
    },

    resendVerificationCode: async (email) => {
        try {
            const response = await api.post(API_AUTH + '/resendVerificationCode', { email });
            return response.data;
        } catch(error) {
            console.error('Error during email change: ', error.response?.data || error.message);
            throw error;
        }
    }

}

export default AuthService;