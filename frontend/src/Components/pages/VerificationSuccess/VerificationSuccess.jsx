import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import AuthSection from "../../AuthSection/AuthSection";

const VerificationSuccess = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await AuthService.verifyEmail(token);
                setStatus('success');
                setMessage("Your account has been successfully verified! You can now log in.");
            } catch (error) {
                setStatus('error');
                setMessage("Verification failed. The link may be expired or invalid.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <AuthSection>

        <div className="auth-container">
            <div className="verification-status">
                {status === 'success' ? (
                    <h2>{message}</h2>
                ) : (
                    <h2>{message}</h2>
                )}
                <a href="/login">Go to login</a>
            </div>
        </div>

        </AuthSection>
    );
};

export default VerificationSuccess;
