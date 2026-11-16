import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import itineraryService from '../services/itineraryService';

export const ItinerariesPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    itineraryService.getAllItineraries()
      .then(data => setItineraries(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Inspiration Blueprints</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest-dark mt-2 mb-4">
          Sample Northeast Itineraries
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
          Illustrative travel schedules designed to showcase the natural flow, driving durations, and iconic highlights of Northeast India. Use these blueprints as inspiration for your personalized journey.
        </p>

        {/* Disclaimer Callout */}
        <div className="mt-6 p-4 bg-ivory rounded-xl border border-gold/40 flex items-start gap-3 text-xs sm:text-sm text-charcoal/85">
          <Info className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
          <span>
            <strong>Note on Customization:</strong> These sample itineraries are non-binding planning guides rather than fixed-package purchases. Your final itinerary, preferred hotels, transport vehicle, and quotation will be tailored specifically around your schedule and interests.
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-grey">Loading sample itineraries...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itineraries.map((itin) => (
            <div key={itin.id} className="bg-white rounded-2xl border border-neutral-border p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-3 pb-3 border-b border-neutral-border">
                  <span className="font-semibold text-forest flex items-center gap-1">
                    <MapPin size={14} /> {itin.destinationName}
                  </span>
                  <span className="bg-ivory text-charcoal font-semibold px-2.5 py-1 rounded-md border border-neutral-border/60">
                    {itin.suggestedDuration}
                  </span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-forest-dark mb-2 leading-snug">
                  {itin.title}
                </h2>
                <p className="text-xs text-charcoal/70 mb-5 leading-relaxed line-clamp-3">
                  {itin.summary}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-grey font-semibold block">Trip Highlights:</span>
                  {itin.highlights?.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-charcoal/80">
                      <CheckCircle2 size={13} className="text-gold shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-border flex items-center justify-between gap-2">
                <Link
                  to={`/itineraries/${itin.slug}`}
                  className="text-xs font-semibold text-forest hover:text-gold"
                >
                  View Day-by-Day
                </Link>
                <Link
                  to={`/plan-trip?itinerary=${itin.slug}`}
                  className="text-xs font-bold px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-dark text-ivory transition-colors shadow-sm"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItinerariesPage;
