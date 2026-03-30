"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Save, X } from "lucide-react";

const CATEGORIES = [
  { value: "heimspiel", label: "Heimspiel" },
  { value: "auswaertsspiel", label: "Auswärtsspiel" },
  { value: "training", label: "Training" },
  { value: "veranstaltung", label: "Veranstaltung" },
  { value: "sonstiges", label: "Sonstiges" },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface EventData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  endDate?: string;
  location?: string;
  description?: string;
  coverImageRef?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

const inp =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-[#2e7d32]/60 focus:ring-1 focus:ring-[#2e7d32]/30";
const lbl = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500";

export function EventForm({ event }: { event?: EventData }) {
  const router = useRouter();
  const isEdit = !!event;

  const [title, setTitle] = useState(event?.title ?? "");
  const [slug, setSlug] = useState(event?.slug ?? "");
  const [category, setCategory] = useState(event?.category ?? "veranstaltung");
  const [date, setDate] = useState(event?.date ? event.date.slice(0, 16) : "");
  const [endDate, setEndDate] = useState(event?.endDate ? event.endDate.slice(0, 16) : "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(event?.coverImageAlt ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(event?.coverImageUrl ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageRef, setExistingImageRef] = useState(event?.coverImageRef ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit) setSlug(slugify(val));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    if (!coverImageAlt) setCoverImageAlt(file.name.replace(/\.[^.]+$/, ""));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageRef("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let coverImageRef = existingImageRef;
      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        const upRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!upRes.ok) throw new Error((await upRes.json().catch(() => ({}))).error ?? "Upload fehlgeschlagen");
        coverImageRef = (await upRes.json()).ref;
      }

      const payload = {
        title, slug, category,
        date: new Date(date).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
        location: location || undefined,
        description: description || undefined,
        coverImageRef: coverImageRef || undefined,
        coverImageAlt: coverImageAlt || undefined,
      };

      const url = isEdit ? `/api/admin/events/${encodeURIComponent(event._id)}` : "/api/admin/events";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Fehler beim Speichern");
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className={lbl}>Titel *</label>
        <input className={inp} value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Veranstaltungstitel..." required />
      </div>

      {/* Slug */}
      <div>
        <label className={lbl}>URL-Slug *</label>
        <input className={`${inp} font-mono text-[12px]`} value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required />
      </div>

      {/* Category + Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Kategorie *</label>
          <select className={`${inp} cursor-pointer`} value={category} onChange={(e) => setCategory(e.target.value)} required>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#1a1a1a]">{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>Datum / Beginn *</label>
          <input type="datetime-local" className={inp} value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
      </div>

      {/* End date + Location */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Ende (optional)</label>
          <input type="datetime-local" className={inp} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label className={lbl}>Ort / Adresse</label>
          <input className={inp} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Stadion Neustadt, Eberswalde" />
        </div>
      </div>

      {/* Cover image */}
      <div>
        <label className={lbl}>Titelbild</label>
        {imagePreview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Vorschau" className="h-40 w-full rounded-lg object-cover" />
            <button type="button" onClick={removeImage} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500/80">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] hover:border-[#2e7d32]/50 hover:bg-[#2e7d32]/5">
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-[12px] text-gray-500">Bild auswählen</span>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageChange} />
          </label>
        )}
        {imagePreview && (
          <input className={`${inp} mt-2`} value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} placeholder="Alt-Text für das Bild" />
        )}
      </div>

      {/* Description */}
      <div>
        <label className={lbl}>Beschreibung</label>
        <textarea className={`${inp} resize-none`} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Weitere Infos zur Veranstaltung..." />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
        <button type="button" onClick={() => router.push("/admin/events")} className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-gray-400 hover:text-white">
          Abbrechen
        </button>
        <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-5 py-2 text-sm font-bold text-white hover:bg-[#1b5e20] disabled:opacity-60">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</> : <><Save className="h-4 w-4" /> {isEdit ? "Änderungen speichern" : "Erstellen"}</>}
        </button>
      </div>
    </form>
  );
}
