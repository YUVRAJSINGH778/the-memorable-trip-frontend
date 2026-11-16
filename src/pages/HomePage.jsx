import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, MapPin, Calendar, CheckCircle2, ChevronRight, 
  Sparkles, ShieldCheck, HeartHandshake, PhoneCall, MessageCircle, ChevronDown, ChevronUp 
} from 'lucide-react';
import destinationService from '../services/destinationService';
import itineraryService from '../services/itineraryService';
import { TESTIMONIALS_DATA, FAQS_DATA } from '../data/mockData';
import { buildWhatsAppUrl, getGeneralTripMessage } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/contact';

export const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    destinationService.getAllDestinations().then(setDestinations);
    itineraryService.getAllItineraries().then(setItineraries);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-forest-dark overflow-hidden">
        {/* Scenic Background with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105 transition-transform duration-10000 hover:scale-100"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/60 to-forest-dark/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-light/60 border border-gold/40 text-gold-light text-xs uppercase tracking-widest font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Northeast India Personalized Travel Specialist</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-ivory tracking-tight leading-tight sm:leading-none mb-6">
            Discover Northeast India. <br />
            <span className="italic text-gold font-normal">Your Journey, Your Way.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-ivory/85 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            No rigid group departures or cookie-cutter packages. We craft bespoke journeys across the living root bridges of Meghalaya, wild safaris of Assam, and sacred peaks of Sikkim.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/plan-trip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-accent hover:from-gold-dark hover:to-gold text-forest-dark font-bold text-sm tracking-wider uppercase shadow-elevated hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <Compass className="w-5 h-5" />
              <span>Plan Your Custom Trip</span>
            </Link>

            <Link
              to="/destinations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-forest/80 hover:bg-forest text-ivory font-medium text-sm tracking-wide border border-gold/30 hover:border-gold transition-all duration-300"
            >
              <span>Explore Destinations</span>
              <ChevronRight className="w-4 h-4 text-gold" />
            </Link>

            <a
              href={buildWhatsAppUrl(getGeneralTripMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-medium text-sm border border-[#25D366]/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Talk to Expert</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE THREE EXPERIENCES (HYBRID MODEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">A Different Way to Travel</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark mt-2">
            Tailor-Made Rather Than Pre-Packaged
          </h2>
          <p className="text-charcoal/70 mt-3 text-base">
            Every traveler is unique. We provide destination insight and sample itineraries as inspiration, then tailor every detail around your preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-neutral-border shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center text-forest mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-forest-dark mb-3">1. Explore Destinations</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
                Deep-dive into Meghalaya's rainforests, Assam's rhino sanctuaries, and Sikkim's mountain monasteries with practical seasonal advice.
              </p>
            </div>
            <Link to="/destinations" className="text-forest font-semibold text-sm inline-flex items-center gap-1.5 hover:text-gold transition-colors">
              <span>View destination guides</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-border shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center text-gold-dark mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-forest-dark mb-3">2. Discover Sample Itineraries</h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
                Get inspired by our 5, 6, and 7-day handcrafted illustrative itineraries. Use them as starting points for your own dream journey.
              </p>
            </div>
            <Link to="/itineraries" className="text-forest font-semibold text-sm inline-flex items-center gap-1.5 hover:text-gold transition-colors">
              <span>Browse itinerary blueprints</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="bg-forest-dark text-ivory p-8 rounded-2xl shadow-elevated border border-gold/40 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center text-forest-dark mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-ivory mb-3">3. Plan Your Custom Trip</h3>
              <p className="text-sm text-ivory/80 leading-relaxed mb-6">
                Share your dates, budget, group size, and interests. Our Northeast planning desk will design your private itinerary and transparent quotation.
              </p>
            </div>
            <Link 
              to="/plan-trip" 
              className="relative z-10 w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold-dark text-forest-dark font-bold text-sm text-center transition-colors shadow-md"
            >
              Start Planning Now
            </Link>
          </div>
        </div>
      </section>

      {/* 3. DESTINATION SHOWCASE */}
      <section className="bg-ivory-subtle py-16 border-y border-neutral-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">Northeast Highlights</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark mt-2">
                Unrivaled Northeast Destinations
              </h2>
            </div>
            <Link to="/destinations" className="text-forest font-semibold text-sm inline-flex items-center gap-1 mt-4 sm:mt-0 hover:text-gold">
              <span>Explore all destinations</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div key={dest.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-border shadow-soft hover:shadow-elevated transition-all flex flex-col">
                <div className="relative h-64 overflow-hidden bg-forest-dark">
                  <img
                    src={dest.cardImage || dest.heroImage || BUSINESS_CONFIG.images.fallback}
                    alt={dest.imageAlt || `${dest.name} travel destination in Northeast India`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = BUSINESS_CONFIG.images.fallback;
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-forest-dark/80 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-xs font-semibold border border-gold/30">
                    {dest.suggestedDuration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-forest-dark mb-1 group-hover:text-forest transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-gold-accent font-medium mb-3 italic">
                      {dest.tagline}
                    </p>
                    <p className="text-sm text-charcoal/70 line-clamp-3 mb-4 leading-relaxed">
                      {dest.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-border flex items-center justify-between">
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="text-forest text-sm font-semibold hover:text-gold transition-colors"
                    >
                      Explore Guide &rarr;
                    </Link>
                    <Link
                      to={`/plan-trip?dest=${dest.slug}`}
                      className="text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg bg-ivory text-forest-dark hover:bg-gold hover:text-forest-dark transition-colors"
                    >
                      Plan Trip
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SAMPLE ITINERARIES INSPIRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">Curated Itinerary Blueprints</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark mt-2">
            Sample Journeys to Inspire You
          </h2>
          <p className="text-charcoal/70 mt-3 text-sm sm:text-base">
            These illustrative travel blueprints showcase our favorite regional routes. Every timing, stop, and stay will be calibrated to your exact travel pace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="bg-white rounded-2xl border border-neutral-border p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-grey mb-3 pb-3 border-b border-neutral-border">
                  <span className="font-semibold text-forest flex items-center gap-1">
                    <MapPin size={14} /> {itinerary.destinationName}
                  </span>
                  <span className="bg-ivory px-2.5 py-1 rounded-md text-charcoal font-medium">
                    {itinerary.suggestedDuration}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-forest-dark mb-2 leading-snug">
                  {itinerary.title}
                </h3>
                <p className="text-xs text-charcoal/70 mb-4 leading-relaxed line-clamp-3">
                  {itinerary.summary}
                </p>

                {/* Highlights list */}
                <div className="space-y-1.5 mb-6">
                  {itinerary.highlights?.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-charcoal/80">
                      <CheckCircle2 size={14} className="text-gold shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-border flex items-center justify-between">
                <Link
                  to={`/itineraries/${itinerary.slug}`}
                  className="text-xs font-semibold text-forest hover:text-gold"
                >
                  View Day-by-Day Plan
                </Link>
                <Link
                  to={`/plan-trip?itinerary=${itinerary.slug}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-forest text-ivory hover:bg-forest-dark transition-colors"
                >
                  Request Custom Version
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE THE MEMORABLE TRIP */}
      <section className="bg-forest-dark text-ivory py-20 border-y border-forest-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">The Memorable Trip Philosophy</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory mt-2 mb-6 leading-tight">
                Every Journey Is Personal. <br />
                <span className="text-gold italic font-normal">Every Memory Is Yours.</span>
              </h2>
              <p className="text-ivory/80 leading-relaxed mb-8 text-base">
                Northeast India is not a destination for rushed checklists. Its misty valleys, sacred monoliths, and indigenous tribal heritage reveal themselves when you travel with intention, respectful pacing, and trusted local guidance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-gold font-semibold text-base">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Verified Hill Drivers</span>
                  </div>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    Experienced, courteous mountain chauffeurs who know Northeast winding terrains in all weather conditions.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-gold font-semibold text-base">
                    <HeartHandshake className="w-5 h-5" />
                    <span>Hand-Selected Stays</span>
                  </div>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    From colonial tea garden bungalows in Assam to scenic boutique valley retreats in Shillong and Pelling.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-gold font-semibold text-base">
                    <Sparkles className="w-5 h-5" />
                    <span>Zero Forced Shopping</span>
                  </div>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    No commercial tourist traps or artificial commission detours. Your precious holiday time is fully yours.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-gold font-semibold text-base">
                    <PhoneCall className="w-5 h-5" />
                    <span>Dedicated Trip Concierge</span>
                  </div>
                  <p className="text-xs text-ivory/70 leading-relaxed">
                    Direct WhatsApp & phone coordination before departure, during hill transit, and throughout your stay.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual editorial card */}
            <div className="relative rounded-2xl overflow-hidden border border-gold/40 shadow-elevated p-8 bg-forest">
              <div className="text-gold text-4xl font-serif mb-4 font-bold">“</div>
              <p className="text-ivory text-lg font-serif italic leading-relaxed mb-6">
                Our approach is simple: listen closely to how you like to travel, recommend only what we have experienced firsthand in the Northeast, and support you from your first enquiry until you return safely home.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-forest-light/60">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold font-serif text-lg">
                  TMT
                </div>
                <div>
                  <h4 className="font-semibold text-ivory text-sm">Travel Operations Desk</h4>
                  <p className="text-xs text-gold-light">The Memorable Trip — Northeast India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW THE PLANNING PROCESS WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">Simple & Transparent</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-dark mt-2">
            Your Custom Journey in 4 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Tell Us Your Style',
              desc: 'Fill out our 6-step enquiry wizard with your target dates, travel companions, comfort level, and preferred Northeast regions.'
            },
            {
              step: '02',
              title: 'Expert Consultation',
              desc: 'Our Northeast trip specialist reviews road times, seasonal weather, and connects over WhatsApp or phone to refine details.'
            },
            {
              step: '03',
              title: 'Tailored Itinerary & Quote',
              desc: 'Receive a transparent day-by-day itinerary with verified hotel categories, vehicle options, and permit notes.'
            },
            {
              step: '04',
              title: 'Unforgettable Journey',
              desc: 'Travel with confidence with our local hill drivers and on-trip WhatsApp support throughout your Northeast holiday.'
            }
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft relative">
              <span className="text-3xl font-serif font-bold text-gold/40 block mb-3">
                {item.step}
              </span>
              <h3 className="text-lg font-serif font-bold text-forest-dark mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GENUINE TESTIMONIALS */}
      <section className="bg-ivory-subtle py-16 border-y border-neutral-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">Traveler Stories</span>
            <h2 className="text-3xl font-serif font-bold text-forest-dark mt-2">
              Memories From Our Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-2xl border border-neutral-border shadow-soft flex flex-col justify-between">
                <p className="text-sm text-charcoal/80 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-neutral-border">
                  <h4 className="font-semibold text-forest-dark text-sm">{t.author}</h4>
                  <p className="text-xs text-neutral-grey">{t.location} &bull; {t.tripType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-accent">Got Questions?</span>
          <h2 className="text-3xl font-serif font-bold text-forest-dark mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="bg-white rounded-xl border border-neutral-border overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-serif font-semibold text-forest-dark">
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gold shrink-0" /> : <ChevronDown className="w-5 h-5 text-neutral-grey shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/80 leading-relaxed border-t border-neutral-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM CTA CONVERSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-dark rounded-3xl p-8 sm:p-14 text-center text-ivory shadow-elevated border border-gold/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">Your Northeast Adventure Awaits</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
              Ready to Craft Your Custom Northeast Itinerary?
            </h2>
            <p className="text-ivory/80 text-sm sm:text-base leading-relaxed">
              Tell us your preferred destinations and travel dates. Receive a personalized, non-binding itinerary proposal within 24 business hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/plan-trip"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold hover:bg-gold-dark text-forest-dark font-bold text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                Plan Your Custom Trip Now
              </Link>
              <a
                href={buildWhatsAppUrl(getGeneralTripMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle size={18} />
                <span>Chat with an Expert on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
