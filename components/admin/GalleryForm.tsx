"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Save, X, ImagePlus } from "lucide-react";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface PhotoEntry {
  key: string;
  // existing Sanity asset
  assetRef?: string;
  url?: string;
  // new file to upload
  file?: File;
  preview?: string;
  // metadata
  alt: string;
  caption: string;
}

export interface GalleryData {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  description?: string;
  photos?: { assetRef: string; url?: string; alt?: string; caption?: string }[];
}

const inp =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-[#2e7d32]/60 focus:ring-1 focus:ring-[#2e7d32]/30";
const lbl = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500";

export function GalleryForm({ gallery }: { gallery?: GalleryData }) {
  const router = useRouter();
  const isEdit = !!gallery;
  const addPhotosRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(gallery?.title ?? "");
  const [slug, setSlug] = useState(gallery?.slug ?? "");
  const [date, setDate] = useState(gallery?.date ? gallery.date.slice(0, 16) : "");
  const [description, setDescription] = useState(gallery?.description ?? "");
  const [photos, setPhotos] = useState<PhotoEntry[]>(
    (gallery?.photos ?? []).map((p, i) => ({
      key: `existing_${i}`,
      assetRef: p.assetRef,
      url: p.url,
      alt: p.alt ?? "",
      caption: p.caption ?? "",
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCount, setUploadingCount] = useState(0);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit) setSlug(slugify(val));
  }

  function handleAddPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newEntries: PhotoEntry[] = files.map((file) => {
      const entry: PhotoEntry = {
        key: `new_${Date.now()}_${Math.random()}`,
        file,
        alt: file.name.replace(/\.[^.]+$/, ""),
        caption: "",
      };
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos((prev) =>
          prev.map((p) =>
            p.key === entry.key ? { ...p, preview: ev.target?.result as string } : p
          )
        );
      };
      reader.readAsDataURL(file);
      return entry;
    });
    setPhotos((prev) => [...prev, ...newEntries]);
    if (addPhotosRef.current) addPhotosRef.current.value = "";
  }

  function removePhoto(key: string) {
    setPhotos((prev) => prev.filter((p) => p.key !== key));
  }

  function updatePhoto(key: string, field: "alt" | "caption", value: string) {
    setPhotos((prev) => prev.map((p) => (p.key === key ? { ...p, [field]: value } : p)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload any new photo files
      const newFiles = photos.filter((p) => !!p.file);
      setUploadingCount(newFiles.length);

      const refMap = new Map<string, string>();
      for (const entry of newFiles) {
        const fd = new FormData();
        fd.append("file", entry.file!);
        const upRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!upRes.ok) throw new Error(`Upload fehlgeschlagen für ${entry.file!.name}`);
        const { ref } = await upRes.json();
        refMap.set(entry.key, ref);
        setUploadingCount((c) => c - 1);
      }

      // Build final photos array
      const finalPhotos = photos
        .map((p) => {
          const assetRef = p.file ? refMap.get(p.key) : p.assetRef;
          if (!assetRef) return null;
          return { assetRef, alt: p.alt, caption: p.caption };
        })
        .filter(Boolean);

      const payload = {
        title, slug,
        date: date ? new Date(date).toISOString() : undefined,
        description: description || undefined,
        photos: finalPhotos,
      };

      const url = isEdit ? `/api/admin/gallery/${encodeURIComponent(gallery._id)}` : "/api/admin/gallery";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Fehler beim Speichern");
      router.push("/admin/gallery");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setUploadingCount(0);
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
        <input className={inp} value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Galerie-Titel..." required />
      </div>

      {/* Slug */}
      <div>
        <label className={lbl}>URL-Slug *</label>
        <input className={`${inp} font-mono text-[12px]`} value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required />
      </div>

      {/* Date + Description */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={lbl}>Datum</label>
          <input type="datetime-local" className={inp} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className={lbl}>Beschreibung</label>
          <input className={inp} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Kurze Beschreibung..." />
        </div>
      </div>

      {/* Photos */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className={lbl} style={{ margin: 0 }}>
            Fotos ({photos.length})
          </label>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[12px] text-gray-400 transition-all hover:border-[#2e7d32]/50 hover:text-[#4caf50]">
            <ImagePlus className="h-3.5 w-3.5" />
            Fotos hinzufügen
            <input
              ref={addPhotosRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleAddPhotos}
            />
          </label>
        </div>

        {photos.length === 0 ? (
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] hover:border-[#2e7d32]/50 hover:bg-[#2e7d32]/5">
            <Upload className="h-6 w-6 text-gray-600" />
            <span className="text-[12px] text-gray-500">Fotos hier ablegen oder klicken</span>
            <input ref={addPhotosRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleAddPhotos} />
          </label>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div key={photo.key} className="group relative rounded-lg border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                {/* Thumbnail */}
                <div className="relative h-28 w-full bg-white/[0.04]">
                  {(photo.preview ?? photo.url) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.preview ?? photo.url}
                      alt={photo.alt || "Foto"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.key)}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/80"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                {/* Metadata */}
                <div className="space-y-1.5 p-2">
                  <input
                    className="w-full rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-gray-300 placeholder-gray-600 outline-none focus:border-[#2e7d32]/40"
                    value={photo.alt}
                    onChange={(e) => updatePhoto(photo.key, "alt", e.target.value)}
                    placeholder="Alt-Text"
                  />
                  <input
                    className="w-full rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-gray-300 placeholder-gray-600 outline-none focus:border-[#2e7d32]/40"
                    value={photo.caption}
                    onChange={(e) => updatePhoto(photo.key, "caption", e.target.value)}
                    placeholder="Bildunterschrift"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
        <button type="button" onClick={() => router.push("/admin/gallery")} className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-gray-400 hover:text-white">
          Abbrechen
        </button>
        <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-5 py-2 text-sm font-bold text-white hover:bg-[#1b5e20] disabled:opacity-60">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {uploadingCount > 0 ? `${uploadingCount} Fotos hochladen...` : "Speichern..."}
            </>
          ) : (
            <><Save className="h-4 w-4" /> {isEdit ? "Änderungen speichern" : "Galerie erstellen"}</>
          )}
        </button>
      </div>
    </form>
  );
}
