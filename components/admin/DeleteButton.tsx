"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  apiPath: string; // e.g. /api/admin/events
  id: string;
  title: string;
}

export function DeleteButton({ apiPath, id, title }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (
      !confirm(
        `„${title}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`
      )
    )
      return;
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-gray-400 transition-all hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
      Löschen
    </button>
  );
}
