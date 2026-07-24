"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types";

interface WishlistContextValue {
  items: Product[];
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  removeItem: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "hussain-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // localStorage is only readable client-side, so this must run in an
  // effect (not a lazy useState initializer) to avoid a hydration mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  return (
    <WishlistContext.Provider
      value={{ items, toggleItem, isWishlisted, removeItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
