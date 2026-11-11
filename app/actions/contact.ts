"use server";

import {
  type ContactFieldName,
  type ContactState,
  contactSchema,
} from "@/lib/contact/schema";
import { getProperty } from "@/lib/properties/data";

const UNKNOWN_PROPERTY_MESSAGE =
  "Le bien concerné est introuvable. Rechargez la page et réessayez.";

const SUCCESS_MESSAGE =
  "Merci, votre demande a bien été reçue. Un conseiller vous répond sous 24 heures ouvrées.";

const readText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill the hidden field: pretend success and drop the request.
  if (readText(formData, "website") !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const result = contactSchema.safeParse({
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    city: readText(formData, "city"),
    requestType: readText(formData, "requestType"),
    message: readText(formData, "message"),
    consent: formData.get("consent") === "on",
    propertyId: readText(formData, "propertyId"),
    website: "",
  });

  // The bien is a hidden field: an invalid one is not something people can fix.
  const invalidProperty = result.success
    ? result.data.propertyId !== "" && !getProperty(result.data.propertyId)
    : result.error.issues.some((issue) => issue.path[0] === "propertyId");
  if (invalidProperty) {
    return { status: "error", message: UNKNOWN_PROPERTY_MESSAGE };
  }

  if (!result.success) {
    const fieldErrors: Partial<Record<ContactFieldName, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as ContactFieldName;
      fieldErrors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      fieldErrors,
    };
  }

  // Demo site: the request is validated but not sent anywhere.
  return { status: "success", message: SUCCESS_MESSAGE };
}
