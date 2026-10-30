import React from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, MessageSquareQuote } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutModalOpen,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl border-l border-[#E8E2D8] flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-white border-b border-[#E8E2D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1C2E24]" />
              <h3 className="font-serif text-2xl text-[#1C2E24]">
                Shopping Bag
              </h3>
              <span className="text-xs text-stone-500 font-sans tabular-nums">
                ({cartCount} {cartCount === 1 ? 'creation' : 'creations'})
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="px-6 py-2.5 bg-[#F2ECE4] border-b border-[#E8E2D8] text-xs text-stone-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Complimentary insured wooden crating included on all orders.</span>
          </div>

          {/* Bag Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#F2ECE4] rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-xl text-stone-800">Your bag is empty</p>
                  <p className="text-xs text-stone-500 font-sans">
                    Explore our original paintings and living creations to curate your collection.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-xl border border-[#E8E2D8] shadow-xs flex gap-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-lg object-cover bg-[#F0EBE3] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-serif font-medium text-stone-900 text-base leading-snug line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-[#8C3A27] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                        {item.product.dimensions}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E3DBD2] rounded-md overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-[#F2ECE4] text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs text-stone-900 font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-stone-600 hover:bg-[#F2ECE4] text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-semibold text-stone-900 text-sm tabular-nums">
                        {formatPrice(item.product.price ? item.product.price * item.quantity : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E2D8] space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-serif font-semibold text-stone-900 text-sm tabular-nums">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Insured Crating & Shipping:</span>
                  <span className="text-[#355B46] font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Total Investment:</span>
                  <span className="font-serif text-xl text-[#1C2E24] tabular-nums">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-sans font-medium text-xs tracking-wider uppercase rounded-md shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-stone-400 font-sans">
                  Accepts COD, GPay, UPI QR, Credit/Debit Cards, & Net Banking
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
