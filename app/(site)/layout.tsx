// Route group layout — Header and Footer are provided by the root layout.
// This file exists only to group the public site routes.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
