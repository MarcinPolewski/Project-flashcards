export const handleOAuth2 = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
};