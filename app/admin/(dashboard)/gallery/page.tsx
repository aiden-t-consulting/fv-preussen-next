import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Images, Pencil } from "lucide-react";
import { sanityClient } from "@/lib/sanity/client";
import { isWriteConfigured } from "@/lib/admin/sanity-write";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Fotogalerien" };
export const dynamic = "force-dynamic";

type GalleryRow = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  photoCount: number;
  coverUrl?: string;
};

async function getGalleries(): Promise<GalleryRow[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "your-project-id") return [];
  try {
    return await sanityClient.fetch(
      `*[_type == "gallery"] | order(date desc) {
        _id, title, "slug": slug.current, date,
        "photoCount": count(photos),
        "coverUrl": photos[0].asset->url
      }`
    );
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const [galleries, writeOk] = await Promise.all([getGalleries(), Promise.resolve(isWriteConfigured())]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Fotogalerien</h1>
          <p className="mt-0.5 text-sm text-gray-500">{galleries.length} Galerien</p>
        </div>
        {writeOk && (
          <Link href="/admin/gallery/new" className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white hover:bg-[#1b5e20]">
            <Plus className="h-4 w-4" /> Neue Galerie
          </Link>
        )}
        {!writeOk && (
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            SANITY_WRITE_TOKEN fehlt
          </span>
        )}
      </div>

      {galleries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-[#1a1a1a] py-16 text-center">
          <Images className="h-8 w-8 text-gray-700" />
          <p className="text-sm text-gray-500">Keine Galerien vorhanden</p>
          {writeOk && (
            <Link href="/admin/gallery/new" className="mt-1 rounded-lg bg-[#2e7d32] px-4 py-2 text-sm font-bold text-white hover:bg-[#1b5e20]">
              Erste Galerie erstellen
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.map((g) => (
            <div key={g._id} className="group overflow-hidden rounded-xl border border-white/[0.08] bg-[#1a1a1a]">
              {/* Cover thumbnail */}
              <div className="relative h-40 w-full bg-white/[0.04]">
                {g.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.coverUrl} alt={g.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Images className="h-8 w-8 text-gray-700" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  {g.photoCount} Fotos
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="truncate text-[13px] font-semibold text-white">{g.title}</p>
                {g.date && (
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {new Date(g.date).toLocaleDateString("de-DE")}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/admin/gallery/${encodeURIComponent(g._id)}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] py-1.5 text-[11px] text-gray-400 transition-all hover:border-[#2e7d32]/50 hover:text-[#4caf50]"
                  >
                    <Pencil className="h-3 w-3" /> Bearbeiten
                  </Link>
                  <DeleteButton apiPath="/api/admin/gallery" id={g._id} title={g.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
