import api from '../api/api';

const handleError = (error) => {
    console.error(error.response?.data || 'Unknown error occurred');
    throw error;
  };
  
  const DeckService = {
    getFlashcards: async (deckId, { page = 0, size = 5, sortBy = 'id', ascending = true } = {}) => {
      try {
        const response = await api.get(`/deck/flashcards`, {
          params: { deckId, page, size, sortBy, ascending },
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  
    createDeck: async (folderId, name) => {
      try {
        const response = await api.post(`/deck/create`, {
          folderId,
          name,
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  
    updateDeck: async (deckId, name) => {
      try {
        const response = await api.put(`/deck/update`, {
          deckId,
          name,
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  
    deleteFlashcardFromDeck: async (deckId, flashcardId) => {
      try {
        const response = await api.post(`/deck/deleteFlashcardFromDeck`, null, {
          params: { deckId, flashcardId },
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  
    copyFlashcardToDeck: async (deckId, flashcardId) => {
      try {
        const response = await api.post(`/deck/copyFlashcardToDeck`, null, {
          params: { deckId, flashcardId },
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  
    moveFlashcardToOtherDeck: async (sourceDeckId, destinationDeckId, flashcardId) => {
      try {
        const response = await api.post(`/deck/moveFlashcardToOtherDeck`, null, {
          params: { sourceDeckId, destinationDeckId, flashcardId },
        });
        return response.data;
      } catch (error) {
        handleError(error);
      }
    },
  };
  
  export default DeckService;