import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);

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