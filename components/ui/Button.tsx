"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  motionProps?: HTMLMotionProps<"button">;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian hover:bg-charcoal dark:hover:bg-champagne-light",
  secondary:
    "bg-champagne text-obsidian hover:bg-champagne-light",
  outline:
    "border border-current bg-transparent hover:bg-obsidian hover:text-ivory dark:hover:bg-ivory dark:hover:text-obsidian",
  ghost: "bg-transparent hover:bg-obsidian/5 dark:hover:bg-ivory/10",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2 tracking-luxe",
  md: "text-sm px-7 py-3.5 tracking-luxe",
  lg: "text-sm px-10 py-4.5 tracking-luxe",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        suppressHydrationWarning
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 uppercase font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export default Button;
