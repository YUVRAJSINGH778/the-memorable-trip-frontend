import apiClient from './apiClient';
import { DESTINATIONS_DATA } from '../data/mockData';

export const destinationService = {
  async getAllDestinations() {
    try {
      const data = await apiClient.get('/api/public/destinations');
      return (data && data.length > 0) ? data : DESTINATIONS_DATA;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local destination catalog:', err.message);
      return DESTINATIONS_DATA;
    }
  },

  async getDestinationBySlug(slug) {
    try {
      const data = await apiClient.get(`/api/public/destinations/${slug}`);
      return data;
    } catch (err) {
      console.warn(`Backend unavailable for destination ${slug}, falling back to local data:`, err.message);
      const match = DESTINATIONS_DATA.find(d => d.slug === slug);
      if (match) return match;
      throw new Error(`Destination '${slug}' not found`);
    }
  }
};

export default destinationService;
