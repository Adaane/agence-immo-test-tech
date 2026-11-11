import { describe, expect, it } from "vitest";
import { getProperties, getProperty } from "./data";

describe("getProperty", () => {
  it("returns the bien matching the identifier", () => {
    expect(getProperty("paris-8-monceau")?.title).toBe(
      "Hôtel particulier aux salons d'apparat",
    );
  });

  it("returns undefined for an unknown identifier", () => {
    expect(getProperty("inconnu")).toBeUndefined();
  });
});

describe("getProperties", () => {
  it("returns the nine validated listings, five in Paris and four in Lyon", () => {
    const properties = getProperties();
    expect(properties).toHaveLength(9);
    expect(properties.filter((p) => p.city === "paris")).toHaveLength(5);
    expect(properties.filter((p) => p.city === "lyon")).toHaveLength(4);
  });

  it("has unique identifiers", () => {
    const ids = getProperties().map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives a visite immersive to the three exclusivités", () => {
    const withVisit = getProperties().filter((p) => p.visit);
    expect(withVisit.map((p) => p.id)).toEqual([
      "paris-7-saint-germain",
      "paris-8-monceau",
      "lyon-6-tete-d-or",
    ]);
  });

  it("includes exactly two price-on-request listings", () => {
    expect(getProperties().filter((p) => p.price === null)).toHaveLength(2);
  });
});
