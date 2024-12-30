import React, { useState } from "react";
import AuthSection from "../../AuthSection/AuthSection";

import '../../AuthSection/Auth.css';
import { handleForgotPassword } from "../../../api/handleForgotPassword";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleForgotPassword({ email });
            setSuccess("Check your email for password reset instructions.");
        } catch (error) {
            setError("An error occured, please try again.");
        }
    }

    return <AuthSection>
        <div className="auth-container">

            <div className="auth-email-signin">
                <h2>Password reset</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>

                <button className="auth-sign-in-button" type="submit">Send Reset Link</button>
                </form>

            </div>

            <div className="auth-signup">
                <span>Remember your password?</span>
                <a href="/login">Sign in here!</a>
            </div>

        </div>
    </AuthSection>
}

export default ForgotPassword;