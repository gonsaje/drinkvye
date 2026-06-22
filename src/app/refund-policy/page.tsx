import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Vye",
  description: "Vye shipping, refund, return, and replacement policy.",
};

const sections = [
  {
    title: "Shipping",
    copy: "Orders are typically processed and shipped within 5 business days after payment has been received. Delivery times may vary depending on your location and the shipping carrier.",
  },
  {
    title: "Perishable Products",
    copy: "Because our coconut water is a perishable beverage, all beverage products are non-returnable.",
    paragraphs: [
      "If your order arrives damaged, defective, or incorrect, please contact us within 10 days of delivery. We will gladly provide a replacement or refund after reviewing your request.",
      "To help us process your claim, please email clear photos of the damaged product and packaging.",
    ],
  },
  {
    title: "Non-Perishable Products",
    copy: "Non-perishable merchandise may be returned within 30 days of delivery for a full refund or exchange, excluding original shipping charges, provided that the item is:",
    items: [
      "Unused",
      "In its original condition",
      "In its original packaging",
    ],
    note: "Proof of purchase may be required.",
  },
  {
    title: "Refund Processing",
    copy: "Approved refunds will be issued to your original payment method. Please allow 5–10 business days for your financial institution to process the refund after it has been approved.",
  },
  {
    title: "Contact Us",
    copy: "For return requests or questions, please contact us at info@drinkvye.com.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_55%,rgba(251,215,227,0.45)_100%)] px-5 py-20 sm:px-8 sm:py-28">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-vye-pink">
          customer care
        </p>
        <h1 className="mt-5 text-5xl font-black tracking-normal text-near-black sm:text-6xl">
          Refund & Return Policy
        </h1>
        <p className="mt-5 text-sm font-semibold text-near-black/52">
          Effective June 22, 2026
        </p>
        <p className="mt-8 max-w-3xl text-base leading-8 text-near-black/68">
          At VYE Organic Coconut Water, we want you to be completely satisfied
          with your purchase.
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
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-base leading-8 text-near-black/68"
                >
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-4 grid gap-2 pl-5 text-base leading-7 text-near-black/68">
                  {section.items.map((item) => (
                    <li key={item} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.note ? (
                <p className="mt-4 text-base font-semibold leading-8 text-near-black/68">
                  {section.note}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-8 text-base leading-8 text-near-black/68">
          <p>
            Email:{" "}
            <a
              href="mailto:info@drinkvye.com"
              className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
            >
              info@drinkvye.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://www.drinkvye.com"
              className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
            >
              www.drinkvye.com
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
