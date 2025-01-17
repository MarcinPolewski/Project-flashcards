import React, { createContext, useContext, useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";
import { jwtDecode } from "jwt-decode";

import testAvatar from "../../assets/test/test-avatar.png";
import { useAuth } from "../AuthContext/AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        avatar: testAvatar,
    });
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useAuth();

    const fetchUserData = async () => {

        try {
            const user = await CustomerService.getSelf();
            console.log("User fetched from getSelf in userContext: ", user);
            setUserData({
                username: user.username || "",
                email: user.email || "",
                avatar: user.avatar || testAvatar,
            });
            console.log("User data fetched from userContext: ", userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            console.log("UserContext, token is present, fetching data");
            fetchUserData();
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ userData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
