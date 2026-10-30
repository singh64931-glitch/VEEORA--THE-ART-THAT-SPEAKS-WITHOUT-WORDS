import React, { useState } from 'react';
import { VEORA_WHATSAPP_URL, VEORA_WHATSAPP_FORMATTED } from '../data/initialData';
import { MessageSquareQuote, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const text = encodeURIComponent(
      "Hello VÉORA Atelier! I would like to inquire about your handcrafted paintings and original art creations."
    );
    window.open(`${VEORA_WHATSAPP_URL}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#E8E2D8] text-xs font-sans text-stone-800 animate-in fade-in slide-in-from-right-3 duration-300">
          <div className="flex flex-col">
            <span className="font-semibold text-[#1C2E24] text-[11px] uppercase tracking-wider">
              Artisan Concierge
            </span>
            <span className="text-[11px] text-stone-500">
              Chat on WhatsApp · {VEORA_WHATSAPP_FORMATTED}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="p-1 text-stone-400 hover:text-stone-700 transition-colors ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        className="group relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label={`Chat with VÉORA on WhatsApp at ${VEORA_WHATSAPP_FORMATTED}`}
        title={`Chat with VÉORA Atelier (${VEORA_WHATSAPP_FORMATTED})`}
      >
        {/* Subtle Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none group-hover:hidden" />

        <MessageSquareQuote className="w-7 h-7 relative z-10 fill-white stroke-none drop-shadow-xs" />
      </button>
    </div>
  );
};
