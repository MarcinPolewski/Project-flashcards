import api from "../api/api";

const FlashcardService = {
    createFlashcard: async (deckId, front, back) => {
        const response = await api.post('/flashcard/create', { deckId, front, back });
        return response.data;
    },
    updateFlashcard: async (flashcardId, front, back) => {
        const response = await api.post('/flashcard/update', { flashcardId, front, back });
        return response.data;
    },
    deleteFlashcard: async (flashcardId) => {
        const response = await api.delete('/flashcard/delete', { params: { flashcardId } });
        return response.data;
    },
    copyFlashcardToDeck: async (flashcardId, deckId) => {
        const response = await api.post('/flashcard/copyFlashcardToDeck', { flashcardId, deckId });
        return response.data;
    },
    moveFlashcardToOtherDeck: async (flashcardId, sourceDeckId, destinationDeckId) => {
        const response = await api.post('/flashcard/moveFlashcardToOtherDeck', { flashcardId, sourceDeckId, destinationDeckId });
        return response.data;
    }
};

export default FlashcardService;