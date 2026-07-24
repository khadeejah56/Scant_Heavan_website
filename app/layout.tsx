import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

// Fonts are loaded via a standard <link> tag (see <head> below) rather than
// next/font/google, so the site can build in network-restricted environments.
// Swap for next/font/google in a normal deployment if you prefer self-hosting.

export const metadata: Metadata = {
  metadataBase: new URL("https://hussain.example.com"),
  title: {
    default: "HUSSAIN — Luxury Perfume House",
    template: "%s | HUSSAIN",
  },
  description:
    "HUSSAIN is a modern luxury perfume house crafting rare fragrances for men, women, and beyond. Explore our signature collections, luxury oud reserves, and curated gift sets.",
  keywords: [
    "luxury perfume",
    "designer fragrance",
    "eau de parfum",
    "oud perfume",
    "gift sets",
    "HUSSAIN",
  ],
  openGraph: {
    title: "HUSSAIN — Luxury Perfume House",
    description:
      "Discover rare, modern fragrances crafted for men, women, and beyond.",
    url: "https://hussain.example.com",
    siteName: "HUSSAIN",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/hussain-og/1200/630",
        width: 1200,
        height: 630,
        alt: "HUSSAIN — Luxury Perfume House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUSSAIN — Luxury Perfume House",
    description:
      "Discover rare, modern fragrances crafted for men, women, and beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts are loaded via a standard <link> tag rather than next/font/google
            so the build doesn't depend on build-time network access to Google Fonts.
            The @next/next/no-page-custom-font lint warning below targets the legacy
            Pages Router and doesn't apply to the App Router root layout. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CartProvider>
            <WishlistProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-champagne focus:text-obsidian focus:px-4 focus:py-2 focus:rounded"
              >
                Skip to content
              </a>
              <Navbar />
              <main id="main-content">{children}</main>
              <Footer />
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
