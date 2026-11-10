import { describe, expect, it } from "vitest";
import { initialContactState } from "@/lib/contact/schema";
import { submitContact } from "./contact";

const toFormData = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(entries)) data.append(key, value);
  return data;
};

const valid = {
  name: "Claire Martin",
  email: "claire.martin@example.com",
  phone: "",
  city: "lyon",
  requestType: "vendre",
  message:
    "Nous souhaitons faire estimer notre appartement de la Croix-Rousse.",
  consent: "on",
  website: "",
};

describe("submitContact", () => {
  it("confirms a valid request", async () => {
    const state = await submitContact(initialContactState, toFormData(valid));
    expect(state.status).toBe("success");
  });

  it("returns field errors for an invalid request", async () => {
    const { consent: _consent, ...withoutConsent } = valid;
    const state = await submitContact(
      initialContactState,
      toFormData({ ...withoutConsent, email: "invalide" }),
    );
    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toBeDefined();
    expect(state.fieldErrors?.consent).toBeDefined();
  });

  it("silently accepts a request caught by the honeypot", async () => {
    const state = await submitContact(
      initialContactState,
      toFormData({ ...valid, website: "https://spam.example" }),
    );
    expect(state.status).toBe("success");
  });
});
