import { describe, expect, it } from "vitest";
import { propertySchema } from "./schema";

const base = {
  id: "paris-test",
  title: "Appartement test",
  city: "paris",
  district: "Paris 7e · Test",
  type: "appartement",
  price: 1_000_000,
  surface: 100,
  bedrooms: 2,
  tags: ["Balcon"],
  description: "Un appartement de test baigné de lumière.",
  image: { src: "/images/test.jpg", alt: "Salon" },
};

const visit = { manifest: "/scroll-video/paris-test/manifest.json" };

describe("propertySchema", () => {
  it("accepts an exclusivité with a visite immersive", () => {
    expect(
      propertySchema.safeParse({ ...base, badge: "exclusivite", visit })
        .success,
    ).toBe(true);
  });

  it("rejects an exclusivité without a visite immersive", () => {
    expect(
      propertySchema.safeParse({ ...base, badge: "exclusivite" }).success,
    ).toBe(false);
  });

  it("rejects a visite immersive on a bien that is not an exclusivité", () => {
    expect(propertySchema.safeParse({ ...base, visit }).success).toBe(false);
  });

  it("requires a description", () => {
    expect(propertySchema.safeParse({ ...base, description: "" }).success).toBe(
      false,
    );
  });

  it("only accepts a manifest served from /scroll-video/", () => {
    expect(
      propertySchema.safeParse({
        ...base,
        badge: "exclusivite",
        visit: { manifest: "https://evil.example/manifest.json" },
      }).success,
    ).toBe(false);
  });
});
