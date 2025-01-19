import { createContext, useContext, useState } from "react";

const OverlayContext = createContext();

export const useOverlay = () => {
    return useContext(OverlayContext)
}

export const OverlayProvider = ({ children }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [isPlusButtonPopupOpen, setPlusButtonPopupOpen] = useState(false);

    const toggleOverlay = () => {
        setOverlayOpen(!isOverlayOpen);
    }

    const closeOverlay = () => {
        setOverlayOpen(false);
    }

    const togglePlusButtonPopup = () => {
        setPlusButtonPopupOpen(!isPlusButtonPopupOpen);
    }

    const closePlusButtonPopup = () => {
        setPlusButtonPopupOpen(false);
    }

    return <OverlayContext.Provider value={{
        isOverlayOpen,
        toggleOverlay,
        closeOverlay,
        isPlusButtonPopupOpen,
        togglePlusButtonPopup,
        closePlusButtonPopup }}
        >
        { children }
    </OverlayContext.Provider>
}