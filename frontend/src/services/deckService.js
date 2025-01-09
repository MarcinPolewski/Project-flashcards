import api from "../api/api";

const DeckService = {
    getFlashcards: async (deckId, page = 0, size = 5, sortBy = 'id', ascending = true) => {
        const response = await api.get('/deck/flashcards', {
            params: { deckId, page, size, sortBy, ascending }
        });
        return response.data;
    },
    getLastUsed: async (howMany = 3) => {
        const response = await api.get(`/deck/getLastUsed/`, {
            params: { howMany }
        });
        return response.data;
    },
    createDeck: async (folderId, name) => {
        const response = await api.post('/deck/create', { folderId, name });
        return response.data;
    },
    updateDeck: async (deckId, name) => {
        const response = await api.put('/deck/update', { deckId, name });
        return response.data;
    },
    deleteDeck: async (deckId) => {
        const response = await api.delete('/deck/delete', { params: { deckId } });
        return response.data;
    }
};

export default DeckService;
