import { expect, test } from "./fixtures";

test("a card opens the Fiche of its bien", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Hôtel particulier aux salons d'apparat" })
    .click();
  await expect(page).toHaveURL("/biens/paris-8-monceau");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Hôtel particulier aux salons d'apparat",
    }),
  ).toBeVisible();
});

test("an exclusivité shows its visite immersive", async ({ page }) => {
  await page.goto("/biens/paris-8-monceau");
  const visit = page.getByRole("region", { name: "Visite immersive" });
  await expect(
    visit.getByRole("heading", { name: "La cour pavée" }),
  ).toBeAttached();
  await expect(visit.locator("canvas")).toHaveCount(3);
});

test("a bien without exclusivité has no visite immersive", async ({ page }) => {
  await page.goto("/biens/paris-16-trocadero");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Étage noble face à la Seine",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Visite immersive" }),
  ).toHaveCount(0);
});

test("the Fiche CTA prefills the contact form", async ({ page }) => {
  await page.goto("/biens/lyon-6-tete-d-or");
  await page
    .getByRole("link", { name: "Organiser une visite" })
    .first()
    .click();
  await expect(page).toHaveURL("/?bien=lyon-6-tete-d-or#contact");

  const contact = page.locator("#contact");
  await expect(
    contact.getByText("Appartement de réception sur le parc"),
  ).toBeVisible();
  await expect(contact.getByLabel("Ville concernée")).toHaveValue("lyon");
  await expect(contact.getByLabel("Message")).toHaveValue(
    /Appartement de réception sur le parc/,
  );
});

test("an unknown bien returns a 404", async ({ page }) => {
  const response = await page.goto("/biens/bien-inexistant");
  expect(response?.status()).toBe(404);
});

for (const id of ["paris-8-monceau", "paris-16-trocadero"]) {
  test(`the Fiche ${id} has no accessibility violations`, async ({
    page,
    expectNoA11yViolations,
  }) => {
    await page.goto(`/biens/${id}`);
    await expectNoA11yViolations();
  });
}
