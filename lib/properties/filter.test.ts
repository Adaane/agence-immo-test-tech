import { describe, expect, it } from "vitest";
import { filterProperties } from "./filter";
import type { Property } from "./schema";

const base: Omit<Property, "id" | "city" | "type" | "price"> = {
  title: "Bien test",
  district: "Quartier",
  surface: 200,
  bedrooms: 3,
  tags: [],
  description: "Description de test.",
  image: { src: "/images/test.jpg", alt: "Salon" },
};

const parisFlat: Property = {
  ...base,
  id: "paris-flat",
  city: "paris",
  type: "appartement",
  price: 3_000_000,
};
const parisHouse: Property = {
  ...base,
  id: "paris-house",
  city: "paris",
  type: "maison",
  price: 8_500_000,
};
const lyonFlat: Property = {
  ...base,
  id: "lyon-flat",
  city: "lyon",
  type: "appartement",
  price: 1_900_000,
};
const lyonOnRequest: Property = {
  ...base,
  id: "lyon-on-request",
  city: "lyon",
  type: "maison",
  price: null,
};

const all = [parisFlat, parisHouse, lyonFlat, lyonOnRequest];
const ids = (list: Property[]) => list.map((p) => p.id);

describe("filterProperties", () => {
  it("returns every property when no filter is set", () => {
    expect(
      ids(filterProperties(all, { city: "all", type: "all", maxBudget: null })),
    ).toEqual(ids(all));
  });

  it("keeps only the selected city", () => {
    expect(
      ids(
        filterProperties(all, { city: "lyon", type: "all", maxBudget: null }),
      ),
    ).toEqual(["lyon-flat", "lyon-on-request"]);
  });

  it("keeps only the selected property type", () => {
    expect(
      ids(
        filterProperties(all, { city: "all", type: "maison", maxBudget: null }),
      ),
    ).toEqual(["paris-house", "lyon-on-request"]);
  });

  it("keeps properties priced at or under the budget", () => {
    expect(
      ids(
        filterProperties(all, {
          city: "all",
          type: "all",
          maxBudget: 3_000_000,
        }),
      ),
    ).toEqual(["paris-flat", "lyon-flat"]);
  });

  it("excludes price-on-request properties once a budget is set", () => {
    expect(
      ids(
        filterProperties(all, {
          city: "lyon",
          type: "maison",
          maxBudget: 20_000_000,
        }),
      ),
    ).toEqual([]);
  });

  it("combines every criterion", () => {
    expect(
      ids(
        filterProperties(all, {
          city: "paris",
          type: "appartement",
          maxBudget: 5_000_000,
        }),
      ),
    ).toEqual(["paris-flat"]);
  });
});
