import React, { useState } from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { Product } from '../types';
import {
  VEORA_WHATSAPP_NUMBER,
  VEORA_WHATSAPP_FORMATTED,
  VEORA_WHATSAPP_URL,
  VEORA_CONTACT_EMAIL,
} from '../data/initialData';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RefreshCw, ZoomIn, MessageSquareQuote, Check, Sparkles, Mail } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!selectedProduct) return null;

  const inWishlist = isInWishlist(selectedProduct.id);
  const activeImage = selectedProduct.images[activeImageIndex] || selectedProduct.images[0] || '';

  // Interactive loupe position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello VÉORA Atelier! I am interested in your original creation "${selectedProduct.title}" (${selectedProduct.dimensions}, ${formatPrice(selectedProduct.price)}). Could you provide further details or framing consultation?`
    );
    window.open(`${VEORA_WHATSAPP_URL}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent(`Artwork Inquiry: ${selectedProduct.title} (${selectedProduct.dimensions})`);
    const body = encodeURIComponent(
      `Dear VÉORA Atelier,\n\nI am inquiring about the original artwork "${selectedProduct.title}" (${selectedProduct.dimensions}, ${formatPrice(selectedProduct.price)}).\n\nPlease provide framing options, authenticity details, and delivery timelines.\n\nThank you!`
    );
    window.location.href = `mailto:${VEORA_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FBF9F5] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#E8E2D8] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-white/80">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans uppercase tracking-wider">
            <span>{selectedProduct.collection}</span>
            <span>·</span>
            <span>{selectedProduct.category}</span>
          </div>

          <button
            onClick={closeProductModal}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4] transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 lg:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Gallery Left Column with Interactive Zoom */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F0EBE3] border border-[#E3DBD2] cursor-crosshair group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={activeImage}
                  alt={selectedProduct.title}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-175' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }
                      : undefined
                  }
                  referrerPolicy="no-referrer"
                />

                {/* Loupe Hint Overlay */}
                {!isZoomed && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] rounded-md flex items-center gap-1.5 pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Hover to examine texture</span>
                  </div>
                )}
              </div>

              {/* Thumbnails if multiple images exist */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#1C2E24] shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Angle ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Provenance & Authenticity Guarantee Card */}
              <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1C2E24] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>VÉORA Atelier Authenticity Certification</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Accompanied by a physical archival Certificate of Authenticity signed by the artist, detailing date of completion, pigment formulation, and unique registry number.
                </p>
              </div>
            </div>

            {/* Contiguous Purchase Module Right Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Title & Collection */}
                <div>
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C7A6B] block mb-1">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2E24] font-medium leading-tight">
                    {selectedProduct.title}
                  </h2>
                </div>

                {/* Investment Price */}
                <div className="pb-3 border-b border-[#E8E2D8] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-sans uppercase tracking-wider block">
                      Price
                    </span>
                    <span className="font-serif text-3xl font-semibold text-[#1C2E24] tabular-nums">
                      {formatPrice(selectedProduct.price)}
                    </span>
                  </div>

                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-[#EFECE6] text-[#1C2E24] uppercase tracking-wider">
                    {selectedProduct.isReadyToShip ? 'Ready to Ship' : 'Made to Order'}
                  </span>
                </div>

                {/* Artistic Prose Description */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 font-sans mb-1.5">
                    Artistic Narrative
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
                    {selectedProduct.fullDescription}
                  </p>
                </div>

                {/* Technical Specifications Definition List */}
                <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] space-y-2.5 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Dimensions:</span>
                    <span className="font-medium text-stone-900 text-right">{selectedProduct.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Medium & Materials:</span>
                    <span className="font-medium text-stone-900 text-right max-w-[65%]">{selectedProduct.materials}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Stock Availability:</span>
                    <span className="font-medium text-stone-900 text-right">
                      {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} Original Piece Available` : 'Made on Commission'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-100">
                    <span className="text-stone-500">Estimated Dispatch:</span>
                    <span className="font-medium text-stone-900 text-right">{selectedProduct.dispatchTime}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Custom Sizing / Color:</span>
                    <span className="font-medium text-[#7A6142] text-right">
                      {selectedProduct.customizationAvailable ? 'Available via Custom Studio' : 'Standard Edition'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductModal();
                    }}
                    className="flex-1 py-3.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-sans font-medium text-sm tracking-wider uppercase rounded-md shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-3.5 border border-[#E3DBD2] rounded-md hover:bg-white text-stone-700 hover:text-[#8C3A27] transition-colors"
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#8C3A27] text-[#8C3A27]' : ''}`} />
                  </button>
                </div>

                {/* WhatsApp Artisan Inquire & Email CTA */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="py-2.5 px-3 bg-[#EAE5DC] hover:bg-[#E2DDD3] text-[#1C2E24] font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title={`WhatsApp: ${VEORA_WHATSAPP_FORMATTED}`}
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleEmailInquiry}
                    className="py-2.5 px-3 bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E8E2D8] text-stone-800 font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title={`Email: ${VEORA_CONTACT_EMAIL}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Email Atelier</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    closeProductModal();
                    setCurrentView('custom-studio');
                  }}
                  className="w-full py-2 px-3 border border-[#C5A880] text-[#7A6142] hover:bg-[#F2ECE4] font-medium text-xs rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Request Custom Sizing / Commission</span>
                </button>

                {/* Shipping & Delivery Guarantee */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#355B46]" />
                    <span>Insured Transit</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#355B46]" />
                    <span>Museum Quality Packaging</span>
                  </span>
                  <span>·</span>
                  <span>Made in India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
