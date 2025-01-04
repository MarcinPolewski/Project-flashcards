import api from "../api/api";

export const getUserData = async () => {
    try {
        const response = await api.get('/customer/getSelf');
        return response.data;
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        throw error;
      }
}