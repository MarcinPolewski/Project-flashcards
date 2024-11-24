import React from "react";
import './Avatar.css';

const Avatar = (props) => {
    return <div className="avatar">
        <img src={props.avatar} alt="User Avatar" />
    </div>
}

export default Avatar;