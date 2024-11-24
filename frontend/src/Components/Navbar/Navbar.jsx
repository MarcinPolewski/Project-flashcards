import React from "react";
import './Navbar.css';

import Logo from "./Logo/Logo";
import PlusButton from "./PlusButton/PlusButton";
import Avatar from "./Avatar/Avatar";

const Navbar = () => {
    return <div className="navbar">
        <div className="navbar-container">

        <Logo/>

        <div className="nav-buttons">
            <div className="navbar-item">Browse</div>

            <div className="navbar-item">Decks</div>

            <div className="navbar-item">Import</div>

            <div className="navbar-item">Statistics</div>
        </div>

        <PlusButton/>

        <Avatar />

        </div>
    </div>
}

export default Navbar;