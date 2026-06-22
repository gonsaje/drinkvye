"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Finally found a drink that’s healthy and delicious. Great after workouts or hot summer days.",
    name: "James Walker",
  },
  {
    quote:
      "Absolutely love the taste! Feels super fresh and keeps me hydrated throughout my busy day.",
    name: "Emily Johnson",
  },
  {
    quote:
      "I drink this daily. Pure, natural, and no sugar—just what I needed for clean hydration.",
    name: "Michael Carter",
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

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) =>
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative overflow-hidden px-5 py-18 sm:px-8 sm:py-24"
    >
      <Image
        src="/young_coconuts_bg.jpeg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.48)_0%,rgba(251,215,227,0.38)_50%,rgba(255,255,255,0.52)_100%)]" />
      <div className="absolute inset-0 bg-palm-green/8" />
      <div className="pointer-events-none absolute -left-20 top-12 size-56 rounded-full bg-coconut-green/24 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 size-64 rounded-full bg-vye-pink/14 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
              reviews
            </p>
            <h2
              id="testimonial-heading"
              className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-5xl"
            >
              Refreshment worth sharing.
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous review"
              className="inline-flex size-12 items-center justify-center rounded-full border border-palm-green/15 bg-white text-palm-green shadow-[0_12px_28px_rgba(31,41,51,0.08)] transition hover:border-vye-pink hover:text-vye-pink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vye-pink"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next review"
              className="inline-flex size-12 items-center justify-center rounded-full bg-palm-green text-white shadow-[0_12px_28px_rgba(36,90,53,0.16)] transition hover:bg-vye-pink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vye-pink"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

        <div
          className="mt-10 overflow-hidden rounded-[2rem] border border-palm-green/10 bg-white shadow-[0_22px_65px_rgba(31,41,51,0.09)]"
          aria-live="polite"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                aria-hidden={activeIndex !== index}
                className="w-full shrink-0 px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
              >
                <div className="flex gap-1 text-xl text-vye-pink" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <span key={starIndex} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-7 max-w-5xl text-2xl font-black leading-[1.35] tracking-normal text-near-black sm:text-3xl lg:text-4xl">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-8">
                  <cite className="not-italic text-base font-black text-palm-green">
                    {testimonial.name}
                  </cite>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="mt-6 flex justify-center gap-2"
          aria-label="Choose a review"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={`${testimonial.name}-dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${activeIndex === index
                ? "w-9 bg-vye-pink"
                : "w-2.5 bg-palm-green/22 hover:bg-palm-green/45"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
