import api from "../api/api";
import mockData from "../mocks/mockData";
import generateJwtHeader from "../utils/generateJwtHeader";

const isDevelopment = process.env.NODE_ENV === 'development';

const CustomerService = {
  findById: async (id) => {
      const response = await api.get(`/customer/findById/${id}`);
      return response.data;
  },
  findByEmail: async (email) => {
      const response = await api.get(`/customer/findByEmail/${email}`);
      return response.data;
  },
  getSelf: async () => {
    if (isDevelopment) return mockData.customerGetSelf;
      const response = await api.get('/customer/getSelf', {
        headers: generateJwtHeader(),
    });
      console.log("Response from backend: ", response);
      return response.data;
  },
  getSelfProfile: async () => {
    if (isDevelopment) return mockData.customerGetSelfProfile;
    const response = await api.get('/customer/getSelfProfile');
    return response.data;
  },
  getFriends: async () => {
      if (isDevelopment) return mockData.friendsGetFriends;
      const response = await api.get('/customer/getFriends');
      return response.data;
  },
  updateUsername: async (username) => {
    const response = await api.get('/customer/updateUsername', {
        params: username
    });
    return response.data;
    },
updateEmail: async (email) => {
    const response = await api.get('/customer/updateEmail', {
        params: email
    });
    return response.data;
},
updatePassword: async (password) => {
    const response = await api.get('/customer/updatePassword', {
        params: password
    });
    return response.data;
    },
updateAvatar: async (avatar) => {
    const response = await api.get('/customer/updateAvatar', {
        params: avatar
    });
    return response.data;
    },
      return response.data;
  },
  updateUsername: async (username) => {
    const response = await api.get('/customer/updateUsername', {
        params: username
    });
    return response.data;
    },
updateEmail: async (email) => {
    const response = await api.get('/customer/updateEmail', {
        params: email
    });
    return response.data;
},
updatePassword: async (password) => {
    const response = await api.get('/customer/updatePassword', {
        params: password
    });
    return response.data;
    },
updateAvatar: async (avatar) => {
    const response = await api.get('/customer/updateAvatar', {
        params: avatar
    });
    return response.data;
    },
  deleteCustomer: async () => {
      const response = await api.post('/customer/delete');
      return response.data;
  }
};

export default CustomerService;