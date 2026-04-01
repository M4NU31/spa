"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flare, ScanLine, DrawLine } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

const admins = [
  {
    name: "M4NU31",
    role: "Founder & Lead Admin",
    tag: "FOUNDER",
    color: "#00d4ff",
    badge: "★★★",
    flag: "pe",
  },
  {
    name: "Churrumaais",
    role: "Co-Admin & Constructor",
    tag: "CO-ADMIN",
    color: "#a855f7",
    badge: "★★",
    flag: "mx",
  },
  {
    name: "Tyson",
    role: "Co-Admin & Promotor",
    tag: "CO-ADMIN",
    color: "#f59e0b",
    badge: "★★",
    flag: "pe",
  },
];

export default function AdminsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const { t } = useLang();

  return (
    <section id="admins" ref={ref} className="relative py-24 bg-[var(--bg)] overflow-hidden">
      {/* Parallax grid */}
      <motion.div className="absolute inset-0 grid-bg opacity-40" style={{ y: bgY }} />

      {/* Scan lines */}
      <ScanLine delay={0} opacity={0.05} />
      <ScanLine delay={3.5} opacity={0.035} />

      {/* Flares */}
      <Flare x="5%" y="50%" size={260} color="#00d4ff" duration={14} delay={0.5} streaks />
      <Flare x="92%" y="25%" size={200} color="#a855f7" duration={11} delay={2} />
      <Flare x="50%" y="85%" size={240} color="#0066aa" duration={13} delay={1} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#00d4ff]/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="flex items-center justify-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            <span className="h-px w-12 bg-[#00d4ff]" />
            {t.admins.sectionLabel}
            <span className="h-px w-12 bg-[#00d4ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-3" style={{ fontFamily: "var(--font-orbitron)" }}>
            {t.admins.title} <span className="text-[#00d4ff] glow-cyan-text">{t.admins.titleHighlight}</span>
          </h2>
          <DrawLine className="mx-auto max-w-[120px] mt-4 mb-4" delay={0.2} />
          <p className="text-[var(--text-dim)] max-w-md mx-auto" style={{ fontFamily: "var(--font-share-tech)" }}>
            {t.admins.subtitle}
          </p>
        </motion.div>

        {/* Admin cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {admins.map((admin, idx) => (
            <motion.div
              key={admin.name}
              className={`relative border bg-[var(--surface)] overflow-hidden group ${idx === 0 ? "md:mt-0" : "md:mt-6"}`}
              style={{ borderColor: `${admin.color}30` }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Top bar */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${admin.color}, transparent)` }}
              />

              {/* Glow bg on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top, ${admin.color}08 0%, transparent 60%)` }}
              />

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div
                      className="w-16 h-16 flex items-center justify-center border-2 relative overflow-hidden"
                      style={{ borderColor: admin.color }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `radial-gradient(circle, ${admin.color}, transparent)` }}
                      />
                      <span
                        className="text-2xl font-black relative z-10"
                        style={{ color: admin.color, fontFamily: "var(--font-orbitron)" }}
                      >
                        {admin.name[0]}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-[#0d1117] rounded-full animate-pulse" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div
                      className="text-[10px] tracking-widest uppercase px-2 py-0.5 border"
                      style={{
                        color: admin.color,
                        borderColor: `${admin.color}40`,
                        background: `${admin.color}10`,
                        fontFamily: "var(--font-share-tech)",
                      }}
                    >
                      {admin.tag}
                    </div>
                    <div style={{ color: admin.color }} className="text-sm">{admin.badge}</div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-[var(--text)] mb-1 flex items-center gap-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                  {admin.name}
                  <img
                    src={`https://flagcdn.com/w20/${admin.flag}.png`}
                    alt={admin.flag}
                    width={20}
                    height={14}
                    className="inline-block rounded-sm"
                  />
                </h3>
                <div className="text-sm mb-4" style={{ color: admin.color, fontFamily: "var(--font-share-tech)" }}>
                  {admin.role}
                </div>

                <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${admin.color}40, transparent)` }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 border border-[var(--border)] bg-[var(--surface)]/60 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#00d4ff]/30 flex items-center justify-center">
              <MessageCircle size={18} className="text-[#00d4ff]" />
            </div>
            <div>
              <div className="text-[var(--text)] font-medium text-sm" style={{ fontFamily: "var(--font-orbitron)" }}>{t.admins.needHelp}</div>
              <div className="text-[var(--text-dim)] text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>{t.admins.needHelpSub}</div>
            </div>
          </div>
          <a
            href="https://discord.sephirotark.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[#00d4ff] text-[#00d4ff] text-xs tracking-widest uppercase hover:bg-[#00d4ff]/10 transition-all duration-200 whitespace-nowrap"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {t.admins.openTicket}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
