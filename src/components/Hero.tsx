import React from 'react';
import { useStore } from '../context/StoreContext';
import { VEORA_LOGO_PATH, ATELIER_HERO_PATH } from '../data/initialData';
import { Sparkles, ArrowRight, Palette, Brush, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView } = useStore();

  const handleExplore = () => {
    const el = document.getElementById('creations-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('catalog');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#FBF9F5] border-b border-[#E8E2D8]">
      {/* Subtle textured background atmosphere */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1C2E24_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Message & Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Hand-lettered Official Brand Emblem */}
            <div className="inline-block mb-1">
              <div className="p-2 sm:p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-[#E8E2D8] shadow-sm max-w-[280px] sm:max-w-[340px]">
                <img
                  src={VEORA_LOGO_PATH}
                  alt="VÉORA Logo - Art That Speaks Without Words"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C7A6B] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Handmade Luxury Ateliers & Custom Fine Art</span>
            </div>

            {/* Display Headline (Balanced, no orphan word) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C2E24] leading-[1.12] tracking-tight text-balance">
              Art that speaks <br className="hidden sm:inline" />
              <span className="italic font-normal font-serif text-[#7A6142]">without words.</span>
            </h1>

            {/* Supporting Prose from user brief */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-sans font-light">
              Discover thoughtfully handcrafted paintings and artistic creations that bring personality, emotion and beauty into your spaces.
            </p>

            {/* Actions: Explore Collection & Create Custom Art */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="px-8 py-3.5 bg-[#1C2E24] text-[#F4EFEB] hover:bg-[#253D30] font-sans font-medium text-sm tracking-wider uppercase rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setCurrentView('custom-studio')}
                className="px-8 py-3.5 bg-white border border-[#C5A880] text-[#7A6142] hover:bg-[#F2ECE4] font-sans font-medium text-sm tracking-wider uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Palette className="w-4 h-4 text-[#C5A880]" />
                <span>Create Custom Art</span>
              </button>
            </div>

            {/* Artisan Assurance Bar */}
            <div className="pt-6 border-t border-[#ECE5DC] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355B46] shrink-0" />
                <span>100% Hand-Painted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#355B46] shrink-0" />
                <span>Archival Museum Linen</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#355B46] shrink-0" />
                <span>Bespoke Framing Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Artwork Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Studio Canvas Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl border border-[#E3DBD2]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#EFECE6]">
                  <img
                    src={ATELIER_HERO_PATH}
                    alt="VÉORA Artisan Fine Art Atelier"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#E8DFC8] block mb-1">
                      Inside The Studio
                    </span>
                    <p className="font-serif text-lg leading-snug">
                      Where raw linen, mineral pigments, and gold leaf take form.
                    </p>
                  </div>
                </div>

                {/* Floating Artisan Note */}
                <div className="mt-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#EDE7DF] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1C2E24] text-[#E8DFC8] flex items-center justify-center font-serif font-bold text-sm">
                      V
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">Original Artwork Guarantee</p>
                      <p className="text-stone-500 text-[11px]">Hand-signed & numbered certificate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('story')}
                    className="text-[#7A6142] font-semibold text-xs hover:underline flex items-center gap-1"
                  >
                    <span>Our Story</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Decorative Accent Framing */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border border-[#C5A880]/30 rounded-2xl -z-10 pointer-events-none hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
