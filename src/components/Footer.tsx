import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = [
  { href: "/our-coconuts", label: "Our Coconuts" },
  { href: "/shop", label: "Drink Vye" },
  { href: "/find-us", label: "Find Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-palm-green/10 bg-coconut-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-md">
          <Logo />
          <p className="mt-5 text-sm leading-7 text-near-black/65">
            Organic coconut water made for bright mornings, warm afternoons,
            and every simple reset in between.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-near-black/70">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-vye-pink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
