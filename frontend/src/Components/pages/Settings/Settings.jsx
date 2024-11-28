import React from "react";

import Navbar from "../../Navbar/Navbar";

import './Settings.css';

const SettingsSection = ({ title, children }) => (
    <div className="settings-section">
      <h2 className="settings-section-title">{title}</h2>
      <div className="settings-section-content">{children}</div>
    </div>
  );

const Settings = (props) => {
    const { avatar, username, email } = props.details;

    return (
        <div>

        <Navbar details={props.details} />

        <div className="settings">
            <h1 className="settings-title">Settings</h1>

            <SettingsSection title="Personal information">
                <div className="personal-info">
                    <div className="personal-info-avatar">
                        <img className="avatar" src={avatar || "default-avatar.png"} alt="Avatar" />
                        <button className="plus-button">+</button>
                    </div>
                    <div className="personal-info-item">
                        <div className="label">Email</div>
                        <div className="value">{email}</div>
                        <button className="edit-button">Edit</button>
                    </div>
                    <div className="personal-info-item">
                        <div className="label">Username</div>
                        <div className="value">{username}</div>
                        <button className="edit-button">Edit</button>
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="Appearance">
                <div className="appearance-item">
                    <div className="label">Theme</div>
                    <select className="dropdown">
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </div>
                <div className="appearance-item">
                    <div className="label">Language</div>
                    <select className="dropdown">
                        <option>English (UK)</option>
                        <option>Polski</option>
                    </select>
                </div>
            </SettingsSection>

            <SettingsSection title="Notifications">
                <div className="notifications-item">
                    <div className="label">Study reminders</div>
                    <input type="checkbox" className="switch" />
                </div>
                <div className="notifications-item">
                    <div className="label">Choose when to receive reminders</div>
                    <select className="dropdown">
                        <option>10 AM</option>
                        <option>2 PM</option>
                        <option>6 PM</option>
                    </select>
                </div>
                <div className="notifications-item">
                    <div className="label">Time Zone</div>
                    <select className="dropdown">
                        <option>(GMT+1:00) Warsaw</option>
                        <option>(GMT+2:00) Berlin</option>
                    </select>
                </div>
            </SettingsSection>

            <SettingsSection title="Account and privacy">
                <div className="account-item">
                    <div className="label">Change your password</div>
                    <button className="edit-button">Edit</button>
                </div>
                <div className="account-item">
                    <div className="label">Delete your account</div>
                    <p className="warning-text">
                        This will delete all your data and cannot be undone.
                    </p>
                    <button className="delete-button">Delete account</button>
                </div>
            </SettingsSection>
        </div>
        </div>
    );
};


export default Settings;