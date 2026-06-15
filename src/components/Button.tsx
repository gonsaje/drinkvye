import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-vye-pink text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] hover:bg-[#e85f89] focus-visible:outline-vye-pink",
  secondary:
    "border border-palm-green/15 bg-white text-palm-green shadow-[0_14px_30px_rgba(36,90,53,0.08)] hover:border-vye-pink/40 hover:text-vye-pink focus-visible:outline-vye-pink",
  ghost:
    "text-palm-green hover:bg-coconut-cream focus-visible:outline-vye-pink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
