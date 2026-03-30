import Image from "next/image";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { urlFor } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";
import type { Player } from "@/types";

const positionColors: Record<Player["position"], string> = {
  Torwart: "bg-yellow-100 text-yellow-800",
  Abwehr: "bg-blue-100 text-blue-800",
  Mittelfeld: "bg-green-100 text-green-800",
  Angriff: "bg-red-100 text-red-800",
};

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:border-[#2e7d32]/30 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="relative aspect-[3/4] bg-[#f1f8e9] overflow-hidden">
        {player.photo ? (
          <Image
            src={urlFor(player.photo).width(300).height(400).url()}
            alt={player.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-16 h-16 text-[#2e7d32]/30" />
          </div>
        )}
        {player.shirtNumber !== undefined && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-[#2e7d32] text-white rounded-full flex items-center justify-center text-xs font-bold">
            {player.shirtNumber}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1b5e20]/70 to-transparent" />
      </div>

      <div className="p-3 text-center">
        <Badge className={`${positionColors[player.position]} mb-1.5 text-xs`}>
          {player.position}
        </Badge>
        <h3 className="font-bold text-gray-900 text-sm leading-tight">
          {player.name}
        </h3>
        {player.nationality && (
          <p className="text-xs text-gray-400 mt-0.5">{player.nationality}</p>
        )}
      </div>
    </div>
  );
}
