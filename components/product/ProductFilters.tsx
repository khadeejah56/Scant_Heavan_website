"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { categories } from "@/data/products";
import { Category, Concentration, SortOption } from "@/types";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

export interface FilterState {
  categories: Category[];
  concentrations: Concentration[];
  maxPrice: number;
  sort: SortOption;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

const concentrationOptions: Concentration[] = [
  "Eau de Toilette",
  "Eau de Parfum",
  "Parfum",
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-current/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-xs uppercase tracking-luxe"
      >
        {title}
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FiltersContent({ filters, onChange }: ProductFiltersProps) {
  const toggleCategory = (c: Category) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(c)
        ? filters.categories.filter((x) => x !== c)
        : [...filters.categories, c],
    });
  };

  const toggleConcentration = (c: Concentration) => {
    onChange({
      ...filters,
      concentrations: filters.concentrations.includes(c)
        ? filters.concentrations.filter((x) => x !== c)
        : [...filters.concentrations, c],
    });
  };

  return (
    <div>
      <FilterGroup title="Category">
        {categories.map((c) => (
          <label
            key={c.value}
            className="flex items-center gap-2.5 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(c.value)}
              onChange={() => toggleCategory(c.value)}
              className="accent-champagne size-4"
            />
            {c.label}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Concentration">
        {concentrationOptions.map((c) => (
          <label
            key={c}
            className="flex items-center gap-2.5 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filters.concentrations.includes(c)}
              onChange={() => toggleConcentration(c)}
              className="accent-champagne size-4"
            />
            {c}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Max Price">
        <input
          type="range"
          min={100}
          max={350}
          step={10}
          value={filters.maxPrice}
          onChange={(e) =>
            onChange({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-champagne"
        />
        <p className="text-sm opacity-70">Up to ${filters.maxPrice}</p>
      </FilterGroup>
    </div>
  );
}

export function FilterToolbar({ filters, onChange, resultCount }: ProductFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-sm opacity-60">
        {resultCount} {resultCount === 1 ? "fragrance" : "fragrances"}
      </p>
      <div className="flex items-center gap-2 ml-auto">
        <label htmlFor="sort" className="text-xs uppercase tracking-luxe opacity-60">
          Sort
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) =>
            onChange({ ...filters, sort: e.target.value as SortOption })
          }
          className="bg-transparent text-sm border-b border-current/20 py-1 outline-none focus:border-champagne"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value} className="text-obsidian">
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function ProductFilters(props: ProductFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <FiltersContent {...props} />
      </div>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-luxe mb-4"
      >
        <SlidersHorizontal size={15} /> Refine
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-obsidian/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: EASE_LUXE }}
              className="fixed top-0 left-0 bottom-0 z-[95] w-[85%] max-w-sm bg-[var(--bg)] text-[var(--fg)] p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xl">Filters</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
              <FiltersContent {...props} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
