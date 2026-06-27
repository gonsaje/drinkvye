import Image from "next/image";
import { Button } from "@/components/Button";

const simpleStandards = [
  "USDA Organic",
  "Never From Concentrate",
  "No Added Sugar",
  "Non-GMO",
  "Vegan",
];

const comparisonRows = [
  {
    label: "Serving Size",
    vye: "8 fl oz (240 mL)",
    vitaCoco: "8 fl oz (240 mL)",
    harmlessHarvest: "8 fl oz (240 mL)",
    leadingBrands: "8 fl oz (240 mL)",
  },
  {
    label: "Calories",
    vye: "25",
    vitaCoco: "45",
    harmlessHarvest: "60",
    leadingBrands: "45 - 70",
  },
  {
    label: "Total Sugars",
    vye: "5g",
    vitaCoco: "10g",
    harmlessHarvest: "14g",
    leadingBrands: "9 - 14g",
  },
  {
    label: "Added Sugars",
    vye: "0g",
    vitaCoco: "1g",
    harmlessHarvest: "0g",
    leadingBrands: "0 - 2g",
  },
  {
    label: "Potassium",
    vye: "570 mg",
    vitaCoco: "~470 mg",
    harmlessHarvest: "541 mg",
    leadingBrands: "400 - 550 mg",
  },
  {
    label: "Sodium",
    vye: "70 mg",
    vitaCoco: "60 mg",
    harmlessHarvest: "40 mg",
    leadingBrands: "60 - 100 mg",
  },
  {
    label: "Organic",
    vye: "Yes",
    vitaCoco: "Select SKUs only",
    harmlessHarvest: "Yes",
    leadingBrands: "Varies",
  },
  {
    label: "From Concentrate",
    vye: "No",
    vitaCoco: "No",
    harmlessHarvest: "No",
    leadingBrands: "Varies",
  },
];

const comparisonHighlights = [
  {
    icon: "sugar",
    title: "1/2 the sugar",
    text: "vs leading brands",
  },
  {
    icon: "calorie",
    title: "Low calorie",
    text: "only 25 calories per serving",
  },
  {
    icon: "potassium",
    title: "More potassium",
    text: "570mg to help replenish naturally",
  },
  {
    icon: "clean",
    title: "Clean & pure",
    text: "100% organic, never from concentrate",
  },
  {
    icon: "refreshing",
    title: "Naturally refreshing",
    text: "light, crisp, and delicious",
  },
] as const;

const comparisonColumns = [
  {
    key: "vye",
    title: "Vye",
    subtitle: "",
    image: "/vyeBottle.png",
    imageAlt: "Vye organic coconut water carton",
    imageClassName: "h-60 w-28 object-cover object-center sm:h-72 sm:w-32",
    featured: true,
  },
  {
    key: "vitaCoco",
    title: "Vita Coco",
    subtitle: "",
    image: "/vc-bottle.png",
    imageAlt: "Vita Coco original coconut water carton",
    imageClassName: "h-40 w-28 object-contain sm:h-48 sm:w-32",
    featured: false,
  },
  {
    key: "harmlessHarvest",
    title: "Harmless Harvest",
    subtitle: "",
    image: "/hh-bottle.png",
    imageAlt: "Harmless Harvest organic coconut water bottle",
    imageClassName: "h-40 w-24 object-contain sm:h-48 sm:w-28",
    featured: false,
  },
  {
    key: "leadingBrands",
    title: "Other Leading Brands",
    subtitle: "Example Average",
    image: "",
    imageAlt: "",
    imageClassName: "",
    featured: false,
  },
] as const;

function ComparisonHighlightIcon({
  icon,
}: {
  icon: (typeof comparisonHighlights)[number]["icon"];
}) {
  const commonProps = {
    "aria-hidden": true,
    className: "size-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.4,
    viewBox: "0 0 24 24",
  };

  if (icon === "sugar") {
    return (
      <svg {...commonProps}>
        <path d="M12 4v14" />
        <path d="m7 13 5 5 5-5" />
        <path d="M5 5h14" />
      </svg>
    );
  }

  if (icon === "calorie") {
    return (
      <svg {...commonProps}>
        <path d="M5 15a7 7 0 1 1 14 0" />
        <path d="m12 15 4-5" />
        <path d="M8 19h8" />
      </svg>
    );
  }

  if (icon === "potassium") {
    return (
      <svg {...commonProps}>
        <path d="M13 2 5 13h6l-1 9 9-13h-6l0-7Z" />
      </svg>
    );
  }

  if (icon === "clean") {
    return (
      <svg {...commonProps}>
        <path d="m5 12 4 4L19 6" />
        <path d="M7 20h10" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3C8 8 6 11.3 6 15a6 6 0 0 0 12 0c0-3.7-2-7-6-12Z" />
      <path d="M9.5 16.5c1.4 1.2 3.6 1.2 5 0" />
    </svg>
  );
}

export default function OurStoryPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_36%,#ffffff_68%,#fff4f8_84%,#fde8ef_100%)]">
      <section className="relative overflow-hidden bg-gradient-to-b from-vye-pink/24 via-coconut-cream to-white px-5 pb-16 pt-18 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black leading-tight tracking-normal text-palm-green sm:text-7xl">
            Our Source
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-xl sm:leading-9">
            Every Sip Begins with Better Coconuts.
          </p>
        </div>
      </section>

      <section className="relative bg-white px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:mt-4 sm:text-5xl">
              From the Mekong Delta
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Organically grown young coconuts from Southern Vietnam, where
              tropical rain and fertile soil create naturally refreshing
              coconut water.
            </p>
          </div>

          <div className="grid gap-4 ">
            <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] bg-coconut-cream shadow-[0_24px_70px_rgba(36,90,53,0.12)] sm:min-h-[520px] sm:rounded-[2rem]">
              <Image
                src="/coconut_boat.png"
                alt="Coconuts gathered along a waterway in Southern Vietnam"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_42%,#ffffff_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative flex aspect-square w-56 items-center justify-center rounded-full bg-white p-7 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:w-80 sm:p-8">
              <div className="absolute inset-5 rounded-full bg-vye-pink/12 blur-2xl" />
              <Image
                src="/electrolytes.png"
                alt="Electrolytes icon"
                width={449}
                height={463}
                className="relative h-[78%] w-[78%] object-contain"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:mt-4 sm:text-5xl">
              Naturally Rich in Electrolytes
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Packed with naturally occurring potassium and essential minerals
              to help keep you refreshed.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-vye-pink/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-palm-green/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-vye-display text-4xl font-semibold italic leading-tight tracking-normal text-near-black sm:text-6xl">
              Cleaner. <span className="text-vye-pink">Lighter.</span> Better.
            </h2>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-near-black/72 sm:text-lg">
              Lower calories. Less sugar. More of what matters.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-vye-pink/16 bg-white/92 shadow-[0_28px_80px_rgba(36,90,53,0.1)] backdrop-blur sm:rounded-[2rem]">
            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-4">
                  {comparisonColumns.map((column) => (
                    <div
                      key={column.key}
                      className={`border-r border-vye-pink/12 px-5 py-6 text-center last:border-r-0 ${column.featured
                        ? "bg-[linear-gradient(180deg,#ffe7f0_0%,#fff5f9_58%,#ffffff_100%)]"
                        : "bg-white"
                        }`}
                    >
                      {column.featured ? (
                        <Image
                          src="/vye_logo_pink_f36f98.png"
                          alt="Vye"
                          width={116}
                          height={62}
                          className="mx-auto h-auto w-24"
                        />
                      ) : (
                        <h3 className="font-neue-display text-lg font-black uppercase tracking-normal text-near-black">
                          {column.title}
                        </h3>
                      )}
                      {column.subtitle ? (
                        <p className="mt-1 min-h-10 text-sm leading-5 text-near-black/70">
                          {column.subtitle}
                        </p>
                      ) : (
                        <div className="mt-1 min-h-10" />
                      )}
                      <div className="mt-4 flex h-56 items-center justify-center">
                        {column.image ? (
                          <Image
                            src={column.image}
                            alt={column.imageAlt}
                            width={220}
                            height={260}
                            className={column.imageClassName}
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="relative h-48 w-24 opacity-45"
                          >
                            <div className="mx-auto h-9 w-10 rounded-t-md bg-neutral-400" />
                            <div className="mx-auto h-40 w-24 rounded-[1.25rem] bg-neutral-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {comparisonRows.map((row) => (
                  <div key={row.label} className="relative border-t border-vye-pink/12">
                    <div className="pointer-events-none sticky left-5 z-20 h-0">
                      <span className="relative top-1 ml-1 inline-flex text-[0.7rem] font-black uppercase tracking-[0.08em] text-near-black/70">
                        {row.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-4">
                      {comparisonColumns.map((column) => {
                        const value = row[column.key];
                        const isIcon =
                          (row.label === "Organic" ||
                            row.label === "From Concentrate") &&
                          (value === "Yes" || value === "No");

                        return (
                          <div
                            key={`${row.label}-${column.key}`}
                            className={`border-r border-vye-pink/12 px-5 pb-4 pt-8 text-center text-lg last:border-r-0 ${column.featured
                              ? "bg-vye-pink/[0.055] font-black text-vye-pink"
                              : "bg-white text-near-black"
                              }`}
                          >
                            {isIcon ? (
                              <span className="inline-flex size-8 items-center justify-center rounded-full border-2 border-vye-pink text-xl leading-none text-vye-pink">
                                {value === "Yes" ? "✓" : "×"}
                              </span>
                            ) : (
                              value
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-vye-pink/12 bg-white/88 p-3 shadow-[0_18px_55px_rgba(146,45,83,0.08)] sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(5,1fr)] lg:items-center">
            <div className="rounded-[1.1rem] bg-vye-pink px-5 py-4 text-white">
              <p className="text-sm font-medium uppercase tracking-[0.12em]">
                Vye Coconut Water
              </p>
              <p className="mt-1 text-xl font-black leading-tight">
                Better by nature. Better for you.
              </p>
            </div>
            {comparisonHighlights.map(({ icon, title, text }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-[1.1rem] bg-coconut-cream/70 px-4 py-4 lg:bg-transparent lg:px-2"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-vye-pink text-white shadow-[0_10px_26px_rgba(243,111,152,0.22)]">
                  <ComparisonHighlightIcon icon={icon} />
                </span>
                <p className="text-sm leading-5 text-near-black">
                  <span className="block font-black uppercase text-vye-pink">
                    {title}
                  </span>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-near-black/48">
            All nutrition facts per 8 fl oz (240 mL). Sources: brand websites
            and product labels.
          </p>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#fff8fb_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-vye-pink/14 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-10 h-64 w-64 rounded-full bg-palm-green/10 blur-3xl" />

          <div className="relative ml-auto max-w-4xl rotate-[0.8deg] overflow-hidden rounded-[1.5rem] bg-coconut-cream shadow-[0_28px_80px_rgba(36,90,53,0.14)] ring-1 ring-white/75 sm:rounded-[2.25rem] lg:rotate-[1.4deg]">
            <div className="relative min-h-[330px] sm:min-h-[560px] lg:min-h-[640px]">
              <Image
                src="/coconut_machete.png"
                alt="Young coconuts being prepared in Southern Vietnam"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-12 max-w-[92%] rotate-[-0.8deg] rounded-[1.5rem] bg-white/94 p-5 shadow-[0_22px_55px_rgba(146,45,83,0.14)] ring-1 ring-vye-pink/12 backdrop-blur sm:max-w-2xl sm:rotate-[-1.4deg] sm:rounded-[2rem] sm:p-8 lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2 lg:rotate-[-2deg]">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:text-5xl">
              Clean standards, simple ingredients
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-near-black/68 sm:mt-5 sm:text-lg sm:leading-8">
              Everything Vye leaves out is as intentional as what goes in:
              organic coconut water, made clean and easy to love.
            </p>
            <div className="mt-5 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              {simpleStandards.map((standard) => (
                <div
                  key={standard}
                  className="flex items-center gap-3 rounded-2xl bg-coconut-cream/85 px-4 py-3.5 text-sm font-black text-palm-green shadow-[0_10px_26px_rgba(31,41,51,0.04)] sm:py-4 sm:text-base"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-vye-pink text-sm text-white">
                    ✓
                  </span>
                  {standard}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8fb_0%,#fff1f6_42%,#fde8ef_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:text-5xl">
              Light. Crisp. Refreshing.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Made with one simple ingredient: organic coconut water.
            </p>
            <Button href="/shop" className="mt-8">
              Discover Vye
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-xl px-1 py-5 sm:px-6 sm:py-6">
            <div className="absolute -left-2 top-14 h-40 w-40 rounded-full bg-vye-pink/20 blur-3xl" />
            <div className="absolute -right-2 bottom-10 h-44 w-44 rounded-full bg-palm-green/12 blur-3xl" />
            <div className="relative rotate-[1.2deg] bg-white p-3 pb-16 shadow-[0_24px_62px_rgba(146,45,83,0.16)] ring-1 ring-vye-pink/10 sm:rotate-[2deg] sm:p-5 sm:pb-24">
              <div className="relative h-[320px] overflow-hidden bg-[#fff6fa] min-[430px]:h-[370px] sm:h-[470px]">
                <Image
                  src="/refreshing_vye.png"
                  alt="Refreshing Vye organic coconut water served chilled"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
              <p className="absolute inset-x-4 bottom-5 text-center font-vye-display text-[1.65rem] leading-none text-palm-green sm:inset-x-6 sm:bottom-8 sm:text-4xl">
                Hydrate Better, Live Better
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
