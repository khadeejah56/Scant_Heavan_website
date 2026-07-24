"use client";

import { motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE_LUXE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
