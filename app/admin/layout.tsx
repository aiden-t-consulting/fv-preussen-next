import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin – FV Preussen" },
  robots: { index: false, follow: false },
};

/** Minimal shell — login page uses this; (dashboard) layout adds sidebar */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0d0d0d]">{children}</div>;
}
