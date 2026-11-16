import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralTripMessage } from '../../utils/whatsapp';

export const WhatsAppButton = ({ destinationName = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(getGeneralTripMessage(destinationName));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Informative pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-forest-dark text-ivory text-xs px-3.5 py-2 rounded-full shadow-elevated border border-gold/40 animate-fade-in">
          <span>Chat directly with our Northeast Travel Specialist</span>
          <button 
            onClick={() => setShowTooltip(false)} 
            className="text-ivory/60 hover:text-white"
            aria-label="Close tooltip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with our Northeast Travel Expert on WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-white stroke-none" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
