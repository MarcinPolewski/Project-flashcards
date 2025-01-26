import React, { createContext, useContext, useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";
import { jwtDecode } from "jwt-decode";

import testAvatar from "../../assets/test/test-avatar.png";
import { useAuth } from "../AuthContext/AuthContext";
import AuthService from "../../services/AuthService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        userId: null,
        username: "",
        email: "",
        avatar: "",
        bio: "",
        profileCreationDate: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useAuth();

    const fetchUserData = async () => {

        try {
            const { customer, avatar } = await CustomerService.getSelf();
            console.log("User fetched from getSelf in userContext: ", customer);

            if (!customer) {
                AuthService.logout();
                return;
            }

            let newAvatar = testAvatar;
            if (avatar) {
                newAvatar = `data:image/jpeg;base64,${avatar}`;
            }

            setUserData({
                userId: customer.id || null,
                username: customer.username || "",
                email: customer.email || "",
                avatar: newAvatar,
                bio: customer.bio || "",
                profileCreationDate: customer.profileCreationDate || "",
            });
            console.log("User data fetched from userContext: ", userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            AuthService.logout();
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
