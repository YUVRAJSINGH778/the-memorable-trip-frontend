import apiClient from './apiClient';
import { SAMPLE_ITINERARIES_DATA } from '../data/mockData';

export const itineraryService = {
  async getAllItineraries() {
    try {
      const data = await apiClient.get('/api/public/itineraries');
      return (data && data.length > 0) ? data : SAMPLE_ITINERARIES_DATA;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local itineraries:', err.message);
      return SAMPLE_ITINERARIES_DATA;
    }
  },

  async getItineraryBySlug(slug) {
    try {
      const data = await apiClient.get(`/api/public/itineraries/${slug}`);
      return data;
    } catch (err) {
      console.warn(`Backend unavailable for itinerary ${slug}, falling back to local data:`, err.message);
      const match = SAMPLE_ITINERARIES_DATA.find(i => i.slug === slug);
      if (match) return match;
      throw new Error(`Itinerary '${slug}' not found`);
    }
  }
};

export default itineraryService;
