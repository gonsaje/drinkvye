"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Button } from "@/components/Button";

const certifications = [
  {
    name: "USDA Organic",
    image: "/usdaorganic.png",
    width: 840,
    height: 488,
  },
  {
    name: "Kosher",
    image: "/star-kosher.png",
    width: 320,
    height: 320,
  },
  {
    name: "Halal certified",
    image: "/halal-ribbon.png",
    width: 800,
    height: 800,
  },
  {
    name: "Non-GMO Project Verified",
    image: "/non-gmo-logo.jpg",
    width: 400,
    height: 293,
  },
];

const slides = ["product", "retail"] as const;
const AUTOPLAY_DELAY_MS = 6500;
const DRAG_THRESHOLD_PX = 48;

type SlideId = (typeof slides)[number];

function CertificationStrip({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={
        desktop
          ? "mt-10 hidden max-w-full flex-wrap items-center justify-center gap-5 opacity-80 max-[390px]:gap-3 sm:flex sm:justify-start"
          : "mt-3 flex max-w-full items-center justify-center gap-6 opacity-90 max-[390px]:gap-5"
      }
    >
      {certifications.map((certification) => (
        <div
          key={certification.name}
          className={
            desktop
              ? "flex h-10 w-14 items-center justify-center max-[390px]:h-9 max-[390px]:w-12 sm:h-12 sm:w-16"
              : "flex h-12 w-12 items-center justify-center max-[390px]:h-10 max-[390px]:w-10"
          }
          title={certification.name}
        >
          <Image
            src={certification.image}
            alt={certification.name}
            width={certification.width}
            height={certification.height}
            className="max-h-full max-w-full object-contain drop-shadow-[0_6px_12px_rgba(31,41,51,0.1)]"
            sizes={desktop ? "64px" : "48px"}
          />
        </div>
      ))}
    </div>
  );
}

function ProductHeroSlide() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/vye_main_mobile.png"
        alt="Vye coconut water with coconut and glass on a pink tropical background"
        fill
        priority
        className="object-cover object-center sm:hidden"
        sizes="100vw"
      />
      <Image
        src="/vye_main.png"
        alt="Vye coconut water with coconut and glass on a pink tropical background"
        fill
        priority
        className="hidden object-cover object-[62%_center] sm:block"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,246,249,0.92)_0%,rgba(255,246,249,0.64)_25%,rgba(255,246,249,0.18)_44%,rgba(255,246,249,0)_64%)] sm:bg-[linear-gradient(90deg,rgba(255,248,237,0.9)_0%,rgba(255,241,246,0.78)_34%,rgba(255,241,246,0.32)_56%,rgba(255,241,246,0.02)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#f9c8d8]/18 to-[#f9c8d8] sm:h-32 sm:via-[#f9c8d8]/38" />

      <div className="relative mx-auto flex min-h-[760px] w-full max-w-7xl flex-col justify-between px-5 pb-16 pt-20 min-[430px]:min-h-[800px] sm:min-h-[max(430px,41.92vw)] sm:justify-center sm:px-8 sm:pb-28 sm:pt-24 md:pb-32 md:pt-28">
        <div className="relative z-10 mx-auto min-w-0 max-w-[22rem] text-center sm:mx-0 sm:max-w-2xl sm:text-left">
          <h1 className="font-vye-display max-w-full text-[3.2rem] leading-[0.98] tracking-normal text-palm-green max-[390px]:text-[3rem] sm:text-7xl sm:leading-[0.95] lg:text-8xl">
            Nature&apos;s Hydration Perfected
          </h1>
          <p className="mx-auto mt-5 max-w-[17rem] text-[1.35rem] font-medium leading-[1.28] text-near-black max-[390px]:text-[1.32rem] sm:mx-0 sm:mt-4 sm:max-w-xl sm:text-xl sm:font-semibold sm:leading-8">
            Hydrate Better, Live Better
          </p>
          <div className="mt-10 hidden max-w-full gap-3 sm:flex sm:flex-row">
            <Button
              href="/shop"
              className="w-full max-w-full rounded-full border-2 border-vye-pink bg-vye-pink px-4 text-white shadow-[0_16px_32px_rgba(243,111,152,0.22)] hover:bg-transparent hover:text-vye-pink hover:shadow-none sm:w-auto sm:px-8"
            >
              Discover Vye
            </Button>
          </div>
          <CertificationStrip desktop />
        </div>

        <div className="relative z-10 -translate-y-4 sm:hidden">
          <div className="grid max-w-full grid-cols-1 gap-4">
            <Button
              href="/shop"
              className="min-h-[52px] w-full max-w-full rounded-full border border-white/70 bg-vye-pink px-3 text-base text-white shadow-[0_12px_24px_rgba(243,111,152,0.18)] hover:border-vye-pink hover:bg-transparent hover:text-vye-pink hover:shadow-none"
            >
              Discover Vye
            </Button>
          </div>
          <CertificationStrip />
        </div>
      </div>
    </div>
  );
}

function RetailCollage() {
  return (
    <div className="relative mx-auto min-h-[285px] w-full max-w-[28rem] min-[430px]:min-h-[315px] sm:min-h-[330px] md:min-h-[380px] lg:max-w-none lg:min-h-[470px] xl:min-h-[500px]">
      <div className="absolute left-0 top-12 z-10 h-[68%] w-[66%] overflow-hidden rounded-[1.65rem] bg-white shadow-[0_22px_52px_rgba(31,41,51,0.18)] ring-1 ring-white/80 sm:top-12 sm:h-[70%] sm:rounded-[2rem] md:left-3 md:w-[65%] lg:left-0 lg:top-14 lg:h-[72%] lg:w-[68%] xl:left-4">
        <Image
          src="/vye-display-1.png"
          alt="Vye coconut water retail shelf display"
          fill
          className="object-cover object-[50%_40%] sm:object-[50%_42%]"
          sizes="(min-width: 1024px) 34vw, 68vw"
        />
      </div>

      <div className="absolute bottom-3 right-0 z-20 h-[40%] w-[44%] overflow-hidden rounded-[1.35rem] bg-white shadow-[0_18px_40px_rgba(36,90,53,0.18)] ring-[5px] ring-[#fff7fa]/85 sm:bottom-5 sm:right-4 sm:h-[42%] sm:w-[42%] sm:rounded-[1.7rem] md:right-7 lg:right-0 lg:w-[43%] xl:right-3">
        <Image
          src="/vye-store-display-2.png"
          alt="Coconut water retail endcap with Vye products"
          fill
          className="object-cover object-[48%_42%] sm:object-[47%_46%]"
          sizes="(min-width: 1024px) 20vw, 45vw"
        />
      </div>

      <div className="absolute right-3 top-4 z-[15] aspect-square w-[33%] overflow-hidden rounded-[1.2rem] bg-white shadow-[0_16px_34px_rgba(31,41,51,0.14)] ring-[4px] ring-white/85 sm:right-5 sm:top-5 sm:z-30 sm:w-[29%] sm:rounded-[1.45rem] md:right-8 lg:right-4 lg:top-6 lg:w-[28%] xl:right-8">
        <Image
          src="/vye-display-4.png"
          alt="Vye coconut water shelf placement"
          fill
          className="object-cover object-[44%_55%]"
          sizes="(min-width: 1024px) 15vw, 34vw"
        />
      </div>

      <div className="absolute bottom-2 left-8 z-0 h-20 w-20 rounded-full bg-coconut-green/45 blur-2xl" />
      <div className="absolute right-10 top-10 z-0 h-24 w-24 rounded-full bg-vye-pink/14 blur-2xl" />
    </div>
  );
}

function RetailHeroSlide() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#f9c8d8_0%,#fbd0df_46%,#f9c8d8_100%)]">
      <Image
        src="/vye-map.png"
        alt="Map showing Vye retail availability across New York"
        fill
        className="object-cover object-[52%_48%] opacity-[0.34]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,246,249,0.68)_0%,rgba(249,200,216,0.42)_42%,rgba(249,200,216,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#f9c8d8]/34 to-[#f9c8d8]" />
      <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-white/32 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-coconut-green/16 blur-3xl" />

      <div className="relative mx-auto grid min-h-[760px] w-full max-w-7xl items-center gap-4 px-5 pb-14 pt-18 min-[430px]:min-h-[800px] sm:min-h-[max(430px,41.92vw)] sm:grid-cols-[0.9fr_1.1fr] sm:gap-6 sm:px-8 sm:pb-16 sm:pt-20 md:gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:pb-18 lg:pt-22">
        <div className="relative z-30 mx-auto max-w-xl rounded-[1.65rem] bg-white/88 p-5 text-center shadow-[0_20px_54px_rgba(31,41,51,0.1)] ring-1 ring-white/80 backdrop-blur-sm sm:p-6 lg:mx-0 lg:rounded-[2rem] lg:p-8 lg:text-left">
          <h2 className="text-[2rem] font-black leading-[1] tracking-normal text-palm-green max-[390px]:text-[1.82rem] sm:text-[2.3rem] md:text-[2.65rem] lg:text-[3.35rem] xl:text-[3.75rem]">
            Now available in 300+ retail locations across New York.
          </h2>
          <p className="mt-4 text-sm font-medium leading-6 text-near-black/72 sm:text-base md:text-lg">
            Growing every month through leading independent markets and grocery
            stores.
          </p>
          <Button
            href="/wholesale"
            className="mt-5 w-full rounded-full border-2 border-vye-pink bg-vye-pink px-6 text-white shadow-[0_16px_32px_rgba(243,111,152,0.22)] hover:bg-transparent hover:text-vye-pink hover:shadow-none sm:w-auto lg:mt-7"
          >
            Get in Touch
          </Button>
        </div>

        <RetailCollage />
      </div>
      <div className="absolute right-6 top-24 z-30 hidden rounded-full border border-vye-pink/18 bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-palm-green shadow-[0_14px_32px_rgba(36,90,53,0.12)] sm:block sm:right-10 sm:top-28 sm:px-5 sm:py-2.5 lg:right-[max(2.5rem,calc((100vw-80rem)/2))]">
        300+ Locations
      </div>
    </div>
  );
}

export function HomeHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState<SlideId>("product");
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragWidth, setDragWidth] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLElement>(null);
  const dragStartXRef = useRef(0);
  const activeIndex = slides.indexOf(activeSlide);
  const dragPercent = isDragging ? (dragOffset / dragWidth) * 100 : 0;

  function goToSlide(slide: SlideId) {
    setActiveSlide(slide);
  }

  function goToNextSlide() {
    setActiveSlide((currentSlide) => {
      const currentIndex = slides.indexOf(currentSlide);
      return slides[(currentIndex + 1) % slides.length];
    });
  }

  function goToPreviousSlide() {
    setActiveSlide((currentSlide) => {
      const currentIndex = slides.indexOf(currentSlide);
      return slides[(currentIndex - 1 + slides.length) % slides.length];
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    if ((event.target as HTMLElement).closest("a, button")) return;

    dragStartXRef.current = event.clientX;
    setDragWidth(viewportRef.current?.clientWidth ?? 1);
    setDragOffset(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!isDragging) return;
    setDragOffset(event.clientX - dragStartXRef.current);
  }

  function finishDrag() {
    if (!isDragging) return;

    if (dragOffset <= -DRAG_THRESHOLD_PX) {
      goToNextSlide();
    } else if (dragOffset >= DRAG_THRESHOLD_PX) {
      goToPreviousSlide();
    }

    setDragOffset(0);
    setIsDragging(false);
  }

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) return;

    if (!isPlaying || isDragging) return;

    const autoplayTimer = window.setInterval(
      goToNextSlide,
      AUTOPLAY_DELAY_MS,
    );

    return () => window.clearInterval(autoplayTimer);
  }, [isDragging, isPlaying]);

  return (
    <section
      className="relative min-h-[760px] overflow-hidden bg-[#f9c8d8] min-[430px]:min-h-[800px] sm:min-h-[max(430px,41.92vw)]"
      ref={viewportRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <div
        className={`absolute inset-y-0 left-0 flex w-[200%] touch-pan-y ${isDragging
          ? "transition-none"
          : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }`}
        style={{
          transform: `translateX(calc(-${activeIndex * 50}% + ${dragPercent / 2}%))`,
        }}
      >
        <div
          className="relative w-1/2 shrink-0"
          aria-hidden={activeSlide !== "product"}
          inert={activeSlide !== "product"}
        >
          <ProductHeroSlide />
        </div>
        <div
          className="relative w-1/2 shrink-0"
          aria-hidden={activeSlide !== "retail"}
          inert={activeSlide !== "retail"}
        >
          <RetailHeroSlide />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 z-40 flex items-center justify-center gap-3 sm:bottom-6">
        {slides.map((slide) => (
          <button
            key={slide}
            type="button"
            aria-label={
              slide === "product"
                ? "Show Vye product hero"
                : "Show Vye retail availability hero"
            }
            aria-pressed={activeSlide === slide}
            onClick={() => goToSlide(slide)}
            className={`h-2.5 rounded-full transition ${activeSlide === slide
              ? "w-9 bg-vye-pink"
              : "w-2.5 bg-white/82 hover:bg-white"
              }`}
          />
        ))}
        <button
          type="button"
          aria-label={isPlaying ? "Pause hero carousel" : "Play hero carousel"}
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((current) => !current)}
          className="ml-1 inline-flex size-9 items-center justify-center text-white drop-shadow-[0_2px_8px_rgba(31,41,51,0.22)] transition hover:scale-105 hover:text-white/82"
        >
          {isPlaying ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
            >
              <path d="M7 5h3v14H7V5Zm7 0h3v14h-3V5Z" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
