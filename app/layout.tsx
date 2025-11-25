import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "NovaVerse AI Mall",
  description:
    "Shop. Style. Travel. Dine — the world’s first AI-curated lifestyle mall.",
  themeColor: "#0b0b0e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-dvh bg-aurum bg-[length:200%_200%] text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

