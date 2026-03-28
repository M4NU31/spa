"use client";

import { useServerStatus } from "@/hooks/useServerStatus";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

// ── Configure your servers here ──────────────────────────────────
// Option A: provide bmId (BattleMetrics server ID) — fastest
// Option B: provide ip — BM will search for it automatically
// Get your BM IDs from: https://www.battlemetrics.com/servers/arksa
const SERVER_CONFIG = [
  { label: "Valguero", bmId: "38435102" },
  { label: "Astreos",  ip: "" },   // add bmId or ip when ready
  { label: "Rotative", ip: "" },   // add bmId or ip when ready
];
// ─────────────────────────────────────────────────────────────────

function Dot({ online, loading }: { online: boolean; loading: boolean }) {
  if (loading) return <span className="w-1.5 h-1.5 rounded-full bg-[#1a2535] animate-pulse block" />;
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full block ${online ? "bg-emerald-400 animate-pulse" : "bg-red-500/60"}`}
    />
  );
}

export default function ServerStatusWidget() {
  const statuses = useServerStatus(SERVER_CONFIG, 120_000);
  const { t } = useLang();

  return (
    <div className="border border-[#1a2535] bg-[#070b0f]/85 backdrop-blur p-4 hud-corners">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[#00d4ff] text-[10px] tracking-widest uppercase"
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          {t.hero.serverStatus}
        </span>
        <RefreshCw size={10} className="text-[#1a2535]" />
      </div>

      <div className="space-y-2">
        {statuses.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dot online={s.online} loading={s.loading} />
              <span
                className="text-[#7a9bb5] text-[11px]"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                {s.label}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {s.loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[#1a2535] text-[11px]"
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  —
                </motion.span>
              ) : s.error || !s.online ? (
                <motion.span
                  key="offline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500/50 text-[11px]"
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  {t.maps.offline}
                </motion.span>
              ) : (
                <motion.span
                  key="players"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#00d4ff] text-[11px]"
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  {s.players}/{s.maxPlayers}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div
        className="mt-3 pt-2 border-t border-[#1a2535] text-[#1a2535] text-[9px] tracking-widest"
        style={{ fontFamily: "var(--font-share-tech)" }}
      >
        {t.statusWidget.updatesEvery}
      </div>
    </div>
  );
}
