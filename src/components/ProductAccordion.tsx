"use client";

import { ReactNode, useId, useState } from "react";

type ProductAccordionProps = {
  children: ReactNode;
  title: string;
  withTopBorder?: boolean;
};

export function ProductAccordion({
  children,
  title,
  withTopBorder = false,
}: ProductAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={withTopBorder ? "border-t border-palm-green/12" : ""}>
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-black text-palm-green sm:px-6"
      >
        {title}
        <span
          aria-hidden="true"
          className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-coconut-green/24 text-xl transition-transform duration-300 ease-out ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-palm-green/10">{children}</div>
        </div>
      </div>
    </div>
  );
}
