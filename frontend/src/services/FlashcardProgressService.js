import api from "../api/api";

export const FlashcardProgressService = {
    getFlashcardProgress: async (id) => {
        const response = await api.get(`/flashcardProgress/getFlashcardProgress/${id}`);
        return response.data;
    }
};
