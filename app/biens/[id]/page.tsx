import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PropertyVisit } from "@/components/visit/property-visit";
import { getProperties, getProperty } from "@/lib/properties/data";
import { formatPrice, formatSurface } from "@/lib/properties/format";
import {
  BADGE_LABELS,
  CITY_LABELS,
  PROPERTY_TYPE_LABELS,
} from "@/lib/properties/schema";
import { loadVisitManifest } from "@/lib/visit/manifest";

// Every bien is prerendered; unknown identifiers fall through to notFound().
export function generateStaticParams() {
  return getProperties().map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/biens/[id]">): Promise<Metadata> {
  const property = getProperty((await params).id);
  if (!property) return {};
  return {
    title: `${property.title} — ${property.district} | Maison Vérane`,
    description: property.description,
  };
}

export default async function FichePage({ params }: PageProps<"/biens/[id]">) {
  const property = getProperty((await params).id);
  if (!property) notFound();

  const manifest = property.visit
    ? await loadVisitManifest(property.visit.manifest)
    : null;
  const contactHref = `/?bien=${property.id}#contact`;
  const facts = [
    { label: "Prix", value: formatPrice(property.price) },
    { label: "Surface", value: formatSurface(property.surface) },
    {
      label: "Chambres",
      value: `${property.bedrooms} ${property.bedrooms > 1 ? "chambres" : "chambre"}`,
    },
    { label: "Type", value: PROPERTY_TYPE_LABELS[property.type] },
    { label: "Ville", value: CITY_LABELS[property.city] },
  ];

  return (
    <>
      <a
        href="#contenu"
        className="eyebrow sr-only z-50 bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu">
        <section
          aria-labelledby="fiche-titre"
          className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden bg-ink text-ivory"
        >
          <Image
            src={property.image.src}
            alt={property.image.alt}
            priority
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/30"
          />
          <div className="relative mx-auto w-full max-w-[90rem] px-6 pt-36 pb-12 lg:px-12 lg:pb-16">
            <p className="eyebrow mb-6 flex flex-wrap items-center gap-4 text-ivory/85">
              <span aria-hidden="true" className="h-px w-10 bg-ivory/70" />
              {PROPERTY_TYPE_LABELS[property.type]} · {property.district}
              {property.badge ? (
                <span className="bg-ivory px-3 py-1.5 text-ink">
                  {BADGE_LABELS[property.badge]}
                </span>
              ) : null}
            </p>
            <h1
              id="fiche-titre"
              className="max-w-4xl font-display text-5xl leading-[1.02] font-light md:text-7xl"
            >
              {property.title}
            </h1>
            <p className="mt-6 font-display text-3xl">
              {formatPrice(property.price)}
            </p>
          </div>
        </section>

        {manifest ? (
          <PropertyVisit manifest={manifest} label="Visite immersive" />
        ) : null}

        <section
          aria-labelledby="fiche-details"
          className="mx-auto grid max-w-[90rem] gap-16 px-6 py-28 lg:grid-cols-12 lg:px-12 lg:py-36"
        >
          <div className="lg:col-span-7">
            <p className="eyebrow text-bronze-deep">Le bien</p>
            <h2
              id="fiche-details"
              className="mt-6 font-display text-4xl leading-tight font-light md:text-5xl"
            >
              Une adresse <em>d'exception</em>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone">
              {property.description}
            </p>
            <ul aria-label="Atouts" className="mt-10 flex flex-wrap gap-2">
              {property.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-line px-3 py-1.5 text-sm text-stone"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <dl className="border-t border-line">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between border-b border-line py-4"
                >
                  <dt className="eyebrow text-stone">{fact.label}</dt>
                  <dd className="font-display text-2xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col items-start gap-6">
              <Link
                href={contactHref}
                className="eyebrow bg-ink px-10 py-5 text-ivory transition-colors duration-300 hover:bg-bronze-deep"
              >
                Organiser une visite
              </Link>
              <Link
                href="/#biens"
                className="eyebrow border-b border-ink pb-1 hover:text-bronze-deep"
              >
                Tous les biens
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
