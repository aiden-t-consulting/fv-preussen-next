"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#2e7d32] text-white hover:bg-[#1b5e20] active:bg-[#1b5e20] shadow-sm",
  secondary:
    "bg-[#1b5e20] text-white hover:bg-[#1a6a0c] active:bg-[#1b5e20] shadow-sm",
  outline:
    "border-2 border-[#2e7d32] text-[#2e7d32] hover:bg-[#2e7d32] hover:text-white",
  ghost:
    "text-[#2e7d32] hover:bg-[#f1f8e9]",
  white:
    "bg-white text-[#1b5e20] hover:bg-[#f0faf0] shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold",
          "transition-all duration-150 cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e7d32]",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
