"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { EASE_LUXE } from "@/lib/motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_LUXE } },
};

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-obsidian text-ivory">
      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: EASE_LUXE }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero/herobanner.png"
          alt="A signature HUSSAIN fragrance bottle bathed in golden light"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          variants={item}
          className="text-xs sm:text-sm uppercase tracking-luxe text-champagne mb-6"
        >
          HUSSAIN Signature Collection
        </motion.span>
        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] sm:text-7xl md:text-8xl max-w-4xl"
        >
          Wear the
          <br />
          <span className="text-gradient-gold italic">Unforgettable</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-md text-sm sm:text-base opacity-70 leading-relaxed"
        >
          Rare ingredients, modern composition. Discover fragrances built to
          become your signature.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex items-center gap-4">
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </Link>
          <Link href="/products?category=luxury">
            <Button size="lg" variant="outline">
              Luxury Collection
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-luxe opacity-60">
          Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
