import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

import testAvatar from "../../assets/test/test-avatar.png";

import Logo from "./Logo/Logo";
import PlusButton from "./PlusButton/PlusButton";
import Avatar from "./Avatar/Avatar";
import CustomerService from "../../services/CustomerService";
import { useUser } from "../../contexts/UserContext/UserContext";


const Navbar = () => {

    const navigate = useNavigate();

    const { userData, isLoading } = useUser();

    const navig = (path) => {
        navigate(path);
        window.location.reload();
    }

    if (isLoading) return <div>Loading...</div>

    return <div className="navbar">
        <div className="navbar-container">

        <Logo/>

        <div className="nav-buttons">
            <div className="navbar-item" onClick={() => navig("/")}>Browse</div>

            <div className="navbar-item" onClick={() => navig("/decks")}>Decks</div>

            <div className="navbar-item" onClick={() => navig("/share")}>Share</div>

            <div className="navbar-item" onClick={() => navig("/statistics")}>Statistics</div>
        </div>

        <div className="nav-user-options">
            <PlusButton/>
            <Avatar id={userData.id} avatar={userData.avatar} username={userData.username} email={userData.email}/>
        </div>
        </div>
    </div>
}

export default Navbar;