import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} — Handmade Crochet`,
  description: `${BUSINESS_CONFIG.description} Shop handmade crochet flowers, bouquets, keychains, bags and more.`,
  keywords: "crochet, handmade, crochet flowers, crochet bouquet, crochet keychain, handcraft, India",
  openGraph: {
    title: BUSINESS_CONFIG.name,
    description: BUSINESS_CONFIG.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
