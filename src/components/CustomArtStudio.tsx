import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomArtworkInquiry } from '../types';
import {
  VEORA_WHATSAPP_NUMBER,
  VEORA_WHATSAPP_FORMATTED,
  VEORA_WHATSAPP_URL,
  VEORA_CONTACT_EMAIL,
} from '../data/initialData';
import { Palette, Upload, Calendar, IndianRupee, Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight, X, MessageSquareQuote, Mail } from 'lucide-react';

export const CustomArtStudio: React.FC = () => {
  const { submitInquiry, setCurrentView } = useStore();

  const [artType, setArtType] = useState<CustomArtworkInquiry['artType']>('Painting');
  const [dimensions, setDimensions] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [theme, setTheme] = useState('');
  const [conceptDescription, setConceptDescription] = useState('');
  const [approximateBudget, setApproximateBudget] = useState('');
  const [targetCompletionDate, setTargetCompletionDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  // Preset color theme suggestions for easy luxury selection
  const colorPresets = [
    'Warm Alabaster & Champagne Gold',
    'Deep Forest Emerald & Antique Brass',
    'Raw Linen, Sand & Earthy Terracotta',
    'Moody Indigo, Charcoal & Silver Leaf',
    'Serene Pastels with Metallic Accents',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !clientPhone || !clientEmail || !conceptDescription) {
      alert('Please fill in your name, contact details, and a description of your idea.');
      return;
    }

    const newInquiry = submitInquiry({
      artType,
      dimensions: dimensions || 'Custom wall sizing to be discussed',
      colorPalette: colorPalette || 'Artisan curated harmony',
      theme: theme || 'Contemporary custom composition',
      conceptDescription,
      approximateBudget: approximateBudget || 'To be estimated during consultation',
      targetCompletionDate: targetCompletionDate || 'Flexible / Artisan pace',
      clientName,
      clientPhone,
      clientEmail,
      referenceImages,
    });

    setSubmittedInquiryId(newInquiry.id);
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-20 bg-[#FBF9F5] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Bespoke Atelier Commission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C2E24] tracking-tight">
            Create with VÉORA
          </h1>
          <p className="text-stone-600 font-sans text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Collaborate directly with our studio to bring a one-of-a-kind original artwork or bespoke gift into existence.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E8E2D8] shadow-sm text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-[#F2ECE4] text-[#1C2E24] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#355B46]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl text-[#1C2E24]">Commission Request Received</h2>
              <p className="text-xs text-stone-500 font-sans tracking-wide">
                Reference ID: <span className="font-mono font-semibold text-stone-800">{submittedInquiryId}</span>
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DF] max-w-lg mx-auto text-left space-y-3 text-xs sm:text-sm text-stone-600 font-sans">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <p>
                  <strong>Consultation & Mockup:</strong> Our artisan will review your dimensions, reference palette, and concept within <strong>24–48 hours</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <p>
                  <strong>Direct Artisan Connection:</strong> You can also message or email our atelier with your reference ID for immediate assistance on WhatsApp: <strong>{VEORA_WHATSAPP_FORMATTED}</strong> or Email: <strong>{VEORA_CONTACT_EMAIL}</strong>.
                </p>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`${VEORA_WHATSAPP_URL}?text=${encodeURIComponent(`Hello VÉORA Atelier! I just submitted commission inquiry #${submittedInquiryId}. Looking forward to discussing dimensions and colors.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Message on WhatsApp ({VEORA_WHATSAPP_FORMATTED})</span>
              </a>

              <a
                href={`mailto:${VEORA_CONTACT_EMAIL}?subject=${encodeURIComponent(`Commission Inquiry #${submittedInquiryId}`)}`}
                className="px-5 py-2.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Email Studio ({VEORA_CONTACT_EMAIL})</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#F0EBE3]">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setConceptDescription('');
                  setReferenceImages([]);
                }}
                className="px-6 py-2.5 border border-[#E3DBD2] text-stone-700 hover:bg-[#F8F5F0] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => setCurrentView('catalog')}
                className="px-6 py-2.5 bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors"
              >
                Return to Collection
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Commission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E8E2D8] shadow-sm space-y-8"
          >
            {/* Step 1: Medium & Creation Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                1. Select Creation Medium
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Painting', label: 'Canvas Painting', desc: 'Oil, acrylic, linen canvas' },
                  { id: '3D Texture Art', label: '3D Texture Art', desc: 'Sculptured paste, relief dunes' },
                  { id: 'Decorative Gifting', label: 'Decorative Gifting', desc: 'Hand-painted vessels & custom decor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setArtType(item.id as CustomArtworkInquiry['artType'])}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      artType === item.id
                        ? 'border-[#1C2E24] bg-[#F7F4EE] shadow-xs'
                        : 'border-[#E8E2D8] hover:border-stone-400 bg-white'
                    }`}
                  >
                    <span className="font-serif text-base font-semibold text-[#1C2E24] block">
                      {item.label}
                    </span>
                    <span className="text-xs text-stone-500 font-sans mt-0.5 block">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions & Wall Space */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                  2. Desired Artwork Dimensions
                </label>
                <input
                  type="text"
                  placeholder="e.g. 36&quot; × 48&quot; or 100 × 120 cm (or Room Wall Area)"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              {/* Theme & Subject */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                  3. Theme & Atmosphere
                </label>
                <input
                  type="text"
                  placeholder="e.g. Minimalist mountain mist, Spiritual serenity, Floral"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>
            </div>

            {/* Step 3: Preferred Colors */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                4. Preferred Color Palette & Tones
              </label>
              <input
                type="text"
                placeholder="e.g. Warm ivory, champagne gold, muted sage green, charcoal"
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
              />
              {/* Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-stone-400 font-sans self-center">Quick Palettes:</span>
                {colorPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setColorPalette(preset)}
                    className="text-[11px] font-sans px-2.5 py-1 bg-[#F2ECE4] hover:bg-[#EAE3D9] text-stone-700 rounded transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Describe Idea */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                5. Describe Your Vision or Room Setting *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share your inspiration, the emotional mood you want to evoke, interior space characteristics (e.g., above living sofa, double-height entryway, lighting direction), and any special symbols or personalized elements..."
                value={conceptDescription}
                onChange={(e) => setConceptDescription(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24] leading-relaxed"
              />
            </div>

            {/* Step 5: Upload Reference Photographs */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                6. Reference Photographs & Wall Snapshots (Optional)
              </label>
              <div className="border-2 border-dashed border-[#E3DBD2] hover:border-[#C5A880] rounded-xl p-6 text-center bg-[#FAF8F5] transition-colors relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                  <Upload className="w-7 h-7 text-[#8C7A6B]" />
                  <p className="text-xs font-medium text-stone-700 font-sans">
                    Click or drag reference images, room interior photos, or moodboard visuals
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Supports JPG, PNG, WEBP (stored in local atelier record)
                  </p>
                </div>
              </div>

              {/* Uploaded Preview Strip */}
              {referenceImages.length > 0 && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {referenceImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E8E2D8] group">
                      <img src={img} alt="Reference Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeReferenceImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 6: Budget & Completion Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                  7. Approximate Budget (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-stone-400 font-serif text-sm">₹</span>
                  <input
                    type="text"
                    placeholder="e.g. ₹25,000 – ₹45,000"
                    value={approximateBudget}
                    onChange={(e) => setApproximateBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                  8. Target Completion Date
                </label>
                <input
                  type="date"
                  value={targetCompletionDate}
                  onChange={(e) => setTargetCompletionDate(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>
            </div>

            {/* Step 7: Client Contact Details */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2D8]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 font-sans">
                9. Your Contact Details *
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] text-stone-500 font-sans mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-sans mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 95861 20583"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-sans mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>
              </div>
            </div>

            {/* Notice explaining custom pricing and timelines are confirmed after review */}
            <div className="p-4 bg-[#F7F4EE] rounded-xl border border-[#EDE7DF] text-xs text-stone-600 font-sans space-y-1.5">
              <p className="font-semibold text-stone-800">
                Notice Regarding Bespoke Orders:
              </p>
              <p>
                Custom pricing and production timelines are confirmed after our artist reviews your exact dimensions and requirements. No payment is charged today. You will receive an official quotation and preliminary visual concept via WhatsApp and Email.
              </p>
              <p className="text-[11px] text-stone-500 pt-1 border-t border-[#E8E2D8]">
                For immediate consultations or urgent milestones, reach our studio directly on WhatsApp: <a href={VEORA_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#355B46] font-semibold underline">{VEORA_WHATSAPP_FORMATTED}</a> or Email: <a href={`mailto:${VEORA_CONTACT_EMAIL}`} className="text-[#355B46] font-semibold underline">{VEORA_CONTACT_EMAIL}</a>.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-sans font-medium text-sm tracking-wider uppercase rounded-md shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Custom Commission Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
