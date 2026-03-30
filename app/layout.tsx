import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fvpreussen-eberswalde.de"),
  title: {
    default: "FV Preussen Eberswalde | Motor des Barnim",
    template: "%s | FV Preussen Eberswalde",
  },
  description:
    "Offizielle Website des FV Preussen Eberswalde e.V. – Fußball im Barnim. Aktuelles, Spielberichte, Teams und Vereinsinformationen.",
  keywords: ["FV Preussen Eberswalde", "Fußball", "Barnim", "Landesliga Nord", "Brandenburg"],
  openGraph: {
    siteName: "FV Preussen Eberswalde",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-[72px] lg:pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
