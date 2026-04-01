"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ServerStatusWidget from "./ServerStatusWidget";
import { Flare, ScanLine, AnimatedCorner } from "./SceneEffects";
import { useLang } from "@/context/LanguageContext";

const slides = [
  {
    id: 1,
    title: "SEPHIROT ARK",
    subtitle: "Survival Ascended",
    tagline: "Forge your legend in the unforgiving wild",
    accent: "NOW LIVE",
    image: "/images/slide-ragnarok.jpg",
    // dark gradient over the image so text is always readable
    tint: "from-[#030810]/80 via-[#0a1a2e]/60 to-[#030810]/80",
  },
  {
    id: 2,
    title: "THREE WORLDS",
    subtitle: "Explore Every Map",
    tagline: "Astreos · Valguero · Rotative Server",
    accent: "MULTIPLE REALMS",
    image: "/images/slide-astreus.jpg",
    tint: "from-[#05080e]/80 via-[#0d1a15]/50 to-[#05080e]/80",
  },
  {
    id: 3,
    title: "JOIN THE TRIBE",
    subtitle: "Community & Events",
    tagline: "Weekly events, active admins, balanced gameplay",
    accent: "ACTIVE COMMUNITY",
    image: "/images/slide-community.jpg",
    tint: "from-[#070510]/80 via-[#0d0a0a]/50 to-[#070510]/80",
  },
];

export default function HeroBanner() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const go = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 500);
    },
    [transitioning]
  );

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#030810]"
    >
      {/* Background image with parallax — crossfade on slide change */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.image})`,
            y: bgY,
            scale: 1.08, // slight scale so parallax doesn't show edges
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dark tint gradient over the image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`tint-${slide.id}`}
          className={`absolute inset-0 bg-gradient-to-br ${slide.tint}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Hard bottom vignette so content section transition looks good */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070b0f] to-transparent pointer-events-none z-[1]" />

      {/* Scan lines */}
      <ScanLine delay={0} opacity={0.04} />
      <ScanLine delay={3} opacity={0.03} />

      {/* Flares */}
      <Flare x="15%" y="30%" size={400} color="#00d4ff" duration={18} delay={0} streaks />
      <Flare x="70%" y="55%" size={300} color="#0055aa" duration={14} delay={2} />

      {/* HUD corners */}
      <AnimatedCorner position="top-left"     color="#00d4ff" size={28} delay={0.8} />
      <AnimatedCorner position="top-right"    color="#00d4ff" size={28} delay={1.0} />
      <AnimatedCorner position="bottom-left"  color="#00d4ff" size={20} delay={1.2} />
      <AnimatedCorner position="bottom-right" color="#00d4ff" size={20} delay={1.4} />

      {/* Parallax grid overlay */}
      <motion.div
        className="absolute inset-0 grid-bg opacity-20 z-[2]"
        style={{ y: gridY }}
      />

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {[20, 40, 60, 80].map((pct) => (
          <div
            key={pct}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/8 to-transparent"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>

      {/* Large decorative text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-[var(--text)]/[0.04] select-none whitespace-nowrap pointer-events-none z-[2]"
        style={{ fontFamily: "var(--font-orbitron)", y: bgY }}
      >
        SEPHIROT
</motion.div>

      {/* Right info panel */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 w-52 z-10"
        style={{ opacity }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <ServerStatusWidget />
        <a
          href="#maps"
          className="border border-[#00d4ff] bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] text-center py-2 text-[11px] tracking-widest uppercase transition-all duration-200 animate-pulse-glow"
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          {t.hero.viewMaps}
        </a>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-32"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-4 flex items-center gap-3"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                <span className="h-px w-8 bg-[#00d4ff]" />
                {t.hero.slides[current].accent}
              </div>

              <h1
                className="text-5xl md:text-7xl font-black text-[var(--text)] leading-none mb-2 glow-cyan-text"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {t.hero.slides[current].title}
              </h1>
              <h2
                className="text-2xl md:text-3xl font-medium text-[#00d4ff] mb-4"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {t.hero.slides[current].subtitle}
              </h2>
              <p className="text-[#b0c8d8] text-base md:text-lg max-w-xl mb-8" style={{ fontFamily: "var(--font-share-tech)" }}>
                {t.hero.slides[current].tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            <a
              href="#maps"
              className="px-8 py-3 bg-[#00d4ff] text-[#070b0f] font-bold text-sm tracking-[0.15em] uppercase clip-top-right hover:bg-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t.hero.exploreMaps}
            </a>
            <a
              href="#info"
              className="px-8 py-3 border border-white/20 text-[var(--text)]/70 hover:border-[#00d4ff] hover:text-[#00d4ff] text-sm tracking-[0.15em] uppercase transition-all duration-200 backdrop-blur-sm"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {t.hero.serverInfo}
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Slider controls */}
      <div className="absolute bottom-8 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 ${
                i === current ? "w-8 h-1.5 bg-[#00d4ff]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="w-10 h-10 border border-white/20 hover:border-[#00d4ff] text-[var(--text)]/50 hover:text-[#00d4ff] flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="w-10 h-10 border border-white/20 hover:border-[#00d4ff] text-[var(--text)]/50 hover:text-[#00d4ff] flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
            <ChevronRight size={18} />
          </button>
          <span className="text-[var(--text)]/40 text-xs ml-2" style={{ fontFamily: "var(--font-share-tech)" }}>
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent z-20" />
    </section>
  );
}
