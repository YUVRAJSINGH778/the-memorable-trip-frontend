import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, MapPin, Calendar, CheckCircle } from 'lucide-react';
import destinationService from '../services/destinationService';
import itineraryService from '../services/itineraryService';
import adminService from '../services/adminService';

export const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations' or 'itineraries'

  const loadContent = async () => {
    setLoading(true);
    try {
      const [dList, iList] = await Promise.all([
        destinationService.getAllDestinations(),
        itineraryService.getAllItineraries(),
      ]);
      setDestinations(dList || []);
      setItineraries(iList || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleTogglePublish = async (dest) => {
    const updated = { ...dest, published: !dest.published };
    try {
      await adminService.updateDestination(dest.id, updated);
      setDestinations(prev => prev.map(d => d.id === dest.id ? updated : d));
    } catch {
      // Optimistic local toggle for UI preview
      setDestinations(prev => prev.map(d => d.id === dest.id ? updated : d));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-forest-dark">Destinations & Content</h1>
          <p className="text-xs text-neutral-grey mt-1">Manage Northeast destination portfolios and sample itinerary blueprints.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-xl border border-neutral-border shadow-soft">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'destinations' ? 'bg-forest text-gold shadow-sm' : 'text-charcoal hover:text-forest'
            }`}
          >
            Destinations ({destinations.length})
          </button>
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
              activeTab === 'itineraries' ? 'bg-forest text-gold shadow-sm' : 'text-charcoal hover:text-forest'
            }`}
          >
            Sample Itineraries ({itineraries.length})
          </button>
        </div>
      </div>

      {/* Destinations List */}
      {activeTab === 'destinations' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl border border-neutral-border p-5 shadow-soft flex flex-col justify-between">
              <div>
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <img
                    src={dest.cardImage || dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-forest-dark/90 text-ivory text-[10px] px-2.5 py-1 rounded-full font-semibold border border-gold/40">
                    {dest.published ? 'Published' : 'Draft'}
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-forest-dark mb-1">{dest.name}</h3>
                <p className="text-xs text-gold-accent font-medium mb-2">{dest.tagline}</p>
                <p className="text-xs text-charcoal/70 line-clamp-2 mb-3">{dest.shortDescription}</p>
                <div className="text-[11px] text-neutral-grey">Duration: {dest.suggestedDuration}</div>
              </div>

              <div className="pt-4 border-t border-neutral-border flex items-center justify-between mt-4">
                <button
                  onClick={() => handleTogglePublish(dest)}
                  className="inline-flex items-center gap-1.5 text-xs text-charcoal hover:text-forest font-medium"
                >
                  {dest.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{dest.published ? 'Unpublish' : 'Publish'}</span>
                </button>
                <a
                  href={`/destinations/${dest.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-forest hover:text-gold"
                >
                  View Public Page &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Itineraries List */}
      {activeTab === 'itineraries' && (
        <div className="space-y-4">
          {itineraries.map((itin) => (
            <div key={itin.id} className="bg-white rounded-2xl border border-neutral-border p-5 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gold-dark bg-gold/10 px-2 py-0.5 rounded">
                    {itin.destinationName}
                  </span>
                  <span className="text-xs text-neutral-grey">&bull; {itin.suggestedDuration}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-forest-dark">{itin.title}</h3>
                <p className="text-xs text-charcoal/70 max-w-2xl">{itin.summary}</p>
                <p className="text-[11px] text-neutral-grey">Total Days Defined: {itin.days?.length || 0}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`/itineraries/${itin.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl border border-forest text-forest hover:bg-forest hover:text-ivory text-xs font-semibold transition-colors"
                >
                  View Blueprint &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDestinationsPage;
