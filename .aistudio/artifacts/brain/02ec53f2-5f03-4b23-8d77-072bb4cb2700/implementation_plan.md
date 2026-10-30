# VÉORA — Luxury Handmade Art & Living Creations

A responsive, boutique e-commerce web application and management platform for VÉORA, delivering an artistic shopping experience for original canvas paintings, 3D texture art, and handcrafted decor, paired with an Indian luxury checkout suite (COD, GPay, QR Scanner, Cards, Net Banking), a custom commission studio, customer testimonial chartbox, and an owner-controlled inventory and order dashboard.

## User Review & Critical Decisions

> [!IMPORTANT]
> The implementation plan has been updated with your full payment specifications:
> 
> - **Comprehensive Indian Payment Suite**:
>   1. **Cash on Delivery (COD)**: With customer address verification, delivery threshold details, and order receipt.
>   2. **Google Pay (GPay / UPI)**: Direct Google Pay / UPI flow with instant payment simulation.
>   3. **Interactive QR Scanner connected to GPay**: Live dynamic UPI QR code linked to the order total and VÉORA's merchant UPI identifier, allowing patrons to scan directly using Google Pay, PhonePe, or any UPI app, with payment reference (UTR) verification.
>   4. **Credit Card**: Visa, Mastercard, RuPay, and American Express gateway simulation.
>   5. **Debit Card**: Major Indian bank debit card processing with secure mock OTP verification.
>   6. **Net Banking**: Direct bank selection across all major institutions (HDFC, ICICI, SBI, Axis, Kotak, PNB, etc.).
>   7. **WhatsApp Concierge Order**: Direct automated WhatsApp message builder for personalized artisan interaction.
> - **Official Brand Logo**: The uploaded emblem (`/assets/aistudio/VEEORA__Artful_Elegance_in_Green_and_Gold_b9b7457a.png`) in the Top Navigation Bar, Hero brand presence, and Footer mark.
> - **Collector Testimonial & Review Chartbox**: Metrics breakdown bars (Quality, Packaging, Craft, Dispatch), verified collector reviews, and interactive "Share Your Collector Experience" submission modal.
> - **The 4 Original Creations Catalogue**: *Alpine Serenity*, *Whispering Falls*, *Dotted Expressions*, and *Tranquil Grace*, with dynamic owner addition and edit capabilities.
> - **Owner Admin Access**: Protected with quick PIN access (`veora2026`) and comprehensive catalog, order, and inquiry controls.

---

## 1. Overview & Core Concept

- **What It Does**: VÉORA is an atelier storefront for original handmade canvas paintings, 3D textured creations, and artisan living decor. Patrons can browse curated collections, inspect canvas textures via high-definition loupe zoom, commission bespoke artworks through the "Create with VÉORA" studio, read verified collector testimonials with visual review metrics, and checkout with a full array of Indian payment options (COD, GPay, UPI QR Scanner, Credit/Debit Cards, Net Banking).
- **Brand Identity**: Features the official hand-crafted emblem: a gold-leaf paintbrush curving into a serene silhouette, paired with deep emerald green and warm champagne-gold lettering.
- **Key Value**: Merges artisanal intimacy with luxury boutique e-commerce standards—providing transparent craft provenance, frictionless local Indian payment methods, and an effortless zero-code management suite for the artist.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Brand Entrance & Atelier Navigation**:
   - Top Bar: Official VÉORA emerald & gold emblem on the left, flanked by clean single-line navigation links (*Creations*, *Artisan Story*, *Custom Studio*, *Collector Reviews*, *Why VÉORA*) and utility actions (Wishlist count, Shopping Bag trigger with badge, and Atelier Admin lock).
   - Hero Section: Editorial typography paired with the brand motto: *"Art that speaks without words"*, surrounded by warm alabaster linen texture, with direct CTAs to *Explore Collection* and *Create Custom Art*.

2. **The 4 Original Creations Showcase & Category Filter**:
   - Filterable tabs: *All Creations*, *Canvas Paintings*, *Handmade Home Décor*.
   - The four initial products:
     1. **Alpine Serenity** — Snowy alpine peaks, lake, cottages, and meadow blooms (Canvas Painting, VÉORA Originals).
     2. **Whispering Falls** — Forest landscape, waterfall cascade, stream, deer, and ancient trees (Canvas Painting, VÉORA Originals).
     3. **Dotted Expressions** — Hand-painted decorative bottles including the intricate black dot-art mandala piece (Handmade Home Décor, VÉORA Living).
     4. **Tranquil Grace** — Spiritual peaceful face portrait, swans, and delicate gold branches (Canvas Painting, VÉORA Originals).
   - Each card displays price (or "Price on Request"), medium, ready-to-ship status, and instant action triggers.

3. **Interactive Artwork Detail (PDP) with Loupe Zoom**:
   - High-magnification image viewer enabling patrons to inspect impasto strokes, paint thickness, and gold leaf detailing.
   - Comprehensive provenance: medium, dimensions, framing status, dispatch time, and Certificate of Authenticity badge.
   - Contiguous buy module: *Add to Bag*, *Wishlist*, and *WhatsApp Inquire*.

4. **Multi-Method Indian Checkout Suite**:
   - Seamless slide-over cart drawer opening into an all-in-one luxury Checkout Modal:
     - **Delivery Information**: Customer name, phone, email, delivery address, city, state, and pincode.
     - **Payment Option Tabs**:
       - 💵 **Cash on Delivery (COD)**: Available for immediate order placement with delivery pin verification.
       - ⚡ **Google Pay (GPay)**: One-tap GPay button with instant verification.
       - 📱 **UPI QR Scanner (Connected to GPay)**: Generates a real scannable UPI QR code encoded with the order amount and VÉORA payee details; user scans with Google Pay or any UPI app on their phone and enters their 12-digit UTR/transaction number.
       - 💳 **Credit Card**: Visa, Mastercard, RuPay, and Amex input fields (Card number, Cardholder name, Expiry, CVV).
       - 💳 **Debit Card**: Major Indian bank debit card flow with simulated OTP authorization.
       - 🏛️ **Net Banking**: Grid selector of leading Indian banks (HDFC Bank, State Bank of India, ICICI Bank, Axis Bank, Kotak Mahindra, Punjab National Bank, Bank of Baroda).
       - 💬 **WhatsApp Concierge**: Instant one-click redirect to WhatsApp with order summary pre-filled.
     - **Order Confirmation Receipt**: Displays order ID, estimated delivery dates, tracking timeline, and downloadable/printable order summary.

5. **Collector Testimonial & Review Chartbox**:
   - **Executive Rating Chartbox**:
     - Overall satisfaction score (4.96/5 based on verified collectors).
     - Visual breakdown bars:
       - *Artwork Texture & Depth: 99%*
       - *Archival Packaging & Safety: 100%*
       - *Bespoke Customization Precision: 98%*
       - *Artisan Communication: 99%*
   - **Collector Stories Grid**: Cards featuring testimonials from patrons across Mumbai, Delhi, Bangalore, Dubai, and London.
   - **Interactive "Write a Review" Modal**: Form with star rating, customer name, location, artwork owned, comment, and room placement photo upload simulation.

6. **"Create with VÉORA" — Custom Art Studio**:
   - Step-by-step bespoke commission builder: art type, room dimensions, palette selection, concept description, reference file upload, budget range, and target date.
   - Quotation disclaimer detailing artisan consultation and custom mockup generation.

7. **Owner Admin Dashboard**:
   - Product Management: Add, edit, delete, toggle *Ready to Ship* vs. *Made to Order*, update prices, and upload new photos.
   - Commission Inquiries Desk: Track client requests, change status (*New*, *Quoted*, *In Progress*), and view reference details.
   - Testimonial Moderation: Approve or feature incoming collector reviews.
   - Orders Ledger: Order fulfillment status, customer addresses, payment method used, and tracking IDs.

---

## 3. Visual Identity & Theme Tokens

- **Emblem**: Official VÉORA emerald green, antique gold, and silhouette paintbrush mark (`/assets/aistudio/VEEORA__Artful_Elegance_in_Green_and_Gold_b9b7457a.png`).
- **Color Distribution (60-30-10)**:
  - Neutral Canvas (60%): Warm Ivory / Alabaster (`#FBF9F5` / `#F8F6F0`) and Crisp Gallery White (`#FFFFFF`).
  - Structural Surfaces (30%): Soft Limestone (`#F2ECE4`), Hairline Sand Dividers (`#E5DFD5`), Charcoal Ink (`#1C1917`), and Muted Olive/Pewter (`#6B7280`).
  - Accent Budget (10%): Antique Champagne Gold (`#C5A880` / `#B38F5B`) and Atelier Emerald Ink (`#16382C` matching the logo).
- **Typography**:
  - Headings & Titles: High-contrast luxury serif (`Playfair Display` or `Cormorant Garamond`).
  - Body & Form Controls: Modern geometric sans (`Plus Jakarta Sans`).
  - Figures & Metrics: Tabular numerals (`tabular-nums`) for prices (₹), dimensions, and chartbox stats.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VÉORA LUXURY ATELIER APP                        │
│                                                                        │
│  ┌──────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
│  │ Official Brand Logo  │  │ Navigation Links   │  │ Bag & Wishlist │  │
│  │ (Emerald & Gold PNG) │  │ • Collections      │  │ • Counter      │  │
│  │                      │  │ • Custom Studio    │  │ • Slide Drawer │  │
│  │                      │  │ • Reviews Chartbox │  │ • Direct Buy   │  │
│  └──────────┬───────────┘  └─────────┬──────────┘  └───────┬────────┘  │
└─────────────┼────────────────────────┼─────────────────────┼───────────┘
              │                        │                     │
              ▼                        ▼                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                             PRIMARY VIEWS                              │
│                                                                        │
│  ┌──────────────────────┐  ┌────────────────────┐  ┌────────────────┐  │
│  │ Storefront Home      │  │ Custom Art Studio  │  │ Testimonials   │  │
│  │ • Hero Banner        │  │ • Bespoke Wizard   │  │   Chartbox     │  │
│  │ • The 4 Originals    │  │ • Dimension/Theme  │  │ • Metrics Bar  │  │
│  │ • Artisan Story      │  │ • Upload Reference │  │ • Review Cards │  │
│  │ • Detail Loupe PDP   │  │ • Quote Request    │  │ • Submit Modal │  │
│  └──────────────────────┘  └────────────────────┘  └────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Indian Payment Checkout Suite                                    │  │
│  │ • COD • GPay • UPI QR Scanner • Credit/Debit Cards • Net Banking │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Owner Admin Dashboard                                            │  │
│  │ • Inventory CRUD & Image Uploader • Custom Commission Desk       │  │
│  │ • Orders Ledger & Status Dispatch • Review Moderation            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 PERSISTENT REACTIVE STATE ENGINE                       │
│                                                                        │
│  • Products State (Seeded 4 items + Admin creations)                  │
│  • Cart & Wishlist State (Local persistence)                           │
│  • Inquiries State (Custom commission requests)                        │
│  • Reviews State (Curated ratings + submitted collector reviews)       │
│  • Orders State (COD, GPay, QR, Card, Net Banking payments captured)   │
│  • Ready for Firestore Cloud Sync when provisioned                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Execution Steps Upon Approval

1. **Verify & Integrate Brand Assets**:
   - Embed `/public/assets/aistudio/VEEORA__Artful_Elegance_in_Green_and_Gold_b9b7457a.png` as the main logo in Top Bar, Hero mark, and Footer.
   - Prepare high-fidelity photographic artwork representations for the 4 products (*Alpine Serenity*, *Whispering Falls*, *Dotted Expressions*, and *Tranquil Grace*).
2. **State & Storage Core**:
   - Seed products, testimonials, cart, and commission inquiry handlers.
3. **Storefront & Review Chartbox Implementation**:
   - Header with Logo, Navigation, and Action Buttons.
   - Hero Section, Catalog Grid, and Loupe Zoom PDP.
   - Testimonial Chartbox with satisfaction scores, metric breakdown bars, and interactive review modal.
   - "Create with VÉORA" Custom Art Studio with image upload.
   - Artisan Story and Brand Values.
4. **Complete Indian Payment & Checkout Flow**:
   - Build dedicated checkout drawer / modal supporting:
     - Cash on Delivery (COD)
     - Google Pay (GPay)
     - UPI QR Scanner (linked to GPay/UPI with live QR graphic & UTR entry)
     - Credit Card (Visa/Mastercard/RuPay/Amex)
     - Debit Card (major Indian banks)
     - Net Banking (HDFC, ICICI, SBI, Axis, Kotak, PNB, etc.)
     - WhatsApp Concierge
     - Real order receipt and tracking summary
5. **Owner Admin Suite**:
   - Inventory management with image uploader, commission triage, order tracking, and review moderation.
6. **Testing & Build Verification**:
   - Verify layout responsiveness, ensure zero broken images, and run `compile_applet`.
