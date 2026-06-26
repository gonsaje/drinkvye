"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/useCart";

const navItems = [
  { href: "/our-source", label: "OUR SOURCE" },
  { href: "/shop", label: "SHOP" },
  { href: "/find-us", label: "FIND US" },
  { href: "/contact", label: "CONTACT" },
];

const desktopLeftNavItems = [
  { href: "/our-source", label: "OUR SOURCE" },
  { href: "/shop", label: "SHOP" },
];

const desktopRightNavItems = [
  { href: "/find-us", label: "FIND US" },
  { href: "/contact", label: "CONTACT" },
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

function PalmIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 sm:size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M12 21c.2-4.8.1-9.5-.3-14.2" />
      <path d="M11.7 6.8C8.8 4.1 5.9 3.4 3.2 4.6c3.1.8 5.4 1.9 7.2 3.7" />
      <path d="M11.8 6.6C10.7 3.4 11.4 1.8 13 1c.5 2.4.1 4.2-1.2 5.6" />
      <path d="M12 6.8c2.8-2.5 5.6-3.1 8.8-1.8-3 .6-5.4 1.8-7.4 3.6" />
      <path d="M11.6 7.8C8.7 7.4 6.2 8.5 4.2 11c2.8-.7 5.1-.7 7 .2" />
      <path d="M12.4 7.8c3-.3 5.4.8 7.4 3.2-2.7-.7-5-.6-7 .3" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const { totalQuantity } = useCart();
  const cartLabel =
    totalQuantity > 0 ? `Cart (${totalQuantity} items)` : "Cart";

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;

      setShowAnnouncement((current) => {
        if (current) return scrollY < 48;
        return scrollY < 4;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/18 bg-[linear-gradient(180deg,rgba(246,83,138,0.98)_0%,rgba(238,73,128,0.94)_100%)] shadow-[0_14px_40px_rgba(146,45,83,0.16)] backdrop-blur-xl"
    >
      <div
        className={`overflow-hidden bg-white text-center text-xs font-black uppercase tracking-[0.12em] text-vye-pink transition-[max-height,opacity,transform,padding] duration-300 ease-out sm:text-base sm:tracking-[0.16em] ${showAnnouncement
          ? "max-h-12 px-4 py-2 opacity-100"
          : "max-h-0 px-4 py-0 opacity-0 -translate-y-1"
          }`}
      >
        <span className="inline-flex items-center justify-center gap-2 sm:gap-3">
          <PalmIcon />
          <span>Free Shipping on all U.S. orders $90+</span>
          <PalmIcon />
        </span>
      </div>

      <nav
        aria-label="Primary navigation"
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden items-center justify-start gap-12 text-[20px] font-medium tracking-[0.02em] text-white lg:flex xl:gap-14">
          {desktopLeftNavItems.map((item) => (
            <Link
              key={item.href}
              className="group relative py-2 transition hover:text-white"
              href={item.href}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-white/75 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
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

        <div className="hidden justify-self-center lg:flex">
          <Logo />
        </div>

        <div className="hidden items-center justify-end gap-12 text-[20px] font-medium tracking-[0.02em] text-white lg:flex xl:gap-14">
          {desktopRightNavItems.map((item) => (
            <Link
              key={item.href}
              className="group relative py-2 transition hover:text-white"
              href={item.href}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-white/75 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/cart"
            aria-label={cartLabel}
            className="relative inline-flex size-12 items-center justify-center rounded-full border border-white/28 bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:border-white/45 hover:bg-white/16"
          >
            <CartIcon />
            {totalQuantity > 0 ? (
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-palm-green px-1.5 text-[0.68rem] font-black leading-5 text-white">
                {totalQuantity}
              </span>
            ) : null}
          </Link>
        </div>

        <Link
          href="/cart"
          aria-label={cartLabel}
          className="relative inline-flex size-11 items-center justify-center rounded-full text-white transition hover:bg-white/15 lg:hidden"
        >
          <CartIcon />
          {totalQuantity > 0 ? (
            <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-palm-green px-1.5 text-[0.68rem] font-black leading-5 text-white">
              {totalQuantity}
            </span>
          ) : null}
        </Link>
      </nav>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-t border-white/20 bg-vye-pink shadow-[0_18px_45px_rgba(31,41,51,0.1)] transition duration-200 lg:hidden ${menuOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
          }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-lg font-semibold text-white transition hover:bg-white/15"
            >
              {item.label}
            </Link>
          ))}
          {/* <Button
            href="/shop"
            className="mt-2 w-full border border-white bg-white !text-vye-pink shadow-none hover:bg-transparent hover:!text-white"
            onClick={() => setMenuOpen(false)}
          >
            Discover Vye
          </Button> */}
        </div>
      </div>
    </header>
  );
}
