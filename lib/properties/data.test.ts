import { describe, expect, it } from "vitest";
import { getProperties } from "./data";

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

  it("includes exactly two price-on-request listings", () => {
    expect(getProperties().filter((p) => p.price === null)).toHaveLength(2);
  });
});
