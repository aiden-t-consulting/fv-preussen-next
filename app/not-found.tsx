import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f7f5] px-4 text-center">
      <Image
        src="/logo.png"
        alt="FV Preussen Eberswalde"
        width={80}
        height={80}
        className="mb-8 h-20 w-auto opacity-60"
      />
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#2e7d32]">
        Fehler 404
      </p>
      <h1 className="mb-4 text-5xl font-bold text-gray-900 [font-family:var(--font-club)]">
        Seite nicht gefunden
      </h1>
      <p className="mb-8 max-w-sm text-gray-500">
        Die Seite, die du suchst, existiert nicht oder wurde verschoben.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-[#2e7d32] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1b5e20]"
        >
          Zur Startseite
        </Link>
        <Link
          href="/aktuelles"
          className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-700 transition-colors hover:border-[#2e7d32] hover:text-[#2e7d32]"
        >
          Aktuelle News
        </Link>
      </div>
    </div>
  );
}
