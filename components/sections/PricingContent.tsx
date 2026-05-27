"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";

const PLAN_KEYS = ["starter", "professional", "premium"] as const;
const POPULAR_PLAN = "professional";

export default function PricingContent() {
  const t = useTranslations("pricing");
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

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PLAN_KEYS.map((planKey, i) => {
            const isPopular = planKey === POPULAR_PLAN;
            const features = t.raw(`plans.${planKey}.features`) as string[];

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative glass border rounded-3xl p-7 flex flex-col transition-all duration-300 card-hover",
                  isPopular
                    ? "border-[var(--gold)]/50 shadow-xl shadow-[var(--gold)]/10 scale-105"
                    : "border-border/50 hover:border-[var(--gold)]/20"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--gold)] text-black text-xs font-bold shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    {t("popular")}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{t(`plans.${planKey}.name`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`plans.${planKey}.desc`)}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-muted-foreground">{t("from")}</span>
                    <span className="text-4xl font-bold text-[var(--gold)]">
                      ${t(`plans.${planKey}.price`)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">per project</span>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        className={cn(
                          "w-4 h-4 shrink-0 mt-0.5",
                          isPopular ? "text-[var(--gold)]" : "text-muted-foreground"
                        )}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                    isPopular
                      ? "bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black shadow-lg shadow-[var(--gold)]/20 hover:scale-105 active:scale-[0.97]"
                      : "border border-border hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5"
                  )}
                >
                  {t("order")} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* AI + Bots pricing teaser */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {[
            {
              href: `/${locale}/ai-agents`,
              icon: "🤖",
              title: "AI Agents",
              price: "from $150",
              desc: "Custom AI agents for business automation",
              color: "from-purple-500/10",
            },
            {
              href: `/${locale}/telegram-bots`,
              icon: "✈️",
              title: "Telegram Bots",
              price: "from $80",
              desc: "Smart bots for your Telegram channel",
              color: "from-blue-400/10",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass border border-border/50 hover:border-[var(--gold)]/20 rounded-2xl p-6 flex items-center gap-5 transition-all card-hover bg-gradient-to-r ${item.color} to-transparent`}
            >
              <span className="text-4xl">{item.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <p className="text-[var(--gold)] font-semibold mt-1 text-sm">{item.price}</p>
              </div>
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-[var(--gold)]/20 rounded-3xl p-10 sm:p-14 text-center glow-gold"
        >
          <h2 className="text-3xl font-bold mb-3">{t("custom_title")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("custom_desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-colors shadow-lg shadow-[var(--gold)]/20"
              >
                {t("custom_cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://t.me/saburovvs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border hover:border-[var(--gold)]/40 font-bold transition-colors"
              >
                <Send className="w-4 h-4" /> Telegram
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
