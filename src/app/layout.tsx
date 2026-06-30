import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feyisayo & Olawale — September 26, 2026",
  description:
    "Join us as we celebrate the union of Feyisayo and Olawale. September 26, 2026 · Erly Moon Event Place, Ikola.",
  openGraph: {
    title: "Feyisayo & Olawale — September 26, 2026",
    description: "You are cordially invited to our wedding celebration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}
