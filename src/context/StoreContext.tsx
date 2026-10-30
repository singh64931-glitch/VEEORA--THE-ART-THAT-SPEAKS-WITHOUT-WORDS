import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomArtworkInquiry, Review, Order, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_INQUIRIES, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  // Navigation & Views
  currentView: 'home' | 'catalog' | 'custom-studio' | 'reviews' | 'story' | 'admin';
  setCurrentView: (view: 'home' | 'catalog' | 'custom-studio' | 'reviews' | 'story' | 'admin') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  // Products CRUD
  products: Product[];
  addProduct: (newProd: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  togglePublishProduct: (id: string) => void;
  resetDefaultProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: (open: boolean) => void;

  // Checkout
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;

  // Inquiries (Custom Art Studio)
  inquiries: CustomArtworkInquiry[];
  submitInquiry: (inquiryData: Omit<CustomArtworkInquiry, 'id' | 'createdAt' | 'status'>) => CustomArtworkInquiry;
  updateInquiryStatus: (id: string, status: CustomArtworkInquiry['status']) => void;

  // Reviews
  reviews: Review[];
  submitReview: (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => void;
  toggleApproveReview: (id: string) => void;

  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['fulfillmentStatus']) => void;

  // Owner Authentication
  isOwnerAuthenticated: boolean;
  loginAsOwner: (passcode: string) => boolean;
  logoutOwner: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'custom-studio' | 'reviews' | 'story' | 'admin'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('veora_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veora_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('veora_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<CustomArtworkInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('veora_inquiries_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_INQUIRIES;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('veora_reviews_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_REVIEWS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('veora_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ORDERS;
  });

  // UI state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('veora_owner_session') === 'active';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist updates
  useEffect(() => {
    localStorage.setItem('veora_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('veora_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('veora_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('veora_inquiries_v1', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('veora_reviews_v1', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('veora_orders_v1', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3800);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Products CRUD
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>): Product => {
    const id = 'prod-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const product: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [product, ...prev]);
    showToast(`Artwork "${product.title}" published to catalog.`);
    return product;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(prev => (prev ? { ...prev, ...updated } : null));
    }
    showToast('Product details updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
    showToast('Product removed from catalog.');
  };

  const togglePublishProduct = (id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  };

  const resetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('veora_products_v1');
    showToast('Catalog restored to default 4 original creations.');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title}" to your shopping bag.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.price || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved creations.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your private wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const orderNumber = 'VEO-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: orderNumber,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['fulfillmentStatus']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, fulfillmentStatus: status } : o))
    );
    showToast(`Order ${orderId} status set to ${status}.`);
  };

  // Inquiries
  const submitInquiry = (inquiryData: Omit<CustomArtworkInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: CustomArtworkInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now().toString(36),
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Custom artwork request received. An artisan will connect within 24 hours.');
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: CustomArtworkInquiry['status']) => {
    setInquiries(prev => prev.map(inq => (inq.id === id ? { ...inq, status } : inq)));
    showToast(`Inquiry marked as ${status}.`);
  };

  // Reviews
  const submitReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      status: 'approved', // instant preview satisfaction
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you for sharing your collector review!');
  };

  const toggleApproveReview = (id: string) => {
    setReviews(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: r.status === 'approved' ? 'pending' : 'approved' } : r
      )
    );
  };

  // Owner authentication
  const loginAsOwner = (passcode: string): boolean => {
    // Default PIN: veora2026 or 1234
    if (passcode.trim() === 'veora2026' || passcode.trim() === '1234' || passcode.trim() === 'admin') {
      setIsOwnerAuthenticated(true);
      localStorage.setItem('veora_owner_session', 'active');
      showToast('Welcome to VÉORA Atelier Management.');
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
    localStorage.removeItem('veora_owner_session');
    if (currentView === 'admin') {
      setCurrentView('home');
    }
    showToast('Logged out of Atelier Management.');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        openProductModal,
        closeProductModal,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublishProduct,
        resetDefaultProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistModalOpen,
        setIsWishlistModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        createOrder,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        reviews,
        submitReview,
        toggleApproveReview,
        orders,
        updateOrderStatus,
        isOwnerAuthenticated,
        loginAsOwner,
        logoutOwner,
        isLoginModalOpen,
        setIsLoginModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const formatPrice = (price: number | null): string => {
  if (price === null || price === undefined) {
    return 'Price on request';
  }
  return '₹' + price.toLocaleString('en-IN');
};
