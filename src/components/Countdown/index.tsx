"use client";

import { AnimatePresence, motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { useCountdown } from "@/lib/useCountdown";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

const units: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function CountdownDigit({ value }: { value: number }) {
  const display = value.toString().padStart(2, "0");
  return (
    <span className="relative block h-9 w-full overflow-hidden sm:h-14">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center font-serif text-3xl tabular-nums leading-none text-ivory sm:text-5xl"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const { bride, groom, weddingDate } = weddingConfig;
  const countdown = useCountdown(weddingDate);

  return (
    <section className="relative overflow-hidden bg-brown px-5 py-16 text-ivory sm:px-8 sm:py-24">
      <SectionFloralAccent id="countdown" tone="gold" corners="tr-bl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <SectionHeading eyebrow="The Big Day" title="Counting Down to Forever" light align="center" />

        <GoldDivider className="my-10 opacity-70" />

        {countdown.isPast ? (
          <Reveal className="flex flex-col items-center gap-3 border border-gold/30 px-10 py-10 text-center sm:px-16">
            <p className="text-xs tracking-[0.35em] uppercase text-gold-light">Today Is The Day</p>
            <p className="font-serif text-3xl sm:text-4xl">
              {bride.name} &amp; {groom.name}
            </p>
          </Reveal>
        ) : (
          <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-5">
            {units.map((unit, index) => (
              <Reveal key={unit.key} delay={0.08 * index}>
                <div className="flex w-[4.5rem] flex-col items-center gap-2 border border-gold/30 px-2 py-5 text-center sm:w-28 sm:py-7">
                  <CountdownDigit value={countdown[unit.key]} />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold-light sm:text-xs">
                    {unit.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
