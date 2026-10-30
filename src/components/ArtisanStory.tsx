import React from 'react';
import { useStore } from '../context/StoreContext';
import { ATELIER_HERO_PATH, VEORA_LOGO_PATH } from '../data/initialData';
import { Sparkles, Palette, Shield, HeartHandshake, Eye, Layers, Truck, Award } from 'lucide-react';

export const ArtisanStory: React.FC = () => {
  const { setCurrentView } = useStore();

  const reasons = [
    {
      icon: Layers,
      title: '100% Genuine Handcrafted Originals',
      description: 'Zero mass-produced digital prints or machine-reproduced canvases. Every piece is painted by hand with thick impasto texture, delicate brushwork, and authentic tactile presence.',
    },
    {
      icon: Shield,
      title: 'Archival Museum Standards',
      description: 'Built on heavy Belgian linen, acid-free gesso, and non-yellowing artist mineral pigments. Guaranteed to retain vibrancy, luster, and structural depth across generations.',
    },
    {
      icon: Award,
      title: '24K Gold Leaf & Texture Relief',
      description: 'Hand-applied 24-karat genuine gold leaf and sculptured modeling paste that catch natural morning light and cast dynamic organic room shadows.',
    },
    {
      icon: Truck,
      title: 'Insured White-Glove Transit',
      description: 'Every painting is encased in museum-grade moisture-sealed cushioning and crated in reinforced timber to ensure flawless doorstep delivery across India and worldwide.',
    },
  ];

  return (
    <div className="bg-[#FBF9F5] border-b border-[#E8E2D8]">
      {/* The Atelier Story Section */}
      <section id="atelier-story" className="py-16 lg:py-24 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Imagery of Studio Atelier */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-lg border border-[#E3DBD2]">
                <img
                  src={ATELIER_HERO_PATH}
                  alt="VÉORA Handmade Fine Art Studio"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 bg-[#F2ECE4] border border-[#E8E2D8] rounded-xl shadow-md hidden sm:block max-w-[220px]">
                <p className="font-serif italic text-xs text-stone-800">
                  "Art is the quiet bridge between what is felt and what can never be spoken."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-[#7A6142] font-sans font-semibold mt-1 block">
                  — The VÉORA Philosophy
                </span>
              </div>
            </div>

            {/* Right: Narrative Prose */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Our Handmade Story</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C2E24] tracking-tight leading-tight text-balance">
                Created with Intention, Patience & Soul
              </h2>

              <div className="space-y-4 text-stone-600 font-sans text-sm sm:text-base font-light leading-relaxed">
                <p>
                  VÉORA was born out of a quiet conviction: that in an era of digital replication and fleeting mass production, human spaces crave the irreplaceable warmth of art made slowly by hand.
                </p>
                <p>
                  Every canvas begins as raw Belgian linen stretched over kiln-dried timber frames in our atelier. Layers of gesso, rich oil pigments, and palette-knife impasto are built over days and weeks—allowing the paint to dry organically and hold light with breathtaking depth.
                </p>
                <p>
                  Whether it is the serene alpine waters of <em>Alpine Serenity</em>, the crystalline tranquility of <em>Whispering Falls</em>, the sacred dot mandala geometry of <em>Dotted Expressions</em>, or the gilded contemplation of <em>Tranquil Grace</em>, each creation carries an emotional resonance that words alone could never capture.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('custom-studio')}
                  className="px-6 py-3 bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Commission a Creation
                </button>
                <button
                  onClick={() => setCurrentView('catalog')}
                  className="px-6 py-3 border border-[#E3DBD2] text-stone-700 hover:bg-[#F2ECE4] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  View Creations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VÉORA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
              <Award className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>The Atelier Difference</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2E24] tracking-tight">
              Why Choose VÉORA
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base font-light leading-relaxed">
              We uphold uncompromising standards of fine craftsmanship, personalized dialogue, and archival longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D8] hover:border-[#C5A880]/60 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DBD2] flex items-center justify-center text-[#1C2E24] shadow-xs">
                    <Icon className="w-5 h-5 text-[#7A6142]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1C2E24]">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
