export type ProductCategory = 'Canvas Paintings' | 'Handmade Home Décor' | '3D Texture Art' | 'Custom Artwork';
export type ProductCollection = 'VÉORA Originals' | 'VÉORA Living';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  collection: ProductCollection;
  price: number | null; // null represents "Price on request"
  shortDescription: string;
  fullDescription: string;
  dimensions: string;
  materials: string;
  isReadyToShip: boolean;
  stockQuantity: number;
  dispatchTime: string;
  customizationAvailable: boolean;
  images: string[];
  isPublished: boolean;
  featured: boolean;
  createdAt: string;
}

export interface CustomArtworkInquiry {
  id: string;
  artType: 'Painting' | '3D Texture Art' | 'Decorative Gifting';
  dimensions: string;
  colorPalette: string;
  theme: string;
  conceptDescription: string;
  approximateBudget: string;
  targetCompletionDate: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  referenceImages: string[];
  status: 'New' | 'Under Review' | 'Quoted' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface Review {
  id: string;
  collectorName: string;
  location: string;
  artworkTitle: string;
  rating: number; // 1 to 5
  reviewText: string;
  verifiedCollector: boolean;
  roomPhoto?: string;
  metrics: {
    textureQuality: number; // e.g. 100%
    packagingSafety: number; // e.g. 100%
    artisanCare: number; // e.g. 100%
  };
  createdAt: string;
  status: 'approved' | 'pending';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 
  | 'cod' 
  | 'gpay' 
  | 'upi_qr' 
  | 'credit_card' 
  | 'debit_card' 
  | 'netbanking'
  | 'whatsapp';

export interface Order {
  id: string;
  items: {
    id: string;
    title: string;
    price: number | null;
    quantity: number;
    image: string;
    category: string;
  }[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Cash on Delivery';
  fulfillmentStatus: 'Received' | 'Packaging' | 'Shipped' | 'Delivered';
  trackingNumber?: string;
  utrNumber?: string;
  notes?: string;
  createdAt: string;
}
