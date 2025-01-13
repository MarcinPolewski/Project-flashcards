import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

import Logo from "./Logo/Logo";
import PlusButton from "./PlusButton/PlusButton";
import Avatar from "./Avatar/Avatar";


const Navbar = (props) => {

    const navigate = useNavigate();

    const {username, email, avatar} = props.details;

    return <div className="navbar">
        <div className="navbar-container">

        <Logo/>

        <div className="nav-buttons">
            <div className="navbar-item" onClick={() => navigate("/")}>Browse</div>

            <div className="navbar-item" onClick={() => navigate("/decks")}>Decks</div>

            <div className="navbar-item" onClick={() => navigate("/share")}>Share</div>

            <div className="navbar-item" onClick={() => navigate("/statistics")}>Statistics</div>
        </div>

        <div className="nav-user-options">
            <PlusButton/>
            <Avatar avatar={avatar} username={username} email={email}/>
        </div>
        </div>
    </div>
}

export default Navbar;