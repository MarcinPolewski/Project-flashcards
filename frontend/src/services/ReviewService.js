import api from "../api/api";

const ReviewService = {
    requestReview: async (deckId, packageSize) => {
        const response = await api.post('/folder/requestReview', { deckId, packageSize });
        return response.data;
    },
    sendBackResults: async (flashcardId, userAnswer) => {
        const response = await api.post('/folder/sendBackResults', { flashcardId, userAnswer });
        return response.data;
    }
};

export default ReviewService;