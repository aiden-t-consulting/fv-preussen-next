export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Article {
  _id: string;
  _type: "article";
  title: string;
  slug: { current: string };
  category: "news" | "bericht" | "jugend" | "verein";
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
  author?: string;
}

export interface Team {
  _id: string;
  _type: "team";
  name: string;
  slug: { current: string };
  division: string;
  badge?: SanityImage;
  coach?: string;
  season?: string;
  fupaTeamId?: string;
  players?: Player[];
  description?: string;
}

export interface Player {
  _id: string;
  _type: "player";
  name: string;
  position: "Torwart" | "Abwehr" | "Mittelfeld" | "Angriff";
  shirtNumber?: number;
  photo?: SanityImage;
  bio?: string;
  nationality?: string;
}

export interface Sponsor {
  _id: string;
  _type: "sponsor";
  name: string;
  logo: SanityImage;
  tier: "hauptsponsor" | "premiumsponsor" | "partner";
  url?: string;
  description?: string;
}

export interface SiteSettings {
  _id: string;
  clubName: string;
  tagline: string;
  contactEmail: string;
  phone?: string;
  address?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  badge?: SanityImage;
}

// FuPa match data shapes
export interface FuPaMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time?: string;
  venue?: string;
  competition?: string;
  status: "scheduled" | "finished" | "cancelled";
}

export interface FuPaTableEntry {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  isCurrentTeam?: boolean;
}

// Portable Text (Sanity rich text)
export type PortableTextBlock = {
  _key: string;
  _type: string;
  children?: { _key: string; _type: string; text: string; marks?: string[] }[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  style?: string;
  listItem?: string;
  level?: number;
};
