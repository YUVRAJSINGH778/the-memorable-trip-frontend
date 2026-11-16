import React from 'react';
import { Shield } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-24">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-semibold mb-3">
          <Shield size={14} /> Draft Legal Terms &bull; Subject to Agency Owner Legal Sign-Off
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark">
          Terms of Service & Enquiry Conditions
        </h1>
        <p className="text-xs text-neutral-grey mt-1">Last Updated: October 2026</p>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-neutral-border shadow-soft space-y-6 text-sm text-charcoal/80 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">1. Non-Binding Nature of Sample Itineraries & Enquiries</h2>
          <p>
            All itineraries, durations, highlights, and sample routes presented on this website are illustrative frameworks intended for travel planning and inspiration. Submitting an enquiry or receiving an initial proposal does not constitute a guaranteed hotel reservation or binding contract until an official booking voucher and payment confirmation are issued by THE MEMORABLE TRIP.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">2. Custom Quotations & Validity</h2>
          <p>
            Customized travel quotations prepared by our team reflect real-time seasonal hotel tariffs, vehicle categories, and government park permit fees. Each quotation includes a specified validity window. Tariffs are subject to adjustment if booking confirmations or deposit milestones are delayed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">3. Weather, Road Conditions & Force Majeure in Northeast India</h2>
          <p>
            Travel in the Himalayan and Eastern hill regions is inherently subject to natural weather conditions, seasonal landslides, road maintenance closures, and unexpected administrative border regulations. In such circumstances, our operations desk will cooperate with travelers to adjust routes safely, while primary safety remains paramount.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">4. Protected Area Permits (Sikkim & Arunachal Pradesh)</h2>
          <p>
            Access to certain high-altitude lakes and border zones requires valid government documentation (such as government photo ID and passport-size photographs). Guests are responsible for providing authentic identification documents in timely fashion to allow permit issuance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-forest-dark">5. Cancellation & Refund Policy (Draft Baseline)</h2>
          <p>
            Cancellation terms and refund percentages vary based on individual boutique hotel booking policies and timing prior to travel departure. Detailed cancellation milestones will be explicitly stated on your personalized booking confirmation voucher prior to deposit payment.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
