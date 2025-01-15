import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const DeckService = {
    getDeck: async (deckId) => {
        const response = await api.get('/deck/getDeck', {
            params: { deckId }
        });
        return response.data;
    },

    getLastUsed: async () => {
        if (isDevelopment) return mockData.deckGetLastUsed;
        const response = await api.get('/deck/getLastUsed');
        return response.data;
    },

    getAllDecks: async () => {
        if (isDevelopment) return mockData.deckGetAllDecks;
        const response = await api.get('/deck/getAllDecks');
        return response.data;
    },

    getFlashcards: async (deckId, page = 0, size = 5, sortBy = 'id', ascending = true) => {
        const response = await api.get('/deck/flashcards', {
            params: { deckId, page, size, sortBy, ascending }
        });
        return response.data;
    },
    getDeckProgress: async (deckId) => {
        const response = await api.get('/deck/getDeckProgress', {
            params: { deckId }
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
