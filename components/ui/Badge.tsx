import { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "purple"
  | "time-morning"
  | "time-afternoon"
  | "time-evening"
  | "pill";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export default function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center gap-1 text-[11px] font-bold rounded-full px-2.5 py-0.5";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-gray-50 text-gray-700 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-orange-50 text-orange-600 border border-orange-200",
    purple: "bg-purple-50 text-purple-600 border border-purple-200",
    "time-morning": "bg-purple-50 text-purple-600",
    "time-afternoon": "bg-green-50 text-green-700",
    "time-evening": "bg-[#1A1A2E] text-white/80",
    pill: "bg-white text-gray-700 border border-gray-200",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
