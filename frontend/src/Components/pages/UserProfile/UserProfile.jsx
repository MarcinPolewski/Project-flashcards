import React from "react";
import './UserProfile.css';
import { useParams } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";

const UserProfile = () => {
    const { userId } = useParams();

    return <div className="user-profile">
        <Navbar/>
    </div>
};

export default UserProfile;