import React, { createContext, useContext, useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        avatar: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await CustomerService.getSelf();
                setUserData({
                    username: user.username || "",
                    email: user.email || "",
                    avatar: user.avatar || null,
                });
                console.log("User data fetched from userContext: ",user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
