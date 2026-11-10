import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="font-display text-2xl tracking-[0.18em] uppercase">
        Maison Vérane
      </span>
      <span className="mt-1 text-[0.6rem] tracking-[0.42em] uppercase opacity-80">
        Paris · Lyon
      </span>
    </span>
  );
}
