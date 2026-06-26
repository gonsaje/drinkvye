"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Finally found a drink that’s healthy and delicious. Great after workouts or hot summer days.",
    name: "James W.",
  },
  {
    quote:
      "Absolutely love the taste! Feels super fresh and keeps me hydrated throughout my busy day.",
    name: "Emily J.",
  },
  {
    quote:
      "I drink this daily. Pure, natural, and no sugar—just what I needed for clean hydration.",
    name: "Michael C.",
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

function PlaybackIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
    >
      {isPlaying ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
      )}
    </svg>
  );
}

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragOffsetRef = useRef(0);
  const isHorizontalDragRef = useRef(false);

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

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = window.setInterval(showNext, 5_000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isPlaying]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return;

    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragOffsetRef.current = 0;
    isHorizontalDragRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const dragStart = dragStartRef.current;

    if (!dragStart) return;

    const distanceX = event.clientX - dragStart.x;
    const distanceY = event.clientY - dragStart.y;

    if (
      !isHorizontalDragRef.current &&
      Math.abs(distanceY) > Math.abs(distanceX)
    ) {
      return;
    }

    isHorizontalDragRef.current = true;
    dragOffsetRef.current = distanceX;
    setDragOffset(distanceX);
  }

  function finishSwipe() {
    if (!dragStartRef.current) return;

    if (dragOffsetRef.current <= -50) showNext();
    if (dragOffsetRef.current >= 50) showPrevious();

    dragStartRef.current = null;
    dragOffsetRef.current = 0;
    isHorizontalDragRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
  }

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fff7fa_48%,#fde8ef_100%)] px-5 py-18 sm:px-8 sm:py-24"
    >
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = 0.75;
        }}
        poster="/young_coconuts_bg.jpeg"
        preload="metadata"
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/334302.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,247,250,0.44)_48%,rgba(253,232,239,0.68)_100%)]" />
      <div className="absolute inset-0 bg-palm-green/8" />
      <div className="pointer-events-none absolute -left-20 top-12 size-56 rounded-full bg-coconut-green/24 blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 size-64 rounded-full bg-vye-pink/14 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

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
          className="mt-10 touch-pan-y overflow-hidden"
          aria-live={isPlaying ? "off" : "polite"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishSwipe}
          onPointerCancel={finishSwipe}
        >
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-in-out"
              }`}
            style={{
              transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                aria-hidden={activeIndex !== index}
                className="flex w-full shrink-0 flex-col items-center px-6 py-10 text-center sm:px-12 sm:py-14 lg:px-16 lg:py-16"
              >
                <div
                  className="flex justify-center gap-2 rounded-full bg-white/72 px-5 py-2 text-3xl text-vye-pink shadow-[0_10px_26px_rgba(243,111,152,0.18)] backdrop-blur-sm drop-shadow-[0_2px_0_rgba(255,255,255,0.85)] sm:text-4xl"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <span key={starIndex} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mx-auto mt-7 max-w-5xl text-2xl font-black leading-[1.35] tracking-normal text-white sm:text-3xl lg:text-4xl">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-8">
                  <cite className="not-italic text-base font-black text-white">
                    {testimonial.name}
                  </cite>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center">
          <div
            className="col-start-2 flex justify-center gap-2"
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

          <button
            type="button"
            onClick={() => setIsPlaying((currentValue) => !currentValue)}
            aria-label={
              isPlaying
                ? "Pause automatic review rotation"
                : "Play automatic review rotation"
            }
            aria-pressed={!isPlaying}
            className="col-start-3 inline-flex size-11 justify-self-end items-center justify-center rounded-full border border-palm-green/15 bg-white/90 text-palm-green shadow-[0_10px_24px_rgba(31,41,51,0.1)] backdrop-blur-sm transition hover:border-vye-pink hover:text-vye-pink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vye-pink"
          >
            <PlaybackIcon isPlaying={isPlaying} />
          </button>
        </div>
      </div>
    </section>
  );
}
