import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const UserPreferencesService = {

    getPreferences: async () => {
        if (isDevelopment) return mockData.userPreferencesGetUserPreferences;
        const response = await api.get(`/userPreferences/getUserPreferences/`);
        return response.data;
    },

    updatePreferences: async (darkMode, language, reminderTime, timezone, studyReminders) => {
        const response = await api.post(`/userPreferences/update`, {
            darkMode,
            language,
            reminderTime,
            timezone,
            studyReminders
        });
        return response.data;
    }
}

export default UserPreferencesService