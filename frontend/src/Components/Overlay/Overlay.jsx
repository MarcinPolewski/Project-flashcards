import React from "react";
import "./Overlay.css";

const Overlay = ({ isOpen, closeOverlay, children }) => {
    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={closeOverlay}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Overlay;
