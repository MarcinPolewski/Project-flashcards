import api from "../api/api";

export const UserStatisticsService = {
    getUserStatistics: async (id) => {
        const response = await api.get(`/userStatistics/getUserStatistics/${id}`);
        return response.data;
    },
    updateUserStatistics: async (userStatisticsId, totalTimeSpent, loginCount, lastLogin) => {
        const response = await api.post('/userStatistics/update', { userStatisticsId, totalTimeSpent, loginCount, lastLogin });
        return response.data;
    }
};
