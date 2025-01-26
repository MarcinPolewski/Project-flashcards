import api from "../api/api";
import mockData from "../mocks/mockData";
import generateJwtHeader from "../utils/generateJwtHeader";

const isDevelopment = process.env.NODE_ENV === 'development';

const NotificationService = {
    getNotification: async (id) => {
        const response = await api.get(`/notification/getNotification/${id}`);
        return response.data;
    },
    getAllNotifications: async () => {
        if (isDevelopment) return mockData.customerGetNotifications;
        const response = await api.get('/customer/getNotifications');
        return response.data;
    },
    createNotification: async (userId, text) => {
        const response = await api.post('/notification/create', { userId, text });
        return response.data;
    },
    deleteNotification: async (notificationId) => {
        const response = await api.delete('/notification/delete', { params: { notificationId } });
        return response.data;
    }
};

export default NotificationService;