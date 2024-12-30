import React from "react";
import { Navigate } from "react-router-dom";

import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // time in seconds
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('jwtToken');
                return <Navigate to="/login" />;
            }
            return children;
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('jwtToken');
            return <Navigate to="/login" />;
        }
    }
    return <Navigate to="/login" />;
}

export default PrivateRoute