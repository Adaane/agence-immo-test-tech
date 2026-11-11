import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatSurface } from "@/lib/properties/format";
import {
  BADGE_LABELS,
  PROPERTY_TYPE_LABELS,
  type Property,
} from "@/lib/properties/schema";

export function PropertyCard({ property }: { property: Property }) {
  const {
    id,
    title,
    type,
    district,
    price,
    surface,
    bedrooms,
    tags,
    badge,
    image,
  } = property;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
        />
        {badge ? (
          <span className="eyebrow absolute top-4 left-4 bg-ivory px-3 py-1.5 text-ink">
            {BADGE_LABELS[badge]}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 border-b border-line pt-5 pb-6">
        <p className="eyebrow text-bronze-deep">
          {PROPERTY_TYPE_LABELS[type]} · {district}
        </p>
        <h3 className="font-display text-[1.65rem] leading-tight font-light">
          <Link
            href={`/biens/${id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ink"
          >
            {title}
          </Link>
        </h3>
        <dl className="mt-auto flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-2 text-sm text-stone">
          <div className="mr-auto">
            <dt className="sr-only">Prix</dt>
            <dd className="font-display text-xl text-ink">
              {formatPrice(price)}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Surface</dt>
            <dd>{formatSurface(surface)}</dd>
          </div>
          <div>
            <dt className="sr-only">Chambres</dt>
            <dd>{`${bedrooms} ${bedrooms > 1 ? "chambres" : "chambre"}`}</dd>
          </div>
        </dl>
        <ul aria-label="Atouts" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="border border-line px-2.5 py-1 text-xs text-stone"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
