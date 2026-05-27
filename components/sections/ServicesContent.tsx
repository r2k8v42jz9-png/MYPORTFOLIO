"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Building2,
  Send,
  Brain,
  Bot,
  LayoutDashboard,
  Palette,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  { key: "websites", icon: Globe, accent: "from-blue-500/15 to-blue-500/5" },
  { key: "landing", icon: Zap, accent: "from-yellow-500/15 to-yellow-500/5" },
  { key: "corporate", icon: Building2, accent: "from-purple-500/15 to-purple-500/5" },
  { key: "telegram", icon: Send, accent: "from-blue-400/15 to-blue-400/5" },
  { key: "ai_agents", icon: Brain, accent: "from-[var(--gold)]/15 to-[var(--gold)]/5" },
  { key: "ai_automation", icon: Bot, accent: "from-orange-500/15 to-orange-500/5" },
  { key: "admin", icon: LayoutDashboard, accent: "from-green-500/15 to-green-500/5" },
  { key: "uiux", icon: Palette, accent: "from-pink-500/15 to-pink-500/5" },
] as const;

export default function ServicesContent() {
  const t = useTranslations("services");
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
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 sm:mb-20">
          {SERVICES.map(({ key, icon: Icon, accent }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group glass border border-border/50 hover:border-[var(--gold)]/30 rounded-2xl p-6 transition-all duration-300 card-hover flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} border border-border/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <h3 className="font-bold text-base mb-2">{t(`items.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {t(`items.${key}.desc`)}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-5 flex items-center gap-1.5 text-xs font-medium text-[var(--gold)] hover:gap-2.5 transition-all group-hover:opacity-100 opacity-70"
              >
                {t("order")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-[var(--gold)]/20 rounded-3xl p-10 text-center glow-gold"
        >
          <h2 className="text-2xl font-bold mb-3">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Every project is unique. Let&apos;s discuss your requirements and build something exceptional together.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-all duration-300 shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-[0.97]"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
