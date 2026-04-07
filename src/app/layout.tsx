import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display, Cinzel, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const syne = Syne({ subsets: ["latin"], variable: '--font-syne' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });
const caveat = Caveat({ subsets: ["latin"], variable: '--font-caveat' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} ${playfair.variable} ${cinzel.variable} ${caveat.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
