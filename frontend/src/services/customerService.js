import api from "../api/api";

export const CustomerService = {
  findById: async (id) => {
      const response = await api.get(`/customer/findById/${id}`);
      return response.data;
  },
  findByEmail: async (email) => {
      const response = await api.get(`/customer/findByEmail/${email}`);
      return response.data;
  },
  getSelf: async () => {
      const response = await api.get('/customer/getSelf');
      return response.data;
  },
  getFriends: async () => {
      const response = await api.get('/customer/getFriends');
      return response.data;
  },
  deleteCustomer: async () => {
      const response = await api.post('/customer/delete');
      return response.data;
  }
};