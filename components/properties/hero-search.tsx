"use client";

import { type FormEvent, useEffect, useId, useState } from "react";
import { DEFAULT_FILTERS, type PropertyFilters } from "@/lib/properties/filter";
import {
  CITIES,
  CITY_LABELS,
  citySchema,
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPES,
  propertyTypeSchema,
} from "@/lib/properties/schema";
import { cn } from "@/lib/utils";
import { revealListing, usePropertyFilters } from "./property-filters";

const BUDGETS = [
  { value: 2_000_000, label: "Jusqu'à 2 M€" },
  { value: 4_000_000, label: "Jusqu'à 4 M€" },
  { value: 7_000_000, label: "Jusqu'à 7 M€" },
  { value: 12_000_000, label: "Jusqu'à 12 M€" },
] as const;

const parseDraft = (form: HTMLFormElement): PropertyFilters => {
  const data = new FormData(form);
  const city = citySchema.safeParse(data.get("city"));
  const type = propertyTypeSchema.safeParse(data.get("type"));
  const budget = Number(data.get("budget"));
  return {
    city: city.success ? city.data : "all",
    type: type.success ? type.data : "all",
    maxBudget: Number.isFinite(budget) && budget > 0 ? budget : null,
  };
};

function Field({
  label,
  name,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("relative flex flex-col gap-1.5 px-5 py-4", className)}>
      <label htmlFor={id} className="eyebrow text-stone">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none bg-transparent pr-6 font-display text-xl text-ink focus-visible:outline-offset-8"
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 bottom-5 size-2 rotate-45 border-r border-b border-ink"
      />
    </div>
  );
}

export function HeroSearch() {
  const { filters, setFilters } = usePropertyFilters();
  const [draft, setDraft] = useState<PropertyFilters>(DEFAULT_FILTERS);

  // The listing tabs can change the city: mirror it in the search form.
  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters(parseDraft(event.currentTarget));
    revealListing();
  };

  return (
    <search aria-label="Rechercher un bien">
      <form
        onSubmit={handleSubmit}
        className="grid bg-ivory/95 text-ink backdrop-blur-sm md:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <Field
          label="Ville"
          name="city"
          value={draft.city}
          onChange={(city) =>
            setDraft({ ...draft, city: city as PropertyFilters["city"] })
          }
          className="border-b border-line md:border-r md:border-b-0"
        >
          <option value="all">Paris & Lyon</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {CITY_LABELS[city]}
            </option>
          ))}
        </Field>
        <Field
          label="Type de bien"
          name="type"
          value={draft.type}
          onChange={(type) =>
            setDraft({ ...draft, type: type as PropertyFilters["type"] })
          }
          className="border-b border-line md:border-r md:border-b-0"
        >
          <option value="all">Tous les biens</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {PROPERTY_TYPE_LABELS[type]}
            </option>
          ))}
        </Field>
        <Field
          label="Budget maximum"
          name="budget"
          value={draft.maxBudget === null ? "" : String(draft.maxBudget)}
          onChange={(budget) =>
            setDraft({ ...draft, maxBudget: budget ? Number(budget) : null })
          }
        >
          <option value="">Sans limite</option>
          {BUDGETS.map((budget) => (
            <option key={budget.value} value={budget.value}>
              {budget.label}
            </option>
          ))}
        </Field>
        <button
          type="submit"
          className="eyebrow bg-ink px-10 py-5 text-ivory transition-colors duration-300 hover:bg-bronze-deep"
        >
          Rechercher
        </button>
      </form>
    </search>
  );
}
