import React, { useEffect, useState } from "react";
import './PlusButton.css';

import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";

const PlusButton = () => {

    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const { toggleOverlay } = useOverlay();

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    const handleClickOutside = (event) => {
        if (!event.target.closest('.plus-button-container')) {
            setPopupOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        };
    }, []);

    return <div className="plus-button-container">

        <div className="plus-button" onClick={handleTogglePopup}>
            <div className="plus-button-img">+</div>
        </div>

        {isPopupOpen && (
                <div className="plus-button-popup popup">
                    <ul>
                        <li onClick={() => navigate("/create-flashcard")}>Create Flashcard</li>
                        <li onClick={toggleOverlay}>Create Deck</li>
                    </ul>
                </div>
            )}

    </div>
}

export default PlusButton;