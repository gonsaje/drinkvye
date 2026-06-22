import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Vye",
  description: "Terms governing use of the Vye website and online store.",
};

const sections = [
  {
    title: "1. Website Use",
    copy: "You agree to use this Website only for lawful purposes and in compliance with all applicable laws and regulations.",
  },
  {
    title: "2. Products & Orders",
    copy: "All product descriptions, pricing, and availability are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including pricing errors, suspected fraud, or product availability.",
  },
  {
    title: "3. Payments",
    copy: "By placing an order, you confirm that you are authorized to use the selected payment method and that all information provided is accurate.",
  },
  {
    title: "4. Shipping",
    copy: "Shipping times are estimates only. VYE is not responsible for delays caused by carriers or incorrect shipping information provided by the customer. Ownership and risk of loss transfer upon delivery confirmation by the carrier.",
  },
  {
    title: "5. Returns & Refunds",
    copy: "Returns and refunds are governed by our separate Refund & Return Policy, available on this Website.",
    link: { href: "/refund-policy", label: "View the Refund & Return Policy" },
  },
  {
    title: "6. Product Information",
    copy: "Our organic coconut water is made from natural ingredients. Variations in color, taste, or natural sediment may occur and do not affect product quality. Product images are for illustration purposes only.",
  },
  {
    title: "7. Intellectual Property",
    copy: "All trademarks, logos, images, graphics, product names, and content on this Website are the property of VYE or its licensors and may not be copied, reproduced, or distributed without prior written permission.",
  },
  {
    title: "8. Disclaimer",
    copy: "The information on this Website is provided for general informational purposes only. We make no warranties regarding the accuracy, completeness, or availability of the Website or its content.",
  },
  {
    title: "9. Limitation of Liability",
    copy: "To the fullest extent permitted by law, VYE shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of this Website or our products.",
  },
  {
    title: "10. Third-Party Links",
    copy: "Our Website may contain links to third-party websites. We are not responsible for their content, policies, or practices.",
  },
  {
    title: "11. Privacy",
    copy: "Your use of this Website is also governed by our Privacy Policy.",
    link: { href: "/privacy", label: "View the Privacy Policy" },
  },
  {
    title: "12. Governing Law",
    copy: "These Terms shall be governed by and interpreted in accordance with the laws of the State of New York, without regard to its conflict of law principles.",
  },
  {
    title: "13. Changes to These Terms",
    copy: "We may update these Terms at any time. Continued use of the Website after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    title: "14. Contact Us",
    copy: "If you have any questions regarding these Terms, please contact VYE Organic Coconut Water at info@drinkvye.com.",
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
          Terms of Service
        </h1>
        <p className="mt-5 text-sm font-semibold text-near-black/52">
          Effective June 22, 2026
        </p>
        <p className="mt-8 max-w-3xl text-base leading-8 text-near-black/68">
          Welcome to the VYE Organic Coconut Water website
          (“drinkvye.com”). By accessing or using this Website, you agree to
          these Terms of Service. If you do not agree, please discontinue use
          of the Website.
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
              {section.link ? (
                <Link
                  href={section.link.href}
                  className="mt-4 inline-flex font-bold text-vye-pink underline decoration-palm-green/25 underline-offset-4 transition hover:text-palm-green"
                >
                  {section.link.label}
                </Link>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-8 text-base leading-8 text-near-black/68">
          <p>VYE Organic Coconut Water</p>
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
