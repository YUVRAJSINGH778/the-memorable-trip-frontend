/**
 * WhatsApp Helper Utilities
 * Implements WhatsApp Click-to-Chat URL generation without exposing secret API credentials.
 * Note: Click-to-chat opens WhatsApp client with a pre-filled message for the user to send.
 * It is not an automated server-side message dispatch.
 */

import { BUSINESS_CONFIG } from '../config/contact';

// Default business WhatsApp number: configured from VITE_WHATSAPP_NUMBER or centralized BUSINESS_CONFIG
export const DEFAULT_WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || BUSINESS_CONFIG.phoneRaw;

/**
 * Normalizes phone numbers (removes spaces, +, dashes)
 * @param {string} phone 
 * @returns {string} digits only
 */
export const cleanPhoneNumber = (phone) => {
  return (phone || '').replace(/[^0-9]/g, '');
};

/**
 * Builds a direct wa.me link with encoded text
 * @param {string} message 
 * @param {string} [phone] 
 * @returns {string} URL
 */
export const buildWhatsAppUrl = (message, phone = DEFAULT_WHATSAPP_NUMBER) => {
  const sanitized = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitized}?text=${encodedText}`;
};

/**
 * Prepares prefilled text for general enquiries
 */
export const getGeneralTripMessage = (destinationName = '') => {
  if (destinationName) {
    return `Hello The Memorable Trip team, I am interested in planning a customized trip to ${destinationName}. Could an expert assist me with tailored recommendations?`;
  }
  return `Hello The Memorable Trip team, I would like to plan a personalized journey to Northeast India. Please connect me with a travel specialist.`;
};

/**
 * Prepares prefilled text after custom enquiry submission
 */
export const getEnquirySuccessMessage = (reference, destination, name) => {
  return `Hello The Memorable Trip team, I just submitted an enquiry (Ref: #${reference}) for a customized trip to ${destination || 'Northeast India'} under the name ${name}. Looking forward to discussing the personalized itinerary!`;
};
