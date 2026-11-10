import Image from "next/image";
import { HeroSearch } from "@/components/properties/hero-search";
import heroImage from "@/public/images/hero-paris-rooftops.jpg";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink text-ivory"
    >
      <Image
        src={heroImage}
        alt=""
        priority
        fill
        placeholder="blur"
        sizes="100vw"
        className="animate-slow-zoom object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/30 lg:bg-gradient-to-r lg:from-ink/80 lg:via-ink/40 lg:to-ink/10"
      />
      <div className="relative mx-auto w-full max-w-[90rem] px-6 pt-36 pb-10 lg:px-12 lg:pb-16">
        <p className="eyebrow mb-6 flex items-center gap-4 text-ivory/85">
          <span aria-hidden="true" className="h-px w-10 bg-ivory/70" />
          Paris · Lyon — depuis 1987
        </p>
        <h1
          id="hero-title"
          className="display max-w-4xl text-[3.25rem] leading-[1.02] sm:text-7xl lg:text-8xl"
        >
          L'immobilier d'exception, <em>en toute discrétion</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85">
          Appartements de prestige, hôtels particuliers et maisons de maître :
          une sélection confidentielle, accompagnée de bout en bout.
        </p>
        <div className="mt-12">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
