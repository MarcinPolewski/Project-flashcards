import React from "react";

import './Settings.css';

const Settings = (props) => {
    return <div className="settings">
        <div className="settings-title">Settings</div>

        <div className="settings-personal-info">

            <div className="settings-personal-info-avatar">

                <img className={avatar} src="" alt="" />

                <div className="plus-button">+</div>

            </div>

            <div className="settings-personal-info-email">
                <div>

                    <div>E-mail</div>
                    <div>{}</div>

                </div>

                <div>Edit</div>
            </div>

            <div className="settings-personal-info-username">
                <div>

                    <div>Username</div>
                    <div>{}</div>

                </div>

                <div>Edit</div>
            </div>

        </div>

        <div className="settings-appearance">

            <div className="settings-appearance-theme">
                <div>Theme</div>
                <div>TODO dropdown \/</div>
            </div>

            <div className="settings-appearance-language">
                <div>Language</div>
                <div>TODO dropdown \/</div>
            </div>

        </div>

        <div className="settings-notifications">

            <div className="settings-notifications-reminders">
                <div>
                    <div>Study reminders</div>
                    <div>Switch button</div>
                </div>

                <div>
                    <div>Choose when to receive study reminders</div>
                    <div>TODO dropdown \/</div>
                </div>
            </div>

            <div className="settings-notifications-timezone">
                <div>Time Zone</div>
                <div>TODO dropdown \/</div>
            </div>

        </div>

        <div className="settings-account-and-privacy">

            <div className="settings-account-and-privacy-password-change">
                <div>Change your password</div>
                <div>Edit</div>
            </div>

            <div className="settings-account-and-privacy-delete-account">
                <div>
                    <div>Delete your account</div>
                    <div>This will delete all your data and cannot be undone.</div>
                </div>

                <div>Delete account</div>
            </div>

        </div>
    </div>
}

export default Settings;