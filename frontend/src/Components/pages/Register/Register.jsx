import React, { useState } from "react";

import '../../AuthSection/Auth.css';
import AuthSection from "../../AuthSection/AuthSection";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(`Passing to the backend: ${{username, email, password}}`);
            const response = await AuthService.registerUser({username, email, password});
            alert("Click verification link sent to your email to create an account");
            navigate("/login");
        } catch (error) {
            console.log(error.response);
            setError(error.response ? error.response.data : "An error occurred");
        }
    }

    return <AuthSection>
        <div className="auth-container">
            <h2>Sign up</h2>

            <div className="auth-social-signin">
            <button onClick={() => AuthService.handleOAuth2("google")}>Sign up with Google</button>
            <button onClick={() => AuthService.handleOAuth2("facebook")}>Sign up with Facebook</button>
            <button onClick={() => AuthService.handleOAuth2("github")}>Sign up with Github</button>
            </div>

            <div className="auth-email-signin">
            <h2>Or sign up using email</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username" className="auth-email-signin-label">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                </div>

                <div>
                <label htmlFor="email" className="auth-email-signin-label">Email address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>

                <div>
                <label htmlFor="password" className="auth-email-signin-label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>

                <div className="auth-remember">
                <label>
                    <input type="checkbox" id="remember" name="remember" required/>
                    Do you agree to the processing of your data for account creation?
                    By clicking <strong>'Sign Up'</strong>, you confirm your consent.
                </label>
                </div>

                <button className="auth-sign-in-button" type="submit">Sign Up</button>
            </form>
            </div>

            <div className="auth-signup">
                <span>Already have an account?</span>
                <a href="/login">Sign in here!</a>
            </div>
        </div>
      </AuthSection>
}

export default Register;