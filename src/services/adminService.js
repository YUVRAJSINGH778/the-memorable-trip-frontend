import apiClient from './apiClient';

export const adminService = {
  async getMetrics() {
    return await apiClient.get('/api/admin/metrics');
  },

  async getEnquiries(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.destination) query.append('destination', params.destination);
    if (params.search) query.append('search', params.search);
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size !== undefined) query.append('size', params.size);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return await apiClient.get(`/api/admin/enquiries${queryString}`);
  },

  async getEnquiryById(id) {
    return await apiClient.get(`/api/admin/enquiries/${id}`);
  },

  async updateEnquiryStatus(id, status) {
    return await apiClient.patch(`/api/admin/enquiries/${id}/status`, { status });
  },

  async addFollowUpNote(id, noteData) {
    return await apiClient.post(`/api/admin/enquiries/${id}/notes`, noteData);
  },

  async getQuotations(enquiryId) {
    return await apiClient.get(`/api/admin/enquiries/${enquiryId}/quotations`);
  },

  async createQuotation(enquiryId, quotationData) {
    return await apiClient.post(`/api/admin/enquiries/${enquiryId}/quotations`, quotationData);
  },

  // Destinations & Itineraries Admin
  async createDestination(destinationData) {
    return await apiClient.post('/api/admin/destinations', destinationData);
  },

  async updateDestination(id, destinationData) {
    return await apiClient.put(`/api/admin/destinations/${id}`, destinationData);
  },

  async deleteDestination(id) {
    return await apiClient.delete(`/api/admin/destinations/${id}`);
  },

  async createItinerary(itineraryData) {
    return await apiClient.post('/api/admin/itineraries', itineraryData);
  },

  async updateItinerary(id, itineraryData) {
    return await apiClient.put(`/api/admin/itineraries/${id}`, itineraryData);
  },

  async deleteItinerary(id) {
    return await apiClient.delete(`/api/admin/itineraries/${id}`);
  }
};

export default adminService;
