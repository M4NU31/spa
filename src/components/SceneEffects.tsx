"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Floating flare orb ──────────────────────────────────────────────
type FlareProps = {
  x: string; y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  streaks?: boolean;
};

export function Flare({ x, y, size, color, duration, delay, streaks = false }: FlareProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex: 0 }}
    >
      {/* Core glow */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}55 0%, ${color}22 40%, transparent 70%)`,
          animation: `flare-drift ${duration}s ease-in-out infinite ${delay}s, flare-pulse ${duration * 0.6}s ease-in-out infinite ${delay}s`,
          filter: `blur(${size * 0.18}px)`,
        }}
      />
      {/* Bright center */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.12,
          height: size * 0.12,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 ${size * 0.3}px ${size * 0.2}px ${color}88`,
          animation: `flare-pulse ${duration * 0.5}s ease-in-out infinite ${delay}s`,
        }}
      />
      {/* Cross streaks */}
      {streaks && (
        <>
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: size * 1.8, height: 1,
            background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
            animation: `flare-streak ${duration * 0.7}s ease-in-out infinite ${delay}s`,
          }} />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) rotate(90deg)",
            width: size * 1.2, height: 1,
            background: `linear-gradient(90deg, transparent, ${color}44, transparent)`,
            animation: `flare-streak ${duration * 0.7}s ease-in-out infinite ${delay + 0.3}s`,
          }} />
        </>
      )}
    </div>
  );
}

// ── Horizontal scan line ────────────────────────────────────────────
export function ScanLine({ delay = 0, opacity = 0.06 }: { delay?: number; opacity?: number }) {
  return (
    <div
      className="absolute left-0 right-0 h-[2px] pointer-events-none animate-scan-sweep"
      style={{
        background: `linear-gradient(90deg, transparent 0%, rgba(0,212,255,${opacity}) 20%, rgba(0,212,255,${opacity * 2}) 50%, rgba(0,212,255,${opacity}) 80%, transparent 100%)`,
        animationDelay: `${delay}s`,
        zIndex: 1,
      }}
    />
  );
}

// ── Line that draws itself in on scroll ─────────────────────────────
export function DrawLine({
  color = "#00d4ff",
  opacity = 0.4,
  thickness = 1,
  delay = 0,
  className = "",
}: {
  color?: string;
  opacity?: number;
  thickness?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ height: thickness }}>
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: "100%", opacity } : {}}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Trailing spark */}
      <motion.div
        className="absolute top-0 bottom-0 w-8"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, filter: "blur(2px)" }}
        initial={{ left: "-2rem", opacity: 0 }}
        animate={inView ? { left: "100%", opacity: [0, 1, 0] } : {}}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Vertical side line that grows downward on scroll ─────────────────
export function DrawLineVertical({
  color = "#00d4ff",
  opacity = 0.3,
  delay = 0,
  className = "",
}: {
  color?: string;
  opacity?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width: 1 }}>
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ background: `linear-gradient(180deg, ${color}, ${color}22)` }}
        initial={{ height: 0, opacity: 0 }}
        animate={inView ? { height: "100%", opacity } : {}}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Corner accent that draws in ──────────────────────────────────────
export function AnimatedCorner({
  position = "top-left",
  color = "#00d4ff",
  size = 20,
  delay = 0,
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  size?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const posClass = {
    "top-left":     "top-0 left-0",
    "top-right":    "top-0 right-0",
    "bottom-left":  "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

  const isTop    = position.startsWith("top");
  const isLeft   = position.endsWith("left");

  return (
    <div ref={ref} className={`absolute ${posClass} pointer-events-none`} style={{ width: size, height: size }}>
      {/* Horizontal arm */}
      <motion.div
        className="absolute"
        style={{
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          height: 2,
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
        initial={{ width: 0 }}
        animate={inView ? { width: size } : {}}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
      />
      {/* Vertical arm */}
      <motion.div
        className="absolute"
        style={{
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: 2,
          background: color,
          boxShadow: `0 0 6px ${color}`,
        }}
        initial={{ height: 0 }}
        animate={inView ? { height: size } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1, ease: "easeOut" }}
      />
    </div>
  );
}
