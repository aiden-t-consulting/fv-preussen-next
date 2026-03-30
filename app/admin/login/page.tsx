import { Lock, ShieldCheck } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  void searchParams; // available for future use
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2e7d32]/20 ring-1 ring-[#2e7d32]/40">
            <ShieldCheck className="h-7 w-7 text-[#4caf50]" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin-Bereich</h1>
          <p className="mt-1 text-sm text-gray-500">FV Preussen Eberswalde</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#1a1a1a] p-6 shadow-2xl">
          <form action={loginAction} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500"
              >
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-700 outline-none ring-0 transition-all focus:border-[#2e7d32]/60 focus:ring-1 focus:ring-[#2e7d32]/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#2e7d32] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1b5e20] active:scale-[0.99]"
            >
              Anmelden
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-gray-700">
          Nur für autorisierte Administratoren
        </p>
      </div>
    </div>
  );
}
