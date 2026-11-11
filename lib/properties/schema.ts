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

export const propertyIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(64);

export const propertySchema = z
  .object({
    id: propertyIdSchema,
    title: z.string().min(1),
    city: citySchema,
    district: z.string().min(1),
    type: propertyTypeSchema,
    /** `null` means the price is only disclosed on request. */
    price: z.number().int().positive().nullable(),
    surface: z.number().positive(),
    bedrooms: z.number().int().nonnegative(),
    tags: z.array(z.string().min(1)),
    description: z.string().min(1),
    badge: z.enum(["exclusivite", "nouveau"]).optional(),
    image: z.object({
      src: z.string().startsWith("/images/"),
      alt: z.string().min(1),
    }),
    /** Visite immersive: scroll-driven frames described by a manifest. */
    visit: z
      .object({
        manifest: z
          .string()
          .regex(/^\/scroll-video\/[a-z0-9-]+\/manifest\.json$/),
      })
      .optional(),
  })
  .refine(
    (property) =>
      (property.badge === "exclusivite") === (property.visit !== undefined),
    {
      message: "Every exclusivité, and only an exclusivité, has a visit.",
      path: ["visit"],
    },
  );

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
