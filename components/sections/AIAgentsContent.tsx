"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  HeadphonesIcon,
  BarChart3,
  ArrowRight,
  Bot,
  MessageSquare,
  Database,
  Workflow,
  CheckCircle2,
} from "lucide-react";

const TYPE_ICONS = { assistant: Brain, automation: Zap, support: HeadphonesIcon, analytics: BarChart3 };

const HOW_STEPS = [
  { icon: MessageSquare, title: "You describe the task", desc: "Tell me what you need automated or what the agent should do." },
  { icon: Database, title: "I design the agent", desc: "Architecture, AI model selection, integrations, and workflows." },
  { icon: Workflow, title: "Build & integrate", desc: "Development, testing, and integration with your existing systems." },
  { icon: Bot, title: "Deploy & support", desc: "The agent goes live and works for you 24/7." },
];

const FEATURES = [
  "GPT-4 / Claude 3 powered",
  "Multi-language support",
  "Custom knowledge base",
  "API integrations",
  "Telegram / Web interface",
  "Analytics dashboard",
  "24/7 uptime",
  "Human handoff",
];

export default function AIAgentsContent() {
  const t = useTranslations("aiAgents");
  const locale = useLocale();

  const typeKeys = Object.keys(TYPE_ICONS) as Array<keyof typeof TYPE_ICONS>;

  return (
    <div className="pt-20 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--gold)]/20 text-sm text-muted-foreground mb-6"
          >
            <Brain className="w-4 h-4 text-[var(--gold)]" />
            Powered by GPT-4 & Claude
          </motion.div>
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

        {/* Agent types */}
        <div className="mb-14 sm:mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">{t("types_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {typeKeys.map((key, i) => {
              const Icon = TYPE_ICONS[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass border border-border/50 hover:border-[var(--gold)]/30 rounded-2xl p-6 text-center transition-all duration-300 card-hover group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--gold)]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[var(--gold)]" />
                  </div>
                  <h3 className="font-bold mb-2">{t(`types.${key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`types.${key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Features + How it works */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 mb-14 sm:mb-20">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{t("features_title")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2.5 glass border border-border/50 rounded-xl p-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0" />
                  <span className="text-sm font-medium">{f}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div>
            <h2 className="text-2xl font-bold mb-8">{t("how_title")}</h2>
            <div className="space-y-4">
              {HOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 glass border border-border/50 rounded-2xl p-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[var(--gold)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[var(--gold)] font-bold">0{i + 1}</span>
                        <h3 className="font-semibold text-sm">{step.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-[var(--gold)]/20 rounded-3xl p-10 text-center glow-gold"
        >
          <Brain className="w-12 h-12 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">{t("cta")}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let&apos;s build an AI agent tailored to your business needs.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-all hover:scale-105 shadow-lg shadow-[var(--gold)]/20"
          >
            {t("cta")} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
