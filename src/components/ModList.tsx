"use client";

import { useModList } from "@/hooks/useModList";
import { motion } from "framer-motion";
import { ExternalLink, Package } from "lucide-react";

const RAGNAROK_BM_ID = "38491127";

function SkeletonCard() {
  return (
    <div className="border border-[#1a2535] bg-[#070b0f] p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-[#1a2535] rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#1a2535] rounded w-2/3" />
          <div className="h-2 bg-[#1a2535] rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default function ModList() {
  const { mods, loading, error } = useModList(RAGNAROK_BM_ID);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array(8).fill(null).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error || mods.length === 0) {
    return (
      <div className="border border-[#1a2535] bg-[#070b0f] p-6 text-center">
        <Package size={28} className="text-[#1a2535] mx-auto mb-3" />
        <p className="text-[#7a9bb5] text-sm" style={{ fontFamily: "var(--font-share-tech)" }}>
          {error ?? "No mods found"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-[#7a9bb5] text-xs mb-4 flex items-center gap-2"
        style={{ fontFamily: "var(--font-share-tech)" }}>
        <span className="text-[#00d4ff]">{mods.length}</span> mods active — live from server
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {mods.map((mod, i) => (
          <motion.a
            key={mod.id}
            href={mod.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-[#1a2535] hover:border-[#00d4ff]/40 bg-[#070b0f] px-4 py-3 group transition-colors duration-200"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ x: 3 }}
          >
            {/* Index number */}
            <span
              className="text-[#00d4ff]/20 text-sm font-black shrink-0 w-6 text-right group-hover:text-[#00d4ff]/50 transition-colors"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Name */}
            <span
              className="flex-1 text-[#e0eaf5] text-sm group-hover:text-[#00d4ff] transition-colors truncate"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {mod.name}
            </span>

            <ExternalLink
              size={11}
              className="text-[#1a2535] group-hover:text-[#00d4ff]/60 shrink-0 transition-colors"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
