import React, { useState } from "react";
import './Avatar.css';
import AvatarPopup from './AvatarPopup/AvatarPopup';

const Avatar = (props) => {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    }

    return <div className="avatar" onClick={handleTogglePopup}>
        <img src={props.avatar} alt="User Avatar" />
        { isPopupOpen && <AvatarPopup/> }
    </div>
}

export default Avatar;