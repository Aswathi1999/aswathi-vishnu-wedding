import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl gap-4`}>
      {eyebrow ? (
        <Reveal>
          <span
            className={`text-xs sm:text-sm tracking-[0.35em] uppercase font-medium ${
              light ? "text-gold-light" : "text-gold"
            }`}
          >
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.1}>
        <h2
          className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-balance ${
            light ? "text-ivory" : "text-brown"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.2}>
          <p className={`text-sm sm:text-base leading-relaxed ${light ? "text-ivory/80" : "text-brown-soft/80"}`}>
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
