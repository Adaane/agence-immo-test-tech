import { PropertiesListing } from "@/components/properties/properties-listing";
import {
  LISTING_HEADING_ID,
  LISTING_ID,
} from "@/components/properties/property-filters";
import { getProperties } from "@/lib/properties/data";
import { SectionHeading } from "./section-heading";

export function Properties() {
  const properties = getProperties();

  return (
    <section
      id={LISTING_ID}
      aria-labelledby={LISTING_HEADING_ID}
      className="bg-paper py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Sélection" id={LISTING_HEADING_ID} focusable>
            Biens <em>d'exception</em>
          </SectionHeading>
          <p className="reveal max-w-md text-lg leading-relaxed text-stone">
            Une sélection de biens actuellement proposés par nos agences.
            D'autres, plus confidentiels, sont présentés uniquement sur
            rendez-vous.
          </p>
        </div>
        <PropertiesListing properties={properties} />
      </div>
    </section>
  );
}
