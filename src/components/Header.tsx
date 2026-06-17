"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useCart } from "@/lib/useCart";

const navItems = [
  { href: "/our-coconuts", label: "Our Coconuts" },
  { href: "/contact", label: "Contact" },
  { href: "/find-us", label: "Find Us" },
];

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M6.5 6.5h14l-1.7 8.2H8.1L6.5 3.8H3.3" />
      <path d="M9.4 20.2h.1" />
      <path d="M17.2 20.2h.1" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const cartLabel =
    totalQuantity > 0 ? `Cart (${totalQuantity} items)` : "Cart";

  return (
    <header className="sticky top-0 z-50 border-b border-palm-green/10 bg-white/90 backdrop-blur-md">
      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <div className="hidden items-center lg:flex">
          <Logo />
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-palm-green transition hover:bg-coconut-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vye-pink lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
          <Logo />
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-8 pr-2 text-sm font-semibold text-near-black/75">
            <Link className="transition hover:text-vye-pink" href="/our-coconuts">
              Our Coconuts
            </Link>
            <Link className="transition hover:text-vye-pink" href="/contact">
              Contact
            </Link>
            <Link className="transition hover:text-vye-pink" href="/find-us">
              Find Us
            </Link>
          </div>
          <Button href="/shop" className="min-w-32">
            Drink Vye
          </Button>
          <Link
            href="/cart"
            aria-label={cartLabel}
            className="relative inline-flex size-11 items-center justify-center rounded-full text-near-black/55 transition hover:bg-coconut-cream hover:text-palm-green"
          >
            <CartIcon />
            {totalQuantity > 0 ? (
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-vye-pink px-1.5 text-[0.68rem] font-black leading-5 text-white">
                {totalQuantity}
              </span>
            ) : null}
          </Link>
        </div>

        <Link
          href="/cart"
          aria-label={cartLabel}
          className="relative inline-flex size-11 items-center justify-center rounded-full text-near-black/55 transition hover:bg-coconut-cream hover:text-palm-green lg:hidden"
        >
          <CartIcon />
          {totalQuantity > 0 ? (
            <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-vye-pink px-1.5 text-[0.68rem] font-black leading-5 text-white">
              {totalQuantity}
            </span>
          ) : null}
        </Link>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-palm-green/10 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-near-black transition hover:bg-coconut-cream hover:text-palm-green"
            >
              {item.label}
            </Link>
          ))}
          <Button
            href="/shop"
            className="mt-2 w-full"
            onClick={() => setMenuOpen(false)}
          >
            Drink Vye
          </Button>
        </div>
      </div>
    </header>
  );
}
