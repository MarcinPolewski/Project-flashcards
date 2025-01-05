import api from "../api/api";

const PdfGeneratorService = {
    generatePdf: async (id) => {
        const response = await api.get(`/generatePdf/${id}`, { responseType: 'blob' });
        return response.data;
    }
};

export default PdfGeneratorService;