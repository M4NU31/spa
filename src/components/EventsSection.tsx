"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { Flare, ScanLine, DrawLine } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

export default function EventsSection() {
  const { t } = useLang();

  return (
    <section id="events" className="relative py-24 bg-[var(--bg)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ScanLine delay={1} opacity={0.04} />
      <Flare x="85%" y="30%" size={260} color="#00d4ff" duration={14} delay={0} />
      <Flare x="5%"  y="65%" size={200} color="#0055aa" duration={11} delay={2} streaks />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="flex items-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            <span className="h-px w-12 bg-[#00d4ff]" />
            {t.events.sectionLabel}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)]" style={{ fontFamily: "var(--font-orbitron)" }}>
            {t.events.title} <span className="text-[#00d4ff] glow-cyan-text">{t.events.titleHighlight}</span>
          </h2>
          <DrawLine className="mt-5 max-w-xs" delay={0.3} />
        </motion.div>

        {/* Empty state */}
        <motion.div
          className="relative border border-[var(--border)] bg-[var(--surface)]/60 flex flex-col items-center justify-center py-20 px-6 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Animated corner accents */}
          {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-[#00d4ff]/30 ${cls}`} />
          ))}

          {/* Pulsing icon */}
          <motion.div
            className="relative mb-6 flex items-center justify-center w-16 h-16"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 border border-[#00d4ff]/20 rotate-45" />
            <Radio size={24} className="text-[#00d4ff]/50 relative z-10" />
          </motion.div>

          {/* Tag */}
          <div
            className="text-[10px] tracking-[0.4em] uppercase text-[#00d4ff]/50 mb-4 flex items-center gap-2"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/40"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {t.events.emptyTag}
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]/40"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          <h3
            className="text-xl md:text-2xl font-black text-[var(--text)]/60 text-center mb-3"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t.events.empty}
          </h3>
          <p
            className="text-[var(--text-dim)] text-sm text-center max-w-md"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {t.events.emptySub}
          </p>

          {/* Decorative scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/10 to-transparent"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
