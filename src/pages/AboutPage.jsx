import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Heart, Shield, CheckCircle } from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';

export const AboutPage = () => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-24">
      {/* Hero Narrative */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">About The Memorable Trip</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest-dark">
          Our Philosophy: Every Journey Is Personal
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
          We believe travel in Northeast India should never feel like an assembly-line tour. It should be an unhurried, deeply immersive encounter with living traditions, sacred landscapes, and warm indigenous communities.
        </p>
      </div>

      {/* Origin & Northeast Focus */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-border shadow-soft space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark">
          Why Northeast India?
        </h2>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
          Northeast India is one of the world's great biodiversity hotspots and cultural tapestries. From the mist-draped living root bridges of Meghalaya's Khasi Hills to the prehistoric one-horned rhinoceroses thriving in Assam's Kaziranga floodplains, and the dramatic high-altitude monasteries guarding Sikkim's Kanchenjunga vistas — this region demands nuanced local understanding.
        </p>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
          Standard tour packages often schedule excessive daily driving and superficial stopovers. At THE MEMORABLE TRIP, we design journeys around comfortable transit pacing, verified hill chauffeurs, vetted boutique accommodations, and genuine cultural respect.
        </p>

        {/* Business Owner Placeholder Notice as requested by spec */}
        <div className="mt-6 p-4 bg-ivory rounded-xl border border-gold/40 text-xs text-charcoal/70">
          <strong className="text-forest-dark block font-semibold mb-1">[Owner Verification Notice]</strong>
          Specific corporate registration certificates, founding dates, and executive team bios will be updated directly by the agency management. We do not publish fabricated awards or unsubstantiated partner endorsements.
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-forest-dark mb-2">Tailored With Care</h3>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            We listen to your physical comfort, culinary preferences, travel pace, and dates before proposing an itinerary.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold-dark mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-forest-dark mb-2">Safety & Reliability</h3>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            All mountain transfers are handled by experienced, vetted hill chauffeurs who respect Northeast terrain dynamics.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft">
          <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-4">
            <CheckCircle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-forest-dark mb-2">Transparent Quotations</h3>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            Clear itemized breakdowns of hotel categories, vehicle provisions, permits, and inclusions without hidden surprises.
          </p>
        </div>
      </div>

      {/* Partnership Note */}
      <div className="bg-ivory rounded-2xl p-6 border border-neutral-border text-center max-w-2xl mx-auto">
        <p className="text-xs text-charcoal/70 leading-relaxed">
          * THE MEMORABLE TRIP has a verified partner association with TravelTriangle, subject to applicable platform terms and agreements.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/plan-trip"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest hover:bg-forest-dark text-ivory text-xs uppercase tracking-wider font-bold shadow-elevated transition-transform hover:scale-105"
        >
          <Compass size={16} />
          <span>Start Planning With Us</span>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
