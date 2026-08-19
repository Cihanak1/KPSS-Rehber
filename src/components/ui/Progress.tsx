"use client";

import { cn } from "@/lib/cn";

interface ProgressProps {
  value: number; // 0-100
  className?: string;
  variant?: "amber" | "emerald" | "blue" | "violet" | "orange";
  showLabel?: boolean;
  size?: "sm" | "md";
}

const barColors: Record<string, string> = {
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
};

export function Progress({ value, className, variant = "emerald", showLabel, size = "md" }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "flex-1 rounded-full bg-zinc-800 overflow-hidden",
          size === "sm" ? "h-1" : "h-1.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", barColors[variant])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs tabular-nums text-zinc-500 w-8 text-right">{clamped}%</span>
      )}
    </div>
  );
}
