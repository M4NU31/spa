"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "fadeout">("loading");

  useEffect(() => {
    // Ramp up progress bar
    const steps = [
      { target: 30, delay: 100, duration: 400 },
      { target: 60, delay: 500, duration: 500 },
      { target: 85, delay: 1000, duration: 600 },
      { target: 100, delay: 1600, duration: 400 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay, duration }) => {
      const t = setTimeout(() => {
        const start = Date.now();
        const startVal = progress;
        const tick = () => {
          const elapsed = Date.now() - start;
          const pct = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - pct, 3);
          setProgress(Math.round(startVal + (target - startVal) * eased));
          if (pct < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
      timers.push(t);
    });

    // Start fade out after bar completes
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 2400);
    // Unmount after fade
    const doneTimer = setTimeout(() => onComplete(), 3100);

    timers.push(fadeTimer, doneTimer);
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-sm">

        {/* Diamond icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div
            className="absolute inset-0 border-2 border-[#00d4ff] rotate-45"
            style={{ boxShadow: "0 0 20px rgba(0,212,255,0.5), inset 0 0 20px rgba(0,212,255,0.1)" }}
          />
          <div className="absolute inset-[6px] border border-[#00d4ff]/30 rotate-45" />
          {/* Pulsing core */}
          <div
            className="w-3 h-3 bg-[#00d4ff] rotate-45"
            style={{ boxShadow: "0 0 12px rgba(0,212,255,0.9)" }}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1
            className="text-4xl md:text-5xl font-black text-[var(--text)] tracking-[0.15em] uppercase"
            style={{
              fontFamily: "var(--font-orbitron)",
              textShadow: "0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.2)",
            }}
          >
            Sephirot
          </h1>
          <span
            className="text-[#00d4ff] text-xl md:text-2xl font-bold tracking-[0.5em] uppercase"
            style={{
              fontFamily: "var(--font-orbitron)",
              textShadow: "0 0 20px rgba(0,212,255,0.8)",
            }}
          >
            ARK
          </span>
          <span
            className="text-[var(--text-dim)] text-[11px] tracking-[0.5em] uppercase mt-1"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            Survival Ascended
          </span>
        </div>

        {/* Load bar container */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-px bg-[var(--border)] relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-[#00d4ff] transition-all duration-300"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 10px rgba(0,212,255,0.8), 0 0 20px rgba(0,212,255,0.4)",
              }}
            />
          </div>

          {/* Thick bar */}
          <div className="w-full h-[3px] bg-[var(--surface)] relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #004d66, #00d4ff)",
                boxShadow: "0 0 15px rgba(0,212,255,0.6)",
              }}
            />
            {/* Shimmer */}
            <div
              className="absolute inset-y-0 w-16 opacity-60"
              style={{
                left: `calc(${progress}% - 4rem)`,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                transition: "left 0.3s",
              }}
            />
          </div>

          {/* Progress text */}
          <div className="flex justify-between items-center">
            <span
              className="text-[var(--text-dim)] text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {progress < 35
                ? t.intro.loading[0]
                : progress < 65
                ? t.intro.loading[1]
                : progress < 90
                ? t.intro.loading[2]
                : t.intro.loading[3]}
            </span>
            <span
              className="text-[#00d4ff] text-[11px]"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      {[
        "top-6 left-6 border-t-2 border-l-2",
        "top-6 right-6 border-t-2 border-r-2",
        "bottom-6 left-6 border-b-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 border-[#00d4ff]/40 ${cls}`} />
      ))}
    </div>
  );
}
