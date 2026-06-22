import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vye",
  description: "Terms governing use of the Vye website and online store.",
};

const sections = [
  {
    title: "Website use",
    copy: "You may use this website for lawful personal or business purposes. You may not interfere with its operation, misuse its content, attempt unauthorized access, or use it in a way that violates applicable law.",
  },
  {
    title: "Products and orders",
    copy: "Product descriptions, availability, packaging, and pricing may change. An order is accepted only after payment is successfully completed. We may cancel or limit an order when necessary because of inventory, payment, shipping, fraud, or listing errors.",
  },
  {
    title: "Shipping",
    copy: "Shipping charges and available delivery options are presented during checkout. Delivery estimates are not guarantees and may be affected by carriers, weather, holidays, address issues, and events outside our control.",
  },
  {
    title: "Wholesale inquiries",
    copy: "Submitting a wholesale application does not create a supply agreement, guarantee approval, establish pricing, or reserve inventory. Wholesale terms must be confirmed separately in writing.",
  },
  {
    title: "Product information",
    copy: "Follow all packaging, storage, and use instructions. Website information is provided for general informational purposes and is not medical or nutritional advice.",
  },
  {
    title: "Intellectual property",
    copy: "Vye names, branding, designs, photographs, text, and other website content are owned by or licensed to Vye and may not be reproduced or commercially used without permission.",
  },
  {
    title: "Limitations",
    copy: "To the maximum extent permitted by law, the website is provided without guarantees of uninterrupted or error-free operation. Nothing in these terms excludes rights or liabilities that cannot legally be excluded.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_55%,rgba(251,215,227,0.45)_100%)] px-5 py-20 sm:px-8 sm:py-28">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-vye-pink">
          legal
        </p>
        <h1 className="mt-5 text-5xl font-black tracking-normal text-near-black sm:text-6xl">
          Terms & Conditions
        </h1>
        <p className="mt-5 text-sm font-semibold text-near-black/52">
          Last updated June 2026
        </p>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-palm-green/10 bg-white px-6 py-4 shadow-[0_20px_60px_rgba(31,41,51,0.08)] sm:px-10 sm:py-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-palm-green/10 py-7 last:border-b-0"
            >
              <h2 className="text-2xl font-black text-palm-green">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-near-black/68">
                {section.copy}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-8 text-base leading-8 text-near-black/68">
          Questions about these terms may be sent to{" "}
          <a
            href="mailto:info@drinkvye.com"
            className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
          >
            info@drinkvye.com
          </a>
          .
        </p>
      </article>
    </div>
  );
}
