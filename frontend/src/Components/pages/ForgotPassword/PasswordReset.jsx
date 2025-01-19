import React, { useState } from "react";
import AuthSection from "../../AuthSection/AuthSection";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import validatePassword from "../../../utils/validatePassword";

const PasswordReset = () => {
    const { email } = useParams();

    const [state, setState] = useState({
        password: "", repassword: ""
    });

    const [error, setError] = useState("");

    const [verificationCode, setVerificationCode] = useState("");
    const [codeAccepted, setCodeAccepted] = useState(false);

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;

        setState( {
            ...state, [name]: value
        });
        setError("");
    }

    const handleCodeChange = (e) => {
        const {value} = e.target;

        setVerificationCode(value);
        setError("");
    }

    const handleConfirmPassword = async (e) => {
        e.preventDefault();

        const password = state.password;
        const repassword = state.repassword;
        if (!validatePassword(password, setError, repassword))
            return;

        try {
            await AuthService.handlePasswordReset(email, verificationCode, state.password);
            alert("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            setError("Failed to reset password. Please try again.");
        }
    }

    const handleResendCode = async (e) => {
        e.preventDefault();

        try {
            await AuthService.resendVerificationCode(email);
            setCodeAccepted(true);
        } catch(error) {
            setError("Error occured while resending the code. Please try again.");
        }
    }

    return <AuthSection>
        <div className="auth-container">

                <div className="auth-email-signin">
                <h2>Enter Verification Code</h2>
                <form>
                    <div>
                        <label htmlFor="text" className="form-label">Verification Code</label>
                        <input type="text" id="text" name="text" value={verificationCode} onChange={handleCodeChange} required />
                    </div>
                </form>
                <h2>Password reset</h2>
                    <form>
                        <div>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" name="password" value={state.password} onChange={handlePasswordChange} required />
                        </div>

                        <div>
                            <label htmlFor="password" className="form-label">Reenter Password</label>
                            <input type="password" id="repassword" name="repassword" value={state.repassword} onChange={handlePasswordChange} required />
                        </div>

                        {error && <p style={{color: "red"}}>{error}</p>}

                        <p>Didn't receive verification code? Click <span><a onClick={handleResendCode}>here</a></span> to resend the code.</p>

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