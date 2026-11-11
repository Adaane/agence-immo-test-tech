import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";

const valid = {
  name: "Claire Martin",
  email: "claire.martin@example.com",
  phone: "",
  city: "paris",
  requestType: "acheter",
  message: "Je recherche un appartement familial avec terrasse dans le 7e.",
  consent: true,
  propertyId: "",
  website: "",
};

describe("contactSchema", () => {
  it("accepts a complete request", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a French phone number", () => {
    expect(
      contactSchema.safeParse({ ...valid, phone: "+33 6 12 34 56 78" }).success,
    ).toBe(true);
  });

  it.each([
    ["name", ""],
    ["email", "pas-un-email"],
    ["phone", "12"],
    ["city", "marseille"],
    ["requestType", "louer"],
    ["message", "Trop court"],
    ["consent", false],
  ])("rejects an invalid %s", (field, value) => {
    const result = contactSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual([field]);
  });
});
