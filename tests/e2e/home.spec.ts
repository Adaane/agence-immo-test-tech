import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has no accessibility violations", async ({ expectNoA11yViolations }) => {
  await expectNoA11yViolations();
});

test("hero search filters the listing", async ({ page }) => {
  const search = page.getByRole("search", { name: "Rechercher un bien" });
  await search.getByLabel("Ville").selectOption("lyon");
  await search.getByLabel("Type de bien").selectOption("maison");
  await search.getByRole("button", { name: "Rechercher" }).click();

  const listing = page.getByRole("list", { name: "Biens d'exception" });
  await expect(listing.getByRole("heading", { level: 3 })).toHaveText([
    "Maison de maître sur la colline",
  ]);
  await expect(page.locator("#biens output")).toHaveText("1 bien");
  await expect(
    page.getByRole("heading", { name: "Biens d'exception" }),
  ).toBeFocused();
});

test("city tabs filter the listing", async ({ page }) => {
  await page.locator("#biens label", { hasText: /^Paris$/ }).click();
  await expect(page.getByRole("radio", { name: "Paris" })).toBeChecked();
  const listing = page.getByRole("list", { name: "Biens d'exception" });
  await expect(
    listing.getByRole("listitem").filter({ has: page.locator("h3") }),
  ).toHaveCount(5);
});

test("contact form validates then confirms", async ({ page }) => {
  const contact = page.locator("#contact");
  await contact.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(contact.getByText("Indiquez votre nom.")).toBeVisible();

  await contact.getByLabel("Nom").fill("Claire Martin");
  await contact.getByLabel("E-mail").fill("claire@example.com");
  await contact.getByLabel("Ville concernée").selectOption("paris");
  await contact.getByLabel("Votre projet").selectOption("vendre");
  await contact
    .getByLabel("Message")
    .fill("Nous souhaitons faire estimer notre appartement du 7e.");
  await contact.getByRole("checkbox").check();
  await contact.getByRole("button", { name: "Envoyer ma demande" }).click();

  await expect(
    contact.getByText(/votre demande a bien été reçue/),
  ).toBeVisible();
});
