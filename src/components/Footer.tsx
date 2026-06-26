"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const exploreLinks = [
  { href: "/shop", label: "Shop Vye" },
  { href: "/our-source", label: "Our Source" },
  { href: "/find-us", label: "Find Us" },
];

const supportLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/wholesale", label: "Wholesale" },
];

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_VYE_INSTAGRAM_URL || "https://instagram.com",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: process.env.NEXT_PUBLIC_VYE_FACEBOOK_URL || "https://facebook.com",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: process.env.NEXT_PUBLIC_VYE_X_URL || "https://x.com",
    label: "X",
    icon: "x",
  },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
      >
        <path d="M13.7 21v-8h2.8l.4-3.1h-3.2V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5V13h2.8v8h3.4Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
    >
      <path d="M4.3 3h4.4l4 5.7L17.6 3h2.1l-6.1 7.2L20.3 21h-4.4l-4.5-6.4L6 21H3.8l6.7-7.9L4.3 3Zm3.3 1.7H6.8l10 14.6h.8L7.6 4.7Z" />
    </svg>
  );
}

type FooterProps = {
  backgroundColor?: string;
  variant?: "full" | "rounded";
};

function getFooterBackground(pathname: string) {
  if (pathname === "/find-us") return "#fabed1";
  if (pathname === "/shop") return "#b6dd6843";
  if (pathname === "/our-source") return "#fabed1";
  if (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/refund-policy"
  ) {
    return "#fdedf2";
  }

  if (
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/checkout/success" ||
    pathname === "/contact"
  ) {
    return "#f2faf8";
  }

  return "#ffffff";
}

export function Footer({
  backgroundColor,
  variant = "full",
}: FooterProps) {
  const pathname = usePathname();
  const resolvedBackgroundColor =
    backgroundColor ?? getFooterBackground(pathname);
  const footerContent = (
    <div
      className={`relative overflow-hidden bg-[#fde8ef] text-vye-pink ${variant === "rounded"
        ? "mx-4 rounded-t-[2rem] sm:mx-6 sm:rounded-t-[2.5rem] lg:mx-8"
        : ""
        }`}
    >
      <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2.35fr] lg:items-start lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="Vye home"
              className="inline-flex transition hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="block h-24 w-[150px] bg-vye-pink transition sm:h-32 sm:w-[200px]"
                style={{
                  WebkitMaskImage: "url(/vye_logo_pink_f36f98.png)",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskImage: "url(/vye_logo_pink_f36f98.png)",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </Link>

            <p className="mt-7 text-base font-black uppercase tracking-[0.18em] sm:text-lg">
              Organic Coconut Water
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:max-w-3xl lg:gap-8">
            <div>
              <h3 className="text-base font-black uppercase tracking-[0.2em]">
                Explore
              </h3>
              <nav className="mt-9 flex flex-col items-start gap-6">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-bold uppercase tracking-[0.16em] transition hover:text-palm-green"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="text-base font-black uppercase tracking-[0.2em]">
                Support
              </h3>
              <nav className="mt-9 flex flex-col items-start gap-6">
                {supportLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-bold uppercase tracking-[0.16em] transition hover:text-palm-green"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/refund-policy"
                  className="text-lg font-bold uppercase tracking-[0.16em] transition hover:text-palm-green"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="text-base font-black uppercase tracking-[0.2em]">
                Follow Us
              </h3>
              <nav className="mt-9 flex flex-wrap items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex size-12 items-center justify-center text-vye-pink transition hover:text-palm-green"
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-end">
          <div className="text-center text-sm font-bold leading-7 sm:text-base lg:text-left">
            <p className="whitespace-nowrap">
              © {new Date().getFullYear()} Vye Brands Inc. All Rights Reserved.
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 213 136"
              className="hidden"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M 174 126 L 173 127 L 168 127 L 167 128 L 166 128 L 165 129 L 163 129 L 165 129 L 166 128 L 167 128 L 168 127 L 173 127 L 174 126 L 175 126 L 176 127 L 180 127 L 181 128 L 183 128 L 184 129 L 185 129 L 186 130 L 188 130 L 189 131 L 190 131 L 191 132 L 195 132 L 196 133 L 200 133 L 201 132 L 205 132 L 206 131 L 208 131 L 209 130 L 210 130 L 208 130 L 207 131 L 206 131 L 205 132 L 201 132 L 200 133 L 197 133 L 196 132 L 192 132 L 191 131 L 190 131 L 189 130 L 187 130 L 186 129 L 185 129 L 184 128 L 182 128 L 181 127 L 176 127 L 175 126 Z M 159 111 L 158 112 L 154 112 L 153 113 L 152 113 L 151 114 L 150 114 L 151 114 L 152 113 L 153 113 L 154 112 L 158 112 L 159 111 L 163 111 L 164 112 L 167 112 L 168 113 L 169 113 L 170 114 L 172 114 L 173 115 L 174 115 L 175 116 L 177 116 L 178 117 L 183 117 L 184 118 L 185 117 L 190 117 L 191 116 L 192 116 L 193 115 L 195 115 L 193 115 L 192 116 L 191 116 L 190 117 L 179 117 L 178 116 L 176 116 L 175 115 L 174 115 L 173 114 L 171 114 L 170 113 L 169 113 L 168 112 L 164 112 L 163 111 Z M 155 91 L 154 92 L 146 92 L 145 93 L 141 93 L 140 94 L 137 94 L 136 95 L 133 95 L 132 96 L 131 96 L 130 97 L 128 97 L 127 98 L 126 98 L 125 99 L 124 99 L 125 99 L 126 98 L 128 98 L 129 97 L 130 97 L 131 96 L 133 96 L 134 95 L 136 95 L 137 94 L 141 94 L 142 93 L 145 93 L 146 92 L 170 92 L 171 93 L 176 93 L 177 94 L 180 94 L 181 95 L 184 95 L 185 96 L 188 96 L 189 97 L 190 97 L 191 98 L 193 98 L 194 99 L 196 99 L 197 100 L 199 100 L 198 100 L 197 99 L 195 99 L 194 98 L 192 98 L 191 97 L 189 97 L 188 96 L 186 96 L 185 95 L 182 95 L 181 94 L 178 94 L 177 93 L 172 93 L 171 92 L 156 92 Z M 94 2 L 89 7 L 89 8 L 88 9 L 88 19 L 89 20 L 89 21 L 88 22 L 87 22 L 84 19 L 83 19 L 81 17 L 80 17 L 79 16 L 77 16 L 76 15 L 75 15 L 74 14 L 62 14 L 62 15 L 63 15 L 64 16 L 65 16 L 66 17 L 67 17 L 69 19 L 70 19 L 77 26 L 77 27 L 76 28 L 73 28 L 72 29 L 70 29 L 69 30 L 67 30 L 65 32 L 64 32 L 57 39 L 57 41 L 54 44 L 53 44 L 52 43 L 52 42 L 53 41 L 53 37 L 54 36 L 54 29 L 53 29 L 49 33 L 49 35 L 48 36 L 48 43 L 49 44 L 49 46 L 48 47 L 44 43 L 43 43 L 42 42 L 41 42 L 39 40 L 37 40 L 36 39 L 26 39 L 26 40 L 27 40 L 28 41 L 30 41 L 32 43 L 33 43 L 34 44 L 35 44 L 38 47 L 39 47 L 41 49 L 41 50 L 40 51 L 37 51 L 36 52 L 35 52 L 34 53 L 32 53 L 30 55 L 29 55 L 25 59 L 25 60 L 24 61 L 27 61 L 28 60 L 32 60 L 33 59 L 38 59 L 39 58 L 43 58 L 44 59 L 44 60 L 43 61 L 43 66 L 42 67 L 42 73 L 41 74 L 41 84 L 40 85 L 40 89 L 40 86 L 41 85 L 41 75 L 42 74 L 42 68 L 43 67 L 43 61 L 44 60 L 44 58 L 46 56 L 47 56 L 46 56 L 45 55 L 45 52 L 47 50 L 48 50 L 47 50 L 46 49 L 46 48 L 47 47 L 49 47 L 50 48 L 50 52 L 49 53 L 49 59 L 48 60 L 48 68 L 47 69 L 47 89 L 48 90 L 47 89 L 47 71 L 48 70 L 48 61 L 49 60 L 49 54 L 50 53 L 50 48 L 56 42 L 57 42 L 58 41 L 59 41 L 60 40 L 62 40 L 63 39 L 69 39 L 71 41 L 70 42 L 68 42 L 67 43 L 66 43 L 65 44 L 64 44 L 62 46 L 61 46 L 56 51 L 52 51 L 53 51 L 55 53 L 56 52 L 59 52 L 60 53 L 61 53 L 62 54 L 64 54 L 66 56 L 67 56 L 72 61 L 72 62 L 71 63 L 70 62 L 68 62 L 67 61 L 64 61 L 63 60 L 61 60 L 60 59 L 58 59 L 57 58 L 56 58 L 55 57 L 54 57 L 53 56 L 52 56 L 53 56 L 54 57 L 55 57 L 56 58 L 57 58 L 58 59 L 59 59 L 60 60 L 62 60 L 63 61 L 66 61 L 67 62 L 69 62 L 70 63 L 73 63 L 74 64 L 74 63 L 71 60 L 71 59 L 69 57 L 68 57 L 66 55 L 65 55 L 64 54 L 63 54 L 62 53 L 61 53 L 60 52 L 58 52 L 57 51 L 58 50 L 58 49 L 59 48 L 60 48 L 63 45 L 64 45 L 65 44 L 66 44 L 67 43 L 68 43 L 69 42 L 70 42 L 71 41 L 73 41 L 73 40 L 71 40 L 69 38 L 70 37 L 75 37 L 76 36 L 81 36 L 82 35 L 84 35 L 85 34 L 86 35 L 86 37 L 85 38 L 85 39 L 84 40 L 84 41 L 83 42 L 83 43 L 82 44 L 82 46 L 81 47 L 81 50 L 80 51 L 80 56 L 79 57 L 79 60 L 80 60 L 83 57 L 84 58 L 84 89 L 83 90 L 82 90 L 81 89 L 75 89 L 74 90 L 65 90 L 64 91 L 60 91 L 59 92 L 57 92 L 56 93 L 53 93 L 52 94 L 50 94 L 49 95 L 48 95 L 47 96 L 45 96 L 44 97 L 42 97 L 41 98 L 40 98 L 39 99 L 38 99 L 37 100 L 35 100 L 34 101 L 33 101 L 32 102 L 31 102 L 30 103 L 28 103 L 27 104 L 26 104 L 25 105 L 23 105 L 22 106 L 20 106 L 19 107 L 17 107 L 16 108 L 13 108 L 12 109 L 7 109 L 6 110 L 2 110 L 6 110 L 7 109 L 12 109 L 13 108 L 16 108 L 17 107 L 19 107 L 20 106 L 22 106 L 23 105 L 25 105 L 26 104 L 27 104 L 28 103 L 30 103 L 31 102 L 32 102 L 33 101 L 35 101 L 36 100 L 37 100 L 38 99 L 39 99 L 40 98 L 42 98 L 43 97 L 44 97 L 45 96 L 47 96 L 48 95 L 50 95 L 51 94 L 52 94 L 53 93 L 56 93 L 57 92 L 59 92 L 60 91 L 65 91 L 66 90 L 76 90 L 77 89 L 80 89 L 81 90 L 89 90 L 90 91 L 93 91 L 94 92 L 97 92 L 98 93 L 100 93 L 101 94 L 103 94 L 104 95 L 105 95 L 106 96 L 107 96 L 108 97 L 110 97 L 111 98 L 112 98 L 113 99 L 114 99 L 115 100 L 116 100 L 117 101 L 118 101 L 119 102 L 120 102 L 121 103 L 122 103 L 123 104 L 125 104 L 126 105 L 127 105 L 128 106 L 130 106 L 131 107 L 133 107 L 134 108 L 137 108 L 138 109 L 139 109 L 138 108 L 135 108 L 134 107 L 132 107 L 131 106 L 129 106 L 128 105 L 126 105 L 125 104 L 124 104 L 123 103 L 122 103 L 121 102 L 120 102 L 119 101 L 118 101 L 117 100 L 116 100 L 115 99 L 114 99 L 113 98 L 111 98 L 110 97 L 109 97 L 108 96 L 107 96 L 106 95 L 104 95 L 103 94 L 101 94 L 100 93 L 98 93 L 97 92 L 95 92 L 94 91 L 94 86 L 93 85 L 93 68 L 92 67 L 92 41 L 93 40 L 93 36 L 94 35 L 94 33 L 93 32 L 93 29 L 94 28 L 100 28 L 101 29 L 100 30 L 100 31 L 101 30 L 101 29 L 102 28 L 103 28 L 104 29 L 107 29 L 108 30 L 110 30 L 111 31 L 112 31 L 113 32 L 114 32 L 115 33 L 116 33 L 119 36 L 120 36 L 123 39 L 123 40 L 124 41 L 123 42 L 122 42 L 121 41 L 118 41 L 117 40 L 114 40 L 113 39 L 110 39 L 109 38 L 106 38 L 105 37 L 102 37 L 101 36 L 99 36 L 98 35 L 96 35 L 98 35 L 99 36 L 100 36 L 101 37 L 104 37 L 105 38 L 108 38 L 109 39 L 112 39 L 113 40 L 116 40 L 117 41 L 120 41 L 121 42 L 123 42 L 124 43 L 126 43 L 125 42 L 125 41 L 118 34 L 117 34 L 115 32 L 114 32 L 113 31 L 112 31 L 111 30 L 109 30 L 108 29 L 105 29 L 103 27 L 104 26 L 104 25 L 109 20 L 110 20 L 114 16 L 115 16 L 116 15 L 117 15 L 119 13 L 120 13 L 120 12 L 108 12 L 107 13 L 105 13 L 104 14 L 103 14 L 102 15 L 101 15 L 99 17 L 98 17 L 94 21 L 93 20 L 93 18 L 94 17 L 94 12 L 95 11 L 95 5 L 94 4 Z"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-base font-black uppercase tracking-[0.28em] sm:text-xl">
              Nature&apos;s Hydration Perfected.
            </p>
          </div>

          <nav className="flex flex-col items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.1em] md:flex-row md:flex-wrap lg:flex-col lg:items-end lg:flex-nowrap xl:flex-row xl:justify-end xl:gap-x-5">
            <Link
              href="/privacy"
              className="transition hover:text-palm-green"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-palm-green"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/refund-policy"
              className="transition hover:text-palm-green"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );

  if (variant === "rounded") {
    return (
      <footer
        className="pt-4 sm:pt-6 lg:pt-8"
        style={{ backgroundColor: resolvedBackgroundColor }}
      >
        {footerContent}
      </footer>
    );
  }

  return (
    <footer>{footerContent}</footer>
  );
}
