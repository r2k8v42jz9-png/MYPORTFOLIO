"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, Globe } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import LegalMastersPreview from "@/components/ui/LegalMastersPreview";

export default function ProjectDetail({ slug }: { slug: string }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  if (slug !== "legalmasters") return null;

  const features = t.raw("legalmasters.features") as string[];

  return (
    <div className="pt-24 pb-16">
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

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-[var(--gold)] uppercase tracking-wider"
            >
              {t("legalmasters.category")}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mt-2 mb-4"
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
              className="flex gap-3 mt-6"
            >
              <Magnetic>
                <a
                  href="https://legalmasters.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-semibold text-sm transition-colors shadow-lg shadow-[var(--gold)]/20"
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
            transition={{ delay: 0.25 }}
            className="glass border border-[var(--gold)]/20 rounded-2xl p-6 h-fit"
          >
            <dl className="space-y-4">
              {[
                { label: "Domain", value: "legalmasters.uz" },
                { label: "Type", value: t("legalmasters.category") },
                { label: "Stack", value: "Next.js 14" },
                { label: "Status", value: "Live ✓", color: "text-green-400" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    {label}
                  </dt>
                  <dd className={`text-sm font-semibold ${color ?? ""}`}>{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Realistic full preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-20 px-2 sm:px-8 py-6 rounded-3xl bg-gradient-to-b from-secondary/40 to-transparent"
        >
          <div className="max-w-4xl mx-auto">
            <LegalMastersPreview variant="full" />
          </div>
        </motion.div>

        {/* Features + Tech */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">{t("features")}</h2>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">{t("technologies")}</h2>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Next.js 14",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "next-intl",
                "Vercel",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl glass border border-border/50 text-sm font-medium hover:border-[var(--gold)]/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
