import React, { useState } from 'react';
import { useStore, formatPrice } from '../context/StoreContext';
import { PaymentMethod, Order } from '../types';
import {
  VEORA_WHATSAPP_NUMBER,
  VEORA_WHATSAPP_FORMATTED,
  VEORA_WHATSAPP_URL,
  VEORA_CONTACT_EMAIL,
} from '../data/initialData';
import { X, CheckCircle2, QrCode, CreditCard, Banknote, Building2, Smartphone, MessageSquareQuote, ShieldCheck, Printer, ArrowRight, Truck, Mail } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartTotal,
    createOrder,
    clearCart,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gpay');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment specific fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [utrNumber, setUtrNumber] = useState('');
  const [gpayUpiId, setGpayUpiId] = useState('');

  // Processing & Completed Order
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutModalOpen) return null;

  const popularBanks = [
    'HDFC Bank',
    'State Bank of India',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
  ];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !address || !city || !pincode) {
      alert('Please fill out the shipping address and contact details.');
      return;
    }

    if (paymentMethod === 'upi_qr' && !utrNumber.trim()) {
      alert('Please enter your 12-digit UTR/Reference number after scanning the QR code with Google Pay.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || '',
        category: item.product.category,
      }));

      const newOrder = createOrder({
        items: orderItems,
        totalAmount: cartTotal,
        customerName,
        customerEmail: customerEmail || VEORA_CONTACT_EMAIL,
        customerPhone,
        address,
        city,
        state: state || 'India',
        pincode,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid',
        fulfillmentStatus: 'Received',
        trackingNumber: 'SHIP-VEO-' + Math.floor(10000 + Math.random() * 90000),
        utrNumber: utrNumber || (paymentMethod === 'gpay' ? `GPAY/${Date.now().toString().slice(-8)}` : undefined),
      });

      setIsProcessing(false);
      setCompletedOrder(newOrder);
    }, 1200);
  };

  const handleWhatsAppCheckout = () => {
    const itemsList = cart
      .map((item) => `• ${item.product.title} (x${item.quantity}) - ${formatPrice(item.product.price)}`)
      .join('\n');
    const msg = `*VÉORA Atelier Order Inquiry*\n\nCustomer: ${customerName || 'Art Patron'}\nPhone: ${customerPhone}\nDelivery City: ${city || 'India'}\n\n*Artworks:*\n${itemsList}\n\n*Total:* ${formatPrice(cartTotal)}\n\nPlease assist me with payment confirmation & dispatch details.`;
    window.open(`${VEORA_WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Generate real dynamic UPI string for QR Code
  // upi://pay?pa=veora.art@okaxis&pn=VEORA%20Fine%20Art&am=38500&cu=INR&tn=VEORA%20Order
  const upiPayString = `upi://pay?pa=veora.art@okaxis&pn=VEORA%20Fine%20Art&am=${cartTotal}&cu=INR&tn=VEORA%20Artwork%20Order`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(
    upiPayString
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FBF9F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#E8E2D8] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8E2D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#355B46]" />
            <h3 className="font-serif text-2xl text-[#1C2E24]">
              {completedOrder ? 'Order Confirmation' : 'VÉORA Secure Atelier Checkout'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsCheckoutModalOpen(false);
              setCompletedOrder(null);
            }}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2ECE4]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {completedOrder ? (
            /* Order Receipt Screen */
            <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
              <div className="w-16 h-16 bg-[#F2ECE4] text-[#1C2E24] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-[#355B46]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold">
                  Gratitude for Supporting Handmade Fine Art
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C2E24]">
                  Order #{completedOrder.id} Placed
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Tracking Reference: <span className="font-mono font-medium text-stone-800">{completedOrder.trackingNumber}</span>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white rounded-xl border border-[#E8E2D8] p-6 text-left space-y-4 text-xs font-sans">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-500">Payment Method:</span>
                  <span className="font-semibold text-stone-800 uppercase tracking-wider">
                    {completedOrder.paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : completedOrder.paymentMethod === 'gpay'
                      ? 'Google Pay (GPay Direct)'
                      : completedOrder.paymentMethod === 'upi_qr'
                      ? 'UPI QR Scanner (Connected to GPay)'
                      : completedOrder.paymentMethod === 'credit_card'
                      ? 'Credit Card'
                      : completedOrder.paymentMethod === 'debit_card'
                      ? 'Debit Card'
                      : 'Net Banking'}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-500">Recipient:</span>
                  <span className="font-medium text-stone-900">{completedOrder.customerName} ({completedOrder.customerPhone})</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-medium text-stone-900 text-right max-w-xs truncate">
                    {completedOrder.address}, {completedOrder.city}, {completedOrder.pincode}
                  </span>
                </div>

                {completedOrder.utrNumber && (
                  <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                    <span className="text-stone-500">Transaction / UTR:</span>
                    <span className="font-mono text-stone-900">{completedOrder.utrNumber}</span>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-2 pt-1">
                  <span className="text-stone-500 block">Artworks:</span>
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EDE7DF]">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="font-serif font-medium text-stone-800 text-sm">{item.title}</p>
                          <p className="text-[10px] text-stone-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-serif font-semibold text-stone-900 text-sm">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-stone-200 text-sm">
                  <span className="font-semibold text-stone-700">Total Investment:</span>
                  <span className="font-serif text-xl font-bold text-[#1C2E24] tabular-nums">
                    {formatPrice(completedOrder.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Transit Notice */}
              <div className="p-4 bg-[#F2ECE4] rounded-xl text-xs text-stone-600 font-sans flex items-center justify-between">
                <div className="flex items-center gap-2 text-left">
                  <Truck className="w-5 h-5 text-[#355B46] shrink-0" />
                  <span>Your artwork is being transferred to the atelier packaging studio for cushioned wooden crating.</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 border border-[#E3DBD2] bg-white text-stone-700 hover:bg-[#FAF8F5] text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setCompletedOrder(null);
                  }}
                  className="px-6 py-2.5 bg-[#1C2E24] text-[#E8DFC8] hover:bg-[#253D30] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  Back to Atelier
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form with Indian Payment Options */
            <form onSubmit={handlePlaceOrder} className="space-y-8 font-sans">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Shipping Address */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 pb-2 border-b border-[#E8E2D8]">
                    1. Shipping & Patron Details
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Singhal"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1">Mobile / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 95861 20583"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-600 mb-1">Delivery Street Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="House/Apartment, Street name, Landmark"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="Mumbai"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          placeholder="Maharashtra"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">Pincode *</label>
                        <input
                          type="text"
                          required
                          placeholder="400001"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Summary In Cart */}
                  <div className="pt-3">
                    <h5 className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Order Summary ({cart.length} creations)
                    </h5>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D8] space-y-2 text-xs">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-stone-700">
                          <span className="truncate max-w-[200px]">
                            {item.product.title} <span className="text-stone-400">×{item.quantity}</span>
                          </span>
                          <span className="font-serif tabular-nums">{formatPrice(item.product.price ? item.product.price * item.quantity : 0)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 border-t border-stone-100 font-semibold text-stone-900">
                        <span>Total Payable:</span>
                        <span className="font-serif text-base text-[#1C2E24] tabular-nums">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Payment Method Selector */}
                <div className="lg:col-span-6 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 pb-2 border-b border-[#E8E2D8]">
                    2. Select Payment Option
                  </h4>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'gpay', label: 'Google Pay', icon: Smartphone, subtitle: 'GPay Instant' },
                      { id: 'upi_qr', label: 'UPI Scanner', icon: QrCode, subtitle: 'Scan with GPay' },
                      { id: 'credit_card', label: 'Credit Card', icon: CreditCard, subtitle: 'Visa / MC / RuPay' },
                      { id: 'debit_card', label: 'Debit Card', icon: CreditCard, subtitle: 'All Indian Banks' },
                      { id: 'netbanking', label: 'Net Banking', icon: Building2, subtitle: 'Major Banks' },
                      { id: 'cod', label: 'Cash on Delivery', icon: Banknote, subtitle: 'Pay on Arrival' },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = paymentMethod === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id as PaymentMethod)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                            isSelected
                              ? 'border-[#1C2E24] bg-[#F7F4EE] shadow-xs'
                              : 'border-[#E8E2D8] bg-white hover:border-stone-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#1C2E24]' : 'text-stone-400'}`} />
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#1C2E24]" />}
                          </div>
                          <div>
                            <p className="font-serif font-semibold text-stone-900 text-xs">{opt.label}</p>
                            <p className="text-[10px] text-stone-500 font-sans">{opt.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Payment Option Details Area */}
                  <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] text-xs space-y-4">
                    {/* 1. GPAY */}
                    {paymentMethod === 'gpay' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">
                          <Smartphone className="w-4 h-4 text-[#1C2E24]" />
                          <span>Google Pay (GPay Direct)</span>
                        </div>
                        <p className="text-stone-500 leading-relaxed font-light">
                          Seamlessly complete payment using your Google Pay account. Enter your UPI ID or proceed with instant authorization for <strong className="text-stone-800 font-serif tabular-nums">{formatPrice(cartTotal)}</strong>.
                        </p>
                        <div>
                          <label className="block text-stone-600 mb-1">Your Google Pay UPI ID (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. mobile@okaxis or name@oksbi"
                            value={gpayUpiId}
                            onChange={(e) => setGpayUpiId(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                          />
                        </div>
                        <div className="p-3 bg-[#F2ECE4] rounded-lg text-[11px] text-[#355B46] flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>Encrypted via NPCI UPI Gateway Standards</span>
                        </div>
                      </div>
                    )}

                    {/* 2. SCANNER CONNECTED TO GPAY */}
                    {paymentMethod === 'upi_qr' && (
                      <div className="space-y-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-stone-800 font-semibold">
                          <QrCode className="w-4 h-4 text-[#1C2E24]" />
                          <span>Scan QR Code with Google Pay or any UPI App</span>
                        </div>

                        <div className="bg-white p-3 border border-[#E8E2D8] rounded-xl inline-block shadow-xs">
                          <img
                            src={qrCodeUrl}
                            alt="Scan with Google Pay QR"
                            className="w-44 h-44 mx-auto object-contain"
                          />
                          <p className="text-[10px] text-stone-500 mt-1 font-mono">veora.art@okaxis</p>
                        </div>

                        <div className="text-stone-600 text-xs max-w-sm mx-auto space-y-1">
                          <p>
                            1. Open <strong>Google Pay</strong> on your smartphone.
                          </p>
                          <p>
                            2. Tap <strong>Scan QR</strong> and point camera at the code above.
                          </p>
                          <p>
                            3. Pay <strong className="text-[#1C2E24] font-serif tabular-nums">{formatPrice(cartTotal)}</strong> and enter the 12-digit UTR/Ref number below:
                          </p>
                        </div>

                        <div className="text-left max-w-sm mx-auto">
                          <label className="block text-stone-700 font-semibold mb-1">Enter 12-digit UPI UTR / Ref No. *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 430192847192"
                            value={utrNumber}
                            onChange={(e) => setUtrNumber(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 3. CREDIT CARD */}
                    {paymentMethod === 'credit_card' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">
                          <CreditCard className="w-4 h-4 text-[#1C2E24]" />
                          <span>Credit Card (Visa, Mastercard, RuPay, Amex)</span>
                        </div>

                        <div>
                          <label className="block text-stone-600 mb-1">Card Number *</label>
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4532 •••• •••• 8842"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 mb-1">Expiry (MM/YY) *</label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">CVV / CVC *</label>
                            <input
                              type="password"
                              maxLength={4}
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 mb-1">Name on Card *</label>
                          <input
                            type="text"
                            placeholder="e.g. Radhika Singhal"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* 4. DEBIT CARD */}
                    {paymentMethod === 'debit_card' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">
                          <CreditCard className="w-4 h-4 text-[#1C2E24]" />
                          <span>Debit Card (All Major Indian Banks)</span>
                        </div>

                        <div>
                          <label className="block text-stone-600 mb-1">Debit Card Number *</label>
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="6071 •••• •••• 1290"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 mb-1">Valid Thru *</label>
                            <input
                              type="text"
                              maxLength={5}
                              placeholder="08/29"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 mb-1">CVV *</label>
                            <input
                              type="password"
                              maxLength={3}
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm font-mono focus:border-[#1C2E24] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. NET BANKING */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">
                          <Building2 className="w-4 h-4 text-[#1C2E24]" />
                          <span>Net Banking (Direct Bank Transfer)</span>
                        </div>
                        <p className="text-stone-500 font-light">
                          Select your bank for direct secure net banking authorization:
                        </p>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg text-sm focus:border-[#1C2E24] outline-none"
                        >
                          {popularBanks.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* 6. CASH ON DELIVERY (COD) */}
                    {paymentMethod === 'cod' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-800 font-semibold">
                          <Banknote className="w-4 h-4 text-[#1C2E24]" />
                          <span>Cash on Delivery (COD)</span>
                        </div>
                        <p className="text-stone-600 leading-relaxed font-light">
                          Pay directly in cash or UPI to the courier upon delivery at your doorstep. Please ensure recipient is available with valid ID.
                        </p>
                        <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EDE7DF] text-[11px] text-stone-600">
                          Total amount of <strong className="font-serif font-bold text-stone-900">{formatPrice(cartTotal)}</strong> will be collected upon handover of the insured wooden artwork crate.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions: Place Order + WhatsApp Concierge Option */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 bg-[#1C2E24] hover:bg-[#253D30] text-[#E8DFC8] font-sans font-semibold text-xs tracking-wider uppercase rounded-md shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Securing Atelier Order...</span>
                      ) : (
                        <>
                          <span>Confirm Order ({formatPrice(cartTotal)})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-2.5 border border-[#C5A880] text-[#7A6142] hover:bg-[#F2ECE4] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquareQuote className="w-4 h-4 text-[#25D366]" />
                      <span>Order Directly via WhatsApp Concierge</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
