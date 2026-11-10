import type { City, Property, PropertyType } from "./schema";

export type PropertyFilters = {
  city: City | "all";
  type: PropertyType | "all";
  /** Maximum price in euros, or `null` for any budget. */
  maxBudget: number | null;
};

export const DEFAULT_FILTERS: PropertyFilters = {
  city: "all",
  type: "all",
  maxBudget: null,
};

const matchesBudget = (price: Property["price"], maxBudget: number | null) => {
  if (maxBudget === null) return true;
  // An undisclosed price cannot be proven to fit a budget.
  return price !== null && price <= maxBudget;
};

export function filterProperties(
  properties: readonly Property[],
  { city, type, maxBudget }: PropertyFilters,
): Property[] {
  return properties.filter(
    (property) =>
      (city === "all" || property.city === city) &&
      (type === "all" || property.type === type) &&
      matchesBudget(property.price, maxBudget),
  );
}
