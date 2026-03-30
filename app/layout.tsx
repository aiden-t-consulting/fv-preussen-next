import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2e7d32",
  width: "device-width",
  initialScale: 1,
};

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
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {!isAdmin && <Header />}
        <main className={isAdmin ? "flex-1" : "flex-1 pt-[72px] lg:pt-[88px]"}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        <Analytics />
      </body>
    </html>
  );
}
