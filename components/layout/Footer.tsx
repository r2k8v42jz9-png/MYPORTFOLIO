"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Code2, Heart } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/projects`, label: t("nav.projects") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/ai-agents`, label: t("nav.aiAgents") },
    { href: `/${locale}/telegram-bots`, label: t("nav.telegramBots") },
    { href: `/${locale}/pricing`, label: t("nav.pricing") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-muted)] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-lg text-gradient">Aziz Saburov</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-Stack Developer · AI Specialist · Tashkent
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/saburovvs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] flex items-center justify-center transition-all duration-200 text-muted-foreground"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="mailto:saburov.aziz@icloud.com"
                className="w-9 h-9 rounded-lg bg-secondary hover:bg-[var(--gold)]/10 hover:text-[var(--gold)] flex items-center justify-center transition-all duration-200 text-muted-foreground"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[var(--gold)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">
              {t("contact.info_title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a
                  href="mailto:saburov.aziz@icloud.com"
                  className="hover:text-foreground transition-colors"
                >
                  saburov.aziz@icloud.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Send className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a
                  href="https://t.me/saburovvs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  @saburovvs
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <a
                  href="tel:+998906863432"
                  className="hover:text-foreground transition-colors"
                >
                  +998 90 686 34 32
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>Tashkent, Uzbekistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aziz Saburov. {t("footer.rights")}.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            {t("footer.made_with")}
            <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-0.5" />
            {t("footer.in")} {t("footer.location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
