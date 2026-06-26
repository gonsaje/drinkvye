"use client";

import Image from "next/image";
import { useState } from "react";
import { nutritionFacts } from "@/lib/nutritionFacts";

type CarouselSlide =
  | {
    type: "image";
    label: string;
    src: string;
    alt: string;
    imageClassName: string;
    imageFitClassName?: string;
    slideClassName?: string;
    thumbnailClassName?: string;
  }
  | {
    type: "nutrition";
    label: string;
    alt: string;
  };

const carouselSlides: CarouselSlide[] = [
  {
    type: "image",
    label: "Refreshing",
    src: "/refreshing_vye.png",
    alt: "Refreshing Vye organic coconut water served chilled",
    imageClassName: "object-center",
    imageFitClassName: "object-cover",
    slideClassName: "px-0 py-0",
    thumbnailClassName: "object-cover",
  },
  {
    type: "image",
    label: "Case",
    src: "/vye-box.png",
    alt: "Vye organic coconut water six-pack box",
    imageClassName: "object-center",
    imageFitClassName: "object-cover",
    slideClassName: "px-0 py-0",
    thumbnailClassName: "object-cover",
  },
  {
    type: "nutrition",
    label: "Nutrition",
    alt: "Vye coconut water nutrition facts",
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
      current === 0 ? carouselSlides.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === carouselSlides.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-3xl bg-vye-pink/10 p-3 shadow-[0_24px_70px_rgba(36,90,53,0.1)] sm:rounded-[2rem] sm:p-6">
      <div className="relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white sm:min-h-[460px] sm:rounded-[1.5rem]">
        <div
          className="absolute inset-0 flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live="polite"
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.label}
              aria-hidden={activeIndex !== index}
              className={`relative flex h-full w-full shrink-0 items-center justify-center overflow-hidden ${slide.type === "image" && slide.slideClassName
                ? slide.slideClassName
                : "px-4 py-5 sm:px-12 sm:py-14"
                }`}
            >
              {slide.type === "image" ? (
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`${slide.imageFitClassName ?? "object-contain"} ${slide.imageClassName} drop-shadow-[0_24px_38px_rgba(36,90,53,0.2)]`}
                    sizes="(min-width: 1024px) 430px, 86vw"
                  />
                </div>
              ) : (
                <div className="max-h-full w-full max-w-md overflow-auto bg-white p-5 text-near-black shadow-[0_16px_34px_rgba(31,41,51,0.12)] ring-1 ring-near-black/12 sm:p-6">
                  <div className="border-b-[8px] border-near-black pb-2">
                    <p className="text-[2.25rem] font-black leading-none tracking-normal sm:text-5xl">
                      Nutrition Facts
                    </p>
                    <p className="mt-2 text-xs font-bold sm:text-sm">
                      About 4 servings per container
                    </p>
                    <p className="text-xs font-bold sm:text-sm">
                      Serving size 8 fl oz (240 mL)
                    </p>
                  </div>
                  <div className="divide-y divide-near-black/20">
                    {nutritionFacts.map((fact) => (
                      <div
                        key={fact.nutrient}
                        className="grid grid-cols-[1fr_auto] gap-3 py-1.5 text-xs leading-tight sm:text-sm"
                      >
                        <span className="font-bold">{fact.nutrient}</span>
                        <span className="font-semibold">{fact.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous product image"
          className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-palm-green/10 bg-white/92 text-palm-green shadow-[0_10px_24px_rgba(31,41,51,0.12)] transition hover:text-vye-pink sm:inline-flex sm:left-4"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Show next product image"
          className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-palm-green/10 bg-white/92 text-palm-green shadow-[0_10px_24px_rgba(31,41,51,0.12)] transition hover:text-vye-pink sm:inline-flex sm:right-4"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div
        className="mt-4 flex min-w-0 items-center justify-center gap-3 sm:gap-3"
        aria-label="Choose a product image"
      >
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous product image"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-palm-green/10 bg-white text-palm-green transition hover:text-vye-pink sm:hidden"
        >
          <ArrowIcon direction="left" />
        </button>

        {carouselSlides.map((slide, index) => (
          <button
            key={`${slide.label}-thumbnail`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.alt}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`relative size-12 overflow-hidden rounded-xl bg-white p-1 transition sm:size-20 sm:p-1.5 ${activeIndex === index
              ? "ring-2 ring-vye-pink ring-offset-2 ring-offset-vye-pink/10"
              : "opacity-65 hover:opacity-100"
              }`}
          >
            {slide.type === "image" ? (
              <Image
                src={slide.src}
                alt=""
                fill
                className={`${slide.thumbnailClassName ?? "object-contain p-2"}`}
                sizes="80px"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-center text-[0.65rem] font-black uppercase leading-tight tracking-normal text-palm-green">
                Nutrition
              </span>
            )}
          </button>
        ))}

        <button
          type="button"
          onClick={showNext}
          aria-label="Show next product image"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-palm-green/10 bg-white text-palm-green transition hover:text-vye-pink sm:hidden"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
