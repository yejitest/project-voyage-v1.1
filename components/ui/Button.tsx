import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "primary-green" | "secondary" | "ghost" | "text" | "icon-round";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "font-bold transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const width = fullWidth ? "w-full" : "";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-purple-600 text-white text-sm px-[22px] py-3 rounded-lg hover:bg-purple-800 active:scale-[0.98]",
    "primary-green":
      "bg-green-500 text-white text-sm px-[22px] py-3 rounded-lg hover:bg-green-700 active:scale-[0.98]",
    secondary:
      "bg-white text-ink text-sm border border-gray-400 px-[22px] py-[11px] rounded-lg hover:border-ink",
    ghost:
      "bg-transparent text-purple-600 text-sm border border-purple-600 px-[22px] py-[11px] rounded-lg hover:bg-purple-50",
    text:
      "bg-transparent border-none text-ink text-sm underline underline-offset-[3px] py-2",
    "icon-round":
      "w-10 h-10 rounded-full bg-white border border-gray-400 flex items-center justify-center text-[15px] hover:border-ink",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
