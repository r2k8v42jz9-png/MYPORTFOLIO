"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Briefcase,
  Code2,
  CheckCircle2,
} from "lucide-react";

const TECH_STACK = [
  { name: "Next.js", color: "from-white/20 to-white/5" },
  { name: "React", color: "from-blue-500/20 to-blue-500/5" },
  { name: "TypeScript", color: "from-blue-400/20 to-blue-400/5" },
  { name: "Tailwind CSS", color: "from-cyan-500/20 to-cyan-500/5" },
  { name: "Node.js", color: "from-green-500/20 to-green-500/5" },
  { name: "Telegram Bot API", color: "from-blue-300/20 to-blue-300/5" },
  { name: "OpenAI API", color: "from-purple-500/20 to-purple-500/5" },
  { name: "Claude API", color: "from-orange-500/20 to-orange-500/5" },
  { name: "Firebase", color: "from-yellow-500/20 to-yellow-500/5" },
  { name: "Supabase", color: "from-green-400/20 to-green-400/5" },
  { name: "Vercel", color: "from-white/20 to-white/5" },
  { name: "Framer Motion", color: "from-pink-500/20 to-pink-500/5" },
];

const SKILLS = [
  { name: "Frontend Development", level: 85 },
  { name: "UI/UX Design", level: 75 },
  { name: "Backend / API", level: 70 },
  { name: "Telegram Bots", level: 90 },
  { name: "AI Integration", level: 80 },
  { name: "SEO & Performance", level: 78 },
];

type TimelineItem = { year: string; title: string; desc: string };

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-muted)]"
        />
      </div>
    </div>
  );
}

export default function AboutContent() {
  const t = useTranslations("about");
  const timeline = t.raw("timeline") as TimelineItem[];

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text */}
          <div>
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
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              {t("title")}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>{t("story")}</p>
              <p>{t("story2")}</p>
            </motion.div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {[
                { icon: Calendar, label: t("age") },
                { icon: MapPin, label: t("location") },
                { icon: Briefcase, label: `${t("experience_label")}: ${t("experience_value")}` },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/50 text-sm"
                >
                  <Icon className="w-4 h-4 text-[var(--gold)]" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Avatar / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[var(--gold)]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-dashed border-[var(--gold)]/10"
              />

              {/* Center card */}
              <div className="absolute inset-10 glass border border-[var(--gold)]/20 rounded-3xl flex flex-col items-center justify-center shadow-2xl">
                <div className="text-6xl mb-3">👨‍💻</div>
                <div className="text-sm font-bold text-center">Aziz Saburov</div>
                <div className="text-xs text-muted-foreground">Full-Stack Dev</div>
              </div>

              {/* Orbiting badges */}
              {[
                { top: "0%", left: "50%", label: "Next.js", delay: 0 },
                { top: "50%", right: "0%", label: "AI", delay: 0.5 },
                { bottom: "0%", left: "50%", label: "Bots", delay: 1 },
                { top: "50%", left: "0%", label: "UX", delay: 1.5 },
              ].map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: badge.delay + 0.5, type: "spring" }}
                  className="absolute glass border border-border/50 rounded-xl px-2.5 py-1 text-xs font-semibold shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: badge.top,
                    left: badge.left,
                    right: (badge as { right?: string }).right,
                    bottom: badge.bottom,
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 flex items-center gap-2"
            >
              <Code2 className="w-6 h-6 text-[var(--gold)]" />
              {t("skills_title")}
            </motion.h2>
            <div className="space-y-5">
              {SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8"
            >
              {t("tech_title")}
            </motion.h2>
            <div className="flex flex-wrap gap-2.5">
              {TECH_STACK.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`px-3 py-1.5 rounded-xl bg-gradient-to-br ${tech.color} border border-border/50 text-sm font-medium cursor-default hover:border-[var(--gold)]/40 transition-all duration-200 hover:scale-105`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-10 text-center"
          >
            {t("timeline_title")}
          </motion.h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/50 to-transparent" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pl-14 relative"
                >
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-[var(--gold)] bg-background flex items-center justify-center">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[var(--gold)]" />
                  </div>
                  <div className="glass border border-border/50 rounded-2xl p-5 flex-1 hover:border-[var(--gold)]/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-lg">
                        {item.year}
                      </span>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
