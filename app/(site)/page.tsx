import { notFound } from "next/navigation";

// This route is handled by app/page.tsx (root level, outside route group).
// This file must exist for the route group folder to be valid but should never be reached.
export default function SiteRootPage() {
  notFound();
}
