"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Plus } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import LegalMastersPreview from "@/components/ui/LegalMastersPreview";

const PROJECTS = [
  {
    slug: "legalmasters",
    key: "legalmasters",
    domain: "legalmasters.uz",
    tags: ["Next.js", "Tailwind", "Framer Motion", "next-intl"],
    color: "from-amber-500/10",
    live: true,
  },
];

export default function ProjectsContent() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <div className="pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-[var(--gold)] mb-2 tracking-wider uppercase"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group glass border border-border/50 hover:border-[var(--gold)]/30 rounded-3xl overflow-hidden transition-colors duration-500 card-hover shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              {/* Realistic preview thumbnail */}
              <TiltCard
                max={6}
                glare
                className={`relative px-5 pt-5 pb-1 bg-gradient-to-br ${project.color} to-transparent overflow-hidden`}
              >
                <div style={{ transform: "translateZ(30px)" }}>
                  <LegalMastersPreview variant="card" />
                </div>
              </TiltCard>

              <div className="p-5 pt-4">
                <div className="mb-3">
                  <span className="text-[11px] font-medium text-[var(--gold)] uppercase tracking-wider">
                    {t(`${project.key}.category`)}
                  </span>
                  <h2 className="text-lg font-bold mt-0.5">{t(`${project.key}.title`)}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {t(`${project.key}.description`)}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-lg bg-secondary text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-secondary hover:bg-secondary/70 text-xs font-medium transition-colors"
                  >
                    {t("view_project")} <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={`https://${project.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--gold)]/20 hover:bg-[var(--gold)]/5 text-xs text-[var(--gold)] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Coming soon cards */}
          {[1, 2].map((i) => (
            <motion.div
              key={`placeholder-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (PROJECTS.length + i) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass border border-dashed border-border/60 hover:border-[var(--gold)]/20 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col items-center justify-center p-10 text-center min-h-[300px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">{t("placeholder_title")}</h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-[200px]">
                {t("placeholder_desc")}
              </p>
              <span className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                {t("coming_soon")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
