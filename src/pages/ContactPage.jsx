import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import enquiryService from '../services/enquiryService';
import { buildWhatsAppUrl, getGeneralTripMessage } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/contact';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please complete all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });
    try {
      await enquiryService.submitEnquiry({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        specialRequests: formData.message,
        preferredDestinations: 'General Contact Inquiry',
        enquirySource: 'CONTACT_PAGE',
        adultsCount: 1,
        budgetAmount: 0,
        currency: 'INR',
      });
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message || 'Unable to send message.' });
    }
  };

  const whatsappUrl = buildWhatsAppUrl(getGeneralTripMessage());

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest-dark mt-2 mb-4">
          Connect With Our Northeast Travel Specialists
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
          Have questions about road conditions, seasonal weather, or customized itineraries? Reach out through our planning form, direct WhatsApp, or email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-forest-dark text-ivory rounded-3xl p-8 space-y-6 border border-gold/30 shadow-elevated">
            <h2 className="text-2xl font-serif font-bold text-ivory">Planning Desk</h2>
            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
              Our travel managers are available to assist you with tailored itinerary designs across Northeast India.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-ivory/60 block">Email Inquiries</span>
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-sm font-medium hover:text-gold transition-colors">
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-ivory/60 block">Direct Telephone</span>
                  <a href={`tel:${BUSINESS_CONFIG.phoneDisplay.replace(/[^0-9+]/g, '')}`} className="text-sm font-medium hover:text-gold transition-colors">
                    {BUSINESS_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-ivory/60 block">Operating Hours (IST)</span>
                  <span className="text-sm">Monday – Saturday: 9:30 AM – 7:00 PM</span>
                  <span className="text-xs text-gold-light block mt-0.5">Emergency on-trip WhatsApp support: 24/7</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-ivory/60 block">Operations Center</span>
                  <span className="text-sm">Northeast Regional Operations & Dispatch Desk</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-forest-light/50">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wide transition-transform hover:scale-105"
              >
                <MessageCircle size={16} />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-border shadow-soft">
          <h2 className="text-2xl font-serif font-bold text-forest-dark mb-2">Send a Message</h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mb-6">
            Share a brief note and our travel coordinator will respond via your preferred channel.
          </p>

          {status.success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-emerald-900">Message Received</h3>
              <p className="text-xs sm:text-sm text-emerald-800">
                Thank you! Your message has been routed to our Northeast planning desk. We will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{status.error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Roy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Message or Query *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what Northeast destinations or travel questions you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-border text-sm focus:ring-2 focus:ring-forest focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-3 px-6 rounded-xl bg-forest hover:bg-forest-dark text-ivory text-xs uppercase tracking-wider font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{status.submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
