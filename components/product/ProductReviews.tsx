import { BadgeCheck } from "lucide-react";
import { Review } from "@/types";
import StarRating from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";

export default function ProductReviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-display text-4xl">{rating.toFixed(1)}</span>
        <div>
          <StarRating rating={rating} size={16} />
          <p className="text-xs opacity-60 mt-1">
            Based on {reviewCount} reviews
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm opacity-60">
          No written reviews yet for this fragrance.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-current/10 pb-6">
              <div className="flex items-center justify-between mb-1">
                <StarRating rating={r.rating} />
                <span className="text-xs opacity-50">{formatDate(r.date)}</span>
              </div>
              <p className="font-medium mt-2">{r.title}</p>
              <p className="text-sm opacity-75 mt-1 leading-relaxed">
                {r.content}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs opacity-60">
                <span>{r.author}</span>
                {r.verified && (
                  <span className="flex items-center gap-1 text-champagne">
                    <BadgeCheck size={13} /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
