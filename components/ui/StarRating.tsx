import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 14,
  className,
}: StarRatingProps) {
  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={
                filled
                  ? "fill-champagne text-champagne"
                  : "fill-transparent text-current opacity-30"
              }
            />
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs opacity-60">({reviewCount})</span>
      )}
    </div>
  );
}
