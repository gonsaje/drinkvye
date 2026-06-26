"use client";

import { useEffect, useState } from "react";

type MobileHeroScrollCueProps = {
  targetId: string;
};

export function MobileHeroScrollCue({ targetId }: MobileHeroScrollCueProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY <= 8);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTarget = () => {
    setIsVisible(false);
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={`mt-3 flex h-9 justify-center transition duration-300 sm:hidden ${isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-1 opacity-0"
        }`}
    >
      <button
        type="button"
        aria-label="Scroll to next section"
        onClick={scrollToTarget}
        className="inline-flex size-9 animate-bounce items-center justify-center rounded-full border border-white/70 bg-white/80 text-vye-pink shadow-[0_8px_18px_rgba(243,111,152,0.14)] backdrop-blur transition hover:border-vye-pink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
