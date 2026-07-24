"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Heart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { categories } from "@/data/products";
import { EASE_LUXE } from "@/lib/motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Fragrances" },
  ...categories.map((c) => ({
    href: `/products?category=${c.value}`,
    label: c.label,
  })),
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-obsidian/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            className="fixed top-0 left-0 bottom-0 z-[95] w-[85%] max-w-sm bg-[var(--bg)] text-[var(--fg)] p-8 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="font-display text-xl tracking-[0.15em] uppercase">
                Menu
              </span>
              <button onClick={onClose} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 text-lg font-display border-b border-current/10"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-current/10">
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-2 text-sm uppercase tracking-luxe"
              >
                <User size={18} /> Account
              </Link>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-2 text-sm uppercase tracking-luxe"
              >
                <Heart size={18} /> Wishlist
              </Link>
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
