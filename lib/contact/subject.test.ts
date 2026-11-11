import { describe, expect, it } from "vitest";
import { resolveContactSubject } from "./subject";

const subjects = [
  { id: "paris-8-monceau", title: "Hôtel particulier", city: "paris" },
  { id: "lyon-6-tete-d-or", title: "Appartement sur le parc", city: "lyon" },
] as const;

describe("resolveContactSubject", () => {
  it("returns the bien named by the URL parameter", () => {
    expect(resolveContactSubject("lyon-6-tete-d-or", subjects)).toEqual(
      subjects[1],
    );
  });

  it.each([
    ["missing", null],
    ["unknown", "bien-inexistant"],
    ["malformed", "<img src=x onerror=alert(1)>"],
  ])("ignores a %s parameter", (_label, param) => {
    expect(resolveContactSubject(param, subjects)).toBeUndefined();
  });
});
