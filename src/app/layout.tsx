import type { Metadata } from "next";
import {
  Merriweather,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Century — Building Bengaluru since 1973",
  description:
    "Five decades of structural precision and visionary planning. Shaping the foundation where Bengaluru lives, works, and grows through engineering excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
