"use client";

import { useState, useRef } from "react";
import { Users, Cpu, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useServerStatus } from "@/hooks/useServerStatus";
import { Flare, ScanLine, DrawLine } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

const SERVER_CONFIG = [
  { label: "Astreos", ip: "" },
  { label: "Valguero", bmId: "38435102" },
  { label: "Rotative", ip: "" },
];

const maps = [
  {
    id: "astreus",
    name: "Astreos",
    type: "PERMANENT",
    difficulty: "Hard",
    description: "A unique custom map featuring alien landscapes, high-tier creatures, and exclusive resources. Designed for experienced survivors who seek the ultimate challenge.",
    features: ["Custom Biomes", "Exclusive Dinos", "High XP Rates", "Custom Drops"],
    color: "#00d4ff",
    accentBg: "from-teal-900/40 to-blue-900/20",
    icon: "🌌",
  },
  {
    id: "ragnarok",
    name: "Valguero",
    type: "PERMANENT",
    difficulty: "Medium",
    description: "The massive Norse-inspired map combining the best of multiple worlds. Lush valleys, scorching deserts, and freezing peaks await in this expansive realm.",
    features: ["Wyvern Nests", "Griffin Spawns", "Rich Resources", "Castle Ruins"],
    color: "#ff6b35",
    accentBg: "from-orange-900/30 to-red-900/20",
    icon: "⚔️",
  },
  {
    id: "rotative",
    name: "Rotative Server",
    type: "ROTATING",
    difficulty: "Varies",
    description: "Our rotating map server cycles through different ARK maps seasonally. Each rotation brings new challenges, events, and a fresh start for all survivors.",
    features: ["Seasonal Maps", "Special Events", "Fresh Start", "Community Vote"],
    color: "#a855f7",
    accentBg: "from-purple-900/30 to-violet-900/20",
    icon: "🔄",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function MapsSection() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const serverStatuses = useServerStatus(SERVER_CONFIG, 120_000);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="maps" ref={ref} className="relative py-24 bg-[#070b0f] overflow-hidden">
      {/* Parallax grid background */}
      <motion.div className="absolute inset-0 grid-bg opacity-40" style={{ y: bgY }} />

      {/* Scan line */}
      <ScanLine delay={1} opacity={0.05} />
      <ScanLine delay={4} opacity={0.04} />

      {/* Flares */}
      <Flare x="10%" y="20%" size={300} color="#00d4ff" duration={12} delay={0} />
      <Flare x="80%" y="60%" size={220} color="#0066aa" duration={15} delay={2} streaks />
      <Flare x="55%" y="10%" size={180} color="#00d4ff" duration={10} delay={1} />

      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="flex items-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            <span className="h-px w-12 bg-[#00d4ff]" />
            {t.maps.sectionLabel}
            <span className="h-px w-12 bg-[#00d4ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
            {t.maps.title} <span className="text-[#00d4ff] glow-cyan-text">{t.maps.titleHighlight}</span>
          </h2>
          <DrawLine className="mt-5 max-w-xs" delay={0.3} />
          <p className="text-[#7a9bb5] mt-3 max-w-xl" style={{ fontFamily: "var(--font-share-tech)" }}>
            {t.maps.subtitle}
          </p>
        </motion.div>

        {/* Map cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {maps.map((map, idx) => {
            const srv = serverStatuses[idx];
            return (
              <motion.div
                key={map.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onMouseEnter={() => setHovered(map.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative group border transition-colors duration-300 cursor-pointer overflow-hidden ${hovered === map.id ? "border-[var(--map-color)] bg-[#0d1117]" : "border-[#1a2535] bg-[#0d1117]/60"
                  }`}
                style={{ "--map-color": map.color } as React.CSSProperties}
              >
                {/* Top color bar */}
                <div
                  className="h-1 w-full transition-all duration-300"
                  style={{
                    background: hovered === map.id
                      ? `linear-gradient(90deg, transparent, ${map.color}, transparent)`
                      : `linear-gradient(90deg, transparent, ${map.color}33, transparent)`,
                  }}
                />

                {/* Corner decoration */}
                <div
                  className="absolute top-0 right-0 w-0 h-0 transition-all duration-300"
                  style={{
                    borderLeft: "20px solid transparent",
                    borderTop: `20px solid ${hovered === map.id ? map.color : "transparent"}`,
                  }}
                />

                <div className={`absolute inset-0 bg-gradient-to-br ${map.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className="text-[10px] tracking-[0.3em] uppercase mb-1 font-medium"
                        style={{ color: map.color, fontFamily: "var(--font-share-tech)" }}
                      >
                        {map.type === "PERMANENT" ? t.maps.permanent : t.maps.rotating}
                      </div>
                      <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
                        {t.maps.maps[idx].name}
                      </h3>
                    </div>
                    <span className="text-3xl">{map.icon}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5">
                      {srv?.loading ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1a2535] animate-pulse" />
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${srv?.online ? "bg-emerald-400 animate-pulse" : "bg-red-500/60"}`} />
                      )}
                      <span
                        className={`text-[11px] ${srv?.loading ? "text-[#1a2535]" : srv?.online ? "text-emerald-400" : "text-red-500/60"}`}
                        style={{ fontFamily: "var(--font-share-tech)" }}
                      >
                        {srv?.loading ? "—" : srv?.online ? t.maps.online : t.maps.offline}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#7a9bb5]">
                      <Users size={12} />
                      <span className="text-[11px]" style={{ fontFamily: "var(--font-share-tech)" }}>
                        {srv?.loading ? "—" : srv?.error ? "—" : `${srv?.players}/${srv?.maxPlayers}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#7a9bb5]">
                      <Cpu size={12} />
                      <span className="text-[11px]" style={{ fontFamily: "var(--font-share-tech)" }}>{t.maps.maps[idx].difficulty}</span>
                    </div>
                  </div>

                  <div className="h-px mb-5 transition-all duration-300" style={{ background: `linear-gradient(90deg, ${map.color}40, transparent)` }} />

                  <p className="text-[#7a9bb5] text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-share-tech)" }}>
                    {t.maps.maps[idx].description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {t.maps.maps[idx].features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <ChevronRight size={10} style={{ color: map.color }} />
                        <span className="text-[11px] text-[#7a9bb5]" style={{ fontFamily: "var(--font-share-tech)" }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="absolute bottom-4 right-6 text-6xl font-black opacity-5"
                    style={{ fontFamily: "var(--font-orbitron)", color: map.color }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom ticker */}
        <div className="mt-16 border-t border-[#1a2535] pt-6 overflow-hidden">
          <div className="flex gap-0">
            <div className="animate-ticker whitespace-nowrap flex items-center gap-8 text-[#1a2535] text-sm" style={{ fontFamily: "var(--font-share-tech)" }}>
              {Array(4).fill(null).map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-[#00d4ff]/20">◆</span>
                  <span>Astreos</span>
                  <span className="text-[#00d4ff]/20">◆</span>
                  <span>RAGNAROK</span>
                  <span className="text-[#00d4ff]/20">◆</span>
                  <span>ROTATIVE</span>
                  <span className="text-[#00d4ff]/20">◆</span>
                  <span>SEPHIROT ARK</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
