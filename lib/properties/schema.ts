import { z } from "zod";

export const CITIES = ["paris", "lyon"] as const;
export const PROPERTY_TYPES = [
  "appartement",
  "maison",
  "hotel-particulier",
  "penthouse",
] as const;

export const citySchema = z.enum(CITIES);
export const propertyTypeSchema = z.enum(PROPERTY_TYPES);

export const propertySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  city: citySchema,
  district: z.string().min(1),
  type: propertyTypeSchema,
  /** `null` means the price is only disclosed on request. */
  price: z.number().int().positive().nullable(),
  surface: z.number().positive(),
  bedrooms: z.number().int().nonnegative(),
  tags: z.array(z.string().min(1)),
  badge: z.enum(["exclusivite", "nouveau"]).optional(),
  image: z.object({
    src: z.string().startsWith("/images/"),
    alt: z.string().min(1),
  }),
});

export type City = z.infer<typeof citySchema>;
export type PropertyType = z.infer<typeof propertyTypeSchema>;
export type Property = z.infer<typeof propertySchema>;

export const CITY_LABELS: Record<City, string> = {
  paris: "Paris",
  lyon: "Lyon",
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  appartement: "Appartement",
  maison: "Maison",
  "hotel-particulier": "Hôtel particulier",
  penthouse: "Penthouse",
};

export const BADGE_LABELS: Record<NonNullable<Property["badge"]>, string> = {
  exclusivite: "Exclusivité",
  nouveau: "Nouveau",
};
