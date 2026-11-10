import AxeBuilder from "@axe-core/playwright";
import { test as base, expect } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

type Fixtures = {
  cspGuard: undefined;
  expectNoA11yViolations: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
  cspGuard: [
    async ({ page }, use) => {
      const cspErrors: string[] = [];
      page.on("console", (message) => {
        if (message.text().includes("Content Security Policy")) {
          cspErrors.push(message.text());
        }
      });
      await use(undefined);
      expect(cspErrors, "CSP violations in console").toEqual([]);
    },
    { auto: true },
  ],
  expectNoA11yViolations: async ({ page }, use) => {
    await use(async () => {
      const results = await new AxeBuilder({ page })
        .withTags(WCAG_TAGS)
        .analyze();
      expect(results.violations).toEqual([]);
    });
  },
});

export { expect };
