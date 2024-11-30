import React, { useEffect, useState } from "react";

import './PlusButton.css';

import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";

import Overlay from "../../Overlay/Overlay";

const PlusButton = () => {

    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

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

        <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
            <h2>Create a New Deck</h2>
            <form>
                <label>
                    Deck Name:
                    <input type="text" placeholder="Enter deck name" />
                </label>
                <button type="submit">Create</button>
            </form>
        </Overlay>

    </div>
}

export default PlusButton;