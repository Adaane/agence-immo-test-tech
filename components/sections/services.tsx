import { SectionHeading } from "./section-heading";

const SERVICES = [
  {
    title: "Acquisition",
    text: "Un conseiller dédié définit avec vous le bien recherché, visite en amont et négocie en votre nom.",
  },
  {
    title: "Vente",
    text: "Photographie d'architecture, diffusion maîtrisée et sélection rigoureuse des acquéreurs.",
  },
  {
    title: "Estimation",
    text: "Une estimation argumentée sous 48 heures, fondée sur nos ventes récentes et notre connaissance du marché.",
  },
  {
    title: "Recherche confidentielle",
    text: "Accès à notre portefeuille hors marché, pour les biens qui ne sont jamais publiés.",
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-titre"
      className="bg-ink py-28 text-ivory lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
        <div className="[&_.eyebrow]:text-[#c9ad85]">
          <SectionHeading eyebrow="Nos services" id="services-titre">
            Un accompagnement <em>sur mesure</em>
          </SectionHeading>
        </div>
        <ol className="mt-20 grid border-t border-ivory/20 md:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="reveal flex flex-col gap-6 border-b border-ivory/20 py-10 md:pr-10 xl:border-b-0 xl:border-r xl:pl-8 xl:first:pl-0 xl:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="font-display text-xl text-[#c9ad85]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl font-light">
                {service.title}
              </h3>
              <p className="leading-relaxed text-ivory/75">{service.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
