import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locale = "de-DE"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateString: string, locale = "de-DE"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatMatchTime(dateString: string, locale = "de-DE"): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    news: "News",
    bericht: "Spielbericht",
    jugend: "Jugend",
    verein: "Verein",
  };
  return labels[category] ?? category;
}

export function categoryColor(category: string): string {
  const colors: Record<string, string> = {
    news: "bg-[#2e7d32] text-white",
    bericht: "bg-[#1b5e20] text-white",
    jugend: "bg-[#a5d6a7] text-[#1b5e20]",
    verein: "bg-neutral-600 text-white",
  };
  return colors[category] ?? "bg-neutral-200 text-neutral-800";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöü]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue" }[c] ?? c))
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
