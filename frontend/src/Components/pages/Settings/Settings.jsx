import React, {useContext, useState, useEffect} from "react";

import Navbar from "../../Navbar/Navbar";
import Overlay from "../../Overlay/Overlay";

import './Settings.css';
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { settingsPreferences } from "../../../utils/settingsPrefferences";

const SettingsSection = ({ title, children }) => (
    <div>
        <h2 className="settings-section-title">{title}</h2>
        <div className="settings-section">
            <div className="settings-section-content">{children}</div>
        </div>
    </div>
  );

const Settings = (props) => {
    const { avatar, username, email } = props.details;

    const [editedEmail, setEditedEmail] = useState(email);
    const [editedUsername, setEditedUsername] = useState(username);
    const [settingsState, setSettingsState] = useState({
        theme: "Light",
        language: settingsPreferences.languages[0].code,
        reminderTime: settingsPreferences.reminderTimes[0].value,
        timezone: settingsPreferences.timezones[0].code,
        studyReminders: false,
      });

    const [formType, setFormType] = useState(null);

    const { toggleOverlay, closeOverlay, isOverlayOpen } = useOverlay();
    const { sysTheme, toggleTheme, setTheme } = useContext(ThemeContext);

    const handleEmailChange = (event) => setEditedEmail(event.target.value);
    const handleUsernameChange = (event) => setEditedUsername(event.target.value);

    const handleEditClick = () => {
        toggleOverlay();
    };

    const handleSettingsChange = (key, value) => {
        setSettingsState((prevState) => ({
          ...prevState,
          [key]: value,
        }));

        if (key === "theme") {
            setTheme(value);
          }
    };

    useEffect(() => {
        const savedSettings = localStorage.getItem("userSettings");
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            setSettingsState(parsedSettings);

            if (parsedSettings.theme !== sysTheme) {
                setTheme(parsedSettings.theme);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("userSettings", JSON.stringify(settingsState));
    }, [settingsState]);

    return (
        <div>

        <Navbar details={props.details} />

        <div className="settings">
            <h1 className="settings-title">Settings</h1>

            <SettingsSection title="Personal information">
                <div className="personal-info">
                    <div className="personal-info-avatar">
                        <img className="avatar-personal" src={avatar || "default-avatar.png"} alt="Avatar" />
                        <button className="plus-button">+</button>
                    </div>
                    <hr />
                    <div className="personal-info-item">
                        <div className="personal-info-item-container">
                            <div className="label">Email</div>
                            <div className="value">{email}</div>
                        </div>
                        <button className="edit-button" onClick={handleEditClick}>Edit</button>
                    </div>
                    <hr />
                    <div className="personal-info-item">
                        <div className="personal-info-item-container">
                            <div className="label">Username</div>
                            <div className="value">{username}</div>
                        </div>
                        <button className="edit-button" onClick={handleEditClick}>Edit</button>
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="Appearance">
            <div className="appearance-item">
                <div className="label">Theme</div>
                <select
                    className="dropdown"
                    value={sysTheme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                </div>
                <hr />
                <div className="appearance-item">
                <div className="label">Language</div>
                <select
                    className="dropdown"
                    value={settingsState.language}
                    onChange={(e) => handleSettingsChange("language", e.target.value)}
                >
                    {settingsPreferences.languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                    ))}
                </select>
            </div>
            </SettingsSection>

            <SettingsSection title="Notifications">
            <div className="notifications-item">
                <div className="label">Study reminders</div>
                <input
                    type="checkbox"
                    className="switch"
                    checked={settingsState.studyReminders}
                    onChange={(e) => handleSettingsChange("studyReminders", e.target.checked)}
                />
                </div>
                <hr />
                <div className="notifications-item">
                <div className="label">Choose when to receive reminders</div>
                <select
                    className="dropdown"
                    value={settingsState.reminderTime}
                    onChange={(e) => handleSettingsChange("reminderTime", e.target.value)}
                >
                    {settingsPreferences.reminderTimes.map((time) => (
                    <option key={time.value} value={time.value}>
                        {time.label}
                    </option>
                    ))}
                </select>
                </div>
                <hr />
                <div className="notifications-item">
                <div className="label">Time Zone</div>
                <select
                    className="dropdown"
                    value={settingsState.timezone}
                    onChange={(e) => handleSettingsChange("timezone", e.target.value)}
                >
                    {settingsPreferences.timezones.map((tz) => (
                    <option key={tz.code} value={tz.code}>
                        {tz.label}
                    </option>
                    ))}
                </select>
            </div>
            </SettingsSection>

            <SettingsSection title="Account and privacy">
                <div className="account-item">
                    <div className="label">Change your password</div>
                    <button className="edit-button">Edit</button>
                </div>
                <hr />
                <div className="account-item">
                    <div className="account-item-container">
                        <div className="label">Delete your account</div>
                        <p className="warning-text">
                            This will delete all your data and cannot be undone.
                        </p>
                    </div>
                    <button className="delete-button">Delete account</button>
                </div>
            </SettingsSection>
        </div>

        <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
            <div className="overlay-form">
                <h2>Edit Information</h2>
                <div className="overlay-input">
                    <label>Email</label>
                    <input type="email" value={editedEmail} onChange={handleEmailChange} />
                </div>
                <div className="overlay-input">
                    <label>Username</label>
                    <input type="text" value={editedUsername} onChange={handleUsernameChange} />
                </div>
                <button onClick={closeOverlay}>Save</button>
            </div>
        </Overlay>

        </div>
    );
};


export default Settings;