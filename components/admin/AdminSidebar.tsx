"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Newspaper,
  Calendar,
  Images,
  ExternalLink,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/analytics", label: "Traffic & Analytics", icon: BarChart3, exact: false },
  { href: "/admin/news", label: "Beiträge", icon: Newspaper, exact: false },
  { href: "/admin/events", label: "Veranstaltungen", icon: Calendar, exact: false },
  { href: "/admin/gallery", label: "Fotogalerien", icon: Images, exact: false },
  { href: "/admin/content", label: "Inhalte", icon: FileText, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0a0a]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2e7d32] text-[11px] font-bold text-white">
          FVP
        </div>
        <div>
          <p className="text-[12px] font-bold text-white">Admin</p>
          <p className="text-[10px] text-gray-600">FV Preussen</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-gray-600">
          Navigation
        </p>
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && href !== "/admin";
          const isExactAdmin = exact && pathname === "/admin";
          const isActive = isExactAdmin || (!exact && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                isActive || active
                  ? "bg-[#1b5e20]/30 text-[#4caf50]"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {(isActive || active) && (
                <ChevronRight className="h-3 w-3 text-[#4caf50]/60" />
              )}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/[0.06]" />
        <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-gray-600">
          Extern
        </p>
        <a
          href="https://fvpreussen-eberswalde.de"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span>Website ansehen</span>
        </a>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/[0.06] p-3">
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}
