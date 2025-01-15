import api from "../api/api";
import mockData from "../mocks/mockData";

const isDevelopment = process.env.NODE_ENV === 'development';

const FolderService = {
    getFolderStructure: async () => {
        if (isDevelopment) {
            return mockData.folderGetFolderStructure;
        }
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

export default FolderService;