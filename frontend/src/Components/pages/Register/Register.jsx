import React from "react";

import '../../AuthSection/Auth.css';
import AuthSection from "../../AuthSection/AuthSection";

const Register = () => {
    return <AuthSection>
        <div className="auth-auth-container">
            <h2>Sign up</h2>

            <div className="auth-social-signin">
            <button>Sign up with Google</button>
            <button>Sign up with Facebook</button>
            <button>Sign up with Github</button>
            </div>

            <div className="auth-email-signin">
            <h2>Or sign up using email</h2>
            <form>
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                </div>

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
                    <input type="checkbox" id="remember" name="remember" required/>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis consequatur magnam est magni. Nemo at esse ratione! Dignissimos, at quibusdam.
                </label>
                </div>

                <button className="auth-sign-in-button" type="submit">Sign up</button>
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