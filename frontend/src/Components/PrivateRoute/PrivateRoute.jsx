import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const validateAuth = () => {
            const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp > currentTime) {
                        setIsAuthenticated(true);
                    } else {
                        console.warn("Token expired");
                        localStorage.removeItem("jwtToken");
                        sessionStorage.removeItem("jwtToken");
                    }
                } catch (error) {
                    console.error("Invalid token:", error);
                    localStorage.removeItem("jwtToken");
                    sessionStorage.removeItem("jwtToken");
                }
            }
            setCheckingAuth(false);
        };

        validateAuth();
    }, []);

    if (checkingAuth) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
