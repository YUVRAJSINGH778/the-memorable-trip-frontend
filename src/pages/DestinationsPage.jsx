import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Compass, ChevronRight } from 'lucide-react';
import destinationService from '../services/destinationService';

export const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getAllDestinations()
      .then(data => setDestinations(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-gold-accent font-semibold">Destination Portfolios</span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest-dark mt-2 mb-4">
          Discover Northeast India
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
          From the cloud-kissed canyons and living root bridges of Meghalaya to the mighty Brahmaputra wildlife corridors of Assam and the sacred Himalayan heights of Sikkim.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-grey">Loading destination catalog...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-border shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.cardImage || dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-forest-dark/85 backdrop-blur-sm text-gold px-3 py-1 rounded-full text-xs font-semibold border border-gold/30">
                    {dest.suggestedDuration}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-serif font-bold text-forest-dark mb-1 group-hover:text-forest transition-colors">
                    {dest.name}
                  </h2>
                  <p className="text-xs text-gold-accent font-medium mb-3 italic">
                    {dest.tagline}
                  </p>
                  <p className="text-sm text-charcoal/70 mb-4 line-clamp-3 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  <div className="bg-ivory rounded-xl p-3 border border-neutral-border/60 text-xs text-charcoal/80 mb-4">
                    <strong className="block text-forest-dark mb-1 font-semibold">Best Time to Visit:</strong>
                    <span>{dest.bestTimeToVisit}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="w-1/2 text-center py-2.5 px-3 rounded-xl border border-forest text-forest hover:bg-forest hover:text-ivory text-xs font-semibold transition-colors"
                >
                  Explore Guide
                </Link>
                <Link
                  to={`/plan-trip?dest=${dest.slug}`}
                  className="w-1/2 text-center py-2.5 px-3 rounded-xl bg-forest hover:bg-forest-dark text-ivory text-xs font-semibold transition-colors shadow-sm"
                >
                  Plan Trip
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
