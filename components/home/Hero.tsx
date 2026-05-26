"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Send, ExternalLink, Sparkles } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

const TYPING_STRINGS = {
  ru: ["Aziz Saburov", "Full-Stack Developer", "AI Specialist", "Aziz Saburov"],
  en: ["Aziz Saburov", "Full-Stack Developer", "AI Specialist", "Aziz Saburov"],
  uz: ["Aziz Saburov", "Full-Stack Dasturchi", "AI Mutaxassisi", "Aziz Saburov"],
};

function TypingText({ locale }: { locale: string }) {
  const strings = TYPING_STRINGS[locale as keyof typeof TYPING_STRINGS] ?? TYPING_STRINGS.ru;
  const [displayed, setDisplayed] = useState("");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setStrIdx((i) => (i + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-[var(--gold)]">|</span>
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 100 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-[var(--gold)]/10 -top-40 -right-40" />
        <div
          className="orb w-[500px] h-[500px] bg-[var(--gold)]/6 bottom-0 -left-40"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="orb w-[300px] h-[300px] bg-[var(--gold)]/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "6s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <div className="space-y-7 lg:space-y-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--gold)]/20 text-sm text-muted-foreground"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Full-Stack Developer · AI Specialist</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-muted-foreground font-medium"
              >
                {t("greeting")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[-0.03em] leading-[1.05] min-h-[1.1em]"
              >
                <span className="text-gradient">
                  <TypingText locale={locale} />
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-foreground/80 leading-[1.3] tracking-tight max-w-xl"
              >
                {t("headline")}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base text-muted-foreground leading-relaxed max-w-md"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Magnetic>
                <Link
                  href={`/${locale}/projects`}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-semibold text-sm transition-colors duration-300 shadow-lg shadow-[var(--gold)]/25 hover:shadow-[var(--gold)]/40"
                >
                  {t("cta_projects")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://t.me/saburovvs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border hover:border-[var(--gold)]/50 bg-secondary hover:bg-[var(--gold)]/5 font-semibold text-sm transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  {t("cta_contact")}
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  href={`/${locale}/contact`}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 hover:bg-[var(--gold)]/5 font-semibold text-sm transition-colors duration-300 text-[var(--gold)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("cta_order")}
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right - 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="glass border border-[var(--gold)]/20 rounded-3xl p-8 glow-gold">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">~/portfolio</span>
                </div>

                <div className="font-mono text-sm space-y-2">
                  {[
                    { label: "const", name: "developer", val: '"Aziz Saburov"', color: "text-blue-400" },
                    { label: "const", name: "age", val: "18", color: "text-orange-400" },
                    { label: "const", name: "location", val: '"Tashkent, UZ"', color: "text-green-400" },
                    { label: "const", name: "skills", val: "['Next.js', 'AI', 'Bots']", color: "text-purple-400" },
                    { label: "const", name: "status", val: '"Available ✓"', color: "text-[var(--gold)]" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex gap-2 flex-wrap"
                    >
                      <span className="text-pink-400">{item.label}</span>
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-muted-foreground">=</span>
                      <span className={item.color}>{item.val}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 pt-6 border-t border-border/50"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="text-green-400">●</span>
                    Open for new projects
                  </div>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass border border-border/50 rounded-2xl px-4 py-2 shadow-xl"
              >
                <span className="text-sm font-semibold text-[var(--gold)]">Next.js 15</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass border border-border/50 rounded-2xl px-4 py-2 shadow-xl"
              >
                <span className="text-sm font-semibold">Claude API</span>
              </motion.div>

              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-8 glass border border-border/50 rounded-2xl px-3 py-1.5 shadow-xl"
              >
                <span className="text-xs font-medium text-green-400">AI ✓</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">{t("scroll")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 rounded-full bg-gradient-to-b from-[var(--gold)] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
