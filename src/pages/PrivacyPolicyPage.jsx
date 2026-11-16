import React from 'react';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-semibold mb-3">
          <Shield size={14} /> Draft Policy &bull; Subject to Agency Owner Legal Sign-Off
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-grey mt-1">Last Updated: October 2026</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-neutral-border shadow-soft space-y-6 text-sm text-charcoal/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">1. Overview</h2>
          <p>
            THE MEMORABLE TRIP ("we", "our", "us") values your personal privacy. This Privacy Policy outlines how we collect, store, and utilize information provided when you interact with our website, request personalized itineraries, or submit travel enquiries.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">2. Information We Collect</h2>
          <p>
            When you complete our custom trip planner or contact form, we collect information necessary to design your itinerary and prepare quotations:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: Full Name, Email Address, and Phone/WhatsApp Number.</li>
            <li>Travel preferences: Desired Northeast destinations, estimated travel dates, group composition, budget tier, and special accommodation requests.</li>
          </ul>
          <p className="pt-1 text-xs text-neutral-grey italic">
            * We do not collect or store credit card or payment card data through this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">3. Purpose of Processing</h2>
          <p>
            Your details are used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Review travel feasibility and road durations across Northeast India.</li>
            <li>Communicate with you regarding your customized itinerary and quotation.</li>
            <li>Coordinate operational requirements (such as tourist permits for protected regions in Sikkim) upon your booking confirmation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">4. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or trade your contact information to external advertisers. Details are shared solely with operational service partners (e.g., vetted hotel properties or registered hill chauffeurs) strictly as required to execute confirmed travel reservations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">5. Contact & Privacy Requests</h2>
          <p>
            If you have questions about your data or wish to have your submitted enquiry removed from our planning database, contact us at <a href="mailto:privacy@thememorabletrip.com" className="text-forest underline">privacy@thememorabletrip.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
