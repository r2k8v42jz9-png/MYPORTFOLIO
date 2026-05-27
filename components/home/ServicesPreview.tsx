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

const ICONS = [Globe, Zap, Building2, Send, Brain, Bot, LayoutDashboard, Palette];
const SERVICE_KEYS = [
  "websites",
  "landing",
  "corporate",
  "telegram",
  "ai_agents",
  "ai_automation",
  "admin",
  "uiux",
] as const;

export default function ServicesPreview() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-24 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-[var(--gold)] mb-2 tracking-wider uppercase"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group glass border border-border/50 hover:border-[var(--gold)]/30 rounded-2xl p-5 transition-all duration-300 card-hover cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mb-4 group-hover:bg-[var(--gold)]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {t(`items.${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Link
            href={`/${locale}/services`}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5 font-medium text-sm transition-all duration-300"
          >
            {t("learn_more")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
