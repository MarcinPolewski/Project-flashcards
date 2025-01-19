import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const ReviewService = {
    requestReview: async (deckId, packageSize = 10) => {
        if (isDevelopment) return mockData.reviewRequest;

        const response = await api.post('/review/reviewDeck', { deckId, packageSize });
        return response.data;
    },
    sendBackResults: async (flashcardId, userAnswer) => {
        const response = await api.post('/review/flashcardReviewed', { flashcardId, userAnswer });
        return response.data;
    }
};

export default ReviewService;