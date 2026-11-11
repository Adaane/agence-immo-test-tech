import "server-only";
import { z } from "zod";
import { type Property, propertySchema } from "./schema";

const rawProperties = [
  {
    id: "paris-7-saint-germain",
    title: "Appartement familial sur jardin",
    description:
      "Au cœur de Saint-Germain-des-Prés, un appartement familial de 212 m² ouvre ses réceptions en enfilade sur un jardin privatif. Parquet Versailles, cheminées en marbre et hauteur sous plafond d'origine composent un cadre de vie rare, au calme absolu.",
    visit: { manifest: "/scroll-video/paris-7-saint-germain/manifest.json" },
    city: "paris",
    district: "Paris 7e · Saint-Germain-des-Prés",
    type: "appartement",
    price: 4_850_000,
    surface: 212,
    bedrooms: 4,
    tags: ["Parquet Versailles", "Double séjour", "Gardien"],
    badge: "exclusivite",
    image: {
      src: "/images/paris-7e-saint-germain.jpg",
      alt: "Salle à manger haussmannienne avec moulures et parquet en point de Hongrie",
    },
  },
  {
    id: "paris-8-monceau",
    title: "Hôtel particulier aux salons d'apparat",
    description:
      "À quelques pas du parc Monceau, un hôtel particulier du XIXe siècle déploie 640 m² autour d'une cour pavée. Escalier d'honneur, salons aux boiseries classées et bibliothèque lambrissée : une demeure de représentation intacte.",
    visit: { manifest: "/scroll-video/paris-8-monceau/manifest.json" },
    city: "paris",
    district: "Paris 8e · Parc Monceau",
    type: "hotel-particulier",
    price: null,
    surface: 640,
    bedrooms: 7,
    tags: ["Cour pavée", "Boiseries classées", "Ascenseur"],
    badge: "exclusivite",
    image: {
      src: "/images/paris-8e-monceau.jpg",
      alt: "Grand salon aux boiseries dorées éclairé par un lustre en cristal",
    },
  },
  {
    id: "paris-16-trocadero",
    title: "Étage noble face à la Seine",
    description:
      "Un étage noble de 286 m² face à la Seine, prolongé par un balcon filant. Les volumes de réception, baignés de lumière, offrent une vue dégagée sur la tour Eiffel.",
    city: "paris",
    district: "Paris 16e · Trocadéro",
    type: "appartement",
    price: 6_900_000,
    surface: 286,
    bedrooms: 4,
    tags: ["Balcon filant", "Vue dégagée", "Cave"],
    image: {
      src: "/images/paris-16e-trocadero.jpg",
      alt: "Salon lumineux aux hautes fenêtres et canapés capitonnés",
    },
  },
  {
    id: "paris-3-marais",
    title: "Duplex d'esthète dans un hôtel du XVIIe",
    description:
      "Dans un hôtel du XVIIe siècle au cœur du Marais, un duplex de caractère conjugue poutres anciennes et aménagements d'esthète. Une adresse confidentielle pour amateur de patrimoine.",
    city: "paris",
    district: "Paris 3e · Le Marais",
    type: "appartement",
    price: 3_950_000,
    surface: 178,
    bedrooms: 3,
    tags: ["Poutres apparentes", "Bibliothèque", "Cheminée"],
    badge: "nouveau",
    image: {
      src: "/images/paris-3e-marais.jpg",
      alt: "Bureau-bibliothèque aux boiseries claires avec cheminée",
    },
  },
  {
    id: "neuilly-saint-james",
    title: "Maison d'architecte avec jardin",
    description:
      "Dans le quartier Saint-James, une maison d'architecte s'ouvre de plain-pied sur un jardin arboré. Volumes généreux, lumière traversante et prestations contemporaines, aux portes de Paris.",
    city: "paris",
    district: "Neuilly-sur-Seine · Saint-James",
    type: "maison",
    price: 11_800_000,
    surface: 420,
    bedrooms: 6,
    tags: ["Jardin paysager", "Piscine intérieure", "Garage"],
    image: {
      src: "/images/neuilly-saint-james.jpg",
      alt: "Séjour contemporain baigné de lumière aux grandes baies vitrées",
    },
  },
  {
    id: "lyon-2-presquile",
    title: "Appartement bourgeois sur la place",
    description:
      "Sur l'une des plus belles places de la Presqu'île, un appartement bourgeois aux moulures préservées. Les pièces de réception en enfilade profitent d'une vue dégagée sur la place.",
    city: "lyon",
    district: "Lyon 2e · Presqu'île",
    type: "appartement",
    price: 2_350_000,
    surface: 196,
    bedrooms: 4,
    tags: ["Vue Bellecour", "Cheminées", "Ascenseur"],
    badge: "nouveau",
    image: {
      src: "/images/lyon-2e-presquile.jpg",
      alt: "Salon classique aux murs lambrissés avec canapé de velours vert",
    },
  },
  {
    id: "lyon-4-croix-rousse",
    title: "Loft de canut réinventé",
    description:
      "Sur les pentes de la Croix-Rousse, un ancien atelier de canut réinventé en loft. Hauteur sous plafond spectaculaire, verrières et terrasse dominant la ville.",
    city: "lyon",
    district: "Lyon 4e · Croix-Rousse",
    type: "penthouse",
    price: 1_850_000,
    surface: 230,
    bedrooms: 3,
    tags: ["Quatre mètres sous plafond", "Terrasse", "Vue sur Fourvière"],
    image: {
      src: "/images/lyon-4e-croix-rousse.jpg",
      alt: "Vaste séjour ouvert aux tons chauds sous une longue verrière",
    },
  },
  {
    id: "lyon-6-tete-d-or",
    title: "Appartement de réception sur le parc",
    description:
      "Face au parc de la Tête d'Or, un appartement de réception de 265 m² organisé autour d'un salon de musique. Cinq chambres, un balcon filant sur les frondaisons et un double garage complètent ce bien rare.",
    visit: { manifest: "/scroll-video/lyon-6-tete-d-or/manifest.json" },
    city: "lyon",
    district: "Lyon 6e · Parc de la Tête d'Or",
    type: "appartement",
    price: 3_200_000,
    surface: 265,
    bedrooms: 5,
    tags: ["Face au parc", "Salon de musique", "Double garage"],
    badge: "exclusivite",
    image: {
      src: "/images/lyon-6e-tete-d-or.jpg",
      alt: "Salon de réception avec piano à queue et lustre",
    },
  },
  {
    id: "lyon-5-fourviere",
    title: "Maison de maître sur la colline",
    description:
      "Sur la colline de Fourvière, une maison de maître entourée d'un jardin en terrasses. Vue panoramique sur Lyon, dépendance indépendante et volumes d'époque.",
    city: "lyon",
    district: "Lyon 5e · Fourvière",
    type: "maison",
    price: null,
    surface: 380,
    bedrooms: 6,
    tags: ["Jardin en terrasses", "Vue panoramique", "Dépendance"],
    image: {
      src: "/images/lyon-5e-fourviere.jpg",
      alt: "Salon sous une grande fenêtre en arc ouvrant sur la végétation",
    },
  },
] satisfies z.input<typeof propertySchema>[];

const properties = z.array(propertySchema).parse(rawProperties);

export function getProperties(): Property[] {
  return properties;
}

export function getProperty(id: string): Property | undefined {
  return properties.find((property) => property.id === id);
}
