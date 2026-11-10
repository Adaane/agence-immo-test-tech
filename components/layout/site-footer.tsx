import { Logo } from "./logo";
import { NAV_LINKS } from "./nav-links";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-6 py-20 md:grid-cols-3 lg:px-12">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-ivory/70">
            L'immobilier d'exception, Paris & Lyon.
          </p>
        </div>
        <nav aria-label="Navigation du pied de page">
          <ul className="flex flex-col gap-3">
            {[...NAV_LINKS, { href: "#contact", label: "Contact" }].map(
              (link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ivory/80 underline-offset-4 hover:text-ivory hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="grid gap-6 text-sm text-ivory/80 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <p>
            <span className="block text-ivory">Paris</span>
            12, rue de Miromesnil
            <br />
            75008 Paris
          </p>
          <p>
            <span className="block text-ivory">Lyon</span>
            8, place Bellecour
            <br />
            69002 Lyon
          </p>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <p className="mx-auto max-w-[90rem] px-6 py-6 text-xs text-ivory/70 lg:px-12">
          © 2026 Maison Vérane — Site de démonstration. Les biens, adresses et
          témoignages présentés sont fictifs.
        </p>
      </div>
    </footer>
  );
}
