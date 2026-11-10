import { SectionHeading } from "./section-heading";

const TESTIMONIALS = [
  {
    quote:
      "Notre appartement du 7e a trouvé preneur en trois semaines, sans la moindre annonce publique. Une discrétion rare.",
    author: "Famille D.",
    context: "Vendeurs, Paris 7e",
  },
  {
    quote:
      "Nous cherchions une maison avec vue sur Lyon depuis deux ans. Maison Vérane nous l'a présentée avant sa mise en vente.",
    author: "Marc et Inès L.",
    context: "Acquéreurs, Lyon 5e",
  },
  {
    quote:
      "Installés à Genève, nous avons tout conduit à distance. Chaque étape était anticipée, chaque document prêt.",
    author: "Sophie R.",
    context: "Acquéreuse, Neuilly-sur-Seine",
  },
] as const;

export function Testimonials() {
  return (
    <section
      aria-labelledby="temoignages-titre"
      className="bg-sand py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-6 lg:px-12">
        <SectionHeading eyebrow="Témoignages" id="temoignages-titre">
          Ils nous ont <em>confié</em> leur projet
        </SectionHeading>
        <ul className="mt-20 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {TESTIMONIALS.map((testimonial) => (
            <li key={testimonial.author} className="reveal">
              <figure className="flex h-full flex-col border-t border-ink/30 pt-8">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none text-bronze"
                >
                  “
                </span>
                <blockquote className="mt-2 font-display text-2xl leading-snug font-light">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-auto pt-8 text-sm text-stone">
                  <span className="block font-medium text-ink">
                    {testimonial.author}
                  </span>
                  {testimonial.context}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
