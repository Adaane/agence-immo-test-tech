"use client";

import { DEFAULT_FILTERS, filterProperties } from "@/lib/properties/filter";
import {
  CITIES,
  CITY_LABELS,
  type City,
  type Property,
} from "@/lib/properties/schema";
import { cn } from "@/lib/utils";
import { PropertyCard } from "./property-card";
import { usePropertyFilters } from "./property-filters";

const CITY_TABS: { value: City | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  ...CITIES.map((city) => ({ value: city, label: CITY_LABELS[city] })),
];

export function PropertiesListing({
  properties,
}: {
  properties: readonly Property[];
}) {
  const { filters, setFilters } = usePropertyFilters();
  const results = filterProperties(properties, filters);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <fieldset>
          <legend className="sr-only">Filtrer par ville</legend>
          <div className="flex gap-8">
            {CITY_TABS.map((tab) => (
              <label
                key={tab.value}
                className={cn(
                  "relative cursor-pointer pb-2 font-display text-2xl transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-bronze-deep",
                  filters.city === tab.value
                    ? "text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ink"
                    : "text-stone hover:text-ink",
                )}
              >
                <input
                  type="radio"
                  name="listing-city"
                  value={tab.value}
                  checked={filters.city === tab.value}
                  onChange={() => setFilters({ ...filters, city: tab.value })}
                  className="sr-only"
                />
                {tab.label}
              </label>
            ))}
          </div>
        </fieldset>
        <output className="eyebrow text-stone">
          {results.length} {results.length > 1 ? "biens" : "bien"}
        </output>
      </div>

      <ul
        aria-label="Biens d'exception"
        className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3"
      >
        {results.map((property) => (
          <li key={property.id}>
            <PropertyCard property={property} />
          </li>
        ))}
      </ul>

      {results.length === 0 ? (
        <div className="flex flex-col items-start gap-6 border border-line px-8 py-12">
          <p className="max-w-xl font-display text-2xl font-light">
            Aucun bien de notre sélection ne correspond à ces critères. Nos
            conseillers ont accès à des biens confidentiels, hors marché.
          </p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="eyebrow border-b border-ink pb-1 transition-colors hover:border-bronze-deep hover:text-bronze-deep"
          >
            Réinitialiser la recherche
          </button>
        </div>
      ) : null}
    </div>
  );
}
