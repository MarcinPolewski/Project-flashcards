import api from "../api/api";
import mockData from "../mocks/mockData";
import generateJwtHeader from "../utils/generateJwtHeader";

const isDevelopment = process.env.NODE_ENV === 'development';

const DeckService = {
    getDeck: async (deckId) => {
        if (isDevelopment) return { id: 1, name: "Fruits!!" };
        const response = await api.get('/deck/getDeck', {
            params: { deckId }
        });
        return response.data;
    },
    getDeckInfo: async (deckId) => {
        const response = await api.get('/deck/getDeckInfo', {
            params: { deckId }
        });
        return response.data;
    },

    getLastUsed: async () => {
        if (isDevelopment) return mockData.deckGetLastUsed;
        const response = await api.get('/deck/getLastUsed', generateJwtHeader());
        return response.data;
    },

    getAllDecks: async () => {
        if (isDevelopment) return mockData.deckGetAllDecks;
        const response = await api.get('/deck/getAllDecks');
        return response.data;
    },

    getAllDecksInfo: async () => {
        if (isDevelopment) return mockData.deckGetAllDecksInfo;
        const response = await api.get('/deck/getAllDecksInfo');
        return response.data;
    },

    getFlashcards: async (deckId, page = 0, size = 5, sortBy = 'id', ascending = true) => {
        if (isDevelopment) { console.log("getting mocked flashcards"); return mockData.deckGetFlashcards};

        console.log("its getting backend flashcardS?!");
        const response = await api.get('/deck/flashcards', {
            params: { deckId, page, size, sortBy, ascending }
        });
        return response.data;
    },
    getDeckProgress: async (deckId) => {
        if (isDevelopment) return mockData.deckGetDeckProgress;
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
