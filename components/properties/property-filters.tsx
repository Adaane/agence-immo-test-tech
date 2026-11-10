"use client";

import { createContext, type ReactNode, use, useMemo, useState } from "react";
import { DEFAULT_FILTERS, type PropertyFilters } from "@/lib/properties/filter";

type PropertyFiltersContextValue = {
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
};

const PropertyFiltersContext =
  createContext<PropertyFiltersContextValue | null>(null);

export function PropertyFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);
  const value = useMemo(() => ({ filters, setFilters }), [filters]);
  return (
    <PropertyFiltersContext value={value}>{children}</PropertyFiltersContext>
  );
}

export function usePropertyFilters(): PropertyFiltersContextValue {
  const context = use(PropertyFiltersContext);
  if (!context) {
    throw new Error(
      "usePropertyFilters must be used inside <PropertyFiltersProvider>.",
    );
  }
  return context;
}

export const LISTING_ID = "biens";
export const LISTING_HEADING_ID = "biens-titre";

export function revealListing() {
  const reduceMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document
    .getElementById(LISTING_ID)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  // Move focus so keyboard and screen reader users land on the results.
  document.getElementById(LISTING_HEADING_ID)?.focus({ preventScroll: true });
}
