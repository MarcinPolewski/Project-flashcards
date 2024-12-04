import React from "react";
import AuthSection from "../../AuthSection/AuthSection";

import '../../AuthSection/Auth.css';

const ForgotPassword = () => {
    return <AuthSection>
        <div className="auth-container">

            <div className="auth-email-signin">
                <h2>Password reset</h2>
                <form>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <button className="auth-sign-in-button" type="submit">Sign in</button>
                </form>

            </div>

            <div className="auth-signup">
                <span>Remember your password?</span>
                <a href="#">Sign in here!</a>
            </div>

        </div>
    </AuthSection>
}

export default ForgotPassword;