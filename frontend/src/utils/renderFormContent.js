const renderFormContent = ({ formType, editedEmail, handleEmailChange, editedUsername, handleUsernameChange }) => {
    switch (formType) {
        case 'email':
            return (
                <>
                    <label>New Email</label>
                    <input type="email" value={editedEmail} onChange={handleEmailChange} />
                    <label>Password</label>
                    <input type="password" />
                </>
            );
        case 'username':
            return (
                <>
                    <label>New Username</label>
                    <input type="text" value={editedUsername} onChange={handleUsernameChange} />
                    <label>Password</label>
                    <input type="password" />
                </>
            );
        case 'password':
            return (
                <>
                    <label>New Password</label>
                    <input type="password" />
                    <label>Reenter New Password</label>
                    <input type="password" />
                </>
            );
        case 'delete':
            return (
                <p className="warning-text">Are you sure you want to delete your account? This action cannot be undone.</p>
            );
        default:
            return null;
    }
};

export default renderFormContent;
