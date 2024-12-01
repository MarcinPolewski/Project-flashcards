import React from "react";

import '../../AuthSection/Auth.css';
import AuthSection from "../../AuthSection/AuthSection";

const Login = () => {
    return <AuthSection>
        <div className="auth-container">
          <h2>Sign in</h2>

          <div className="auth-social-signin">
            <button>Sign in with Google</button>
            <button>Sign in with Facebook</button>
            <button>Sign in with Github</button>
          </div>

          <div className="auth-email-signin">
            <h2>Or sign in using email</h2>
            <form>
              <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>

              <div className="auth-remember">
                <label>
                  <input type="checkbox" id="remember" name="remember" />
                  Remember me
                </label>
                <div>
                  <a href="#">Forgot your password?</a>
                </div>
              </div>

              <button className="auth-sign-in-button" type="submit">Sign in</button>
            </form>
          </div>

          <div className="auth-signup">
            <span>Not yet a user?</span>
            <a href="#">Sign up here!</a>
          </div>
      </div>
    </AuthSection>
}

export default Login;