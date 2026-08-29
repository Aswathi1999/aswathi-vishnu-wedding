import type { Variants } from "framer-motion";
import { Reveal } from "./Reveal";
import { WatercolorFloral } from "./WatercolorFloral";

const floralDrift: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};

interface SectionFloralAccentProps {
  /** Must be unique per section on the page — scopes each corner's SVG filter id. */
  id: string;
  /** "blush" for ivory/sand sections, "gold" for dark brown sections. */
  tone?: "blush" | "gold";
  /**
   * "full" = a large cluster in two opposite corners plus a small sprig in the
   * other two (the couple section's signature treatment).
   * "diagonal" = a single, subtler cluster pair in one diagonal — for
   * supporting sections so the motif doesn't overwhelm the page.
   */
  variant?: "full" | "diagonal";
  /** Which diagonal to use. Ignored when variant is "full" (uses both). */
  corners?: "tl-br" | "tr-bl";
  /** Only used when variant is "diagonal" — lets quieter sections go smaller/fainter. */
  size?: "sm" | "md";
}

/**
 * A Reveal's own motion.div writes its inline `transform` for the entrance
 * animation (floralDrift's scale), which would silently override any static
 * rotate/flip class placed on that same element. Keep the static orientation
 * classes on this separate inner wrapper instead, and the ambient float on a
 * wrapper further in still — each transform source gets its own element so
 * they compose instead of clobbering one another.
 */
function FloralOrnament({
  id,
  tone,
  orientationClassName = "",
  floatDelay = "0s",
}: {
  id: string;
  tone: "blush" | "gold";
  orientationClassName?: string;
  floatDelay?: string;
}) {
  return (
    <div className={`h-full w-full ${orientationClassName}`}>
      <div className="float-slow h-full w-full" style={{ animationDelay: floatDelay }}>
        <WatercolorFloral id={id} tone={tone} className="h-full w-full" />
      </div>
    </div>
  );
}

export function SectionFloralAccent({
  id,
  tone = "blush",
  variant = "diagonal",
  corners = "tl-br",
  size = "md",
}: SectionFloralAccentProps) {
  if (variant === "full") {
    return (
      <>
        <Reveal
          variants={floralDrift}
          delay={0.2}
          className="pointer-events-none absolute -top-8 -left-8 z-0 h-40 w-40 opacity-70 sm:-top-10 sm:-left-10 sm:h-56 sm:w-56 sm:opacity-90 md:h-64 md:w-64"
        >
          <FloralOrnament id={`${id}-tl`} tone={tone} floatDelay="0s" />
        </Reveal>
        <Reveal
          variants={floralDrift}
          delay={0.3}
          className="pointer-events-none absolute -bottom-8 -right-8 z-0 h-40 w-40 opacity-70 sm:-bottom-10 sm:-right-10 sm:h-56 sm:w-56 sm:opacity-90 md:h-64 md:w-64"
        >
          <FloralOrnament id={`${id}-br`} tone={tone} orientationClassName="rotate-180" floatDelay="3s" />
        </Reveal>
        <Reveal
          variants={floralDrift}
          delay={0.25}
          className="pointer-events-none absolute -top-4 -right-4 z-0 h-20 w-20 opacity-50 sm:top-2 sm:right-2 sm:h-28 sm:w-28 sm:opacity-60"
        >
          <FloralOrnament id={`${id}-tr`} tone={tone} orientationClassName="scale-x-[-1]" floatDelay="5s" />
        </Reveal>
        <Reveal
          variants={floralDrift}
          delay={0.35}
          className="pointer-events-none absolute -bottom-4 -left-4 z-0 h-20 w-20 opacity-50 sm:bottom-2 sm:left-2 sm:h-28 sm:w-28 sm:opacity-60"
        >
          <FloralOrnament id={`${id}-bl`} tone={tone} orientationClassName="scale-x-[-1] rotate-180" floatDelay="1.5s" />
        </Reveal>
      </>
    );
  }

  const sizeClasses = size === "sm" ? "h-20 w-20 sm:h-28 sm:w-28" : "h-28 w-28 sm:h-40 sm:w-40 md:h-48 md:w-48";
  const opacityClasses = size === "sm" ? "opacity-40 sm:opacity-50" : "opacity-45 sm:opacity-60";

  const firstCorner = corners === "tl-br" ? "absolute -top-6 -left-6 sm:-top-8 sm:-left-8" : "absolute -top-6 -right-6 sm:-top-8 sm:-right-8";
  const secondCorner =
    corners === "tl-br" ? "absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8" : "absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8";
  const firstOrientation = corners === "tl-br" ? "" : "scale-x-[-1]";
  const secondOrientation = corners === "tl-br" ? "rotate-180" : "scale-x-[-1] rotate-180";

  return (
    <>
      <Reveal variants={floralDrift} delay={0.15} className={`pointer-events-none z-0 ${firstCorner} ${sizeClasses} ${opacityClasses}`}>
        <FloralOrnament id={`${id}-a`} tone={tone} orientationClassName={firstOrientation} floatDelay="0s" />
      </Reveal>
      <Reveal variants={floralDrift} delay={0.25} className={`pointer-events-none z-0 ${secondCorner} ${sizeClasses} ${opacityClasses}`}>
        <FloralOrnament id={`${id}-b`} tone={tone} orientationClassName={secondOrientation} floatDelay="3.5s" />
      </Reveal>
    </>
  );
}
