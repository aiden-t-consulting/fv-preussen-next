import Link from "next/link";
import { Users, Dumbbell, Handshake } from "lucide-react";

const CARDS = [
  {
    icon: Users,
    title: "Mitglied werden",
    copy: "Werden Sie Teil der FV-Preussen-Familie und unterstützen Sie den Vereinsfußball im Barnim.",
    cta: "Jetzt Mitglied werden",
    href: "/verein/dokumente",
  },
  {
    icon: Dumbbell,
    title: "Probetraining anfragen",
    copy: "Neugierig auf unseren Spielbetrieb? Kommen Sie einfach zum Probetraining — für alle Altersklassen.",
    cta: "Probetraining anfragen",
    href: "/kontakt",
  },
  {
    icon: Handshake,
    title: "Sponsor werden",
    copy: "Sichtbare Präsenz im Vereinsumfeld und nachhaltige Verbindung mit dem Fußball in Eberswalde.",
    cta: "Jetzt anfragen",
    href: "/kontakt?betreff=sponsoring",
  },
];

export function ConversionBand() {
  return (
    <section className="bg-[#1a1a2e] py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, copy, cta, href }) => (
            <div
              key={title}
              className="flex flex-col rounded-[20px] border border-white/8 bg-white/5 p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2e7d32]/20">
                <Icon className="h-6 w-6 text-[#2e7d32]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white [font-family:var(--font-club)]">
                {title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/60">{copy}</p>
              <Link
                href={href}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#2e7d32] px-5 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1b5e20]"
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
