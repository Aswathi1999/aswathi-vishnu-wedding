"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps the app so every Framer Motion animation site-wide automatically
 * respects the OS-level prefers-reduced-motion setting (strips transforms,
 * keeps only opacity) without touching each component individually.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
