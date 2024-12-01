import React from "react";

import './AuthSection.css';

const AuthSection = ({children}) => {
    return <div className="auth-section">
        <div className="auth-section-left">
                <h1>Palabra</h1>
        </div>
        <div className="auth-section-right">
            <div className="auth-section-right-form">
                {children}
            </div>
        </div>
    </div>
}

export default AuthSection;