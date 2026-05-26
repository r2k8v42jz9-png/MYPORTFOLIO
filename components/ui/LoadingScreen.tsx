"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Elegant first-load intro. Shows an animated "AS" monogram with a thin
 * progress sweep, then fades away. Persists a flag in sessionStorage so
 * it only appears once per browser session.
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("intro-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("intro-seen", "1");
      document.body.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[var(--gold)]/10 blur-[100px]" />

          {/* Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--gold-muted)] flex items-center justify-center shadow-2xl glow-gold">
              <span className="text-3xl font-bold text-black tracking-tight">AS</span>
            </div>

            {/* Rotating accent ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute -inset-3 rounded-3xl border border-dashed border-[var(--gold)]/30"
            />
          </motion.div>

          {/* Name + progress */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <span className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Aziz Saburov
            </span>
            <div className="w-40 h-[2px] bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: [0.45, 0, 0.55, 1] }}
                className="h-full w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
