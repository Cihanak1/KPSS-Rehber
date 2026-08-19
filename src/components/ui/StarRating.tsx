"use client";

import { cn } from "@/lib/cn";
import { Star } from "lucide-react";
import { DifficultyLevel } from "@/types";

interface StarRatingProps {
  value: DifficultyLevel;
  onChange?: (value: DifficultyLevel) => void;
  readonly?: boolean;
  className?: string;
}

const LABELS: Record<DifficultyLevel, string> = {
  1: "Çok Kolay",
  2: "Kolay",
  3: "Orta",
  4: "Zor",
  5: "Çok Zor",
};

export function StarRating({ value, onChange, readonly, className }: StarRatingProps) {
  return (
    <div
      role={readonly ? undefined : "radiogroup"}
      aria-label={readonly ? undefined : "Zorluk derecesi"}
      className={cn("flex items-center gap-0.5 select-none", className)}
    >
      {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((star) => (
        <button
          key={star}
          type="button"
          role={readonly ? undefined : "radio"}
          aria-checked={readonly ? undefined : value === star}
          aria-label={readonly ? undefined : `${star} yıldız - ${LABELS[star]}`}
          disabled={readonly}
          onClick={() => !readonly && onChange?.(star)}
          className={cn(
            "flex items-center justify-center p-1 min-w-[28px] min-h-[28px] sm:min-w-[22px] sm:min-h-[22px] rounded transition-transform duration-100 touch-manipulation",
            !readonly && "hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
            "disabled:cursor-default"
          )}
        >
          <Star
            aria-hidden="true"
            className={cn(
              "size-4 sm:size-3.5 transition-colors duration-100",
              star <= value
                ? "fill-amber-500 text-amber-500"
                : "fill-transparent text-zinc-600"
            )}
          />
        </button>
      ))}
      <span className="ml-1.5 text-xs text-zinc-500 tabular-nums">{LABELS[value]}</span>
    </div>
  );
}
