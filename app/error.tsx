"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7f5] px-4 text-center">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-red-500">
        Fehler
      </p>
      <h1 className="mb-4 text-4xl font-bold text-gray-900 [font-family:var(--font-club)]">
        Etwas ist schiefgelaufen
      </h1>
      <p className="mb-8 max-w-sm text-gray-500">
        Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-[#2e7d32] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1b5e20]"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-700 transition-colors hover:border-[#2e7d32] hover:text-[#2e7d32]"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
