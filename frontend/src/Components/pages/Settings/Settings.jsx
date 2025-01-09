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

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });

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

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
            const preferences = await UserPreferencesService.getPreferences();
            setSettingsState({
                ...settingsState,
                theme: preferences.darkMode ? "Dark" : "Light",
                language: preferences.language,
                reminderTime: preferences.reminderTime,
                timezone: preferences.timezone,
                studyReminders: preferences.studyReminders,
            });
            if (preferences.darkMode !== sysTheme) {
                setTheme(preferences.darkMode ? "dark" : "light");
            }
            } catch (error) {
            console.error("Error fetching user preferences:", error);
            }
        };

        fetchPreferences();
    }, [sysTheme, setTheme]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { theme, language, studyReminders, reminderTime, timezone } = settingsState;
          const darkMode = theme === "Dark";
    
          await UserPreferencesService.updatePreferences(darkMode, language, reminderTime, timezone, studyReminders);
          alert("Preferences updated successfully!");
          closeOverlay();
        } catch (error) {
          console.error("Error updating user preferences:", error);
          alert("Failed to update preferences.");
        }
      };

      const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordPattern.test(password);
      };


    const handleInputChange = (field) => (event) => {
        setFormData(prevState => ({
          ...prevState,
          [field]: event.target.value
        }));
      };

    const handleEditClick = (type) => {
        setFormType(type);
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

    const renderFormContent = () => {
        switch (formType) {
            case 'email':
                return (
                    <>
                        <label>New Email</label>
                        <input type="email" value={formData.email} onChange={handleInputChange('email')} />
                        {/* Password is needed for sensitive changes like email, so we keep it */}
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={handleInputChange('password')} />
                    </>
                );
            case 'username':
                return (
                    <>
                        <label>New Username</label>
                        <input type="text" value={formData.username} onChange={handleInputChange('username')} />
                        {/* Password is needed for sensitive changes like username, so we keep it */}
                        <label>Password</label>
                        <input type="password" value={formData.password} onChange={handleInputChange('password')} />
                    </>
                );
            case 'password':
                return (
                    <>
                        <label>New Password</label>
                        <input type="password" value={formData.password} onChange={handleInputChange('password')} />
                        <label>Reenter New Password</label>
                        <input type="password" value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} />
                    </>
                );
            case 'delete':
                return (
                    <>
                        <p className="warning-text">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <label>Enter Password</label>
                        <input type="password" value={formData.password} onChange={handleInputChange('password')} />
                        <label>Reenter Password</label>
                        <input type="password" value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} />
                    </>
                );
            default:
                return null;
        }
    };

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
                        <button className="edit-button" onClick={() => handleEditClick('email')}>Edit</button>
                    </div>
                    <hr />
                    <div className="personal-info-item">
                        <div className="personal-info-item-container">
                            <div className="label">Username</div>
                            <div className="value">{username}</div>
                        </div>
                        <button className="edit-button" onClick={() => handleEditClick('username')}>Edit</button>
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
                    <button className="edit-button" onClick={() => handleEditClick('password')}>Edit</button>
                </div>
                <hr />
                <div className="account-item">
                    <div className="account-item-container">
                        <div className="label">Delete your account</div>
                        <p className="warning-text">
                            This will delete all your data and cannot be undone.
                        </p>
                    </div>
                    <button className="delete-button" onClick={() => handleEditClick('delete')}>Delete account</button>
                </div>
            </SettingsSection>
        </div>

        <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
            <div className="overlay-form">
                <h2>{formType === 'delete' ? 'Confirm Deletion' : 'Edit Information'}</h2>
                <div className="overlay-input">
                    {renderFormContent()}
                </div>
                <button onClick={handleSubmit}>
                    {formType === 'delete' ? 'Confirm' : 'Send Confirmation Mail'}
                </button>
            </div>
        </Overlay>

        </div>
    );
};


export default Settings;