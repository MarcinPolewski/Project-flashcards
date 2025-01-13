import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

import testAvatar from "../../assets/test/test-avatar.png";

import Logo from "./Logo/Logo";
import PlusButton from "./PlusButton/PlusButton";
import Avatar from "./Avatar/Avatar";
import CustomerService from "../../services/CustomerService";


const Navbar = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
            username: '',
            email: '',
            avatar: testAvatar
    });

    const {username, email, avatar} = userData;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await CustomerService.getSelf();
                setUserData({
                    username: user.username || '',
                    email: user.email || '',
                    avatar: user.avatar || testAvatar,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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