import React, { useEffect, useState } from "react";
import './PlusButton.css';

import PlusButtonPopup from './PlusButtonPopup/PlusButtonPopup';

const PlusButton = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);

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

        { isPopupOpen && <PlusButtonPopup/>}

    </div>
}

export default PlusButton;