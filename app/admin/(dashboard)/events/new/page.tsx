import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "Neue Veranstaltung" };

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/events" className="mb-4 flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zu Veranstaltungen
        </Link>
        <h1 className="text-xl font-bold text-white">Neue Veranstaltung</h1>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-6">
        <EventForm />
      </div>
    </div>
  );
}
