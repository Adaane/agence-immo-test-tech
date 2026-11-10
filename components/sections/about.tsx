import Image from "next/image";
import salonImage from "@/public/images/maison-salon.jpg";
import { SectionHeading } from "./section-heading";

const KEY_FIGURES = [
  { value: "1987", label: "Année de fondation" },
  { value: "650+", label: "Biens d'exception vendus" },
  { value: "1,4 Md€", label: "De transactions depuis 2015" },
  { value: "2", label: "Agences, à Paris et à Lyon" },
] as const;

export function About() {
  return (
    <section
      id="maison"
      aria-labelledby="maison-titre"
      className="mx-auto max-w-[90rem] px-6 py-28 lg:px-12 lg:py-40"
    >
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6 xl:col-span-5">
          <SectionHeading eyebrow="La maison" id="maison-titre">
            Une maison familiale, <em>deux villes</em> d'exception
          </SectionHeading>
          <div className="reveal mt-10 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Fondée à Paris en 1987, Maison Vérane accompagne une clientèle
              exigeante dans l'acquisition et la cession de biens rares. En
              2009, la maison ouvre une seconde adresse à Lyon, entre Presqu'île
              et Fourvière.
            </p>
            <p>
              Nos conseillers connaissent chaque rue et chaque immeuble. Une
              grande partie de nos ventes se conclut hors marché, dans la plus
              stricte confidentialité.
            </p>
          </div>
          <p className="reveal mt-10 font-display text-2xl italic">
            Hélène Vérane, fondatrice
          </p>
        </div>
        <div className="reveal relative aspect-[4/5] lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <Image
            src={salonImage}
            alt="Salon classique orné d'un buste en marbre et d'une lampe à abat-jour"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {KEY_FIGURES.map((figure) => (
          <div
            key={figure.label}
            className="reveal flex flex-col-reverse gap-3 border-b border-line py-10 pr-6 lg:border-b-0"
          >
            <dt className="text-sm text-stone">{figure.label}</dt>
            <dd className="font-display text-5xl font-light md:text-6xl">
              {figure.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
