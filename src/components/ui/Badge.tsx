"use client";

import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "amber" | "emerald" | "blue" | "violet" | "orange" | "rose" | "sky";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-zinc-800 text-zinc-400 border-zinc-700",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  rose: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  sky: "bg-sky-500/10 text-sky-400 border-sky-500/30",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
