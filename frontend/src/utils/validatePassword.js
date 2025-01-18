const validatePassword = (password, setError, repassword = null) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) {
        setError("Password must be at least 8 characters long.");
        return false;
    }
    if (!hasUpperCase) {
        setError("Password must contain at least one uppercase letter.");
        return false;
    }
    if (!hasLowerCase) {
        setError("Password must contain at least one lowercase letter.");
        return false;
    }
    if (!hasSpecialChar) {
        setError("Password must contain at least one special character (!@#$%^&*).");
        return false;
    }

    if (repassword && password !== repassword) {
        setError("Passwords do not match.");
        return false;
    }

    return true;
}

export default validatePassword;