import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Vye home"
      className="inline-flex h-14 items-center"
    >
      <Image
        src="/vye_logo_pink_f36f98.png"
        alt="vye"
        width={284}
        height={193}
        className="block h-12 w-auto transition hover:-translate-y-0.5 sm:h-14"
        priority
      />
    </Link>
  );
}
