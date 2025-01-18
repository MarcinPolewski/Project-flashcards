const generateJwtHeader = () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

export default generateJwtHeader