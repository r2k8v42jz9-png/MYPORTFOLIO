"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";
import LegalMastersPreview from "@/components/ui/LegalMastersPreview";

export default function FeaturedProjects() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-[var(--gold)] mb-2 tracking-wider uppercase"
            >
              {t("projects.subtitle")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold"
            >
              {t("projects.title")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/${locale}/projects`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[var(--gold)] transition-colors group"
            >
              {t("projects.view_all")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main project card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group relative glass border border-border/50 hover:border-[var(--gold)]/30 rounded-3xl overflow-hidden transition-colors duration-500 shadow-xl shadow-black/5 dark:shadow-black/20"
          >
            {/* Realistic preview area */}
            <TiltCard
              max={5}
              glare
              className="relative px-6 pt-6 pb-2 bg-gradient-to-br from-secondary/40 to-transparent overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 to-transparent pointer-events-none" />
              <div style={{ transform: "translateZ(40px)" }}>
                <LegalMastersPreview variant="card" />
              </div>
            </TiltCard>

            <div className="p-6 pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-medium text-[var(--gold)] uppercase tracking-wider">
                    {t("projects.legalmasters.category")}
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    {t("projects.legalmasters.title")}
                  </h3>
                </div>
                <Globe className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {t("projects.legalmasters.description")}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {["Next.js", "Tailwind", "Framer Motion", "i18n"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/${locale}/projects/legalmasters`}
                  className="tap flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-sm font-medium transition-all duration-200"
                >
                  {t("projects.view_project")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://legalmasters.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--gold)]/30 hover:bg-[var(--gold)]/5 text-sm font-medium text-[var(--gold)] transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t("projects.visit_site")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Placeholder card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative glass border border-dashed border-border/70 hover:border-[var(--gold)]/30 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col items-center justify-center p-10 text-center min-h-[400px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-4">
              <ArrowRight className="w-7 h-7 text-[var(--gold)]" />
            </div>
            <h3 className="text-lg font-bold mb-2">{t("projects.placeholder_title")}</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t("projects.placeholder_desc")}
            </p>
            <Magnetic>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black text-sm font-semibold transition-colors duration-200 shadow-lg shadow-[var(--gold)]/20"
              >
                {t("contact.telegram_cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
