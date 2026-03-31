"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import type { Lang } from "@/i18n/translations";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center border border-[#1a2535] overflow-hidden">
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 text-[10px] tracking-widest uppercase transition-all duration-200 ${
            lang === l
              ? "bg-[#00d4ff] text-[#070b0f] font-bold"
              : "text-[#7a9bb5] hover:text-[#00d4ff]"
          }`}
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const navLinks = [
    { label: t.nav.home,    href: "#home" },
    { label: t.nav.maps,    href: "#maps" },
    { label: t.nav.info,    href: "#info" },
    { label: t.nav.admins,  href: "#admins" },
    { label: t.nav.contact, href: "#footer" },
  ];

  const shopLabel = t.nav.shop;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070b0f]/95 backdrop-blur-md border-b border-[#1a2535]"
          : "bg-transparent"
      }`}
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
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
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 ${
                active === link.href ? "text-[#00d4ff]" : "text-[#7a9bb5] hover:text-[#00d4ff]"
              }`}
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {active === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00d4ff] glow-cyan" />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
          <Link
            href="/shop/"
            className="relative px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium text-[#f59e0b] hover:text-[#fbbf24] transition-all duration-200"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {shopLabel}
          </Link>
        </nav>

        {/* Right side: lang toggle + Discord */}
        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 border border-[#00d4ff] text-[#00d4ff] text-xs tracking-[0.15em] uppercase font-medium clip-top-right hover:bg-[#00d4ff]/10 transition-all duration-200 animate-pulse-glow"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {t.nav.joinDiscord}
          </a>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle />
          <button className="text-[#00d4ff] p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

    </header>

      {/* Mobile menu — full screen overlay (sibling to header to avoid backdrop-blur containing block) */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-[#070b0f] flex flex-col">
          {/* Top bar mirrors the header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#1a2535]">
            <a href="#home" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#00d4ff] rotate-45" />
                <Zap size={16} className="text-[#00d4ff] relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[#00d4ff] font-black tracking-[0.2em] text-lg uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>Sephirot</span>
                <span className="text-[#7a9bb5] text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-share-tech)" }}>ARK · Ascended</span>
              </div>
            </a>
            <button className="text-[#00d4ff] p-2" onClick={() => setMenuOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col flex-1 justify-center px-10 gap-2">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setActive(link.href); setMenuOpen(false); }}
                className={`text-3xl font-black tracking-[0.1em] uppercase py-3 border-b border-[#1a2535] transition-colors duration-200 ${
                  active === link.href ? "text-[#00d4ff]" : "text-[#7a9bb5] hover:text-[#00d4ff]"
                }`}
                style={{ fontFamily: "var(--font-orbitron)", animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/shop/"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black tracking-[0.1em] uppercase py-3 border-b border-[#1a2535] text-[#f59e0b] hover:text-[#fbbf24] transition-colors duration-200"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {shopLabel}
            </Link>
          </nav>

          {/* Bottom: lang toggle + discord */}
          <div className="px-10 py-8 flex items-center justify-between border-t border-[#1a2535]">
            <LangToggle />
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 border border-[#00d4ff] text-[#00d4ff] text-xs tracking-[0.15em] uppercase hover:bg-[#00d4ff]/10 transition-all duration-200"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {t.nav.joinDiscord}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
