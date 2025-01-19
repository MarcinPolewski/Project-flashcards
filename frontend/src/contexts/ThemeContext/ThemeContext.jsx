import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        localStorage.setItem("theme", theme);
        document.body.classList.add(theme);
    }, [theme]);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme && storedTheme !== theme) {
            setTheme(storedTheme);
        }
    }, []);


    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = (prevTheme === "light" ? "dark" : "light");

            localStorage.setItem("theme", newTheme);

            return newTheme;
        })
    }

    return <ThemeContext.Provider value={{theme, toggleTheme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}