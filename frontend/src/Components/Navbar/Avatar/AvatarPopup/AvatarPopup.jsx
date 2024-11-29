import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import './AvatarPopup.css';
import { ThemeContext } from "../../../../contexts/ThemeContext/ThemeContext";

const AvatarPopup = (props) => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    return <div className="avatar-popup">
        <div className="avatar-popup-info">
            <img className="avatar-img" src={props.avatar} alt="User Avatar" />
            <div className="avatar-popup-details">
                <div>{props.username}</div>
                <div>{props.email}</div>
            </div>
        </div>
        <ul>
            <li onClick={() => navigate("/settings")}>Settings</li>
            <li onClick={toggleTheme}>{theme === 'dark' ? "Light" : "Dark"} Mode</li>
            <li>Logout</li>
        </ul>
    </div>
}

export default AvatarPopup;