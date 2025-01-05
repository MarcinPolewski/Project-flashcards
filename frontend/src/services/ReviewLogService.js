import api from "../api/api";

export const ReviewLogService = {
    getReviewLog: async (id) => {
        const response = await api.get(`/reviewLog/getReviewLog/${id}`);
        return response.data;
    },
    deleteReviewLog: async (reviewLogId) => {
        const response = await api.delete('/reviewLog/delete', { params: { reviewLogId } });
        return response.data;
    }
};
