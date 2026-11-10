import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PropertyFiltersProvider } from "@/components/properties/property-filters";
import { About } from "@/components/sections/about";
import { Agencies } from "@/components/sections/agencies";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Properties } from "@/components/sections/properties";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
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
        <PropertyFiltersProvider>
          <Hero />
          <About />
          <Properties />
        </PropertyFiltersProvider>
        <Services />
        <Agencies />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
