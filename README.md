# HUSSAIN — Luxury Perfume E-Commerce

A complete luxury perfume storefront built with Next.js 16 (App Router), React 19,
TypeScript 5, Tailwind CSS 4, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm run start
```

## Tech Stack

| Purpose            | Library                          |
|---------------------|----------------------------------|
| Framework            | Next.js 16 (App Router, Turbopack) |
| UI                    | React 19                         |
| Language              | TypeScript 5                     |
| Styling               | Tailwind CSS 4 (CSS-based `@theme` tokens) |
| Animation             | Framer Motion 12                 |
| Icons                 | lucide-react (+ 3 local inline-SVG social icons — see note below) |
| Theme persistence     | next-themes                      |
| Class merging         | clsx + tailwind-merge            |

No backend/database is included — cart, wishlist, and theme state persist to
`localStorage` in the browser. Checkout and auth are fully designed UI flows
with simulated network delay; wire them up to real endpoints when ready.

## Design System

- **Palette**: Obsidian `#0B0A08`, Warm Ivory `#F7F1E7`, Champagne Gold `#C6A15B`,
  Soft Beige `#EDE3D2`, Dark Charcoal `#211E1A` — defined as CSS variables in
  `app/globals.css` under Tailwind 4's `@theme`, so classes like `bg-obsidian`,
  `text-champagne`, `dark:bg-charcoal` are generated automatically.
- **Type**: Cormorant Garamond (display/serif) + Manrope (body/UI), loaded via
  a `<link>` tag in `app/layout.tsx` rather than `next/font/google`, so the
  build has no dependency on build-time access to Google Fonts.
- **Signature element**: the brand story section uses the fragrance pyramid
  (Top / Heart / Base notes) as its structural device instead of generic
  numbered steps — see `components/home/BrandStory.tsx`.

## Folder Structure

```
hussain/
├── app/                        # App Router routes
│   ├── layout.tsx              # Root layout: fonts, metadata, providers, Navbar/Footer/CartDrawer
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind 4 theme tokens + base styles
│   ├── products/
│   │   ├── page.tsx            # Listing page (Suspense wrapper + metadata)
│   │   └── [slug]/page.tsx     # Product detail page (SSG via generateStaticParams)
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── wishlist/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── account/
│       ├── page.tsx
│       └── orders/page.tsx
│
├── components/
│   ├── layout/                 # Navbar, MobileMenu, Footer, PageWrapper
│   ├── ui/                     # Button, Badge, Modal, Input, StarRating, ThemeToggle, SocialIcons
│   ├── product/                 # ProductCard, ProductGrid, ProductFilters, ProductGallery,
│   │                            #   ProductInfo, ProductReviews, RelatedProducts, ProductsPageClient
│   ├── cart/                   # CartDrawer, CartItem, OrderSummary
│   ├── home/                   # Hero, FeaturedCollections, BrandStory, BestSellers, Testimonials, Newsletter
│   ├── auth/                   # AuthForm (shared by login + signup)
│   ├── theme-provider.tsx      # next-themes wrapper
│   └── ScrollReveal.tsx        # Shared scroll-triggered reveal wrapper
│
├── context/
│   ├── CartContext.tsx         # Cart state + localStorage persistence
│   └── WishlistContext.tsx     # Wishlist state + localStorage persistence
│
├── data/
│   ├── products.ts             # 16 mock products across all 5 categories
│   ├── reviews.ts               # Product reviews + homepage testimonials
│   └── orders.ts                # Mock order history
│
├── lib/
│   ├── utils.ts                 # cn(), formatPrice(), formatDate()
│   └── motion.ts                 # Shared Framer Motion easing constant
│
├── types/
│   └── index.ts                  # Product, CartItem, Order, Review, FilterState, etc.
│
└── next.config.ts                # Remote image domain allowlist (picsum.photos)
```

## Notes on Images

Product photography uses seeded [Picsum](https://picsum.photos) placeholders
(`https://picsum.photos/seed/<name>/<w>/<h>`) so every image is stable across
reloads. Every product's image URLs are generated in one place
(`data/products.ts`, the `img()` helper) — swap in real photography by
replacing that helper or editing each product's `images` array. `next.config.ts`
already allowlists `picsum.photos`; add your real image host there when you
switch.

## Known environment-specific note

This project was built and verified in a sandboxed environment whose network
allowlist blocks `fonts.googleapis.com`, which is why fonts are loaded via a
`<link>` tag instead of `next/font/google` (which fetches fonts at build
time). In a normal environment with full internet access this makes no
functional difference — if you'd prefer self-hosted, build-time-optimized
fonts, swap the `<link>` tags in `app/layout.tsx` for `next/font/google`
imports.

## What's simulated vs. real

- **Real**: filtering/sorting/search, cart math, wishlist, theme persistence,
  responsive design, all animations, SEO metadata, accessibility basics
  (skip link, focus states, aria labels, semantic HTML).
- **Simulated (UI-complete, backend-free)**: authentication, checkout payment,
  order placement/history. Each has a clearly marked spot to wire in a real
  API call (see the `// Simulated auth request` and `// simulated network
  delay` comments in `AuthForm.tsx` and `checkout/page.tsx`).
