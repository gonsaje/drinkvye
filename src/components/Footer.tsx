"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const exploreLinks = [
  { href: "/shop", label: "Shop Vye" },
  { href: "/our-coconuts", label: "Our Coconuts" },
  { href: "/find-us", label: "Find Us" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/wholesale", label: "Wholesale" },
];

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_VYE_INSTAGRAM_URL || "https://instagram.com",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: process.env.NEXT_PUBLIC_VYE_FACEBOOK_URL || "https://facebook.com",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: process.env.NEXT_PUBLIC_VYE_X_URL || "https://x.com",
    label: "X",
    icon: "x",
  },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
      >
        <path d="M13.7 21v-8h2.8l.4-3.1h-3.2V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5V13h2.8v8h3.4Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
    >
      <path d="M4.3 3h4.4l4 5.7L17.6 3h2.1l-6.1 7.2L20.3 21h-4.4l-4.5-6.4L6 21H3.8l6.7-7.9L4.3 3Zm3.3 1.7H6.8l10 14.6h.8L7.6 4.7Z" />
    </svg>
  );
}

type FooterProps = {
  backgroundColor?: string;
  variant?: "full" | "rounded";
};

function getFooterBackground(pathname: string) {
  if (pathname === "/find-us") return "#fabed1";
  if (pathname === "/shop") return "#b6dd6843";
  if (pathname === "/our-coconuts") return "#fabed1";
  if (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/refund-policy"
  ) {
    return "#fdedf2";
  }

  if (
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/checkout/success" ||
    pathname === "/contact"
  ) {
    return "#f2faf8";
  }

  return "#ffffff";
}

export function Footer({
  backgroundColor,
  variant = "full",
}: FooterProps) {
  const pathname = usePathname();
  const resolvedBackgroundColor =
    backgroundColor ?? getFooterBackground(pathname);
  const footerContent = (
    <div
      className={`relative overflow-hidden bg-coconut-green text-palm-green ${variant === "rounded"
        ? "mx-4 rounded-t-[2rem] sm:mx-6 sm:rounded-t-[2.5rem] lg:mx-8"
        : ""
        }`}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/18" />
      <div className="pointer-events-none absolute -bottom-36 left-[8%] size-96 rounded-full bg-vye-pink/18" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-16 border-b border-palm-green/25 pb-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20 lg:pb-20">
          <div className="max-w-2xl">
            <Link
              href="/"
              aria-label="Vye home"
              className="inline-flex transition hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="block h-20 w-[118px] bg-white transition sm:h-24 sm:w-[142px]"
                style={{
                  WebkitMaskImage: "url(/vye_logo_pink_f36f98.png)",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskImage: "url(/vye_logo_pink_f36f98.png)",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </Link>

            <h2 className="mt-9 max-w-xl text-4xl font-black leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
              Keep the good hydration flowing.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-palm-green/78 sm:text-lg">
              Organic coconut water made for bright mornings, warm afternoons,
              and every simple reset in between.
            </p>
            <Link
              href="/shop"
              className="mt-9 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-vye-pink px-7 text-sm font-black text-white shadow-[0_16px_34px_rgba(243,111,152,0.24)] transition hover:-translate-y-0.5 hover:bg-[#ff82a8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-palm-green sm:w-auto"
            >
              Drink Vye
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-palm-green/65">
                Explore
              </h3>
              <nav className="mt-6 flex flex-col items-start gap-4">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-bold text-palm-green/88 transition hover:text-white sm:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-palm-green/65">
                Support
              </h3>
              <nav className="mt-6 flex flex-col items-start gap-4">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-bold text-palm-green/88 transition hover:text-white sm:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-palm-green/65">
                Follow Us
              </h3>
              <nav className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.length ? (
                  socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-palm-green/20 text-palm-green transition hover:border-white/70 hover:bg-white hover:text-vye-pink"
                    >
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))
                ) : (
                  <span className="text-sm font-semibold text-palm-green/60">
                    Coming soon
                  </span>
                )}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-palm-green/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vye. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <Link
              href="/privacy"
              className="font-bold transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-bold transition hover:text-white"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/refund-policy"
              className="font-bold transition hover:text-white"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );

  if (variant === "rounded") {
    return (
      <footer
        className="pt-4 sm:pt-6 lg:pt-8"
        style={{ backgroundColor: resolvedBackgroundColor }}
      >
        {footerContent}
      </footer>
    );
  }

  return (
    <footer>{footerContent}</footer>
  );
}
