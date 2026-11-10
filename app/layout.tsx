import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Vérane — Immobilier d'exception à Paris et à Lyon",
  description:
    "Maison Vérane accompagne une clientèle exigeante dans l'achat et la vente d'appartements de prestige, d'hôtels particuliers et de maisons de maître à Paris et à Lyon.",
};

export const viewport: Viewport = {
  themeColor: "#16150f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${interTight.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
