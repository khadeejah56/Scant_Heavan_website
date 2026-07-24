"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-obsidian text-ivory py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
            Stay In Scent
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Join Our List
          </h2>
          <p className="text-sm opacity-60 mb-10 max-w-md mx-auto">
            Early access to limited releases, fragrance notes from our
            perfumers, and 10% off your first order.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-champagne"
            >
              <Check size={18} />
              <span className="text-sm uppercase tracking-luxe">
                You&apos;re on the list
              </span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-0 border-b border-ivory/25 focus-within:border-champagne transition-colors max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                suppressHydrationWarning
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:opacity-40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                suppressHydrationWarning
                className="p-2 text-champagne hover:translate-x-1 transition-transform"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
