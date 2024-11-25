import React, { useState, useEffect } from "react";
import './Avatar.css';
import AvatarPopup from './AvatarPopup/AvatarPopup';

const Avatar = (props) => {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    const handleClickOutside = (event) => {
        if (!event.target.closest('.avatar')) {
            setPopupOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        };
    }, []);

    return <div className="avatar" onClick={handleTogglePopup}>
        <img src={props.avatar} alt="User Avatar" />
        { isPopupOpen && <AvatarPopup/> }
    </div>
}

export default Avatar;