import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";

import './Avatar.css';
import AuthService from "../../../services/AuthService";

const Avatar = (props) => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    const handleClickOutside = (event) => {
        if (!event.target.closest('.avatar')) {
            setPopupOpen(false);
        }
    }

    const handleUserProfileRedirect = () => {
        navigate(`/user/${props.id}`)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        };
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
    }

    return <div className="avatar" onClick={handleTogglePopup}>
        <img src={props.avatar} alt="User Avatar" />
        { isPopupOpen &&
            <div className="avatar-popup">
                <div className="avatar-popup-info">
                    <img className="avatar-img" src={props.avatar} alt="User Avatar" onClick={handleUserProfileRedirect}/>
                    <div className="avatar-popup-details">
                        <div>{props.username}</div>
                        <div>{props.email}</div>
                    </div>
                </div>
                <ul>
                    <li onClick={() => navigate("/settings")}>Settings</li>
                    <li onClick={toggleTheme}>{theme === 'dark' ? "Light" : "Dark"} Mode</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        }
    </div>
}

export default Avatar;