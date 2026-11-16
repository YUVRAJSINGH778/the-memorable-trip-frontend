import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import TripWizard from '../components/enquiries/TripWizard';

export const PlanTripPage = () => {
  const [searchParams] = useSearchParams();
  const initialDestination = searchParams.get('dest') || '';

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Custom Travel Planning</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest-dark mt-2 mb-4">
          Plan Your Custom Northeast Journey
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
          Share your travel dates, preferred pace, companions, and inspirations. Our Northeast India specialists will craft an exclusive, personalized itinerary proposal for your review.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-forest-dark bg-white p-3 rounded-xl border border-neutral-border shadow-soft">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span>100% Customized Itineraries</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-forest-dark bg-white p-3 rounded-xl border border-neutral-border shadow-soft">
          <HeartHandshake className="w-4 h-4 text-gold shrink-0" />
          <span>No Obligation Quotation</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-forest-dark bg-white p-3 rounded-xl border border-neutral-border shadow-soft">
          <PhoneCall className="w-4 h-4 text-gold shrink-0" />
          <span>Direct Specialist Consultation</span>
        </div>
      </div>

      {/* Multi-Step Wizard */}
      <TripWizard initialDestination={initialDestination} />
    </div>
  );
};

export default PlanTripPage;
