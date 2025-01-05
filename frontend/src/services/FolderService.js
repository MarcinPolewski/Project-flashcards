import api from "../api/api";

export const FolderService = {
    getFolderStructure: async () => {
        const response = await api.get('/folder/getFolderStructure');
        return response.data;
    },
    createFolder: async (name, parentId) => {
        const response = await api.post('/folder/create', { name, parentId });
        return response.data;
    },
    updateFolder: async (id, name) => {
        const response = await api.post('/folder/update', { id, name });
        return response.data;
    },
    deleteFolder: async (folderId) => {
        const response = await api.delete('/folder/delete', { params: { folderId } });
        return response.data;
    },
    getFolderChildren: async (folderId) => {
        const response = await api.get('/folder/children', { params: { folderId } });
        return response.data;
    },
    getDecksInFolder: async (folderId) => {
        const response = await api.get('/folder/getDecks', { params: { folderId } });
        return response.data;
    }
};
