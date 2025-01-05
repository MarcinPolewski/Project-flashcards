import api from "../api/api";

export const PdfGeneratorService = {
    generatePdf: async (id) => {
        const response = await api.get(`/generatePdf/${id}`, { responseType: 'blob' });
        return response.data;
    }
};
