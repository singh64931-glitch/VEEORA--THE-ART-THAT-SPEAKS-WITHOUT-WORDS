import React, { useState } from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { Eye, Heart, ShoppingBag, Sparkles, Filter, ChevronRight } from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const {
    products,
    openProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeCollection, setActiveCollection] = useState<string>('All');

  // Categories list
  const categories: string[] = ['All', 'Canvas Paintings', 'Handmade Home Décor', '3D Texture Art'];
  const collections: string[] = ['All', 'VÉORA Originals', 'VÉORA Living'];

  // Filtered products (only published)
  const filteredProducts = products.filter((p) => {
    if (!p.isPublished) return false;
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeCollection !== 'All' && p.collection !== activeCollection) return false;
    return true;
  });

  return (
    <section id="creations-catalog" className="py-16 lg:py-24 bg-[#FBF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>The Initial Atelier Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C2E24] tracking-tight text-balance">
            Original Creations
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base font-light leading-relaxed">
            Each creation is individually handcrafted, bearing the authentic textural signature of the artist. Zero digital prints. Only genuine archival pieces.
          </p>
        </div>

        {/* Filter Bar (Zero-pill discipline: Clean segmented interactive buttons) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E8E2D8]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 p-1 bg-[#F2ECE4] rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#1C2E24] shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Collection Filter */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <span className="font-medium">Collection:</span>
            <div className="flex items-center gap-1">
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    activeCollection === col
                      ? 'text-[#1C2E24] font-semibold underline underline-offset-4 decoration-[#C5A880]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid (Generous whitespace, leads with original imagery) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E2D8] p-8">
            <p className="font-serif text-xl text-stone-700">No creations in this category yet.</p>
            <p className="text-stone-500 text-sm mt-1">Try selecting another category or check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const mainImage = product.images[0] || '';

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#E8E2D8] hover:border-[#C5A880]/60 hover:shadow-lg transition-all duration-300"
                >
                  {/* Artwork Image Container */}
                  <div className="relative aspect-[4/3] bg-[#F7F4EE] overflow-hidden cursor-pointer">
                    <img
                      src={mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onClick={() => openProductModal(product)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Ready to ship / Made to order unboxed subtle tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-sans tracking-wider font-semibold uppercase bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[#1C2E24] shadow-xs">
                        {product.isReadyToShip ? 'Ready to Ship' : 'Made to Order'}
                      </span>
                    </div>

                    {/* Wishlist Heart Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-stone-700 hover:text-[#8C3A27] transition-colors shadow-xs"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          inWishlist ? 'fill-[#8C3A27] text-[#8C3A27]' : 'stroke-[1.8]'
                        }`}
                      />
                    </button>

                    {/* Quick View Details Button on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={() => openProductModal(product)}
                        className="px-4 py-1.5 bg-white text-[#1C2E24] hover:bg-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded shadow flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Artwork</span>
                      </button>
                    </div>
                  </div>

                  {/* Artwork Info & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Category & Collection Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-[#8C7A6B] font-sans font-medium uppercase tracking-wider mb-1">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.collection}</span>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => openProductModal(product)}
                        className="font-serif text-xl font-medium text-[#1C2E24] hover:text-[#7A6142] transition-colors cursor-pointer leading-snug line-clamp-1"
                      >
                        {product.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-stone-500 text-xs font-sans line-clamp-2 mt-1.5 leading-relaxed font-light">
                        {product.shortDescription}
                      </p>

                      {/* Dimensions & Craft Medium */}
                      <div className="mt-2.5 pt-2.5 border-t border-[#F0EBE3] text-[11px] text-stone-500 font-sans flex items-center justify-between">
                        <span className="truncate">{product.dimensions}</span>
                      </div>
                    </div>

                    {/* Price & Primary Buy Controls */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#F0EBE3]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-400 font-sans uppercase tracking-wider">
                          Investment
                        </span>
                        <span className="font-serif text-lg font-semibold text-[#1C2E24] tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openProductModal(product)}
                          className="px-3 py-2 border border-[#E3DBD2] text-stone-700 hover:text-[#1C2E24] hover:bg-[#F8F5F0] text-xs font-medium rounded-md transition-colors"
                          title="View Details"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => addToCart(product)}
                          className="px-3.5 py-2 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] text-xs font-medium tracking-wide uppercase rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
