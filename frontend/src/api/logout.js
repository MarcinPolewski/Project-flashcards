export const logout = () => {
    localStorage.removeItem('jwtToken');
};