import React, { useState } from 'react';
import {
  VEORA_WHATSAPP_NUMBER,
  VEORA_WHATSAPP_FORMATTED,
  VEORA_WHATSAPP_URL,
  VEORA_CONTACT_EMAIL,
} from '../data/initialData';
import {
  MessageSquareQuote,
  Mail,
  Phone,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [topic, setTopic] = useState('Artwork Acquisition & Pricing');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = encodeURIComponent(
      `*VÉORA Atelier Inquiry*\n\nName: ${name || 'Art Patron'}\nContact: ${contact || 'Not provided'}\nTopic: ${topic}\n\n*Message:*\n${message || 'Hello, I would like to inquire about your handcrafted paintings and original art.'}`
    );
    window.open(`https://wa.me/${VEORA_WHATSAPP_NUMBER}?text=${formattedMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[VÉORA Inquiry] ${topic} - ${name || 'Art Patron'}`);
    const body = encodeURIComponent(
      `Dear VÉORA Atelier,\n\nName: ${name || 'Art Patron'}\nContact: ${contact || 'Not provided'}\nTopic: ${topic}\n\nMessage:\n${message || 'Hello, I would like to inquire about your handcrafted paintings and original art.'}\n\nWarm regards,\n${name || 'Art Patron'}`
    );
    window.location.href = `mailto:${VEORA_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact-us" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-[#E8E2D8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>VÉORA – ART THAT SPEAKS WITHOUT WORDS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C2E24] tracking-tight">
            Connect with the Atelier
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base font-light leading-relaxed">
            Whether inquiring about original paintings, commissioning bespoke 3D texture art, or seeking framing consultation, our artisan team welcomes your dialogue.
          </p>
        </div>

        {/* 3 Contact Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1. Official WhatsApp */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] hover:border-[#25D366]/50 shadow-xs transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E8F8EE] text-[#25D366] flex items-center justify-center">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#7A6142] font-semibold block font-sans">
                Instant Chat & Inquiries
              </span>
              <h3 className="font-serif text-2xl text-[#1C2E24]">Official WhatsApp</h3>
              <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">
                Direct messaging with the artist. Receive high-res texture close-ups, video previews, and real-time quotation updates.
              </p>
              <div className="pt-2">
                <span className="font-mono text-base font-semibold text-stone-900 block">
                  {VEORA_WHATSAPP_FORMATTED}
                </span>
                <span className="text-[11px] text-stone-400 font-sans">Available Daily · 10 AM – 7 PM IST</span>
              </div>
            </div>

            <a
              href={VEORA_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* 2. Official Email */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] hover:border-[#C5A880] shadow-xs transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F8F5EE] text-[#7A6142] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#7A6142] font-semibold block font-sans">
                Official Studio Correspondence
              </span>
              <h3 className="font-serif text-2xl text-[#1C2E24]">Studio Email</h3>
              <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">
                For architectural floor plans, high-resolution bespoke commission briefs, corporate acquisitions, and press inquiries.
              </p>
              <div className="pt-2">
                <span className="font-mono text-sm font-semibold text-stone-900 block break-all">
                  {VEORA_CONTACT_EMAIL}
                </span>
                <span className="text-[11px] text-stone-400 font-sans">Formal proposals & written estimates</span>
              </div>
            </div>

            <a
              href={`mailto:${VEORA_CONTACT_EMAIL}`}
              className="w-full py-3 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-sans text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Studio Email</span>
            </a>
          </div>

          {/* 3. Direct Phone & Studio Hours */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] hover:border-stone-400 shadow-xs transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#1C2E24] border border-[#E8E2D8] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#7A6142] font-semibold block font-sans">
                Concierge Line
              </span>
              <h3 className="font-serif text-2xl text-[#1C2E24]">Phone & Appointment</h3>
              <p className="text-stone-600 font-sans text-xs leading-relaxed font-light">
                Speak directly with our concierge team for custom commission scheduling, crating timelines, and insured shipping inquiries.
              </p>
              <div className="pt-2">
                <span className="font-mono text-base font-semibold text-stone-900 block">
                  {VEORA_WHATSAPP_FORMATTED}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-sans mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Mon – Sat · 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            <a
              href={`tel:+${VEORA_WHATSAPP_NUMBER}`}
              className="w-full py-3 border border-[#E3DBD2] bg-white hover:bg-[#FAF8F5] text-stone-800 font-sans text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Concierge</span>
            </a>
          </div>
        </div>

        {/* Quick Message Dispatcher */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm max-w-3xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-6 space-y-1">
            <h4 className="font-serif text-2xl text-[#1C2E24]">Send a Direct Artisan Message</h4>
            <p className="text-xs text-stone-500 font-sans">
              Choose your preferred platform: dispatch instantly to our official WhatsApp or send as a formal email.
            </p>
          </div>

          <form className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Radhika Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Phone / Email *</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98200 00000 or email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Inquiry Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
              >
                <option value="Artwork Acquisition & Pricing">Artwork Acquisition & Pricing</option>
                <option value="Custom Art Studio Commission">Custom Art Studio Commission</option>
                <option value="Framing & Room Placement Advice">Framing & Room Placement Advice</option>
                <option value="Insured Shipping & Transit Logistics">Insured Shipping & Transit Logistics</option>
                <option value="Interior Designer Partnership">Interior Designer Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Write your note, required dimensions, favorite artwork style, or space characteristics..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24] leading-relaxed"
              />
            </div>

            {/* Dual Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F2ECE4]">
              <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#355B46]" />
                <span>Direct artisan line: {VEORA_WHATSAPP_FORMATTED}</span>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
