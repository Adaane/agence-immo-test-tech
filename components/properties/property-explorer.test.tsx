import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it } from "vitest";
import type { Property } from "@/lib/properties/schema";
import { HeroSearch } from "./hero-search";
import { PropertiesListing } from "./properties-listing";
import { PropertyFiltersProvider } from "./property-filters";

const make = (
  id: string,
  city: Property["city"],
  type: Property["type"],
  price: number | null,
): Property => ({
  id,
  title: `Bien ${id}`,
  city,
  district: city === "paris" ? "Paris 7e" : "Lyon 2e",
  type,
  price,
  surface: 200,
  bedrooms: 3,
  tags: ["Terrasse"],
  description: "Description de test.",
  image: { src: "/images/test.jpg", alt: `Photo ${id}` },
});

const properties = [
  make("p1", "paris", "appartement", 3_000_000),
  make("p2", "paris", "maison", 9_000_000),
  make("l1", "lyon", "appartement", 1_900_000),
  make("l2", "lyon", "maison", null),
];

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {};
});

const setup = () => {
  render(
    <PropertyFiltersProvider>
      <HeroSearch />
      <PropertiesListing properties={properties} />
    </PropertyFiltersProvider>,
  );
  return userEvent.setup();
};

const listedTitles = () =>
  within(screen.getByRole("list", { name: "Biens d'exception" }))
    .queryAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);

describe("property explorer", () => {
  it("lists every property by default", () => {
    setup();
    expect(listedTitles()).toEqual([
      "Bien p1",
      "Bien p2",
      "Bien l1",
      "Bien l2",
    ]);
    expect(screen.getByText("Prix sur demande")).toBeInTheDocument();
  });

  it("filters the listing from the hero search", async () => {
    const user = setup();
    await user.selectOptions(screen.getByLabelText("Ville"), "lyon");
    await user.selectOptions(
      screen.getByLabelText("Type de bien"),
      "appartement",
    );
    await user.click(screen.getByRole("button", { name: "Rechercher" }));
    expect(listedTitles()).toEqual(["Bien l1"]);
    expect(screen.getByRole("status")).toHaveTextContent("1 bien");
  });

  it("filters the listing by city tab", async () => {
    const user = setup();
    await user.click(screen.getByRole("radio", { name: "Paris" }));
    expect(listedTitles()).toEqual(["Bien p1", "Bien p2"]);
  });

  it("keeps the hero city in sync with the city tab", async () => {
    const user = setup();
    await user.click(screen.getByRole("radio", { name: "Lyon" }));
    expect(screen.getByLabelText("Ville")).toHaveValue("lyon");
  });

  it("offers a reset when nothing matches", async () => {
    const user = setup();
    await user.selectOptions(screen.getByLabelText("Ville"), "lyon");
    await user.selectOptions(screen.getByLabelText("Type de bien"), "maison");
    await user.selectOptions(
      screen.getByLabelText("Budget maximum"),
      "2000000",
    );
    await user.click(screen.getByRole("button", { name: "Rechercher" }));
    expect(listedTitles()).toEqual([]);
    await user.click(
      screen.getByRole("button", { name: "Réinitialiser la recherche" }),
    );
    expect(listedTitles()).toHaveLength(4);
    expect(screen.getByLabelText("Ville")).toHaveValue("all");
  });
});
