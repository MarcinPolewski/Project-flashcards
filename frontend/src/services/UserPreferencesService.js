import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const UserPreferencesService = {

    getPreferences: async () => {
        if (isDevelopment) return mockData.userPreferencesGetUserPreferences;
        const response = await api.get(`/userPreferences/getUserPreferences`);
        console.log("Inside UserPreferencesService.getPreferences: ", response.data);
        return response.data;
    },

    updatePreferences: async (userPreferences) => {
        const { language, timezone, studyReminders } = userPreferences;
        const reminderTime = userPreferences.reminderTime + ":00";
        const darkMode = false; // dummy
        const response = await api.post(`/userPreferences/update`, {
            darkMode: false,
            language,
            reminderTime,
            timezone,
            studyReminders
        });
        return response.data;
    }
}

export default UserPreferencesService