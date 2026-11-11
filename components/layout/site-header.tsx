"use client";

import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { NAV_LINKS } from "./nav-links";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-line bg-ivory/95 text-ink backdrop-blur-sm"
          : "bg-gradient-to-b from-ink/50 to-transparent text-ivory",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 lg:px-12">
        <a href="/">
          <Logo />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="eyebrow relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/#contact"
            className={cn(
              "eyebrow hidden border px-5 py-3 transition-colors duration-300 sm:inline-block",
              scrolled
                ? "border-ink hover:bg-ink hover:text-ivory"
                : "border-ivory/70 hover:bg-ivory hover:text-ink",
            )}
          >
            Prendre rendez-vous
          </a>
          <Sheet>
            <SheetTrigger aria-label="Ouvrir le menu" className="p-2 lg:hidden">
              <MenuIcon
                aria-hidden="true"
                className="size-6"
                strokeWidth={1.25}
              />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full bg-ivory px-8 pt-24 sm:max-w-md"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation dans la page
              </SheetDescription>
              <nav aria-label="Navigation mobile">
                <ul className="flex flex-col gap-6">
                  {[
                    ...NAV_LINKS,
                    { href: "/#contact", label: "Prendre rendez-vous" },
                  ].map((link) => (
                    <li key={link.href}>
                      <SheetClose
                        render={(props) => <a {...props} href={link.href} />}
                        className="font-display text-4xl font-light"
                      >
                        {link.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
