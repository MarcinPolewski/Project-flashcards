import api from "../api/api";

const NotificationService = {
    getNotification: async (id) => {
        const response = await api.get(`/notification/getNotification/${id}`);
        return response.data;
    },
    createNotification: async (userId, text, received, receivedDate) => {
        const response = await api.post('/notification/create', { userId, text, received, receivedDate });
        return response.data;
    },
    updateNotification: async (notificationId, text, received, receivedDate) => {
        const response = await api.post('/notification/update', { notificationId, text, received, receivedDate });
        return response.data;
    },
    deleteNotification: async (notificationId) => {
        const response = await api.delete('/notification/delete', { params: { notificationId } });
        return response.data;
    }
};

export default NotificationService;