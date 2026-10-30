import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { VEORA_LOGO_PATH } from '../data/initialData';
import { ShoppingBag, Heart, Shield, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    setIsWishlistModalOpen,
    isOwnerAuthenticated,
    setIsLoginModalOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'catalog' | 'custom-studio' | 'reviews' | 'story' | 'admin') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E2D8] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C2E24] text-[#E8DFC8] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <span>Complimentary Insured White-Glove Shipping Across India</span>
        <span className="hidden md:inline text-[#C5A880]">·</span>
        <span className="hidden md:inline text-stone-300 font-normal">Authenticity Certificate with Every Original Artwork</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark / Official Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
              aria-label="VÉORA Home"
            >
              <img
                src={VEORA_LOGO_PATH}
                alt="VÉORA Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback in case of asset path delay
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wider text-[#1C2E24] font-medium uppercase leading-tight">
                  VÉORA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8C7A6B] uppercase font-sans">
                  Fine Art & Atelier
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Single line controls, clean typography) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide text-stone-700 font-medium">
            <button
              onClick={() => handleNavClick('catalog')}
              className={`whitespace-nowrap transition-colors py-1 hover:text-[#1C2E24] relative ${
                currentView === 'catalog' ? 'text-[#1C2E24] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]' : ''
              }`}
            >
              Original Creations
            </button>
            <button
              onClick={() => handleNavClick('custom-studio')}
              className={`whitespace-nowrap transition-colors py-1 hover:text-[#1C2E24] relative ${
                currentView === 'custom-studio' ? 'text-[#1C2E24] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]' : ''
              }`}
            >
              Custom Art Studio
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className={`whitespace-nowrap transition-colors py-1 hover:text-[#1C2E24] relative ${
                currentView === 'reviews' ? 'text-[#1C2E24] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]' : ''
              }`}
            >
              Collector Reviews
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className={`whitespace-nowrap transition-colors py-1 hover:text-[#1C2E24] relative ${
                currentView === 'story' ? 'text-[#1C2E24] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]' : ''
              }`}
            >
              The Atelier Story
            </button>
          </nav>

          {/* Zone 3: Primary Utility Controls */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistModalOpen(true)}
              className="p-2 text-stone-700 hover:text-[#1C2E24] transition-colors relative"
              aria-label={`Wishlist (${wishlist.length} items)`}
              title="Saved Creations"
            >
              <Heart className="w-5 h-5 stroke-[1.7]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C3A27] text-white text-[10px] font-sans font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-stone-700 hover:text-[#1C2E24] transition-colors relative flex items-center gap-1.5"
              aria-label={`Shopping Bag (${cartCount} items)`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.7]" />
              {cartCount > 0 && (
                <span className="w-4 h-4 bg-[#1C2E24] text-[#E8DFC8] text-[10px] font-sans font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Owner Atelier Admin Trigger */}
            <button
              onClick={() => {
                if (isOwnerAuthenticated) {
                  setCurrentView('admin');
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all rounded-md flex items-center gap-1.5 whitespace-nowrap ${
                isOwnerAuthenticated
                  ? 'bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30]'
                  : 'border border-[#C5A880] text-[#7A6142] hover:bg-[#F2ECE4]'
              }`}
              title={isOwnerAuthenticated ? 'Atelier Admin Panel' : 'Owner Studio Login'}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isOwnerAuthenticated ? 'Atelier Studio' : 'Owner'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FAF8F3] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 hover:text-[#1C2E24] flex items-center justify-between"
            >
              <span>Original Creations</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNavClick('custom-studio')}
              className="text-left py-2 hover:text-[#1C2E24] flex items-center justify-between"
            >
              <span>Custom Art Studio</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left py-2 hover:text-[#1C2E24] flex items-center justify-between"
            >
              <span>Collector Reviews</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 hover:text-[#1C2E24] flex items-center justify-between"
            >
              <span>The Atelier Story</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
          <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
            <span className="text-xs text-stone-500 font-sans tracking-wide">
              VÉORA Atelier · India
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isOwnerAuthenticated) setCurrentView('admin');
                else setIsLoginModalOpen(true);
              }}
              className="text-xs uppercase tracking-widest text-[#7A6142] font-semibold"
            >
              {isOwnerAuthenticated ? 'Owner Dashboard →' : 'Owner Login →'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
