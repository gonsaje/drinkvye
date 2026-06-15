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
        src="/vye_pink.png"
        alt="vye"
        width={824}
        height={341}
        className="block h-11 w-auto transition hover:-translate-y-0.5 sm:h-12"
        priority
      />
    </Link>
  );
}
