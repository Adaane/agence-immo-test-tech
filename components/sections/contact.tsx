import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "./section-heading";

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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
