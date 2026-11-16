import apiClient from './apiClient';

export const authService = {
  async login(email, password) {
    const data = await apiClient.post('/api/auth/login', { email, password });
    if (data.token) {
      apiClient.setToken(data.token);
    }
    return data;
  },

  async getCurrentUser() {
    return await apiClient.get('/api/auth/me');
  },

  logout() {
    apiClient.setToken(null);
  },

  isAuthenticated() {
    return Boolean(apiClient.getToken());
  }
};

export default authService;
