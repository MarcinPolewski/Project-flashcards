import React from "react";
import "./Overlay.css";

const Overlay = ({ isOpen, closeOverlay, children }) => {
    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={closeOverlay}>
            {children}
        </div>
    );
};

export default Overlay;
