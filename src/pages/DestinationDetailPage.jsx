import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, 
  HelpCircle, Compass, MessageCircle, ArrowLeft, ChevronDown, ChevronUp 
} from 'lucide-react';
import destinationService from '../services/destinationService';
import itineraryService from '../services/itineraryService';
import { buildWhatsAppUrl, getGeneralTripMessage } from '../utils/whatsapp';

export const DestinationDetailPage = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [relatedItineraries, setRelatedItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    destinationService.getDestinationBySlug(slug)
      .then(dest => {
        setDestination(dest);
        return itineraryService.getAllItineraries();
      })
      .then(allItins => {
        // Find itineraries matching destination
        const related = allItins.filter(i => 
          i.destinationSlug === slug || (slug === 'assam-guwahati' && i.destinationSlug?.includes('assam'))
        );
        setRelatedItineraries(related);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="py-24 text-center text-neutral-grey">Loading destination details...</div>;
  }

  if (error || !destination) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-serif font-bold text-forest-dark mb-4">Destination Not Found</h2>
        <p className="text-sm text-charcoal/70 mb-6">{error || 'The requested destination is not available.'}</p>
        <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-forest text-ivory text-sm">
          <ArrowLeft size={16} /> Back to Destinations
        </Link>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppUrl(getGeneralTripMessage(destination.name));

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO BANNER */}
      <div className="relative min-h-[55vh] flex items-center bg-forest-dark overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${destination.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-forest-dark/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-ivory">
          <Link to="/destinations" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline mb-4">
            <ArrowLeft size={14} /> Back to All Destinations
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-gold/20 border border-gold/40 text-gold-light px-3 py-1 rounded-full text-xs font-semibold">
              Suggested Duration: {destination.suggestedDuration}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-ivory tracking-tight mb-3">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl text-gold-light font-serif italic max-w-2xl mb-8">
            {destination.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/plan-trip?dest=${destination.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gold hover:bg-gold-dark text-forest-dark font-bold text-xs uppercase tracking-wider shadow-elevated transition-transform hover:scale-105"
            >
              <Compass size={16} />
              <span>Plan Custom Trip to {destination.name}</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wide shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle size={16} />
              <span>Chat With Specialist</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. OVERVIEW & GALLERY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Destination Overview</span>
            <h2 className="text-3xl font-serif font-bold text-forest-dark">
              Immerse in {destination.name}
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed font-light">
              {destination.fullDescription}
            </p>

            {/* Best Time Callout */}
            <div className="bg-ivory rounded-2xl p-6 border border-neutral-border mt-8">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-forest-dark mb-1">Seasonal Travel Guidance</h4>
                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    {destination.bestTimeToVisit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Checklist */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-border shadow-soft">
            <h3 className="text-xl font-serif font-bold text-forest-dark mb-4 pb-3 border-b border-neutral-border">
              Key Experiences & Sights
            </h3>
            <div className="space-y-3.5">
              {destination.keyHighlights?.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-charcoal/85">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-border">
              <Link
                to={`/plan-trip?dest=${destination.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-forest hover:bg-forest-dark text-ivory text-xs uppercase tracking-wider font-bold transition-colors"
              >
                <Compass size={16} />
                <span>Custom Itinerary for {destination.name}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. PRACTICAL TRAVEL TIPS */}
        {destination.travelTips && destination.travelTips.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-neutral-border shadow-soft">
            <div className="flex items-center gap-2 text-forest-dark mb-4">
              <AlertTriangle className="w-5 h-5 text-gold-accent" />
              <h3 className="text-xl font-serif font-bold">Practical Advice for Travelers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destination.travelTips.map((tip, idx) => (
                <div key={idx} className="bg-ivory/60 p-4 rounded-xl border border-neutral-border/60 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                  <span className="font-semibold text-forest-dark block mb-1">Tip #{idx + 1}</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SAMPLE ITINERARIES FOR THIS DESTINATION */}
        {relatedItineraries.length > 0 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Planning Blueprints</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-dark mt-1">
                Sample Itineraries Featuring {destination.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedItineraries.map(itin => (
                <div key={itin.id} className="bg-white rounded-2xl border border-neutral-border p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gold-dark bg-gold/10 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {itin.suggestedDuration}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-forest-dark mb-2">
                      {itin.title}
                    </h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                      {itin.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-border flex items-center justify-between">
                    <Link to={`/itineraries/${itin.slug}`} className="text-xs font-semibold text-forest hover:text-gold">
                      View Day-by-Day Details &rarr;
                    </Link>
                    <Link
                      to={`/plan-trip?itinerary=${itin.slug}`}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-forest text-ivory hover:bg-forest-dark"
                    >
                      Customize This
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FAQS */}
        {destination.faqs && destination.faqs.length > 0 && (
          <div className="max-w-3xl space-y-4">
            <h3 className="text-2xl font-serif font-bold text-forest-dark mb-4">
              {destination.name} FAQs
            </h3>
            {destination.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-xl border border-neutral-border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-serif font-semibold text-forest-dark"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-charcoal/80 leading-relaxed border-t border-neutral-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetailPage;
