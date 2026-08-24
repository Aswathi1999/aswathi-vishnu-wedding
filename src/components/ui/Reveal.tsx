"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "span";
}

export function Reveal({ children, className, variants = fadeUp, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] } : undefined}
    >
      {children}
    </MotionTag>
  );
}
