"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
import { Flare, ScanLine, DrawLine } from "@/components/SceneEffects";
import { useLang } from "@/context/LanguageContext";

type Subject = "bug" | "player" | "ban" | "contact" | "";

function ContactForm() {
  const { t } = useLang();
  const c = t.contact;
  const searchParams = useSearchParams();

  const [characterName, setCharacterName] = useState("");
  const [discordNick, setDiscordNick] = useState("");
  const [subject, setSubject] = useState<Subject>("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const s = searchParams.get("subject") as Subject | null;
    if (s && ["bug", "player", "ban", "contact"].includes(s)) {
      setSubject(s);
    }
  }, [searchParams]);

  const SUBJECT_LABELS: Record<string, string> = {
    bug: "Bug Report",
    player: "Player Report",
    ban: "Ban Appeal",
    contact: "General Contact",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject) return;
    setStatus("sending");
    try {
      const res = await fetch(
        "https://discord.com/api/webhooks/1488738396242182167/XQ9aAjg3jZMmjraIOQmsUvJkGe2uGt1uTycunxA-90wNBLFtgEhYp5e8HfxzW-9a7SJ0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: `📬 New Contact Form: ${SUBJECT_LABELS[subject] ?? subject}`,
                color: 0x00d4ff,
                fields: [
                  { name: "Character Name", value: characterName, inline: true },
                  { name: "Discord", value: discordNick, inline: true },
                  { name: "Subject", value: SUBJECT_LABELS[subject] ?? subject, inline: true },
                  { name: "Message", value: message },
                ],
                footer: { text: "Sephirot Ark · Contact Form" },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        }
      );
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] px-4 py-3 text-sm focus:outline-none focus:border-[#00d4ff]/60 transition-colors duration-200 placeholder:text-[var(--text-dim)]/50";

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
          href="/"
          className="text-[var(--text-dim)] hover:text-[#00d4ff] text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ fontFamily: "var(--font-share-tech)" }}
        >
          ← {c.backHome}
        </Link>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <ScanLine delay={1} opacity={0.04} />
        <Flare x="85%" y="10%" size={300} color="#00d4ff" duration={14} delay={0} />
        <Flare x="5%" y="70%" size={220} color="#0055aa" duration={11} delay={2} streaks />

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">

          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="flex items-center gap-3 text-[#00d4ff] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--font-share-tech)" }}
            >
              <span className="h-px w-12 bg-[#00d4ff]" />
              {c.sectionLabel}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text)]" style={{ fontFamily: "var(--font-orbitron)" }}>
              {c.title} <span className="text-[#00d4ff] glow-cyan-text">{c.titleHighlight}</span>
            </h1>
            <DrawLine className="mt-5 max-w-xs" delay={0.3} />
            <p className="mt-5 text-[var(--text-dim)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-share-tech)" }}>
              {c.subtitle}
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              className="relative border border-[#00d4ff]/30 bg-[var(--surface)] overflow-hidden text-center py-16 px-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent mb-10" />
              <motion.div
                className="inline-flex items-center justify-center mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#00d4ff]/10 blur-xl scale-150" />
                  <CheckCircle size={64} className="text-[#00d4ff] relative z-10" strokeWidth={1.5} />
                </div>
              </motion.div>
              <h2 className="text-2xl font-black text-[var(--text)] mb-3" style={{ fontFamily: "var(--font-orbitron)" }}>
                {c.successTitle}
              </h2>
              <p className="text-[var(--text-dim)] text-sm mb-8 max-w-sm mx-auto" style={{ fontFamily: "var(--font-share-tech)" }}>
                {c.successText}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#00d4ff] text-[#00d4ff] text-xs tracking-widest uppercase hover:bg-[#00d4ff]/10 transition-all duration-200"
                style={{ fontFamily: "var(--font-share-tech)" }}
              >
                {c.backHome}
              </Link>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

              {/* Corner accents */}
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute w-4 h-4 border-[#00d4ff]/30 ${cls}`} />
              ))}

              <div className="p-8 md:p-10 space-y-6">

                {/* Character Name */}
                <div>
                  <label
                    className="block text-[10px] tracking-[0.3em] uppercase text-[#00d4ff] mb-2"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    {c.fields.characterName}
                  </label>
                  <input
                    type="text"
                    required
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder={c.fields.characterNamePlaceholder}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  />
                </div>

                {/* Discord Nick */}
                <div>
                  <label
                    className="block text-[10px] tracking-[0.3em] uppercase text-[#00d4ff] mb-2"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    {c.fields.discordNick}
                  </label>
                  <input
                    type="text"
                    required
                    value={discordNick}
                    onChange={(e) => setDiscordNick(e.target.value)}
                    placeholder={c.fields.discordNickPlaceholder}
                    className={inputClass}
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="block text-[10px] tracking-[0.3em] uppercase text-[#00d4ff] mb-2"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    {c.fields.subject}
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className={`${inputClass} cursor-pointer`}
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    <option value="" disabled>
                      {c.fields.subjectPlaceholder}
                    </option>
                    <option value="bug">{c.fields.subjects.bug}</option>
                    <option value="player">{c.fields.subjects.player}</option>
                    <option value="ban">{c.fields.subjects.ban}</option>
                    <option value="contact">{c.fields.subjects.contact}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-[10px] tracking-[0.3em] uppercase text-[#00d4ff] mb-2"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    {c.fields.message}
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={c.fields.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>
                    <AlertCircle size={14} />
                    {c.errorText}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending" || !subject}
                  className="w-full flex items-center justify-center gap-3 py-4 border border-[#00d4ff] text-[#00d4ff] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#00d4ff]/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  style={{ fontFamily: "var(--font-share-tech)" }}
                >
                  <Send size={14} />
                  {status === "sending" ? c.submitting : c.submit}
                </button>

                {/* Discord fallback */}
                <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[var(--text-dim)] text-xs" style={{ fontFamily: "var(--font-share-tech)" }}>
                    {c.discordFallback}
                  </span>
                  <a
                    href="https://discord.sephirotark.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs tracking-widest uppercase transition-colors duration-200"
                    style={{ fontFamily: "var(--font-share-tech)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                    {c.discordButton}
                  </a>
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
