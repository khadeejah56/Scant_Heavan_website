"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <div className="flex sm:flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1} of ${name}`}
            className={cn(
              "relative size-16 sm:size-20 shrink-0 overflow-hidden bg-[var(--surface-muted)] border transition-colors",
              active === i ? "border-champagne" : "border-transparent"
            )}
          >
            <Image src={img} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative flex-1 aspect-[4/5] bg-[var(--surface-muted)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
