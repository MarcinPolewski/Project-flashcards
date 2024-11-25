import React, { useState } from "react";
import './PlusButton.css';

import PlusButtonPopup from './PlusButtonPopup/PlusButtonPopup';

const PlusButton = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    return <div className="plus-button-container">

        <div className="plus-button" onClick={handleTogglePopup}>
            <div className="plus-button-img">+</div>
        </div>

        { isPopupOpen && <PlusButtonPopup/>}

    </div>
}

export default PlusButton;