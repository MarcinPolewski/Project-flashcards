import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

import Logo from "./Logo/Logo";
import PlusButton from "./PlusButton/PlusButton";
import Avatar from "./Avatar/Avatar";

const Navbar = (props) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    const {username, email, avatar} = props.details;

    useEffect(() => {
        const handleResize = () => {
            const isNowDesktop = window.innerWidth > 768;
            setIsDesktop(isNowDesktop);
            if (isNowDesktop) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderNavbarItems = () => (
        <div className={`nav-buttons ${menuOpen || isDesktop ? "show" : "hide"}`}>
            <div className="navbar-item" onClick={() => navigate("/")}>Browse</div>
            <div className="navbar-item" onClick={() => navigate("/decks")}>Decks</div>
            <div className="navbar-item" onClick={() => navigate("/import")}>Share</div>
            <div className="navbar-item" onClick={() => navigate("/statistics")}>Statistics</div>
        </div>
    )

    const renderComponentSequence = (isMobile) => (
        isMobile ? <div className="navbar-container">
            <div className="navbar-container-mobile-upper">
                <div className="navbar-container-mobile-upper-left">
                    <button
                        className="hamburger-menu"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        ☰
                    </button>
                    <Logo isMobile={isDesktop}/>
                </div>
                <div className="navbar-container-mobile-upper-right">
                    <PlusButton />
                    <Avatar avatar={avatar} username={username} email={email} />
                </div>

            </div>

            {(menuOpen || isDesktop) && renderNavbarItems()}

        </div>
        :
        <div className="navbar-container">
            <Logo menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {(menuOpen || isDesktop) && renderNavbarItems()}

            <div className="nav-user-options">
                <PlusButton />
                <Avatar avatar={avatar} username={username} email={email} />
            </div>
        </div>
    )

    return (
        <div className="navbar">
            {renderComponentSequence(!isDesktop)}
        </div>
    );
};

export default Navbar;
