import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Veranstaltung bearbeiten" };
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let event = null;
  try {
    event = await sanityClient.fetch(
      `*[_type == "event" && _id == $id][0]{
        _id, title, "slug": slug.current, category, date, endDate, location, description,
        "coverImageRef": coverImage.asset._ref,
        "coverImageUrl": coverImage.asset->url,
        "coverImageAlt": coverImage.alt
      }`,
      { id: decodedId }
    );
  } catch { /* fall through */ }

  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/events" className="mb-4 flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu Veranstaltungen
        </Link>
        <h1 className="text-xl font-bold text-white">Veranstaltung bearbeiten</h1>
        <p className="mt-0.5 text-sm text-gray-500">{event.title}</p>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-6">
        <EventForm event={event} />
      </div>
    </div>
  );
}
