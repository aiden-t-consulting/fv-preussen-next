import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllTeams } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import type { Team } from "@/types";

export const metadata: Metadata = {
  title: "Unsere Teams",
  description:
    "Alle Mannschaften des FV Preussen Eberswalde – von den Herren bis zur G-Jugend.",
};

export const revalidate = 3600;

// Fallback teams if Sanity is not yet connected
const FALLBACK_TEAMS: Partial<Team>[] = [
  { _id: "1", name: "Herren (Landesliga Nord)", slug: { current: "herren" }, division: "Landesliga Nord", coach: "N.N." },
  { _id: "2", name: "Herren II", slug: { current: "herren-ii" }, division: "Kreisliga", coach: "N.N." },
  { _id: "3", name: "A-Junioren (U19)", slug: { current: "u19" }, division: "A-Junioren", coach: "N.N." },
  { _id: "4", name: "B-Junioren (U17)", slug: { current: "u17" }, division: "B-Junioren", coach: "N.N." },
  { _id: "5", name: "C-Junioren (U15)", slug: { current: "u15" }, division: "C-Junioren", coach: "N.N." },
  { _id: "6", name: "D-Junioren (U13)", slug: { current: "u13" }, division: "D-Junioren", coach: "N.N." },
  { _id: "7", name: "E-Junioren (U11)", slug: { current: "u11" }, division: "E-Junioren", coach: "N.N." },
  { _id: "8", name: "F-Junioren (U9)", slug: { current: "u9" }, division: "F-Junioren", coach: "N.N." },
  { _id: "9", name: "G-Junioren (U7)", slug: { current: "u7" }, division: "G-Junioren", coach: "N.N." },
  { _id: "10", name: "Ü50", slug: { current: "ue50" }, division: "Freizeit", coach: "N.N." },
];

function TeamCard({ team }: { team: Partial<Team> }) {
  return (
    <Link
      href={`/teams/${team.slug?.current}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#21a530]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Badge area */}
      <div className="relative h-36 bg-gradient-to-br from-[#15540a] to-[#21a530] flex items-center justify-center">
        {team.badge ? (
          <Image
            src={urlFor(team.badge).width(120).height(120).url()}
            alt={`${team.name} Wappen`}
            width={80}
            height={80}
            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-2xl font-['Playfair_Display',serif]">
              {team.name?.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            {team.division}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#21a530] transition-colors mb-1">
          {team.name}
        </h3>
        {team.coach && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
            <Users className="w-3 h-3" />
            Trainer: {team.coach}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function TeamsPage() {
  let teams: Partial<Team>[] = await getAllTeams();
  if (teams.length === 0) teams = FALLBACK_TEAMS;

  const herren = teams.filter(
    (t) => t.division?.toLowerCase().includes("liga") || t.name?.toLowerCase().includes("herren")
  );
  const jugend = teams.filter(
    (t) =>
      !t.division?.toLowerCase().includes("liga") &&
      !t.name?.toLowerCase().includes("herren") &&
      !t.name?.toLowerCase().includes("ü50")
  );
  const freizeitAlte = teams.filter(
    (t) => t.name?.toLowerCase().includes("ü50")
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#15540a] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#81d742] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Mannschaften
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Unsere Teams</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Von den Herren in der Landesliga bis zur G-Jugend — bei uns findet
            jeder seinen Platz auf dem Platz.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
        {herren.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-[#21a530]" />
              Herren
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {herren.map((t) => (
                <TeamCard key={t._id} team={t} />
              ))}
            </div>
          </section>
        )}

        {jugend.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#21a530]" />
              Nachwuchs & Jugend
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {jugend.map((t) => (
                <TeamCard key={t._id} team={t} />
              ))}
            </div>
          </section>
        )}

        {freizeitAlte.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#21a530]" />
              Freizeitfußball
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {freizeitAlte.map((t) => (
                <TeamCard key={t._id} team={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
