"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Rocket, Sparkles, Search, BrainCircuit } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const ITEMS = [
  { key: "fast", icon: Rocket },
  { key: "uiux", icon: Sparkles },
  { key: "seo", icon: Search },
  { key: "ai", icon: BrainCircuit },
] as const;

export default function WhyChooseMe() {
  const t = useTranslations("why");

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb w-[400px] h-[400px] bg-[var(--gold)]/5 top-0 left-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-sm font-medium text-[var(--gold)] mb-3 tracking-[0.2em] uppercase">
              {t("subtitle")}
            </p>
          </Reveal>
          <Reveal index={1} as="h2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t("title")}
            </span>
          </Reveal>
          <Reveal index={2}>
            <p className="text-muted-foreground max-w-xl mx-auto mt-4 text-base sm:text-lg">
              {t("description")}
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative glass border border-border/50 rounded-3xl p-7 overflow-hidden transition-colors duration-500 hover:border-[var(--gold)]/40"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--gold)]/15 blur-2xl" />
              </div>

              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-5xl font-bold text-foreground/[0.04] group-hover:text-[var(--gold)]/10 transition-colors duration-500 select-none">
                0{i + 1}
              </span>

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gold)]/15 to-[var(--gold)]/5 border border-[var(--gold)]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--gold)]/20 transition-all duration-500">
                  <Icon className="w-7 h-7 text-[var(--gold)]" />
                </div>
                <h3 className="font-bold text-lg mb-2.5 tracking-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`items.${key}.desc`)}
                </p>
              </div>

              {/* Animated bottom border */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
