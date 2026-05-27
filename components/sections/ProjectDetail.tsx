"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Globe,
  Target,
  Lightbulb,
  Languages,
  Monitor,
  Tablet,
  Smartphone,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import LegalMastersPreview from "@/components/ui/LegalMastersPreview";

const EASE = [0.22, 1, 0.36, 1] as const;

type Result = { value: string; label: string };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.2em]">
      {children}
    </span>
  );
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  if (slug !== "legalmasters") return null;

  const features = t.raw("legalmasters.features") as string[];
  const challengePoints = t.raw("legalmasters.challenge_points") as string[];
  const solutionPoints = t.raw("legalmasters.solution_points") as string[];
  const results = t.raw("legalmasters.results") as Result[];
  const languages = t.raw("legalmasters.languages") as string[];

  const tech = [
    "Next.js 14",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "next-intl",
    "Vercel",
  ];

  return (
    <div className="pt-20 pb-14 sm:pt-24 sm:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t("back")}
          </Link>
        </motion.div>

        {/* ===== Header ===== */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 mb-14 items-start">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-3"
            >
              <SectionLabel>{t("legalmasters.category")}</SectionLabel>
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                {t("live_label")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease: EASE }}
              className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight"
            >
              {t("legalmasters.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              {t("legalmasters.full_description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 mt-7"
            >
              <Magnetic>
                <a
                  href="https://legalmasters.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-semibold text-sm transition-colors shadow-lg shadow-[var(--gold)]/20"
                >
                  <Globe className="w-4 h-4" />
                  {t("visit_site")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Meta card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, ease: EASE }}
            className="glass border border-[var(--gold)]/20 rounded-2xl p-6 w-full"
          >
            <dl className="space-y-5">
              {[
                { icon: Globe, label: "Domain", value: "legalmasters.uz" },
                { icon: Calendar, label: t("year_label"), value: t("legalmasters.year") },
                { icon: User, label: t("role_label"), value: t("role_value") },
                { icon: Clock, label: t("duration_label"), value: t("legalmasters.duration") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[var(--gold)]" />
                  </div>
                  <div>
                    <dt className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold mt-0.5">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* ===== Realistic full preview ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, ease: EASE }}
          className="relative mb-16 sm:mb-24 px-2 sm:px-8 py-8 rounded-3xl bg-gradient-to-b from-secondary/40 to-transparent"
        >
          <div className="max-w-4xl mx-auto">
            <LegalMastersPreview variant="full" />
          </div>
        </motion.div>

        {/* ===== Overview ===== */}
        <section className="mb-14 sm:mb-20">
          <Reveal>
            <SectionLabel>{t("section_overview")}</SectionLabel>
          </Reveal>
          <Reveal index={1}>
            <p className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight mt-4 max-w-3xl">
              {t("legalmasters.overview")}
            </p>
          </Reveal>
        </section>

        {/* ===== Challenge & Solution ===== */}
        <section className="grid md:grid-cols-2 gap-6 mb-16 sm:mb-24">
          <Reveal>
            <div className="glass border border-border/50 rounded-3xl p-8 h-full">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <SectionLabel>{t("section_challenge")}</SectionLabel>
              <p className="text-muted-foreground leading-relaxed mt-3 mb-6">
                {t("legalmasters.challenge")}
              </p>
              <ul className="space-y-2.5">
                {challengePoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="glass border border-[var(--gold)]/20 rounded-3xl p-8 h-full">
              <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <SectionLabel>{t("section_solution")}</SectionLabel>
              <p className="text-muted-foreground leading-relaxed mt-3 mb-6">
                {t("legalmasters.solution")}
              </p>
              <ul className="space-y-2.5">
                {solutionPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ===== Results ===== */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-10">
            <Reveal>
              <SectionLabel>{t("section_results")}</SectionLabel>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="glass border border-border/50 rounded-2xl p-6 text-center hover:border-[var(--gold)]/30 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1.5">
                  {r.value}
                </div>
                <div className="text-xs text-muted-foreground tracking-wide">
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== Features + Technologies ===== */}
        <section className="grid md:grid-cols-2 gap-12 mb-16 sm:mb-24">
          <Reveal>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">{t("features")}</h2>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={1}>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">{t("technologies")}</h2>
            <div className="flex flex-wrap gap-2.5">
              {tech.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-2 rounded-xl glass border border-border/50 text-sm font-medium hover:border-[var(--gold)]/30 hover:scale-105 transition-all duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== Responsive Design ===== */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16 sm:mb-24">
          <Reveal>
            <SectionLabel>{t("section_responsive")}</SectionLabel>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
              {t("legalmasters.responsive_text")}
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Monitor, label: "Desktop" },
                { icon: Tablet, label: "Tablet" },
                { icon: Smartphone, label: "Mobile" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-border/50 text-sm"
                >
                  <Icon className="w-4 h-4 text-[var(--gold)]" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Device mockups */}
          <Reveal index={1}>
            <div className="flex items-end justify-center gap-4">
              {/* Desktop */}
              <div className="flex-1 max-w-[260px]">
                <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xl">
                  <div className="h-3 bg-secondary flex items-center gap-1 px-2">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-[#0f1422] to-[#0a0e1a] p-2.5 space-y-1.5">
                    <div className="h-2 w-1/2 rounded bg-[var(--gold)]/40" />
                    <div className="h-1.5 w-full rounded bg-white/10" />
                    <div className="h-1.5 w-4/5 rounded bg-white/10" />
                    <div className="flex gap-1 mt-2">
                      <div className="h-3 w-10 rounded bg-[var(--gold)]/30" />
                      <div className="h-3 w-8 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
                <div className="h-1.5 w-1/3 mx-auto bg-border rounded-b" />
              </div>
              {/* Phone */}
              <div className="w-16 shrink-0">
                <div className="rounded-xl border-2 border-border bg-gradient-to-br from-[#0f1422] to-[#0a0e1a] overflow-hidden shadow-xl p-1.5 space-y-1">
                  <div className="h-1.5 w-1/2 mx-auto rounded-full bg-border" />
                  <div className="h-1.5 w-3/4 rounded bg-[var(--gold)]/40 mt-1.5" />
                  <div className="h-1 w-full rounded bg-white/10" />
                  <div className="h-1 w-5/6 rounded bg-white/10" />
                  <div className="h-3 w-full rounded bg-[var(--gold)]/30 mt-1.5" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== Multilingual System ===== */}
        <section className="mb-14 sm:mb-20">
          <div className="glass border border-border/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--gold)]/8 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <Reveal>
                <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-5">
                  <Languages className="w-6 h-6 text-[var(--gold)]" />
                </div>
                <SectionLabel>{t("section_multilingual")}</SectionLabel>
                <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                  {t("legalmasters.multilingual_text")}
                </p>
              </Reveal>

              <Reveal index={1}>
                <div className="space-y-3">
                  {languages.map((lang, i) => (
                    <div
                      key={lang}
                      className="flex items-center justify-between glass border border-border/50 rounded-xl px-5 py-3.5 hover:border-[var(--gold)]/30 transition-colors"
                    >
                      <span className="font-medium">{lang}</span>
                      <span className="text-xs font-mono text-[var(--gold)] uppercase">
                        {["ru", "uz", "en"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center glass border border-[var(--gold)]/20 rounded-3xl p-10 sm:p-14 glow-gold"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            {t("placeholder_title")}
          </h2>
          <p className="text-muted-foreground mb-7 max-w-lg mx-auto">
            {t("placeholder_desc")}
          </p>
          <Magnetic>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-colors shadow-lg shadow-[var(--gold)]/20"
            >
              {t("visit_site")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}
