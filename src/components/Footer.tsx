"use client";

import { Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const footerLinks = [
    {
      group: t.footer.groups.server,
      links: [
        { label: t.footer.links.maps,      href: "#maps" },
        { label: t.footer.links.rates,     href: "#info" },
        { label: t.footer.links.mods,      href: "#info" },
        { label: t.footer.links.changelog, href: "#" },
      ],
    },
    {
      group: t.footer.groups.community,
      links: [
        { label: t.footer.links.discord, href: "https://discord.sephirotark.com" },
        { label: t.footer.links.admins,  href: "#admins" },
        { label: t.footer.links.events,  href: "#" },
        { label: t.footer.links.vote,    href: "#" },
      ],
    },
    {
      group: t.footer.groups.support,
      links: [
        { label: t.footer.links.bugReport,    href: "/contact?subject=bug" },
        { label: t.footer.links.playerReport, href: "/contact?subject=player" },
        { label: t.footer.links.banAppeal,    href: "/contact?subject=ban" },
        { label: t.footer.links.contact,      href: "/contact" },
      ],
    },
  ];

  return (
    <footer id="footer" className="relative bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#00d4ff] rotate-45" />
                <Zap size={16} className="text-[#00d4ff] relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[#00d4ff] font-black tracking-[0.2em] text-base uppercase"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Sephirot
                </span>
                <span
                  className="text-[var(--text-dim)] text-[10px] tracking-[0.4em] uppercase"
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  ARK · Ascended
                </span>
              </div>
            </div>
            <p
              className="text-[var(--text-dim)] text-sm leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              {t.footer.tagline}
            </p>

            {/* Discord button */}
            <a
              href="https://discord.sephirotark.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#5865F2]/60 text-[#5865F2] hover:bg-[#5865F2]/10 text-xs tracking-widest uppercase transition-all duration-200"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Discord
            </a>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ group, links }) => (
            <div key={group}>
              <h4
                className="text-[#00d4ff] text-xs tracking-[0.3em] uppercase font-medium mb-5"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[var(--text-dim)] hover:text-[#e0eaf5] text-sm flex items-center gap-1.5 group transition-colors duration-150"
                      style={{ fontFamily: "var(--font-share-tech)" }}
                    >
                      <span className="w-px h-3 bg-[var(--border)] group-hover:bg-[#00d4ff]/40 transition-colors shrink-0" />
                      {link.label}
                      {link.href.startsWith("http") && (
                        <ExternalLink size={10} className="opacity-40" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Server stats bar */}
        <div className="border-t border-[var(--border)] border-b py-4 mb-8 flex flex-wrap items-center justify-around gap-4">
          {t.footer.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-2xl font-black text-[#00d4ff]" style={{ fontFamily: "var(--font-orbitron)" }}>
                {stat.value}
              </div>
              <div className="text-[var(--text-dim)] text-[11px] tracking-widest uppercase" style={{ fontFamily: "var(--font-share-tech)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-[var(--text-dim)] text-xs"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            {t.footer.copyright}
          </p>
          <p
            className="text-[#1a2535] text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-share-tech)" }}
          >
            ARK: Survival Ascended
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
