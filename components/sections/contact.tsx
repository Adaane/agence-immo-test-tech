import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormFromUrl } from "@/components/contact/contact-form-from-url";
import { getProperties } from "@/lib/properties/data";
import { SectionHeading } from "./section-heading";

const subjects = getProperties().map(({ id, title, city }) => ({
  id,
  title,
  city,
}));

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-titre"
      className="mx-auto max-w-[90rem] px-6 py-28 lg:px-12 lg:py-40"
    >
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Contact" id="contact-titre">
            Parlons de <em>votre projet</em>
          </SectionHeading>
          <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-stone">
            Acquisition, vente ou estimation : un conseiller de l'agence
            concernée vous répond personnellement sous 24 heures ouvrées.
          </p>
        </div>
        <div className="lg:col-span-7">
          <Suspense fallback={<ContactForm />}>
            <ContactFormFromUrl subjects={subjects} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
