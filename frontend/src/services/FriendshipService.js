import api from "../api/api";

const FriendshipService = {
    getFriendship: async (id) => {
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