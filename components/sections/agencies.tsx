import Image, { type StaticImageData } from "next/image";
import agenceLyon from "@/public/images/agence-lyon.jpg";
import agenceParis from "@/public/images/agence-paris.jpg";
import { SectionHeading } from "./section-heading";

type Agency = {
  city: string;
  address: string[];
  phone: string;
  phoneHref: string;
  hours: string;
  image: StaticImageData;
  alt: string;
};

// Fictional addresses; phone numbers are in ARCEP ranges reserved for fiction.
const AGENCIES: Agency[] = [
  {
    city: "Paris",
    address: ["12, rue de Miromesnil", "75008 Paris"],
    phone: "01 99 00 12 34",
    phoneHref: "+33199001234",
    hours: "Du lundi au samedi, de 9 h 30 à 19 h",
    image: agenceParis,
    alt: "Façade haussmannienne en pierre de taille avec balcons en fer forgé",
  },
  {
    city: "Lyon",
    address: ["8, place Bellecour", "69002 Lyon"],
    phone: "04 65 71 56 78",
    phoneHref: "+33465715678",
    hours: "Du lundi au samedi, de 9 h 30 à 19 h",
    image: agenceLyon,
    alt: "Quais de Saône et colline de Fourvière à Lyon",
  },
];

const directionsUrl = (address: string[]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.join(", "))}`;

export function Agencies() {
  return (
    <section
      id="agences"
      aria-labelledby="agences-titre"
      className="mx-auto max-w-[90rem] px-6 py-28 lg:px-12 lg:py-40"
    >
      <SectionHeading eyebrow="Nos agences" id="agences-titre">
        Deux adresses, <em>une même exigence</em>
      </SectionHeading>
      <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
        {AGENCIES.map((agency) => (
          <article key={agency.city} className="reveal flex flex-col">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={agency.image}
                alt={agency.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-8 font-display text-4xl font-light">
              Maison Vérane <em>{agency.city}</em>
            </h3>
            <div className="mt-6 grid gap-6 text-stone sm:grid-cols-2">
              <address className="not-italic leading-relaxed">
                {agency.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={`tel:${agency.phoneHref}`}
                  className="mt-2 block text-ink underline-offset-4 hover:underline"
                >
                  {agency.phone}
                </a>
              </address>
              <p className="leading-relaxed">{agency.hours}</p>
            </div>
            <a
              href={directionsUrl(agency.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow mt-8 self-start border-b border-ink pb-1 transition-colors hover:border-bronze-deep hover:text-bronze-deep"
            >
              Itinéraire vers l'agence de {agency.city}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
