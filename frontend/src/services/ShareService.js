import api from "../api/api";

const ShareService = {
    generatePdf: async (id) => {
        const response = await api.get(`/generatePdf/${id}`, { responseType: 'blob' });
        return response.data;
    },

    generateTxt: async (id) => {
        const response = await api.get(`/generateTxt/${id}`, { responseType: 'blob' });
        return response.data;
    },

    loadDeck: async (filePath, folderId) => {
        const response = await api.get('/loadDeck', {
            filePath, folderId
        });
        return response.data;
    }
};

export default ShareService;