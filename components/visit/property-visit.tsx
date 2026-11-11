"use client";

import "lenis/dist/lenis.css";
import "./visit.css";
import { useEffect, useRef } from "react";
import type { VisitManifest } from "@/lib/visit/manifest";

/** Visite immersive of a Bien. GSAP and Lenis load lazily, on this page only. */
export function PropertyVisit({
  manifest,
  label,
}: {
  manifest: VisitManifest;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
      import("@/lib/visit/scroll-sequence"),
    ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }, sequence]) => {
      if (cancelled) return;
      destroy = sequence.initScrollSequence({
        root,
        manifest,
        gsap,
        ScrollTrigger,
        Lenis,
      });
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [manifest]);

  return <section ref={ref} aria-label={label} />;
}
