"use client";

import { useState } from "react";
import { Terminal, Package, BookOpen, Shield, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Flare, ScanLine, DrawLine } from "./SceneEffects";
import ModList from "./ModList";
import { useLang } from "@/context/LanguageContext";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

function CommandList({ items }: { items: { cmd: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-start gap-4 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <div
            className="shrink-0 bg-[#070b0f] border border-[#1a2535] group-hover:border-[#00d4ff]/40 px-3 py-1.5 min-w-[130px] transition-colors duration-200"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            <span className="text-[#00d4ff] text-xs">{item.cmd}</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <ChevronRight size={10} className="text-[#1a2535] group-hover:text-[#00d4ff]/40 transition-colors shrink-0" />
            <span className="text-[#7a9bb5] text-sm" style={{ fontFamily: "var(--font-share-tech)" }}>{item.desc}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ModCard({ name, desc, category, index }: { name: string; desc: string; category: string; index: number }) {
  return (
    <motion.div
      className="border border-[#1a2535] hover:border-[#00d4ff]/30 bg-[#070b0f] p-4 transition-all duration-200"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <div className="text-[#00d4ff] text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-share-tech)" }}>{category}</div>
      <div className="text-white text-sm font-medium mb-1" style={{ fontFamily: "var(--font-orbitron)" }}>{name}</div>
      <div className="text-[#7a9bb5] text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>{desc}</div>
    </motion.div>
  );
}

function RuleItem({ number, rule }: { number: number; rule: string }) {
  return (
    <motion.div
      className="flex items-start gap-4 group py-3 border-b border-[#1a2535] last:border-0"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: number * 0.04 }}
    >
      <span
        className="text-[#00d4ff]/30 text-xl font-black shrink-0 group-hover:text-[#00d4ff]/60 transition-colors"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {String(number).padStart(2, "0")}
      </span>
      <p className="text-[#7a9bb5] text-sm leading-relaxed group-hover:text-[#e0eaf5] transition-colors" style={{ fontFamily: "var(--font-share-tech)" }}>
        {rule}
      </p>
    </motion.div>
  );
}

import type { Translations } from "@/i18n/translations";

function buildTabs(t: Translations): Tab[] {
  return [
    {
      id: "commands",
      label: t.info.tabs.commands,
      icon: <Terminal size={16} />,
      content: <CommandList items={t.info.commands as { cmd: string; desc: string }[]} />,
    },
    {
      id: "mods",
      label: t.info.tabs.mods,
      icon: <Package size={16} />,
      content: <ModList />,
    },
    {
      id: "rules",
      label: t.info.tabs.rules,
      icon: <BookOpen size={16} />,
      content: (
        <div>
          <div className="mb-4 text-[#7a9bb5] text-sm" style={{ fontFamily: "var(--font-share-tech)" }}>
            {t.info.rulesDisclaimer}
          </div>
          {t.info.rules.map((rule, i) => <RuleItem key={i} number={i + 1} rule={rule} />)}
        </div>
      ),
    },
    {
      id: "rates",
      label: t.info.tabs.rates,
      icon: <Shield size={16} />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.info.rates.map((group, gi) => (
            <motion.div
              key={group.title}
              className="border border-[#1a2535] bg-[#070b0f]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: gi * 0.08 }}
            >
              <div className="border-b border-[#1a2535] px-4 py-2">
                <span className="text-[#00d4ff] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-share-tech)" }}>
                  {group.title}
                </span>
              </div>
              <div className="p-4 space-y-2">
                {group.items.map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-[#7a9bb5] text-sm" style={{ fontFamily: "var(--font-share-tech)" }}>{item.label}</span>
                    <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-orbitron)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];
}

// ── Desktop tab slider ──────────────────────────────────────────────
function TabSlider({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <>
      <motion.div
        className="flex items-stretch border-b border-[#1a2535] mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-4 text-sm tracking-wider uppercase transition-all duration-200 whitespace-nowrap border-b-2 -mb-px ${
              activeTab === tab.id
                ? "text-[#00d4ff] border-[#00d4ff] bg-[#00d4ff]/5"
                : "text-[#7a9bb5] border-transparent hover:text-[#e0eaf5] hover:border-[#1a2535]"
            }`}
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="hud-corners border border-[#1a2535] bg-[#070b0f]/80 p-6 md:p-8 min-h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// ── Mobile accordion ────────────────────────────────────────────────
function Accordion({ tabs }: { tabs: Tab[] }) {
  const [open, setOpen] = useState<string | null>(tabs[0].id);

  return (
    <div className="space-y-2">
      {tabs.map((tab) => {
        const isOpen = open === tab.id;
        return (
          <motion.div
            key={tab.id}
            className={`border transition-colors duration-200 ${
              isOpen ? "border-[#00d4ff]/40 bg-[#070b0f]" : "border-[#1a2535] bg-[#0d1117]/60"
            }`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Accordion header */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : tab.id)}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-colors duration-200 ${isOpen ? "text-[#00d4ff]" : "text-[#7a9bb5]"}`}>
                  {tab.icon}
                </span>
                <span
                  className={`text-sm tracking-wider uppercase font-medium transition-colors duration-200 ${
                    isOpen ? "text-[#00d4ff]" : "text-[#7a9bb5]"
                  }`}
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  {tab.label}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className={`transition-colors duration-200 ${isOpen ? "text-[#00d4ff]" : "text-[#1a2535]"}`}
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>

            {/* Top accent line when open */}
            {isOpen && (
              <div className="h-px mx-5 bg-gradient-to-r from-[#00d4ff]/40 to-transparent" />
            )}

            {/* Accordion body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-5 pb-5 pt-4">
                    {tab.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main section ────────────────────────────────────────────────────
export default function InfoTabs() {
  const { t } = useLang();
  const tabData = buildTabs(t);
  return (
    <section id="info" className="relative py-24 bg-[#0d1117] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Scan line + flares */}
      <ScanLine delay={2} opacity={0.04} />
      <Flare x="88%" y="15%" size={280} color="#00d4ff" duration={16} delay={0} streaks />
      <Flare x="2%"  y="70%" size={200} color="#0055aa" duration={12} delay={3} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-12"
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
            {t.info.sectionLabel}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
            {t.info.title} <span className="text-[#00d4ff] glow-cyan-text">{t.info.titleHighlight}</span>
          </h2>
          <DrawLine className="mt-5 max-w-[160px]" delay={0.3} />
        </motion.div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          <Accordion tabs={tabData} />
        </div>

        {/* Desktop: tab slider */}
        <div className="hidden md:block">
          <TabSlider tabs={tabData} />
        </div>
      </div>
    </section>
  );
}
