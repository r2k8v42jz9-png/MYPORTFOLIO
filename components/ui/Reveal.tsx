"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.08 },
  }),
};

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplied by 0.08s for the delay. */
  index?: number;
  className?: string;
  /** Render as a different motion element. Defaults to div. */
  as?: "div" | "section" | "li" | "article" | "h2" | "p";
}

/**
 * Consistent scroll-reveal wrapper used across sections so every
 * entrance shares the same cinematic easing and timing.
 */
export default function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
