import { z } from "zod";
import { propertyIdSchema } from "@/lib/properties/schema";

export const REQUEST_TYPES = ["acheter", "vendre", "estimer", "autre"] as const;

export const REQUEST_TYPE_LABELS: Record<
  (typeof REQUEST_TYPES)[number],
  string
> = {
  acheter: "Acheter",
  vendre: "Vendre",
  estimer: "Faire estimer",
  autre: "Autre demande",
};

const PHONE_PATTERN = /^\+?[0-9 .()-]{10,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.email("Indiquez une adresse e-mail valide."),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || PHONE_PATTERN.test(value), {
      message: "Indiquez un numéro de téléphone valide.",
    }),
  city: z.enum(["paris", "lyon"], "Choisissez une ville."),
  requestType: z.enum(REQUEST_TYPES, "Choisissez la nature de votre demande."),
  message: z
    .string()
    .trim()
    .min(20, "Votre message doit contenir au moins 20 caractères.")
    .max(2000, "Votre message ne doit pas dépasser 2 000 caractères."),
  consent: z.literal(true, "Votre consentement est nécessaire."),
  /** Bien the request is about; empty for a general request. */
  propertyId: z.union([z.literal(""), propertyIdSchema]),
  /** Honeypot: hidden from people, filled by bots. */
  website: z.string(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactFieldName = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactFieldName, string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
