"use client";

import { motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";

export default function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE_LUXE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
