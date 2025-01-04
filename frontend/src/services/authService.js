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

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch(error) {
        console.error('Error during registration: ', error.response?.data || error.message);
        throw error;
    }
}

export const logout = () => {
    localStorage.removeItem('jwtToken');
};

export const handleForgotPassword = async (email) => {
    try {
        const response = await api.post("/forgot-password", {email});
        return response.data;
    } catch(error) {
        console.error('Error during password reminding: ', error.response?.data || error.message);
        throw error;
    }
}

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

export const handlePasswordReset = async (password) => {
    try {
        const response = await api.post("/password-reset", password);
        return response.data;
    } catch(error) {
        console.error('Error during password reset: ', error.response?.data || error.message);
        throw error;
    }
}
