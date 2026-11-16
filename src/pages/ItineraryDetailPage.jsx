import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Clock, Users, CheckCircle2, ArrowLeft, 
  Compass, Info, MessageSquare, AlertCircle 
} from 'lucide-react';
import itineraryService from '../services/itineraryService';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const ItineraryDetailPage = () => {
  const { slug } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    itineraryService.getItineraryBySlug(slug)
      .then(data => setItinerary(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="py-24 text-center text-neutral-grey">Loading sample itinerary details...</div>;
  }

  if (error || !itinerary) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-forest-dark mb-4">Itinerary Not Found</h2>
        <p className="text-sm text-charcoal/70 mb-6">{error || 'This sample itinerary is unavailable.'}</p>
        <Link to="/itineraries" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-ivory text-sm">
          <ArrowLeft size={16} /> Back to Itineraries
        </Link>
      </div>
    );
  }

  const whatsappMessage = `Hello The Memorable Trip team, I was reviewing the '${itinerary.title}' (${itinerary.suggestedDuration}) sample itinerary on your website. I would like to request a customized quote for our dates.`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">
      {/* Breadcrumb Navigation */}
      <Link to="/itineraries" className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:text-gold transition-colors">
        <ArrowLeft size={14} /> Back to All Sample Itineraries
      </Link>

      {/* Header Card */}
      <div className="bg-forest-dark text-ivory rounded-3xl p-8 sm:p-12 shadow-elevated border border-gold/30">
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
          <span className="bg-gold/20 text-gold-light border border-gold/40 px-3 py-1 rounded-full font-semibold">
            {itinerary.suggestedDuration}
          </span>
          <span className="bg-forest px-3 py-1 rounded-full text-ivory/80">
            Starts: {itinerary.startingCity}
          </span>
          <span className="bg-forest px-3 py-1 rounded-full text-ivory/80">
            Region: {itinerary.destinationName}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-ivory mb-4 leading-tight">
          {itinerary.title}
        </h1>
        <p className="text-base sm:text-lg text-ivory/80 leading-relaxed font-light mb-8 max-w-3xl">
          {itinerary.summary}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-forest-light/40">
          <Link
            to={`/plan-trip?dest=${itinerary.destinationSlug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-forest-dark font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
          >
            <Compass size={16} />
            <span>Request a Custom Version</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wide shadow-md transition-transform hover:scale-105"
          >
            <MessageSquare size={16} />
            <span>Discuss on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Transparency / Sample Plan Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Illustrative Sample Blueprint:</strong>
          {itinerary.disclaimer || "This is a sample inspiration itinerary. Final schedule, hotels, vehicle class, and costs are fully customized based on your preferences, dates, and confirmed availability."}
        </div>
      </div>

      {/* Target Audience & Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-soft">
          <div className="flex items-center gap-2 text-forest-dark font-serif font-bold text-lg mb-3">
            <Users size={18} className="text-gold" />
            <h3>Ideal For</h3>
          </div>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            {itinerary.targetAudience}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-neutral-border shadow-soft">
          <div className="flex items-center gap-2 text-forest-dark font-serif font-bold text-lg mb-3">
            <CheckCircle2 size={18} className="text-gold" />
            <h3>Journey Highlights</h3>
          </div>
          <div className="space-y-2">
            {itinerary.highlights?.map((hl, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-charcoal/80">
                <span className="text-gold font-bold">&bull;</span>
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day by Day Detailed Timeline */}
      <div className="space-y-6">
        <div className="border-b border-neutral-border pb-4">
          <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Suggested Daily Rhythm</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark mt-1">
            Day-by-Day Experience
          </h2>
        </div>

        <div className="space-y-6">
          {itinerary.days?.map((day) => (
            <div key={day.dayNumber} className="bg-white rounded-2xl border border-neutral-border p-6 shadow-soft hover:border-gold/60 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-forest text-ivory text-xs font-bold flex items-center justify-center shrink-0">
                  D{day.dayNumber}
                </span>
                <h3 className="text-lg font-serif font-bold text-forest-dark">
                  {day.title}
                </h3>
              </div>
              <p className="text-sm text-charcoal/80 leading-relaxed pl-11">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inclusions & Custom Quotation Note */}
      {itinerary.inclusionsNote && (
        <div className="bg-ivory rounded-2xl p-6 border border-neutral-border text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          <strong className="block text-forest-dark font-semibold mb-1">Tailored Quotation Components:</strong>
          {itinerary.inclusionsNote}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center pt-8">
        <Link
          to={`/plan-trip?dest=${itinerary.destinationSlug}`}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-forest hover:bg-forest-dark text-ivory font-bold text-sm uppercase tracking-wider shadow-elevated transition-transform hover:scale-105"
        >
          <Compass size={18} />
          <span>Plan This Journey With Your Custom Dates</span>
        </Link>
      </div>
    </div>
  );
};

export default ItineraryDetailPage;
