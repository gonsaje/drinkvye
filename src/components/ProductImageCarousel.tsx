"use client";

import Image from "next/image";
import { useState } from "react";

const productImages = [
  {
    src: "/vyeBottle.png",
    alt: "Vye organic coconut water bottle",
    imageClassName: "scale-90 translate-y-3 sm:scale-105 sm:translate-y-4",
  },
  {
    src: "/vye-box.png",
    alt: "Vye organic coconut water six-pack box",
    imageClassName: "scale-[0.72] sm:scale-[0.82]",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-5 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ProductImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? productImages.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === productImages.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-vye-pink/10 p-4 shadow-[0_24px_70px_rgba(36,90,53,0.1)] sm:rounded-[2rem] sm:p-6">
      <div className="relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white sm:min-h-[460px] sm:rounded-[1.5rem]">
        <div
          className="flex h-[300px] w-full transition-transform duration-500 ease-in-out sm:h-[420px]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live="polite"
        >
          {productImages.map((image, index) => (
            <div
              key={image.src}
              aria-hidden={activeIndex !== index}
              className="relative h-full w-full shrink-0 px-8 py-10 sm:px-12 sm:py-14"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className={`${image.imageClassName} object-contain drop-shadow-[0_24px_38px_rgba(36,90,53,0.2)]`}
                sizes="(min-width: 1024px) 430px, 86vw"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous product image"
          className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-palm-green/10 bg-white/92 text-palm-green shadow-[0_10px_24px_rgba(31,41,51,0.12)] transition hover:text-vye-pink sm:left-4"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Show next product image"
          className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-palm-green/10 bg-white/92 text-palm-green shadow-[0_10px_24px_rgba(31,41,51,0.12)] transition hover:text-vye-pink sm:right-4"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div
        className="mt-4 flex justify-center gap-3"
        aria-label="Choose a product image"
      >
        {productImages.map((image, index) => (
          <button
            key={`${image.src}-thumbnail`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${image.alt}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`relative size-16 overflow-hidden rounded-xl bg-white p-1.5 transition sm:size-20 ${activeIndex === index
                ? "ring-2 ring-vye-pink ring-offset-2 ring-offset-vye-pink/10"
                : "opacity-65 hover:opacity-100"
              }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              className="object-contain p-2"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
