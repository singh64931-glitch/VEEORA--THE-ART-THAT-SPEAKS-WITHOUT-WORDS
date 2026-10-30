import React, { useState } from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { Product, ProductCategory, ProductCollection, Order, CustomArtworkInquiry } from '../types';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ShoppingBag,
  MessageSquare,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Upload,
  X,
  ExternalLink,
  RotateCcw,
  LogOut,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    togglePublishProduct,
    resetDefaultProducts,
    inquiries,
    updateInquiryStatus,
    orders,
    updateOrderStatus,
    reviews,
    toggleApproveReview,
    logoutOwner,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'orders' | 'reviews' | 'collective'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for Add / Edit Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Canvas Paintings');
  const [collection, setCollection] = useState<ProductCollection>('VÉORA Originals');
  const [price, setPrice] = useState<string>(''); // string for easy editing, null for "Price on request"
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [materials, setMaterials] = useState('');
  const [isReadyToShip, setIsReadyToShip] = useState(true);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [dispatchTime, setDispatchTime] = useState('3–5 business days');
  const [customizationAvailable, setCustomizationAvailable] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setTitle('');
    setCategory('Canvas Paintings');
    setCollection('VÉORA Originals');
    setPrice('');
    setShortDescription('');
    setFullDescription('');
    setDimensions('30" × 40" (76 × 102 cm)');
    setMaterials('Fine artist oils and pigments on stretched Belgian linen');
    setIsReadyToShip(true);
    setStockQuantity(1);
    setDispatchTime('3–5 business days');
    setCustomizationAvailable(true);
    setImages([]);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setTitle(prod.title);
    setCategory(prod.category);
    setCollection(prod.collection);
    setPrice(prod.price !== null ? String(prod.price) : '');
    setShortDescription(prod.shortDescription);
    setFullDescription(prod.fullDescription);
    setDimensions(prod.dimensions);
    setMaterials(prod.materials);
    setIsReadyToShip(prod.isReadyToShip);
    setStockQuantity(prod.stockQuantity);
    setDispatchTime(prod.dispatchTime);
    setCustomizationAvailable(prod.customizationAvailable);
    setImages(prod.images);
    setIsProductModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Product title is required.');
      return;
    }

    const finalPrice = price.trim() === '' ? null : Number(price);

    // Fallback image if owner didn't provide one
    const finalImages = images.length > 0 ? images : ['/src/assets/images/alpine_serenity_painting_1793382044156.jpg'];

    if (editingProductId) {
      updateProduct(editingProductId, {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        collection,
        price: finalPrice,
        shortDescription,
        fullDescription,
        dimensions,
        materials,
        isReadyToShip,
        stockQuantity: Number(stockQuantity),
        dispatchTime,
        customizationAvailable,
        images: finalImages,
      });
    } else {
      addProduct({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        collection,
        price: finalPrice,
        shortDescription,
        fullDescription,
        dimensions,
        materials,
        isReadyToShip,
        stockQuantity: Number(stockQuantity),
        dispatchTime,
        customizationAvailable,
        images: finalImages,
        isPublished: true,
        featured: false,
      });
    }

    setIsProductModalOpen(false);
  };

  // Filter products for inventory table
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Atelier Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E2D8] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A6142] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#355B46]" />
              <span>VÉORA Atelier Management Suite</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2E24] mt-1">
              Owner Studio Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('catalog')}
              className="px-4 py-2 border border-[#E3DBD2] bg-white text-stone-700 hover:bg-[#FAF8F5] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </button>
            <button
              onClick={logoutOwner}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D8] pb-4">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#1C2E24] text-[#E8DFC8] font-semibold shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#1C2E24] text-[#E8DFC8] font-semibold shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Custom Commissions ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#1C2E24] text-[#E8DFC8] font-semibold shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders Ledger ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-[#1C2E24] text-[#E8DFC8] font-semibold shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Collector Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collective')}
            className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'collective'
                ? 'bg-[#1C2E24] text-[#E8DFC8] font-semibold shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8E2D8]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>VÉORA Collective (Future Expansion)</span>
          </button>
        </div>

        {/* Tab 1: Product Inventory */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search artworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-[#E8E2D8] rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#1C2E24] w-56"
                  />
                </div>

                {/* Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#E8E2D8] rounded-lg text-xs text-stone-700 focus:outline-none focus:border-[#1C2E24]"
                >
                  <option value="All">All Categories</option>
                  <option value="Canvas Paintings">Canvas Paintings</option>
                  <option value="Handmade Home Décor">Handmade Home Décor</option>
                  <option value="3D Texture Art">3D Texture Art</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetDefaultProducts}
                  className="px-3 py-2 border border-[#E8E2D8] text-stone-600 hover:bg-stone-100 text-xs rounded-md transition-colors flex items-center gap-1.5"
                  title="Reset to default 4 original paintings"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore 4 Originals</span>
                </button>

                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Artwork</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-[#E8E2D8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E8E2D8] text-stone-600 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Artwork & Photo</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Dimensions</th>
                      <th className="py-3.5 px-4 font-semibold">Price</th>
                      <th className="py-3.5 px-4 font-semibold">Stock / Type</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE4]">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                            />
                            <div>
                              <p className="font-serif font-semibold text-stone-900 text-sm">{prod.title}</p>
                              <p className="text-[11px] text-stone-500 font-sans line-clamp-1">{prod.collection}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-stone-700">{prod.category}</td>

                        <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">{prod.dimensions}</td>

                        <td className="py-3 px-4 font-serif font-semibold text-stone-900 tabular-nums text-sm">
                          {formatPrice(prod.price)}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${prod.isReadyToShip ? 'text-[#355B46]' : 'text-[#8C5E27]'}`}>
                              {prod.isReadyToShip ? 'Ready to Ship' : 'Made to Order'}
                            </span>
                            <span className="text-stone-500 text-[11px]">{prod.stockQuantity} in stock</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => togglePublishProduct(prod.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
                              prod.isPublished
                                ? 'bg-[#EBF3ED] text-[#245233]'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {prod.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{prod.isPublished ? 'Published' : 'Hidden'}</span>
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove "${prod.title}" from catalog?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-[#8C3A27] hover:bg-stone-100 rounded transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Commissions Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-serif text-2xl text-[#1C2E24]">Custom Artwork Commission Requests</h3>
              <span className="text-xs text-stone-500 font-sans">{inquiries.length} requests in atelier log</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-6 rounded-xl border border-[#E8E2D8] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2ECE4]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-semibold text-lg text-[#1C2E24]">{inq.clientName}</span>
                        <span className="text-xs text-stone-500">({inq.clientPhone} · {inq.clientEmail})</span>
                      </div>
                      <span className="text-xs text-stone-500 font-mono">Ref ID: {inq.id} · {new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-500">Status:</span>
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as CustomArtworkInquiry['status'])}
                        className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E2D8] rounded text-xs font-medium text-stone-800"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EDE7DF]">
                    <div>
                      <span className="text-stone-400 block">Art Type & Scale:</span>
                      <span className="font-semibold text-stone-800">{inq.artType} · {inq.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Color Palette:</span>
                      <span className="font-semibold text-stone-800">{inq.colorPalette}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Budget & Target Date:</span>
                      <span className="font-semibold text-stone-800">{inq.approximateBudget} · {inq.targetCompletionDate}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[11px] font-semibold text-stone-600 uppercase mb-1">Concept Description:</h5>
                    <p className="text-stone-700 text-xs leading-relaxed font-light">{inq.conceptDescription}</p>
                  </div>

                  {inq.referenceImages.length > 0 && (
                    <div>
                      <h5 className="text-[11px] font-semibold text-stone-600 uppercase mb-1">Uploaded Reference Images:</h5>
                      <div className="flex gap-2 overflow-x-auto">
                        {inq.referenceImages.map((img, i) => (
                          <img key={i} src={img} alt="Client Ref" className="w-16 h-16 rounded object-cover border border-[#E8E2D8]" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Orders Ledger */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-serif text-2xl text-[#1C2E24]">Customer Orders Ledger</h3>
              <span className="text-xs text-stone-500 font-sans">{orders.length} total orders</span>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white p-6 rounded-xl border border-[#E8E2D8] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2ECE4]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-base text-[#1C2E24]">#{ord.id}</span>
                        <span className="text-xs text-stone-500">· {new Date(ord.createdAt).toLocaleDateString()}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-stone-100 font-semibold uppercase tracking-wider">
                          {ord.paymentMethod.toUpperCase()} ({ord.paymentStatus})
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        Recipient: <strong>{ord.customerName}</strong> ({ord.customerPhone}) · {ord.address}, {ord.city}, {ord.pincode}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-500">Fulfillment:</span>
                      <select
                        value={ord.fulfillmentStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['fulfillmentStatus'])}
                        className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E2D8] rounded text-xs font-medium text-stone-800"
                      >
                        <option value="Received">Received</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EDE7DF]">
                        <div className="flex items-center gap-2.5">
                          <img src={it.image} alt={it.title} className="w-10 h-10 object-cover rounded" />
                          <div>
                            <span className="font-serif font-medium text-stone-900">{it.title}</span>
                            <span className="text-stone-400 block text-[10px]">Qty: {it.quantity}</span>
                          </div>
                        </div>
                        <span className="font-serif font-semibold text-stone-900 tabular-nums">
                          {formatPrice(it.price ? it.price * it.quantity : 0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 text-xs">
                    <span className="text-stone-500">
                      Tracking Ref: <span className="font-mono text-stone-800">{ord.trackingNumber || 'Awaiting Dispatch'}</span>
                    </span>
                    <span className="font-serif text-base font-bold text-[#1C2E24] tabular-nums">
                      Total: {formatPrice(ord.totalAmount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-serif text-2xl text-[#1C2E24]">Collector Reviews Moderation</h3>
              <span className="text-xs text-stone-500 font-sans">{reviews.length} reviews</span>
            </div>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-xl border border-[#E8E2D8] flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-900">{rev.collectorName}</span>
                      <span className="text-stone-400">({rev.location})</span>
                      <span className="text-[#C5A880] font-bold">★ {rev.rating}/5</span>
                    </div>
                    <p className="font-serif italic text-stone-600">"{rev.artworkTitle}"</p>
                    <p className="text-stone-600 font-light">"{rev.reviewText}"</p>
                  </div>

                  <button
                    onClick={() => toggleApproveReview(rev.id)}
                    className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors shrink-0 ${
                      rev.status === 'approved'
                        ? 'bg-[#EBF3ED] text-[#245233]'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {rev.status === 'approved' ? 'Visible on Store' : 'Pending / Hidden'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: VÉORA Collective Future Architecture */}
        {activeTab === 'collective' && (
          <div className="bg-white p-8 rounded-2xl border border-[#E8E2D8] space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6142] font-semibold">
              <Users className="w-4 h-4" />
              <span>Future Expansion Architecture</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1C2E24]">VÉORA Collective (Multi-Artist Studio)</h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans font-light max-w-2xl">
              As planned in Section 9 of the specifications, the database schema and routing architecture are prepared for independent master artisans to apply, submit portfolio canvases, and retail through VÉORA once you choose to activate it. In this primary version, the storefront remains exclusively dedicated to your original handcrafted atelier creations.
            </p>
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE7DF] text-xs text-stone-600 space-y-2">
              <p className="font-semibold text-stone-800">Prepared Data Contracts:</p>
              <ul className="list-disc list-inside space-y-1 text-stone-500 font-mono text-[11px]">
                <li>/artists/{'{artistId}'} profile, bio, atelier verification status</li>
                <li>/collective/commissions vendor payout ledger</li>
                <li>Multi-vendor shipping consolidation via Shiprocket API</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E2D8] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <h3 className="font-serif text-2xl text-[#1C2E24]">
                {editingProductId ? 'Edit Artwork Details' : 'Add New Handcrafted Artwork'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs font-sans">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Artwork Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Horizon Dunes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  >
                    <option value="Canvas Paintings">Canvas Paintings</option>
                    <option value="Handmade Home Décor">Handmade Home Décor</option>
                    <option value="3D Texture Art">3D Texture Art</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Collection *</label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value as ProductCollection)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  >
                    <option value="VÉORA Originals">VÉORA Originals</option>
                    <option value="VÉORA Living">VÉORA Living</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Price (₹) <span className="text-stone-400 font-normal">(Leave blank for "Price on request")</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 42000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Dimensions *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 36&quot; × 48&quot; (91 × 122 cm)"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Materials & Medium *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavy-body oil and 24K gold leaf on Belgian linen"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Stock Availability *</label>
                  <input
                    type="number"
                    min={0}
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Fulfillment Mode</label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={isReadyToShip}
                        onChange={() => setIsReadyToShip(true)}
                      />
                      <span>Ready to Ship</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={!isReadyToShip}
                        onChange={() => setIsReadyToShip(false)}
                      />
                      <span>Made to Order</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Short Description (Card view)</label>
                <input
                  type="text"
                  placeholder="Brief 1-sentence poetic summary"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Artistic Narrative (Details view)</label>
                <textarea
                  rows={3}
                  placeholder="Detailed background, artistic intent, texture highlights..."
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#1C2E24]"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-2">
                <label className="block text-stone-700 font-semibold mb-1">
                  Upload Product Photographs (Multiple Supported)
                </label>
                <div className="border border-dashed border-[#D6CBBF] rounded-xl p-4 text-center bg-[#FAF8F5] relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center pointer-events-none space-y-1">
                    <Upload className="w-5 h-5 text-stone-500" />
                    <span className="text-stone-700 font-medium">Click or drag photos of your artwork</span>
                    <span className="text-[10px] text-stone-400">Stores directly to atelier state</span>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded border border-stone-200 overflow-hidden group">
                        <img src={img} alt="Product view" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-[#E8E2D8] text-stone-700 rounded-md hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1C2E24] text-[#E8DFC8] rounded-md hover:bg-[#253D30] font-semibold uppercase tracking-wider"
                >
                  {editingProductId ? 'Save Artwork Changes' : 'Publish Artwork to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
