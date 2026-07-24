"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Heart, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "@/components/layout/MobileMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, openDrawer } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    window.location.href = `/products?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE_LUXE }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-current/10 py-3"
            : "bg-transparent py-6"
        )}
      >
        <nav className="max-w-[1600px] mx-auto px-5 md:px-10 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1 -ml-1"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-[0.15em] uppercase"
          >
            HUSSAIN
          </Link>

          <ul className="hidden lg:flex items-center gap-9 text-xs uppercase tracking-luxe">
            {categories.map((c) => (
              <li key={c.value}>
                <Link
                  href={`/products?category=${c.value}`}
                  className="relative py-1 group"
                >
                  {c.label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Toggle search"
              aria-expanded={searchOpen}
            >
              <Search size={19} />
            </button>
            <ThemeToggle className="hidden sm:block" />
            <Link href="/account" aria-label="Account" className="hidden sm:block">
              <User size={19} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
              <Heart size={19} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne text-obsidian text-[10px] rounded-full size-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={openDrawer}
              aria-label="Open cart"
              className="relative"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne text-obsidian text-[10px] rounded-full size-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-current/10 mt-4"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="max-w-[1600px] mx-auto px-5 md:px-10 py-4 flex items-center gap-3"
              >
                <Search size={18} className="opacity-50" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fragrances, notes, collections…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:opacity-40"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
