import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { GalleryForm } from "@/components/admin/GalleryForm";

export const metadata: Metadata = { title: "Galerie bearbeiten" };
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let gallery = null;
  try {
    gallery = await sanityClient.fetch(
      `*[_type == "gallery" && _id == $id][0]{
        _id, title, "slug": slug.current, date, description,
        "photos": photos[]{
          "assetRef": asset._ref,
          "url": asset->url,
          alt, caption
        }
      }`,
      { id: decodedId }
    );
  } catch { /* fall through */ }

  if (!gallery) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/gallery" className="mb-4 flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu Galerien
        </Link>
        <h1 className="text-xl font-bold text-white">Galerie bearbeiten</h1>
        <p className="mt-0.5 text-sm text-gray-500">{gallery.title}</p>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-6">
        <GalleryForm gallery={gallery} />
      </div>
    </div>
  );
}
