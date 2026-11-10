import { describe, expect, it } from "vitest";
import { formatPrice, formatSurface } from "./format";

const normalizeSpaces = (value: string) => value.replace(/\s/g, " ");

describe("formatPrice", () => {
  it("formats a price in euros with French grouping", () => {
    expect(normalizeSpaces(formatPrice(3_950_000))).toBe("3 950 000 €");
  });

  it("shows « Prix sur demande » when the price is undisclosed", () => {
    expect(formatPrice(null)).toBe("Prix sur demande");
  });
});

describe("formatSurface", () => {
  it("formats a surface in square metres", () => {
    expect(normalizeSpaces(formatSurface(253))).toBe("253 m²");
  });

  it("keeps decimals when the surface is not round", () => {
    expect(normalizeSpaces(formatSurface(1_204.5))).toBe("1 204,5 m²");
  });
});
