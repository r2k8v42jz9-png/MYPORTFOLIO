"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function CTABanner() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Glow background */}
        <div className="absolute inset-0 bg-[var(--gold)]/5 rounded-3xl blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass border border-[var(--gold)]/20 rounded-3xl p-10 sm:p-16 glow-gold"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
          >
            {t("pricing.custom_title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          >
            {t("pricing.custom_desc")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Magnetic>
              <Link
                href={`/${locale}/contact`}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-colors duration-300 shadow-lg shadow-[var(--gold)]/25 hover:shadow-[var(--gold)]/40"
              >
                {t("pricing.custom_cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://t.me/saburovvs"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border hover:border-[var(--gold)]/40 font-bold transition-colors duration-300"
              >
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
