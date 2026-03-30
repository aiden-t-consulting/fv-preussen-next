import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Trophy, ArrowLeft } from "lucide-react";
import { getAllTeams } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import { LEGACY_TEAMS, type LegacyTeam } from "@/lib/legacy/teams";

export const metadata: Metadata = {
  title: "Unsere Teams",
  description:
    "Alle Mannschaften des FV Preussen Eberswalde – von den Herren bis zur G-Jugend.",
};

export const revalidate = 3600;

const FALLBACK_TEAMS: LegacyTeam[] = LEGACY_TEAMS;

function TeamCard({ team }: { team: LegacyTeam }) {
  return (
    <Link
      href={`/teams/${team.slug?.current}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#2e7d32]/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Badge / photo area */}
      <div className="relative h-36 bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] flex items-center justify-center overflow-hidden">
        {team.badge ? (
          <Image
            src={urlFor(team.badge).width(120).height(120).url()}
            alt={`${team.name} Wappen`}
            width={80}
            height={80}
            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        ) : team.photo ? (
          <>
            <Image
              src={team.photo}
              alt={team.name ?? "Teamfoto"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/25" />
          </>
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
        <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#2e7d32] transition-colors mb-1">
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
  let teams: LegacyTeam[] = await getAllTeams();
  if (teams.length === 0) teams = FALLBACK_TEAMS;

  const herren = teams.filter((t) =>
    t.name?.toLowerCase().includes("männer") ||
    t.name?.toLowerCase().includes("manner") ||
    t.name?.toLowerCase().includes("herren")
  );
  const jugend = teams.filter((t) =>
    t.name?.toLowerCase().includes("junior") ||
    t.name?.toLowerCase().includes("u7") ||
    t.name?.toLowerCase().includes("u9") ||
    t.name?.toLowerCase().includes("u11") ||
    t.name?.toLowerCase().includes("u13") ||
    t.name?.toLowerCase().includes("u15") ||
    t.name?.toLowerCase().includes("u17") ||
    t.name?.toLowerCase().includes("u19")
  );
  const freizeitAlte = teams.filter((t) =>
    t.name?.toLowerCase().includes("u35") ||
    t.name?.toLowerCase().includes("u45") ||
    t.name?.toLowerCase().includes("u50") ||
    t.name?.toLowerCase().includes("altherren")
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-[#1b5e20] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#a5d6a7] hover:text-white transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
          <p className="text-[#a5d6a7] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Mannschaften
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">Unsere Teams</h1>
          <p className="mt-4 text-gray-300 max-w-xl">
            Übersicht unserer Mannschaften von Großfeld bis Nachwuchs.
            Teamfotos basieren auf den veröffentlichten Vereinsinformationen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
        {herren.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-[#2e7d32]" />
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
              <Users className="w-5 h-5 text-[#2e7d32]" />
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
              <Users className="w-5 h-5 text-[#2e7d32]" />
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
