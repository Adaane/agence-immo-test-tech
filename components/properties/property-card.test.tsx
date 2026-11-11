import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Property } from "@/lib/properties/schema";
import { PropertyCard } from "./property-card";

const property: Property = {
  id: "paris-8-monceau",
  title: "Hôtel particulier aux salons d'apparat",
  city: "paris",
  district: "Paris 8e · Parc Monceau",
  type: "hotel-particulier",
  price: null,
  surface: 640,
  bedrooms: 7,
  tags: ["Cour pavée"],
  description: "Une demeure de représentation.",
  badge: "exclusivite",
  image: { src: "/images/test.jpg", alt: "Grand salon" },
  visit: { manifest: "/scroll-video/paris-8-monceau/manifest.json" },
};

describe("PropertyCard", () => {
  it("links its title to the Fiche of the bien", () => {
    render(<PropertyCard property={property} />);
    expect(
      screen.getByRole("link", {
        name: "Hôtel particulier aux salons d'apparat",
      }),
    ).toHaveAttribute("href", "/biens/paris-8-monceau");
  });
});
