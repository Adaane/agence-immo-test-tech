import { type City, propertyIdSchema } from "@/lib/properties/schema";

/** The bien a contact request is about, when the visitor comes from its Fiche. */
export type ContactSubject = {
  id: string;
  title: string;
  city: City;
};

/**
 * Resolves the `bien` URL parameter to a known bien. Anything that is not a
 * well-formed identifier of a listed bien is ignored.
 */
export function resolveContactSubject(
  param: string | null,
  subjects: readonly ContactSubject[],
): ContactSubject | undefined {
  const parsed = propertyIdSchema.safeParse(param);
  if (!parsed.success) return undefined;
  return subjects.find((subject) => subject.id === parsed.data);
}
