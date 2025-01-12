import React from "react";
import './Logo.css';

import logo from '../../../assets/test/test-logo.jpg';
import { useNavigate } from "react-router-dom";

const Logo = ( { isDesktop } ) => {
    const navigate = useNavigate();

    return (
        <div className="logo-container">
            <div className="logo" onClick={() => navigate("/")}>
                <div className="logo-image">
                    <img src={logo} alt="Palabra logo" />
                </div>
                { isDesktop && <div className="logo-text">Palabra</div>}
            </div>
        </div>
    );
};

export default Logo;
