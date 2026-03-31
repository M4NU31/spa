"use client";

import { motion } from "framer-motion";
import { CheckCircle, Ticket, Clock } from "lucide-react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Flare, ScanLine, DrawLine } from "@/components/SceneEffects";
import { useLang } from "@/context/LanguageContext";

export default function PaymentSuccessPage() {
  const { t } = useLang();
  const s = t.shop.success;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      {/* Header */}
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
            <span className="text-[var(--text-dim)] text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-share-tech)" }}>
              ARK · Ascended
            </span>
          </div>
        </Link>
        <Link
          href="/shop"
          className="text-[var(--text-dim)] hover:text-[#00d4ff] text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          ← {s.backButton}
        </Link>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <ScanLine delay={1} opacity={0.04} />
        <Flare x="80%" y="10%" size={320} color="#00d4ff" duration={14} delay={0} />
        <Flare x="10%" y="65%" size={240} color="#a855f7" duration={11} delay={2} streaks />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">

          {/* Success indicator */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#00d4ff]/10 blur-xl scale-150" />
                <CheckCircle size={72} className="text-[#00d4ff] relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>

            <div
              className="flex items-center justify-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <span className="h-px w-12 bg-[#00d4ff]" />
              {s.label}
              <span className="h-px w-12 bg-[#00d4ff]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[var(--text)] mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
              {s.title} <span className="text-[#00d4ff] glow-cyan-text">{s.titleHighlight}</span>
            </h1>
            <DrawLine className="mx-auto max-w-xs mt-4 mb-4" delay={0.3} />
            <p className="text-[var(--text-dim)] max-w-md mx-auto" style={{ fontFamily: "var(--font-share-tech)" }}>
              {s.subtitle}
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="border border-[var(--border)] bg-[var(--surface)] overflow-hidden mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
            <div className="p-8 md:p-10 space-y-8">
              {s.steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                >
                  <span
                    className="text-3xl font-black shrink-0 text-[#00d4ff]/30 leading-none mt-1"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p
                      className="text-[var(--text)] font-bold text-sm tracking-widest uppercase mb-1"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      {step.title}
                    </p>
                    <p className="text-[var(--text-dim)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-share-tech)" }}>
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Discord CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 px-8 font-bold text-sm tracking-widest uppercase bg-[#5865F2] hover:bg-[#4752c4] text-white transition-colors duration-200 mb-4"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              {s.discordButton}
            </a>

            {/* Delivery note */}
            <div
              className="flex items-center gap-3 border border-[var(--border)] bg-[var(--bg)]/80 p-4"
            >
              <Clock size={14} className="text-[var(--text-dim)] shrink-0" />
              <p className="text-[var(--text-dim)] text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>
                {s.note}
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
