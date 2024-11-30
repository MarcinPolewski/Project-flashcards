import { createContext, useContext } from "react";

const OverlayContext = createContext();

export const useOverlay = () => {
    return useContext(OverlayContext)
}

export const OverlayProvider = ({ children }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);

    const toggleOverlay = () => {
        setOverlayOpen(!isOverlayOpen);
    }

    const closeOverlay = () => {
        setOverlayOpen(false);
    }

    return <OverlayContext.Provider value={{isOverlayOpen, toggleOverlay, closeOverlay }}>
        { children }
    </OverlayContext.Provider>
}