import api from "../api/api";

const UserStatisticsService = {
    getUserStatistics: async () => {
        // const whatIneed = {
        //     daysLearning: 15,
        //     longestStreak: 15,
        //     currentStreak: 15,
        //     allNewCards: 57,
        //     allLearningCards: 120,
        //     allRememberedCards: 217,
        //     loginDates: [
        //         '10-12-2024', '11-12-2024', '14-12-2024'
        //     ]
        // }
        const response = await api.get(`/userStatistics/getUserStatistics/`);
        return response.data;
    }
};

export default UserStatisticsService