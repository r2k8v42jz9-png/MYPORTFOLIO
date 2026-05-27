"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

type FormState = {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  project_type: "",
  budget: "",
  message: "",
};

export default function ContactContent() {
  const t = useTranslations("contact");

  const projectTypes = t.raw("project_types") as string[];
  const budgets = t.raw("budgets") as string[];

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const loading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation — preserves input, shows a readable message.
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg(t("error"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { success?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.success) {
        // Show the server's readable error; keep the user's input intact.
        setErrorMsg(data.error || t("error"));
        setStatus("error");
        return;
      }

      // Success — reset the form behind the success panel.
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setErrorMsg(t("error"));
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 focus:border-[var(--gold)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/10 text-sm transition-all duration-200 placeholder:text-muted-foreground/50";

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-xl font-bold">{t("info_title")}</h2>

            {/* Info cards */}
            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "saburov.aziz@icloud.com",
                  href: "mailto:saburov.aziz@icloud.com",
                },
                {
                  icon: Send,
                  label: "Telegram",
                  value: "@saburovvs",
                  href: "https://t.me/saburovvs",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+998 90 686 34 32",
                  href: "tel:+998906863432",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Tashkent, Uzbekistan",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 glass border border-border/50 rounded-2xl p-4 hover:border-[var(--gold)]/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold hover:text-[var(--gold)] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Telegram CTA */}
            <Magnetic strength={0.2}>
              <a
                href="https://t.me/saburovvs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#2AABEE]/10 border border-[#2AABEE]/20 hover:bg-[#2AABEE]/20 hover:border-[#2AABEE]/40 transition-colors font-semibold text-[#2AABEE]"
              >
                <Send className="w-5 h-5" />
                {t("telegram_cta")}
              </a>
            </Magnetic>

            {/* Response time */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground glass border border-border/50 rounded-2xl p-4">
              <Clock className="w-4 h-4 text-[var(--gold)] shrink-0" />
              {t("response_time")}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass border border-border/50 rounded-3xl p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.45, delay: 0.1 }}
                      className="relative mb-6"
                    >
                      <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{t("success_title")}</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-7">
                      {t("success_desc")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-[var(--gold)]/40 hover:bg-[var(--gold)]/5 text-sm font-semibold transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                      {t("send_another")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <MessageSquare className="w-5 h-5 text-[var(--gold)]" />
                      <h2 className="text-lg font-bold">{t("form_title")}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("name")} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("name_placeholder")}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("email")} <span className="text-[var(--gold)]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("email_placeholder")}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("project_type")}
                    </label>
                    <select
                      name="project_type"
                      value={form.project_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">—</option>
                      {projectTypes.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      {t("budget")}
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">—</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    {t("message")} <span className="text-[var(--gold)]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("message_placeholder")}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-400">
                            {t("error_title")}
                          </p>
                          <p className="text-xs text-red-400/80 mt-0.5">{errorMsg}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-bold transition-all duration-300 shadow-lg shadow-[var(--gold)]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("send")}
                    </>
                  )}
                </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
