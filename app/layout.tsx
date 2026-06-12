import type { Metadata } from "next";
import {
  Inter,
  Manrope,
  Fraunces,
  Playfair_Display,
  Anton,
} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Three Brands — Landing Page Showcase",
  description:
    "A cinematic landing-page reel: three brands, three industries, one presentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable} ${playfair.variable} ${anton.variable}`}
    >
      <body className="tone-dark">{children}</body>
    </html>
  );
}
