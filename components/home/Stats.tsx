"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = to / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

const STATS = [
  { key: "projects", value: 3, suffix: "+" },
  { key: "clients", value: 2, suffix: "+" },
  { key: "experience", value: 1, suffix: "" },
  { key: "satisfaction", value: 100, suffix: "%" },
];

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass border border-[var(--gold)]/10 rounded-2xl p-6 text-center hover:border-[var(--gold)]/30 transition-all duration-300 card-hover"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-2">
                <Counter to={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{t(stat.key as "projects")}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
