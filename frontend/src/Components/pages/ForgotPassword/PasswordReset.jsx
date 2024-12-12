import React, { useState } from "react";
import AuthSection from "../../AuthSection/AuthSection";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {

    const [state, setState] = useState({
        password: "", repassword: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setState( {
            ...state, [name]: value
        });
        setError("");
    }

    const handleConfirmPassword = (e) => {
        e.preventDefault();

        const password = state.password;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        if (!hasMinLength) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (!hasUpperCase) {
            setError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!hasLowerCase) {
            setError("Password must contain at least one lowercase letter.");
            return;
        }
        if (!hasSpecialChar) {
            setError("Password must contain at least one special character (!@#$%^&*).");
            return;
        }

        if (password !== state.repassword) {
            setError("Passwords do not match.");
            return;
        }

        alert("Password reset successfully!");
        navigate("/login");
    }

    return <AuthSection>
        <div className="auth-container">
            <div className="auth-email-signin">
                <h2>Password reset</h2>
                <form>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={state.password} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Reenter Password</label>
                    <input type="password" id="repassword" name="repassword" value={state.repassword} onChange={handleChange} required />
                </div>

                {error && <p style={{color: "red"}}>{error}</p>}

                <button className="auth-sign-in-button" onClick={handleConfirmPassword} type="submit">Reset Password</button>
                </form>

            </div>

            <div className="auth-signup">
                <span>Remember your password?</span>
                <a href="/login">Sign in here!</a>
            </div>

        </div>
    </AuthSection>
}

export default PasswordReset;