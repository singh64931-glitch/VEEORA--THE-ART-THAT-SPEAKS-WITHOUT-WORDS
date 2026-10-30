import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ArtisanStory } from './components/ArtisanStory';
import { TestimonialsChartbox } from './components/TestimonialsChartbox';
import { CustomArtStudio } from './components/CustomArtStudio';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OwnerLoginModal } from './components/OwnerLoginModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#E8DFC8] selection:text-[#1C2E24]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <CatalogSection />
            <ArtisanStory />
            <TestimonialsChartbox />
            <ContactSection />
          </>
        )}

        {currentView === 'catalog' && (
          <div className="pt-6">
            <CatalogSection />
          </div>
        )}

        {currentView === 'custom-studio' && <CustomArtStudio />}

        {currentView === 'reviews' && (
          <div className="pt-6">
            <TestimonialsChartbox />
          </div>
        )}

        {currentView === 'story' && (
          <div className="pt-6">
            <ArtisanStory />
          </div>
        )}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistModal />
      <CheckoutModal />
      <OwnerLoginModal />

      {/* Luxury Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp />

      {/* Luxury Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none">
          <div className="bg-[#1C2E24] text-[#E8DFC8] px-5 py-3.5 rounded-xl shadow-xl border border-[#2D4838] flex items-center gap-3 text-xs font-sans tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
