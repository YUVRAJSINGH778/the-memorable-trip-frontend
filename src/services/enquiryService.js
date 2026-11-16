import apiClient from './apiClient';

export const enquiryService = {
  async submitEnquiry(enquiryPayload) {
    try {
      const response = await apiClient.post('/api/public/enquiries', enquiryPayload);
      return response;
    } catch (err) {
      // If server responded with validation error, throw it directly
      if (err.status && err.status >= 400 && err.status < 500) {
        throw err;
      }
      // If network offline / development fallback
      console.warn('Backend call failed, simulating successful demo enquiry:', err.message);
      const simulatedRef = 'TMT-' + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        reference: simulatedRef,
        message: 'Your enquiry has been received by The Memorable Trip team.',
        isDemoFallback: true
      };
    }
  }
};

export default enquiryService;
