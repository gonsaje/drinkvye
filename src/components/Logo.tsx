import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Vye home"
      className="inline-flex h-16 items-center lg:h-20"
    >
      <Image
        src="/vye_logo_pink_f36f98.png"
        alt="vye"
        width={284}
        height={193}
        className="block h-14 w-auto brightness-0 invert drop-shadow-[0_8px_18px_rgba(146,45,83,0.18)] transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_10px_22px_rgba(146,45,83,0.22)] sm:h-16 lg:h-20"
        priority
      />
    </Link>
  );
}
