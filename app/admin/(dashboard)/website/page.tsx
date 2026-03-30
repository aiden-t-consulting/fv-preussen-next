import type { Metadata } from "next";
import { getSiteSettingsForAdmin, isWriteConfigured } from "@/lib/admin/sanity-write";
import { WebsiteForm } from "@/components/admin/WebsiteForm";

export const metadata: Metadata = { title: "Website-Einstellungen" };
export const dynamic = "force-dynamic";

export default async function WebsitePage() {
  const [data, writeOk] = await Promise.all([
    getSiteSettingsForAdmin(),
    Promise.resolve(isWriteConfigured()),
  ]);

  const sanityOk = !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Website-Einstellungen</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Hero-Slides, Vereinsinfo und Social Media
        </p>
      </div>

      {/* Warnings */}
      {!sanityOk && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm text-amber-400/80">
          Sanity ist nicht konfiguriert. Setze{" "}
          <code className="rounded bg-black/30 px-1 font-mono text-[11px]">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          in .env.local.
        </div>
      )}

      {sanityOk && !writeOk && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-[12px] text-amber-400/80">
          Erstelle einen <strong>Write-Token</strong> in Sanity (sanity.io → Project → API → Tokens
          → Add API Token → Editor) und setze{" "}
          <code className="rounded bg-black/30 px-1 font-mono text-[11px]">
            SANITY_WRITE_TOKEN
          </code>{" "}
          in .env.local, um Änderungen zu speichern.
        </div>
      )}

      <WebsiteForm initialData={data ?? undefined} />
    </div>
  );
}
