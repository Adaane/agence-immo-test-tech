import "server-only";
import { z } from "zod";
import { type Property, propertySchema } from "./schema";

const rawProperties = [
  {
    id: "paris-7-saint-germain",
    title: "Appartement familial sur jardin",
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
