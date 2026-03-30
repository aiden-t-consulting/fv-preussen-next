"use client";

import { useState, useRef } from "react";
import { Loader2, Save, Upload, X, ChevronDown, ChevronUp } from "lucide-react";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
void slugify; // suppress unused warning — kept for future use

const inp =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-[#2e7d32]/60 focus:ring-1 focus:ring-[#2e7d32]/30";
const lbl = "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500";

interface SlideState {
  eyebrow: string;
  title: string;
  subtitle: string;
  isDynamic: boolean;
  existingImageRef: string;
  existingImageUrl: string;
  imageFile: File | null;
  imagePreview: string | null;
  imageAlt: string;
  cta1Label: string;
  cta1Href: string;
  cta2Label: string;
  cta2Href: string;
}

const DEFAULT_SLIDE: SlideState = {
  eyebrow: "", title: "", subtitle: "", isDynamic: false,
  existingImageRef: "", existingImageUrl: "", imageFile: null, imagePreview: null, imageAlt: "",
  cta1Label: "", cta1Href: "/", cta2Label: "", cta2Href: "/",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initSlide(s?: Record<string, any>): SlideState {
  if (!s) return DEFAULT_SLIDE;
  return {
    eyebrow: s.eyebrow ?? "",
    title: s.title ?? "",
    subtitle: s.subtitle ?? "",
    isDynamic: s.isDynamic ?? false,
    existingImageRef: s.imageRef ?? "",
    existingImageUrl: s.imageUrl ?? "",
    imageFile: null,
    imagePreview: s.imageUrl ?? null,
    imageAlt: s.imageAlt ?? "",
    cta1Label: s.cta1Label ?? "",
    cta1Href: s.cta1Href ?? "/",
    cta2Label: s.cta2Label ?? "",
    cta2Href: s.cta2Href ?? "/",
  };
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: Record<string, any>;
}

export function WebsiteForm({ initialData }: Props) {
  const d = initialData ?? {};

  // Site info
  const [clubName, setClubName] = useState(d.clubName ?? "");
  const [tagline, setTagline] = useState(d.tagline ?? "");
  const [contactEmail, setContactEmail] = useState(d.contactEmail ?? "");
  const [phone, setPhone] = useState(d.phone ?? "");
  const [address, setAddress] = useState(d.address ?? "");
  const [facebook, setFacebook] = useState(d.socialLinks?.facebook ?? "");
  const [instagram, setInstagram] = useState(d.socialLinks?.instagram ?? "");
  const [youtube, setYoutube] = useState(d.socialLinks?.youtube ?? "");

  // Hero slides (3 fixed)
  const rawSlides: Record<string, string>[] = d.heroSlides ?? [];
  const [slides, setSlides] = useState<SlideState[]>([
    initSlide(rawSlides[0]),
    initSlide(rawSlides[1]),
    initSlide(rawSlides[2]),
  ]);
  const [openSlide, setOpenSlide] = useState<number | null>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  function updateSlide(i: number, field: keyof SlideState, value: string | boolean | File | null) {
    setSlides((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  }

  function handleImageChange(i: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    updateSlide(i, "imageFile", file);
    const reader = new FileReader();
    reader.onload = (ev) => updateSlide(i, "imagePreview", ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage(i: number) {
    updateSlide(i, "imageFile", null);
    updateSlide(i, "imagePreview", null);
    updateSlide(i, "existingImageRef", "");
    if (fileRefs[i]?.current) fileRefs[i].current!.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Upload any new slide images
      const processedSlides = await Promise.all(
        slides.map(async (s, i) => {
          let imageRef = s.existingImageRef;
          if (s.imageFile) {
            const fd = new FormData();
            fd.append("file", s.imageFile);
            const upRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
            if (!upRes.ok) throw new Error(`Bild ${i + 1}: Upload fehlgeschlagen`);
            imageRef = (await upRes.json()).ref;
          }
          return {
            eyebrow: s.eyebrow,
            title: s.title,
            subtitle: s.subtitle,
            isDynamic: s.isDynamic,
            imageRef: imageRef || undefined,
            imageAlt: s.imageAlt,
            cta1Label: s.cta1Label,
            cta1Href: s.cta1Href,
            cta2Label: s.cta2Label,
            cta2Href: s.cta2Href,
          };
        })
      );

      const payload = {
        clubName, tagline, contactEmail, phone, address,
        facebookUrl: facebook, instagramUrl: instagram, youtubeUrl: youtube,
        heroSlides: processedSlides,
      };

      const res = await fetch("/api/admin/website", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Fehler beim Speichern");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}
      {success && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          Einstellungen gespeichert ✓
        </div>
      )}

      {/* ─── Hero Slides ─────────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a]">
        <div className="border-b border-white/[0.06] px-5 py-4">
          <p className="text-[13px] font-bold text-white">Hero-Slides</p>
          <p className="mt-0.5 text-[11px] text-gray-500">3 Slides des Startseiten-Hero-Bereichs</p>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {slides.map((slide, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenSlide(openSlide === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02]"
              >
                <div>
                  <span className="text-[12px] font-bold text-white">Slide {i + 1}</span>
                  {slide.eyebrow && <span className="ml-2 text-[11px] text-gray-500">— {slide.eyebrow}</span>}
                  {slide.isDynamic && <span className="ml-2 rounded-full bg-[#2e7d32]/20 px-2 py-0.5 text-[10px] text-[#4caf50]">Dynamisch</span>}
                </div>
                {openSlide === i ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
              </button>

              {openSlide === i && (
                <div className="space-y-4 border-t border-white/[0.06] px-5 pb-5 pt-4">
                  {/* Eyebrow */}
                  <div>
                    <label className={lbl}>Eyebrow-Text *</label>
                    <input className={inp} value={slide.eyebrow} onChange={(e) => updateSlide(i, "eyebrow", e.target.value)} placeholder="z.B. Nächstes Spiel" />
                  </div>

                  {/* isDynamic */}
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={slide.isDynamic}
                      onChange={(e) => updateSlide(i, "isDynamic", e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/10 accent-[#2e7d32]"
                    />
                    <span className="text-[12px] text-gray-300">Dynamisch — zeigt nächstes Spiel automatisch</span>
                  </label>

                  {/* Title + Subtitle */}
                  {!slide.isDynamic && (
                    <>
                      <div>
                        <label className={lbl}>Überschrift</label>
                        <input className={inp} value={slide.title} onChange={(e) => updateSlide(i, "title", e.target.value)} placeholder="Großer Titel..." />
                      </div>
                      <div>
                        <label className={lbl}>Untertitel</label>
                        <textarea className={`${inp} resize-none`} rows={2} value={slide.subtitle} onChange={(e) => updateSlide(i, "subtitle", e.target.value)} placeholder="Kurze Beschreibung..." />
                      </div>
                    </>
                  )}

                  {/* Image */}
                  <div>
                    <label className={lbl}>Bild (Spielerfoto / Hintergrundbild)</label>
                    {slide.imagePreview ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={slide.imagePreview} alt="Vorschau" className="h-36 w-full rounded-lg object-cover object-top" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500/80">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/[0.12] bg-white/[0.02] hover:border-[#2e7d32]/50">
                        <Upload className="h-4 w-4 text-gray-500" />
                        <span className="text-[11px] text-gray-500">Bild hochladen</span>
                        <input ref={fileRefs[i]} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleImageChange(i, e)} />
                      </label>
                    )}
                    {slide.imagePreview && (
                      <input className={`${inp} mt-2`} value={slide.imageAlt} onChange={(e) => updateSlide(i, "imageAlt", e.target.value)} placeholder="Alt-Text für das Bild" />
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={lbl}>Button 1 – Text</label>
                      <input className={inp} value={slide.cta1Label} onChange={(e) => updateSlide(i, "cta1Label", e.target.value)} placeholder="Zum Spielplan" />
                    </div>
                    <div>
                      <label className={lbl}>Button 1 – Link</label>
                      <input className={inp} value={slide.cta1Href} onChange={(e) => updateSlide(i, "cta1Href", e.target.value)} placeholder="/berichte" />
                    </div>
                    <div>
                      <label className={lbl}>Button 2 – Text</label>
                      <input className={inp} value={slide.cta2Label} onChange={(e) => updateSlide(i, "cta2Label", e.target.value)} placeholder="Alle Spiele" />
                    </div>
                    <div>
                      <label className={lbl}>Button 2 – Link</label>
                      <input className={inp} value={slide.cta2Href} onChange={(e) => updateSlide(i, "cta2Href", e.target.value)} placeholder="/aktuelles" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Site Info ───────────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <p className="mb-4 text-[13px] font-bold text-white">Vereinsinfo</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Vereinsname</label>
            <input className={inp} value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="FV Preussen Eberswalde e.V." />
          </div>
          <div>
            <label className={lbl}>Slogan</label>
            <input className={inp} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Motor des Barnim..." />
          </div>
          <div>
            <label className={lbl}>Kontakt-E-Mail</label>
            <input type="email" className={inp} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="info@..." />
          </div>
          <div>
            <label className={lbl}>Telefon</label>
            <input className={inp} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 3334 ..." />
          </div>
          <div className="sm:col-span-2">
            <label className={lbl}>Adresse</label>
            <textarea className={`${inp} resize-none`} rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Straße, PLZ Ort" />
          </div>
        </div>
      </div>

      {/* ─── Social Links ────────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/[0.08] bg-[#1a1a1a] p-5">
        <p className="mb-4 text-[13px] font-bold text-white">Social Media</p>
        <div className="space-y-3">
          {[
            { label: "Facebook URL", value: facebook, set: setFacebook, ph: "https://facebook.com/..." },
            { label: "Instagram URL", value: instagram, set: setInstagram, ph: "https://instagram.com/..." },
            { label: "YouTube URL", value: youtube, set: setYoutube, ph: "https://youtube.com/..." },
          ].map(({ label, value, set, ph }) => (
            <div key={label}>
              <label className={lbl}>{label}</label>
              <input type="url" className={inp} value={value} onChange={(e) => set(e.target.value)} placeholder={ph} />
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-[#2e7d32] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1b5e20] disabled:opacity-60">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Speichern...</> : <><Save className="h-4 w-4" /> Änderungen speichern</>}
        </button>
      </div>
    </form>
  );
}
