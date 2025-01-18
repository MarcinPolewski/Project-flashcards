import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const FriendshipService = {
    getFriendship: async (id) => {
        if (isDevelopment) return mockData.friendsGetFriends;
        const response = await api.get(`/friendship/getFriendship/${id}`);
        return response.data;
    },
    createFriendship: async (senderId, receiverId) => {
        const response = await api.post('/friendship/create', { senderId, receiverId });
        return response.data;
    },
    updateFriendship: async (friendshipId, accepted) => {
        const response = await api.post('/friendship/update', { friendshipId, accepted });
        return response.data;
    },
    deleteFriendship: async (friendshipId) => {
        const response = await api.delete('/friendship/delete', { params: { friendshipId } });
        return response.data;
    }
};

export default FriendshipService;