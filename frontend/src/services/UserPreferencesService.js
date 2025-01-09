const UserPreferencesService = {
    getPreferences: async () => {
        const response = await api.get(`/userPreferences/getUserPreferences/`);
        return response.data;
    },

    updatePreferences: async (darkMode, language, reminderTime, timezone, studyReminders) => {
        const response = await api.post(`/userPreferences/update`, {
            userPreferencesId,
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