import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "gold",
  className,
}: BadgeProps) {
  const styles = {
    gold: "bg-champagne text-obsidian",
    dark: "bg-obsidian text-ivory dark:bg-ivory dark:text-obsidian",
    outline: "border border-current",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-luxe font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
