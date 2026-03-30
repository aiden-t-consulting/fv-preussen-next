"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Save, X } from "lucide-react";

const CATEGORIES = [
  { value: "news", label: "News" },
  { value: "bericht", label: "Spielbericht" },
  { value: "jugend", label: "Jugend" },
  { value: "verein", label: "Verein" },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface ArticleData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  author?: string;
  excerpt?: string;
  body?: string;
  coverImageRef?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

interface Props {
  article?: ArticleData;
}

const input =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-[#2e7d32]/60 focus:ring-1 focus:ring-[#2e7d32]/30";
const label = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500";

export function ArticleForm({ article }: Props) {
  const router = useRouter();
  const isEdit = !!article;

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [category, setCategory] = useState(article?.category ?? "news");
  const [publishedAt, setPublishedAt] = useState(
    article?.publishedAt
      ? article.publishedAt.slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );
  const [author, setAuthor] = useState(article?.author ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [body, setBody] = useState(article?.body ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(article?.coverImageAlt ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(article?.coverImageUrl ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageRef, setExistingImageRef] = useState(article?.coverImageRef ?? "");
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
        if (!upRes.ok) {
          const d = await upRes.json().catch(() => ({}));
          throw new Error(d.error ?? "Bild-Upload fehlgeschlagen");
        }
        const { ref } = await upRes.json();
        coverImageRef = ref;
      }

      const payload = {
        title,
        slug,
        category,
        publishedAt: new Date(publishedAt).toISOString(),
        author: author || undefined,
        excerpt: excerpt || undefined,
        body: body || undefined,
        coverImageRef: coverImageRef || undefined,
        coverImageAlt: coverImageAlt || undefined,
      };

      const url = isEdit
        ? `/api/admin/articles/${encodeURIComponent(article._id)}`
        : "/api/admin/articles";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Fehler beim Speichern");
      }
      router.push("/admin/news");
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
        <label className={label}>Titel *</label>
        <input
          className={input}
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Artikel-Titel..."
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className={label}>URL-Slug *</label>
        <input
          className={`${input} font-mono text-[12px]`}
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          placeholder="artikel-url-slug"
          required
        />
      </div>

      {/* Category + Published At */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Kategorie *</label>
          <select
            className={`${input} cursor-pointer`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#1a1a1a]">
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Veröffentlichungsdatum *</label>
          <input
            type="datetime-local"
            className={input}
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Author */}
      <div>
        <label className={label}>Autor</label>
        <input
          className={input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Name des Autors"
        />
      </div>

      {/* Cover image */}
      <div>
        <label className={label}>Titelbild</label>
        {imagePreview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Vorschau"
              className="h-48 w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] transition-colors hover:border-[#2e7d32]/50 hover:bg-[#2e7d32]/5">
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-[12px] text-gray-500">Bild auswählen (JPG, PNG, WebP)</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}
        {imagePreview && (
          <input
            className={`${input} mt-2`}
            value={coverImageAlt}
            onChange={(e) => setCoverImageAlt(e.target.value)}
            placeholder="Alt-Text für Barrierefreiheit"
          />
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label className={label}>Teaser / Zusammenfassung</label>
        <textarea
          className={`${input} resize-none`}
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Kurze Beschreibung des Artikels (max. 300 Zeichen)..."
          maxLength={300}
        />
        <p className="mt-1 text-right text-[10px] text-gray-600">{excerpt.length}/300</p>
      </div>

      {/* Body */}
      <div>
        <label className={label}>Artikeltext</label>
        <textarea
          className={`${input} resize-y`}
          rows={14}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Artikeltext... Absätze durch eine Leerzeile trennen."
        />
        <p className="mt-1 text-[10px] text-gray-600">
          Absätze durch eine Leerzeile trennen. Für erweiterte Formatierung Sanity Studio verwenden.
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1b5e20] disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Speichern...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />{" "}
              {isEdit ? "Änderungen speichern" : "Artikel erstellen"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
