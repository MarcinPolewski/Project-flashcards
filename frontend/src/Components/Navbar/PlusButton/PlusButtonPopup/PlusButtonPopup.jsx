import React from "react";
import './PlusButtonPopup.css';
import { useNavigate } from "react-router-dom";

const PlusButtonPopup = () => {

    const navigate = useNavigate();

    return <div className="plus-button-popup">
        <ul>
            <li onClick={() => navigate("/create-flashcard")}>Create Flashcard</li>
            <li>Create Deck</li>
        </ul>
    </div>
}

export default PlusButtonPopup;