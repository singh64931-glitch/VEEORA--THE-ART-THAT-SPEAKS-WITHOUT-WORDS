import React from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistModalOpen,
    setIsWishlistModalOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    openProductModal,
  } = useStore();

  if (!isWishlistModalOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E2D8] shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8C3A27] fill-[#8C3A27]" />
            <h3 className="font-serif text-2xl text-[#1C2E24]">Saved Creations ({savedProducts.length})</h3>
          </div>
          <button
            onClick={() => setIsWishlistModalOpen(false)}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {savedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Heart className="w-10 h-10 text-stone-300 mx-auto stroke-1" />
              <p className="font-serif text-lg text-stone-700">No saved artworks yet.</p>
              <p className="text-xs text-stone-500 font-sans">
                Tap the heart on any painting or decor item to curate your personal collection wishlist.
              </p>
            </div>
          ) : (
            savedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex items-center justify-between gap-4"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setIsWishlistModalOpen(false);
                    openProductModal(prod);
                  }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-100"
                  />
                  <div>
                    <h4 className="font-serif text-base font-medium text-stone-900 hover:text-[#7A6142]">
                      {prod.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-sans">{prod.dimensions}</p>
                    <p className="font-serif font-semibold text-stone-900 text-sm mt-0.5 tabular-nums">
                      {formatPrice(prod.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(prod);
                      toggleWishlist(prod.id);
                    }}
                    className="px-3.5 py-2 bg-[#1C2E24] text-[#E8DFC8] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#253D30] transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-2 text-stone-400 hover:text-[#8C3A27] transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
