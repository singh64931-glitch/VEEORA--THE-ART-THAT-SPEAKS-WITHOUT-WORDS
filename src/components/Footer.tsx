import React from 'react';
import { useStore } from '../context/StoreContext';
import { VEORA_LOGO_PATH } from '../data/initialData';
import { ShieldCheck, MessageSquareQuote, Heart, ArrowUp, Instagram, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2E24] text-[#E8DFC8] pt-16 pb-12 border-t border-[#2A4234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <img
                  src={VEORA_LOGO_PATH}
                  alt="VÉORA Art Atelier"
                  className="h-10 w-auto object-contain brightness-110"
                />
              </div>
              <div>
                <span className="font-serif text-2xl tracking-wider text-white font-medium uppercase block leading-tight">
                  VÉORA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-sans">
                  Fine Art & Atelier
                </span>
              </div>
            </div>

            <p className="font-serif italic text-lg text-[#D5CAB8]">
              "Art that speaks without words."
            </p>

            <p className="text-stone-300 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-sm">
              Original canvas paintings, 3D textured reliefs, and hand-painted living creations crafted with archival permanence and intentional soul.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#C5A880]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Certified Originals</span>
              </div>
              <span>·</span>
              <span>All India Insured Transit</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 font-sans text-xs">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              The Collection
            </h4>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Canvas Paintings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Handmade Home Décor
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('custom-studio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Custom Art Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Collector Reviews & Chartbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  The Atelier Story
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Concierge */}
          <div className="lg:col-span-4 space-y-3 font-sans text-xs">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Studio Concierge
            </h4>
            <p className="text-stone-300 font-light leading-relaxed">
              For private acquisition consultations, interior designer commissions, or bespoke sizing, reach our artisan directly:
            </p>

            <div className="space-y-2 pt-1 text-stone-200">
              <a
                href="https://wa.me/919586120583"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                title="Chat with VÉORA on WhatsApp"
              >
                <MessageSquareQuote className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: +91 95861 20583</span>
              </a>

              <a
                href="mailto:singh.64931@gmail.com"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
                title="Email VÉORA Atelier"
              >
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>singh.64931@gmail.com</span>
              </a>

              <a
                href="tel:+919586120583"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>+91 95861 20583 (Mon – Sat · 10 AM – 7 PM IST)</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-stone-400">
              Payments accepted via COD, GPay, UPI QR, Credit Cards, Debit Cards & Net Banking.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A4234] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-sans">
          <p>© {new Date().getFullYear()} VÉORA. All rights reserved. Handcrafted in India.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
