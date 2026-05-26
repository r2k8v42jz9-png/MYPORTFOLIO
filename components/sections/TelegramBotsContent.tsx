"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Send,
  Building2,
  HeadphonesIcon,
  Database,
  CreditCard,
  Zap,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Users,
  TrendingUp,
} from "lucide-react";

const TYPE_ICONS = {
  business: Building2,
  support: HeadphonesIcon,
  crm: Database,
  payment: CreditCard,
  automation: Zap,
} as const;

const USE_CASES = [
  { icon: MessageSquare, title: "Customer Support", desc: "24/7 automated support" },
  { icon: Users, title: "Lead Generation", desc: "Capture & qualify leads" },
  { icon: TrendingUp, title: "Sales Automation", desc: "Auto follow-ups & reminders" },
  { icon: CreditCard, title: "Payments", desc: "Accept payments in Telegram" },
  { icon: Database, title: "CRM Integration", desc: "Sync with your CRM" },
  { icon: Zap, title: "Notifications", desc: "Real-time updates & alerts" },
];

export default function TelegramBotsContent() {
  const t = useTranslations("telegramBots");
  const locale = useLocale();

  const typeKeys = Object.keys(TYPE_ICONS) as Array<keyof typeof TYPE_ICONS>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 text-sm text-muted-foreground mb-6"
          >
            <Send className="w-4 h-4 text-[#2AABEE]" />
            Telegram Bot API
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

        {/* Bot mockup + types */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Phone frame */}
            <div className="mx-auto w-[280px] h-[560px] glass border border-border/50 rounded-[3rem] overflow-hidden shadow-2xl relative">
              {/* Status bar */}
              <div className="h-10 bg-[#0e1621] flex items-center justify-between px-5">
                <span className="text-white/60 text-xs">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
                  <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
                </div>
              </div>
              {/* Telegram header */}
              <div className="bg-[#2AABEE] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Business Bot</div>
                  <div className="text-white/70 text-xs">online</div>
                </div>
              </div>
              {/* Chat */}
              <div className="bg-[#0e1621] flex-1 p-3 space-y-2 h-[calc(100%-120px)] overflow-hidden">
                {[
                  { bot: true, text: "Salom! Men sizga qanday yordam bera olaman? 👋" },
                  { bot: false, text: "Narxlar haqida ma'lumot bering" },
                  { bot: true, text: "Bizning xizmatlar narxi $100 dan boshlanadi. Qaysi xizmat kerak?" },
                  { bot: false, text: "Sayt yaratish kerak" },
                  { bot: true, text: "Ajoyib! Menejer siz bilan 5 daqiqa ichida bog'lanadi ✓" },
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex ${msg.bot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.bot
                          ? "bg-[#182533] text-white/90 rounded-tl-sm"
                          : "bg-[#2b5278] text-white/90 rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {/* Typing indicator */}
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex gap-1 pl-1"
                >
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                      className="w-1.5 h-1.5 rounded-full bg-[#2AABEE]/60"
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bot types */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("types_title")}</h2>
            <div className="space-y-3">
              {typeKeys.map((key, i) => {
                const Icon = TYPE_ICONS[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 glass border border-border/50 hover:border-[var(--gold)]/20 rounded-2xl p-4 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#2AABEE]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{t(`types.${key}.title`)}</h3>
                      <p className="text-xs text-muted-foreground">{t(`types.${key}.desc`)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Use cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">{t("usecases_title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 glass border border-border/50 rounded-2xl p-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#2AABEE]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#2AABEE]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass border border-[var(--gold)]/20 rounded-3xl p-10 text-center glow-gold"
        >
          <Send className="w-12 h-12 text-[var(--gold)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">{t("cta")}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get a custom Telegram bot built exactly to your specifications.
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
