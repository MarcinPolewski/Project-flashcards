import React, {useContext, useState, useEffect} from "react";

import Navbar from "../../Navbar/Navbar";
import Overlay from "../../Overlay/Overlay";

import UserPreferencesService from "../../../services/UserPreferencesService";

import './Settings.css';
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { settingsPreferences } from "../../../utils/settingsPrefferences";
import CustomerService from "../../../services/CustomerService";
import { useUser } from "../../../contexts/UserContext/UserContext";
import AuthService from "../../../services/AuthService";

const SettingsSection = ({ title, children }) => (
    <div>
        <h2 className="settings-section-title">{title}</h2>
        <div className="settings-section">
            <div className="settings-section-content">{children}</div>
        </div>
    </div>
  );

const Settings = () => {
    const { userData, isLoading } = useUser();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      });

    const [settingsState, setSettingsState] = useState({
        language: settingsPreferences.languages[0].id,
        reminderTime: settingsPreferences.reminderTimes[0].value,
        timezone: settingsPreferences.timezones[0].id,
        studyReminders: 0,
    });

    const [formType, setFormType] = useState(null);

    const [newAvatar, setNewAvatar] = useState(null);

    const { toggleOverlay, closeOverlay, isOverlayOpen } = useOverlay();
    const { sysTheme, toggleTheme, setTheme } = useContext(ThemeContext);

    const { username, email, avatar } = userData;

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const initialTheme = savedTheme ? savedTheme : "light";
        setTheme(initialTheme);

        const themeListener = window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!savedTheme) {
                setTheme(e.matches ? "dark" : "light");
            }
        });

        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", themeListener);
        };
    }, [setTheme]);

    useEffect(() => {
        const fetchPreferencesData = async () => {
            try {
                console.log("Fetching user preferences...");
                const preferences = await UserPreferencesService.getPreferences();
                console.log("Preferences: ", preferences);

                setSettingsState({
                    ...settingsState,
                    language: preferences.language,
                    reminderTime: preferences.reminderTime,
                    timezone: preferences.timezone,
                    studyReminders: preferences.studyReminders,
                });

            } catch (error) {
                console.error("Error fetching user preferences:", error);
            }
        };

        fetchPreferencesData();
    }, []);

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'delete') {
                await CustomerService.deleteCustomer(formData.password);
                alert("Your account has been deleted successfully.");
                AuthService.logout();

            }
            else if (formType === 'email') { alert("Not implemented yet!" ); }

            else if (formType === 'username') {
                try {
                    console.log("Updating username: ", formData.username);
                    await CustomerService.updateUsername(formData.username);
                    alert("Username updated successfully!");
                    window.location.reload();
                } catch(error) {
                    alert("Failed to update username.");
                }
            }
            else if (formType === 'password') { handlePasswordChange() }
        } catch (error) {
          console.error("Error updating user preferences:", error);
          alert("Failed to update preferences.");
        } finally {
            closeOverlay();
            setFormType("");
        }
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

    const handleSettingsChange = async (key, value) => {
        setSettingsState((prevState) => ({
          ...prevState,
          [key]: value,
        }));
    };

    useEffect(() => {
        const updatePreferences = async () => {
            try {
                console.log("Updating preferences: ", settingsState);
                await UserPreferencesService.updatePreferences(settingsState);
                console.log("Preferences updated successfully.");
            } catch (error) {
                console.error("Error updating user preferences:", error);
                alert("Failed to update preferences.");
            }
        };

        if (settingsState.language && settingsState.reminderTime && settingsState.timezone) {
            updatePreferences();
        }
    }, [settingsState]);

    const handlePasswordChange = async () => {
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");
        window.location.reload();
        window.location.href = "/forgot-password";
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("avatar", file);

            try {
                await CustomerService.updateAvatar(formData);
                alert("Avatar updated successfully!");
                window.location.reload();
            } catch (error) {
                console.error("Error while updating avatar: ", error);
                alert("Failed to update avatar.");
            }
        };
    }

    useEffect(() => {
        const savedSettings = localStorage.getItem("userSettings");
        if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            setSettingsState(parsedSettings);
        }
    }, []);

    const renderFormContent = () => {
        switch (formType) {
            case 'username':
                return (
                    <>
                        <label>New Username</label>
                        <input type="text" value={formData.username} onChange={handleInputChange('username')} />
                    </>
                );
            case 'password':
                return (
                    <>
                        <label>You will be logged out and redirected to the password change form..</label>
                    </>
                );
            case 'delete':
                return (
                    <>
                        <p className="warning-text">Are you sure you want to delete your account? This action cannot be undone.</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>

        <Navbar />

        <div className="settings">
            <h1 className="settings-title">Settings</h1>

            <SettingsSection title="Personal information">
                <div className="personal-info">
                    <div className="personal-info-avatar">

                        <img className="avatar-personal" src={newAvatar || avatar || "default-avatar.png"} alt="Avatar" />
                        <label htmlFor="file-upload" className="plus-button personal-info-plus-button">
                            +
                        </label>
                        <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleAvatarChange}
                        />
                    </div>
                    <hr />
                    <div className="personal-info-item">
                        <div className="personal-info-item-container">
                            <div className="label">Email</div>
                            <div className="value">{email}</div>
                        </div>
                        {/* <button className="edit-button" onClick={() => handleEditClick('email')}>Edit</button> */}
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
                    onChange={(e) => {handleThemeChange(e)}}
                >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
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
                    <option key={lang.id} value={lang.id}>
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
                    <option key={tz.code} value={tz.id}>
                        {tz.label}
                    </option>
                    ))}
                </select>
            </div>
            </SettingsSection>

            <SettingsSection title="Account and privacy">
                <div className="account-item account-item-edit">
                    <div className="label account-item-edit-label">Change your password</div>
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
                    Confirm
                </button>
            </div>
        </Overlay>

        </div>
    );
};


export default Settings;