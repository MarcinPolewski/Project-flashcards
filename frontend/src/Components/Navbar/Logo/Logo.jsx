import React from "react";
import './Logo.css';

import logo from '../../../assets/test/test-logo.jpg';

const Logo = () => {
    return <div className="logo">
        <div className="logo-image">
            <img src={logo} alt="Palabra logo" />
        </div>
        <div className="logo-text">Palabra</div>
    </div>
}

export default Logo;