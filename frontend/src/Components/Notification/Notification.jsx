import React from "react";
import './Notification.css';

const Notification = (props) => {
    const {text, receivedDate} = props.data;

    return <div className="notification-entity">
        <div className="notification-text">
            {text}
        </div>
        <div className="notification-date-received">
            {receivedDate}
        </div>
    </div>
}

export default Notification;