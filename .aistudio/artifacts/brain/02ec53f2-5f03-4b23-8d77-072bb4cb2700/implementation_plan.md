# VÉORA — Atelier Contact & Concierge System Update

Updating all customer touchpoints, concierge links, and artwork inquiry channels to the official VÉORA WhatsApp contact number **+91 95861 20583** (`https://wa.me/919586120583`) and official contact email **singh.64931@gmail.com**, adding a dedicated luxury floating WhatsApp concierge button, and ensuring 100% consistent messaging across the atelier.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Official WhatsApp Number**: All instances across the storefront will link to `https://wa.me/919586120583` with display text `+91 95861 20583`.
> - **Official Contact Email**: All contact links and footer details will update to `singh.64931@gmail.com` (mailto: `singh.64931@gmail.com`).
> - **Floating Concierge Trigger**: A persistent luxury floating WhatsApp button with an artisan inquiry badge will be anchored to the bottom-right of the viewport, styled in deep atelier emerald and gold.
> - **Design Preservation**: All existing design elements, typography, the emerald & gold brand logo, original product photographs, customer review chartbox, and Indian payment checkout options will remain untouched.

---

## 1. Overview & Core Concept

- **What It Does**: Enables art collectors and patrons to initiate immediate, direct WhatsApp communication with the VÉORA artisan team via **+91 95861 20583** and reach out via **singh.64931@gmail.com** from any section of the website—whether exploring catalog artworks, reviewing product provenance, placing a concierge order, or seeking bespoke framing consultation.
- **Key Channels Updated**:
  1. **New Floating Concierge Button**: Persistent floating widget on all views with quick click-to-chat.
  2. **Product Detail (PDP) Inquiry**: "Inquire on WhatsApp" button pre-populating artwork title, dimensions, and investment details.
  3. **Checkout Concierge**: "Order Directly via WhatsApp Concierge" compiling cart line items and delivery city into a formatted message.
  4. **Footer Studio Concierge & Contact Section**: Direct WhatsApp hotline (`+91 95861 20583`) and official studio email (`singh.64931@gmail.com`).

---

## 2. Technical Architecture & Integration Plan

```
┌────────────────────────────────────────────────────────────────────────┐
│                      CENTRALIZED CONTACT CONSTANTS                     │
│                           (src/data/initialData.ts)                    │
│                                                                        │
│   • VEORA_WHATSAPP_NUMBER = '919586120583'                             │
│   • VEORA_WHATSAPP_FORMATTED = '+91 95861 20583'                       │
│   • VEORA_WHATSAPP_URL = 'https://wa.me/919586120583'                  │
│   • VEORA_CONTACT_EMAIL = 'singh.64931@gmail.com'                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ Floating Widget  │       │ Product Detail   │       │ Checkout & Cart  │
│ (Global Overlay) │       │ (PDP Modal)      │       │ (Concierge Buy)  │
│ Direct Concierge │       │ Pre-filled Title │       │ Pre-filled Order │
│ Click-to-Chat    │       │ & Dimension Info │       │ Total & Items    │
└──────────────────┘       └──────────────────┘       └──────────────────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   STUDIO FOOTER & CONTACT CONCIERGE                    │
│                 WhatsApp: +91 95861 20583 (wa.me link)                 │
│                 Email: singh.64931@gmail.com (mailto link)             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Implementation Steps

1. **Centralize Contact Configuration (`src/data/initialData.ts`)**:
   - Export constants for `VEORA_WHATSAPP_NUMBER = '919586120583'`, `VEORA_WHATSAPP_FORMATTED = '+91 95861 20583'`, `VEORA_WHATSAPP_URL = 'https://wa.me/919586120583'`, and `VEORA_CONTACT_EMAIL = 'singh.64931@gmail.com'`.
2. **Build Floating Concierge Component (`src/components/FloatingWhatsApp.tsx`)**:
   - Create a sleek, unobtrusive floating button in the bottom right corner with the official WhatsApp green emblem, an optional pulse ring, and a tooltip *"Chat with VÉORA Artisan"*.
   - Opens `https://wa.me/919586120583?text=Hello%20VÉORA%20Atelier!%20I%20would%20like%20to%20inquire%20about%20your%20handcrafted%20artworks.` in a new tab.
3. **Update Product Detail Modal (`src/components/ProductDetailModal.tsx`)**:
   - Update `handleWhatsAppInquiry` to target `919586120583`.
4. **Update Checkout Modal (`src/components/CheckoutModal.tsx`)**:
   - Update `handleWhatsAppCheckout` to dispatch order inquiries to `919586120583`.
5. **Update Footer Studio Concierge (`src/components/Footer.tsx`)**:
   - Update the contact hotline to `+91 95861 20583` with link `https://wa.me/919586120583`.
   - Update email to `singh.64931@gmail.com` with `mailto:singh.64931@gmail.com`.
6. **Mount in `src/App.tsx`**:
   - Include `FloatingWhatsApp` in `MainLayout`.
7. **Verification & Audit**:
   - Search repository to ensure zero occurrences of the old number or old email remain.
   - Run `compile_applet` and `lint_applet` to confirm build validity.
