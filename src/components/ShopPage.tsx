"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { Flare, ScanLine, DrawLine } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

const PACKAGES = [
  { coins: 1000, price: 10, popular: false, color: "#00d4ff" },
  { coins: 2000, price: 18, popular: true,  color: "#a855f7" },
  { coins: 3000, price: 26, popular: false, color: "#f59e0b" },
];

function paypalUrl(amount: number) {
  return `https://paypal.me/frama9125/${amount}USD`;
}

export default function ShopPage() {
  const { lang, t } = useLang();

  return (
    <div className="min-h-screen bg-[#070b0f] text-white">
      {/* Header bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#00d4ff] rotate-45 group-hover:scale-110 transition-transform" />
            <Zap size={16} className="text-[#00d4ff] relative z-10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#00d4ff] font-black tracking-[0.2em] text-lg uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
              Sephirot
            </span>
            <span className="text-[#7a9bb5] text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-share-tech)" }}>
              ARK · Ascended
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="text-[#7a9bb5] hover:text-[#00d4ff] text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          ← {lang === "es" ? "Volver" : "Back"}
        </Link>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <ScanLine delay={1} opacity={0.04} />
        <Flare x="85%" y="15%" size={300} color="#a855f7" duration={14} delay={0} />
        <Flare x="5%"  y="60%" size={220} color="#00d4ff" duration={11} delay={2} streaks />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="flex items-center justify-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <span className="h-px w-12 bg-[#00d4ff]" />
              {t.shop.sectionLabel}
              <span className="h-px w-12 bg-[#00d4ff]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
              {t.shop.title} <span className="text-[#00d4ff] glow-cyan-text">{t.shop.titleHighlight}</span>
            </h1>
            <DrawLine className="mx-auto max-w-xs mt-4 mb-4" delay={0.3} />
            <p className="text-[#7a9bb5] max-w-md mx-auto" style={{ fontFamily: "var(--font-share-tech)" }}>
              {t.shop.subtitle}
            </p>
          </motion.div>

          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.coins}
                className="relative border bg-[#0d1117] overflow-hidden flex flex-col"
                style={{ borderColor: pkg.popular ? pkg.color : "#1a2535" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div
                    className="absolute top-0 right-0 text-[10px] tracking-widest uppercase px-3 py-1 font-bold"
                    style={{ background: pkg.color, color: "#070b0f", fontFamily: "var(--font-share-tech)" }}
                  >
                    {lang === "es" ? "MÁS POPULAR" : "MOST POPULAR"}
                  </div>
                )}

                {/* Top color bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${pkg.color}, transparent)` }} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Coin amount */}
                  <div className="mb-6">
                    <div
                      className="text-5xl font-black mb-1"
                      style={{ color: pkg.color, fontFamily: "var(--font-orbitron)" }}
                    >
                      {pkg.coins.toLocaleString()}
                    </div>
                    <div
                      className="text-xs tracking-widest uppercase"
                      style={{ color: pkg.color + "99", fontFamily: "var(--font-share-tech)" }}
                    >
                      {t.shop.currency}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${pkg.color}40, transparent)` }} />

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
                      ${pkg.price}
                    </span>
                    <span className="text-[#7a9bb5] text-sm ml-2" style={{ fontFamily: "var(--font-share-tech)" }}>
                      USD
                    </span>
                  </div>

                  {/* Buy button */}
                  <a
                    href={paypalUrl(pkg.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 py-3 px-6 font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:opacity-90"
                    style={{
                      background: pkg.color,
                      color: "#070b0f",
                      fontFamily: "var(--font-share-tech)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                    </svg>
                    {t.shop.buyButton}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How it works */}
          <motion.div
            className="border border-[#1a2535] bg-[#0d1117]/60 p-8 md:p-12 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="text-xl font-black text-white mb-8 tracking-widest"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t.shop.howTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.shop.steps.map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <span
                    className="text-3xl font-black shrink-0 text-[#00d4ff]/30"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {step.n}
                  </span>
                  <p
                    className="text-[#7a9bb5] text-sm leading-relaxed pt-1"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer note */}
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center gap-4 border border-[#1a2535] bg-[#070b0f]/80 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 shrink-0">
              <ShieldCheck size={18} className="text-[#00d4ff]" />
              <span
                className="text-[10px] tracking-widest uppercase text-[#00d4ff]"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                {t.shop.badge}
              </span>
            </div>
            <div className="w-px h-6 bg-[#1a2535] hidden md:block" />
            <div className="flex items-start gap-2">
              <Ticket size={14} className="text-[#7a9bb5] mt-0.5 shrink-0" />
              <p className="text-[#7a9bb5] text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>
                {t.shop.note}
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
