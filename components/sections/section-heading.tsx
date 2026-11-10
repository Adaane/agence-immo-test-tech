import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  id,
  children,
  className,
  focusable = false,
}: {
  eyebrow: string;
  id: string;
  children: ReactNode;
  className?: string;
  /** Lets a script move focus to the heading. */
  focusable?: boolean;
}) {
  return (
    <div className={cn("reveal flex flex-col gap-5", className)}>
      <p className="eyebrow flex items-center gap-4 text-bronze-deep">
        <span aria-hidden="true" className="h-px w-10 bg-bronze" />
        {eyebrow}
      </p>
      <h2
        id={id}
        tabIndex={focusable ? -1 : undefined}
        className="display text-5xl leading-[1.05] outline-none md:text-6xl"
      >
        {children}
      </h2>
    </div>
  );
}
