import React, { useState } from "react";

import '../../AuthSection/Auth.css';
import AuthSection from "../../AuthSection/AuthSection";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService";

import { handleOAuth2 } from "../../../utils/handleOAuth2";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await loginUser({ email, password }, rememberMe);
        navigate("/");
      } catch (error) {
        setError("Invalid email or password.");
      }
    }

    return <AuthSection>
        <div className="auth-container">
          <h2>Sign in</h2>

          <div className="auth-social-signin">
            <button onClick={() => handleOAuth2("google")}>Sign in with Google</button>
            <button onClick={() => handleOAuth2("facebook")}>Sign in with Facebook</button>
            <button onClick={() => handleOAuth2("github")}>Sign in with Github</button>
          </div>

          <div className="auth-email-signin">
            <h2>Or sign in using email</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label className="auth-email-signin-label" htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>

              <div>
                <label className="auth-email-signin-label" htmlFor="password">Password</label>
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
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                     />
                  Remember me
                </label>
                <div>
                  <a href="/forgot-password">Forgot your password?</a>
                </div>
              </div>

              <button className="auth-sign-in-button" type="submit">Sign in</button>
            </form>
          </div>

          <div className="auth-signup">
            <span>Not yet a user?</span>
            <a href="/register">Sign up here!</a>
          </div>
      </div>
    </AuthSection>
}

export default Login;