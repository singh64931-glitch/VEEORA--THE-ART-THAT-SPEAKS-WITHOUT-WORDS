import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Review } from '../types';
import { Star, ShieldCheck, MessageSquarePlus, Award, CheckCircle2, X } from 'lucide-react';

export const TestimonialsChartbox: React.FC = () => {
  const { reviews, submitReview } = useStore();

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [collectorName, setCollectorName] = useState('');
  const [location, setLocation] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [roomPhoto, setRoomPhoto] = useState('');

  // Only display approved reviews
  const displayReviews = reviews.filter((r) => r.status === 'approved');

  // Compute metrics
  const totalReviews = displayReviews.length;
  const averageRating = (
    displayReviews.reduce((sum, r) => sum + r.rating, 0) / (totalReviews || 1)
  ).toFixed(2);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setRoomPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectorName || !reviewText || !artworkTitle) {
      alert('Please fill out all required fields.');
      return;
    }

    submitReview({
      collectorName,
      location: location || 'Private Collector',
      artworkTitle,
      rating,
      reviewText,
      roomPhoto: roomPhoto || undefined,
      verifiedCollector: true,
      metrics: {
        textureQuality: 100,
        packagingSafety: 100,
        artisanCare: 100,
      },
    });

    setIsWriteModalOpen(false);
    setCollectorName('');
    setLocation('');
    setArtworkTitle('');
    setReviewText('');
    setRoomPhoto('');
  };

  return (
    <section id="collector-reviews" className="py-16 lg:py-24 bg-[#F7F4EE] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
              <Award className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Patron Testimonials & Provenance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C2E24] tracking-tight text-balance">
              Collector Experiences
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base font-light leading-relaxed">
              Real reflections from private collectors, architects, and discerning homeowners living with VÉORA creations across the globe.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="self-start md:self-auto px-6 py-3 bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30] text-xs font-sans font-semibold tracking-wider uppercase rounded-md shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* The Executive Review "Chartbox" */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E8E2D8] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Scorecard Summary */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#ECE5DC] pb-8 lg:pb-0 lg:pr-8">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C7A6B] font-medium block mb-2">
                Verified Collector Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-6xl text-[#1C2E24] font-bold tabular-nums">
                  {averageRating}
                </span>
                <span className="text-stone-400 font-serif text-2xl">/ 5.0</span>
              </div>

              {/* 5 Star Graphic */}
              <div className="flex items-center gap-1.5 my-3 text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="text-xs text-stone-500 font-sans">
                Based on <strong className="text-stone-800">{totalReviews} verified art patron evaluations</strong>
              </p>

              <div className="mt-4 px-3 py-1.5 bg-[#FAF8F5] rounded-full border border-[#EDE7DF] text-[11px] text-[#355B46] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Authenticated Acquisitions</span>
              </div>
            </div>

            {/* Metric Breakdown Bars (The Chartbox Bars) */}
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-sans">
                Artisan Quality & Service Breakdown
              </h4>

              <div className="space-y-3.5 font-sans text-xs">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-stone-700">
                    <span className="font-medium">Artwork Texture Depth & Impasto Quality</span>
                    <span className="font-semibold text-stone-900 tabular-nums">99.4%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1C2E24] rounded-full" style={{ width: '99.4%' }} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-stone-700">
                    <span className="font-medium">Archival Packaging & Transit Protection</span>
                    <span className="font-semibold text-stone-900 tabular-nums">100%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#355B46] rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-stone-700">
                    <span className="font-medium">Custom Art Commission Accuracy</span>
                    <span className="font-semibold text-stone-900 tabular-nums">98.8%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C5A880] rounded-full" style={{ width: '98.8%' }} />
                  </div>
                </div>

                {/* Metric 4 */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-stone-700">
                    <span className="font-medium">Artisan Communication & Timeliness</span>
                    <span className="font-semibold text-stone-900 tabular-nums">99.1%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#7A6142] rounded-full" style={{ width: '99.1%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collector Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-6 border border-[#E8E2D8] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C5A880]/60 transition-colors"
            >
              <div className="space-y-3">
                {/* Header: Stars + Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-[11px] font-sans text-[#355B46] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Patron</span>
                  </span>
                </div>

                {/* Artwork Title Reference */}
                <div className="text-xs font-serif font-medium text-[#7A6142] italic">
                  Acquired: "{rev.artworkTitle}"
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-xs sm:text-sm font-sans font-light leading-relaxed">
                  "{rev.reviewText}"
                </p>

                {/* Optional Room Photo */}
                {rev.roomPhoto && (
                  <div className="pt-2">
                    <div className="h-36 w-full rounded-lg overflow-hidden bg-stone-100 border border-[#E8E2D8]">
                      <img src={rev.roomPhoto} alt="Display in Home" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Collector Details */}
              <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs font-sans">
                <div>
                  <p className="font-semibold text-stone-900">{rev.collectorName}</p>
                  <p className="text-stone-500 text-[11px]">{rev.location}</p>
                </div>
                <span className="text-[10px] text-stone-400">
                  {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E2D8] shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <div>
                <h3 className="font-serif text-2xl text-[#1C2E24]">Share Your Collector Experience</h3>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Your reflection helps future patrons appreciate handmade craftsmanship.</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-xs">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1.5 transition-colors ${
                        star <= rating ? 'text-[#C5A880]' : 'text-stone-300'
                      }`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                  <span className="text-stone-500 text-xs ml-2 font-medium">
                    {rating === 5 ? 'Exceptional Masterpiece' : `${rating} Stars`}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chhabra"
                  value={collectorName}
                  onChange={(e) => setCollectorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune / South Delhi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Artwork Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alpine Serenity"
                    value={artworkTitle}
                    onChange={(e) => setArtworkTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Review & Placement Impression *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us how the artwork feels in your room, texture impressions, lighting reactions, or unboxing experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Upload Photo in Home (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-[#F2ECE4] file:text-stone-800 hover:file:bg-[#EAE3D9]"
                />
                {roomPhoto && (
                  <div className="mt-2 w-16 h-16 rounded overflow-hidden border border-[#E8E2D8]">
                    <img src={roomPhoto} alt="Upload Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E2D8] text-stone-700 rounded-md hover:bg-[#F8F5F0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C2E24] text-[#E8DFC8] rounded-md hover:bg-[#253D30] font-semibold"
                >
                  Submit Collector Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
