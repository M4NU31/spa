"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { DrawLine, Flare, ScanLine } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

// ── Rotation config ───────────────────────────────────────────────
// Anchor: March 30, 2025 → TheIsland_WP is day 0
// Each day advances one map, cycling endlessly through the list
const ANCHOR = Date.UTC(2025, 2, 30); // months are 0-indexed

const ROTATION = [
  { key: "TheIsland_WP",  en: "The Island",     es: "The Island",      color: "#00d4ff" },
  { key: "ScorchedEarth", en: "Scorched Earth",  es: "Scorched Earth",  color: "#ff6b35" },
  { key: "TheCenter",     en: "The Center",      es: "The Center",      color: "#a855f7" },
  { key: "Aberration",    en: "Aberration",      es: "Aberración",      color: "#22c55e" },
  { key: "Ragnarok",      en: "Ragnarok",        es: "Ragnarok",        color: "#f59e0b" },
  { key: "Extinction",    en: "Extinction",      es: "Extinción",       color: "#ef4444" },
  { key: "LostColony",    en: "Lost Colony",     es: "Colonia Perdida", color: "#06b6d4" },
];
// ─────────────────────────────────────────────────────────────────

type MapEntry = typeof ROTATION[0];

function mapForDate(date: Date): MapEntry {
  const days = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - ANCHOR) / 86400000
  );
  return ROTATION[((days % ROTATION.length) + ROTATION.length) % ROTATION.length];
}

export default function RotativeCalendar() {
  const { lang, t } = useLang();

  const today = useMemo(() => new Date(), []);
  const year  = today.getFullYear();
  const month = today.getMonth();

  const todayMap = useMemo(() => mapForDate(today), [today]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-US", { month: "long", year: "numeric" })
            .format(new Date(year, month, 1)),
    [lang, year, month]
  );

  const weekdays = useMemo(() => {
    const locale = lang === "es" ? "es-ES" : "en-US";
    // Jan 5 2025 = Sunday — use as weekday reference
    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(2025, 0, 5 + i))
    );
  }, [lang]);

  const cells = useMemo(() => {
    const firstDow    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: Array<{ day: number; map: MapEntry } | null> = [];
    for (let i = 0; i < firstDow; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++)
      result.push({ day: d, map: mapForDate(new Date(year, month, d)) });
    return result;
  }, [year, month]);

  // Current week (Sun→Sat) for mobile list view
  const weekCells = useMemo(() => {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const locale = lang === "es" ? "es-ES" : "en-US";
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        date: d,
        dayName: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d),
        dayNum: d.getDate(),
        map: mapForDate(d),
        isToday: d.toDateString() === today.toDateString(),
      };
    });
  }, [today, lang]);

  const todayDate = today.getDate();

  return (
    <section id="calendar" className="relative py-24 bg-[#0d1117] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ScanLine delay={1.5} opacity={0.04} />
      <Flare x="92%" y="25%" size={250} color="#a855f7" duration={13} delay={1} />
      <Flare x="3%"  y="65%" size={200} color="#00d4ff" duration={10} delay={0} streaks />

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
            {t.calendar.sectionLabel}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
            {t.calendar.title}{" "}
            <span className="text-[#00d4ff] glow-cyan-text">{t.calendar.titleHighlight}</span>
          </h2>
          <DrawLine className="mt-5 max-w-xs" delay={0.3} />
        </motion.div>

        {/* Today's map banner */}
        <motion.div
          className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-[#1a2535] bg-[#070b0f]/80 p-5"
          style={{ borderLeftColor: todayMap.color, borderLeftWidth: 3 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div
              className="text-[10px] tracking-[0.35em] uppercase mb-1"
              style={{ color: todayMap.color, fontFamily: "var(--font-share-tech)" }}
            >
              {t.calendar.todayMap}
            </div>
            <div className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
              {lang === "es" ? todayMap.es : todayMap.en}
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: todayMap.color }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className="text-[11px] tracking-widest uppercase"
              style={{ color: todayMap.color, fontFamily: "var(--font-share-tech)" }}
            >
              {t.calendar.live}
            </span>
          </div>
        </motion.div>

        {/* Mobile: weekly list */}
        <motion.div
          className="md:hidden flex flex-col border border-[#1a2535] bg-[#070b0f]/60 overflow-hidden mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-5 py-3 border-b border-[#1a2535] flex items-center justify-between">
            <span className="text-white font-black uppercase tracking-widest text-xs capitalize"
                  style={{ fontFamily: "var(--font-orbitron)" }}>
              {monthLabel}
            </span>
            <MapPin size={12} className="text-[#00d4ff]" />
          </div>
          {weekCells.map((cell) => (
            <motion.div
              key={cell.dayNum}
              className={`flex items-center gap-4 px-5 py-3 border-b border-[#1a2535]/40 last:border-0 ${
                cell.isToday ? "bg-[#0d1117]" : ""
              }`}
              style={cell.isToday ? { borderLeftColor: cell.map.color, borderLeftWidth: 3 } : {}}
            >
              {/* Day */}
              <div className="w-10 shrink-0">
                <div className="text-[10px] uppercase tracking-widest"
                     style={{ color: cell.isToday ? cell.map.color : "#1a2535", fontFamily: "var(--font-share-tech)" }}>
                  {cell.dayName}
                </div>
                <div className="text-lg font-black leading-none"
                     style={{ color: cell.isToday ? cell.map.color : "#7a9bb5", fontFamily: "var(--font-orbitron)" }}>
                  {String(cell.dayNum).padStart(2, "0")}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 shrink-0" style={{ background: cell.map.color + "30" }} />

              {/* Map */}
              <div className="flex items-center gap-2 flex-1">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cell.map.color }} />
                <span className="text-sm font-medium"
                      style={{ color: cell.map.color + (cell.isToday ? "ff" : "99"), fontFamily: "var(--font-share-tech)" }}>
                  {lang === "es" ? cell.map.es : cell.map.en}
                </span>
              </div>

              {/* Today pulse */}
              {cell.isToday && (
                <motion.div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: cell.map.color }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop: full month grid */}
        <motion.div
          className="hidden md:block border border-[#1a2535] bg-[#070b0f]/60 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Month header */}
          <div className="px-6 py-4 border-b border-[#1a2535] flex items-center justify-between">
            <span
              className="text-white font-black uppercase tracking-widest text-sm capitalize"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {monthLabel}
            </span>
            <MapPin size={14} className="text-[#00d4ff]" />
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-[#1a2535]">
            {weekdays.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[10px] tracking-widest uppercase text-[#1a2535]"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              if (!cell) {
                return (
                  <div
                    key={`empty-${i}`}
                    className="border-b border-r border-[#1a2535]/20 min-h-[80px]"
                  />
                );
              }
              const isToday = cell.day === todayDate;
              return (
                <motion.div
                  key={cell.day}
                  className={`relative min-h-[80px] p-2 border-b border-r border-[#1a2535]/30 flex flex-col gap-1 transition-colors duration-200 ${
                    isToday ? "bg-[#0d1117]" : "hover:bg-[#0d1117]/60"
                  }`}
                  style={isToday ? { borderTopColor: cell.map.color, borderTopWidth: 2 } : {}}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (i % 7) * 0.03 }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: isToday ? cell.map.color : "#7a9bb5",
                      fontFamily: "var(--font-orbitron)",
                    }}
                  >
                    {String(cell.day).padStart(2, "0")}
                  </span>
                  <span
                    className="text-[11px] leading-tight"
                    style={{
                      color: cell.map.color + (isToday ? "ff" : "70"),
                      fontFamily: "var(--font-share-tech)",
                    }}
                  >
                    {lang === "es" ? cell.map.es : cell.map.en}
                  </span>
                  {isToday && (
                    <motion.div
                      className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: cell.map.color }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Map legend */}
        <motion.div
          className="mt-6 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {ROTATION.map((m) => (
            <div
              key={m.key}
              className="flex items-center gap-2 text-[10px] tracking-wider uppercase"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
              <span style={{ color: m.color + "cc" }}>{lang === "es" ? m.es : m.en}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
