"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "amber" | "emerald";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-[0.97] active:bg-zinc-300",
  secondary: "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 active:scale-[0.97] active:bg-zinc-600",
  ghost: "bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 active:scale-[0.97] active:bg-zinc-800/80",
  danger: "bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 active:scale-[0.97]",
  amber: "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 active:scale-[0.97]",
  emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 active:scale-[0.97]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[36px] sm:min-h-[32px] px-2.5 py-1.5 text-xs gap-1.5",
  md: "min-h-[44px] sm:min-h-[38px] px-3.5 py-2 text-sm gap-2",
  lg: "min-h-[48px] px-4 py-2.5 text-sm gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium",
          "transition-all duration-150 ease-out touch-manipulation select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
          "disabled:pointer-events-none disabled:opacity-40",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
