"use client";

import { weddingConfig } from "@/config/wedding";
import { useCountdown } from "@/lib/useCountdown";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/ui/GoldDivider";

const units: Array<{ key: "days" | "hours" | "minutes" | "seconds"; label: string }> = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function Countdown() {
  const { bride, groom, weddingDate } = weddingConfig;
  const countdown = useCountdown(weddingDate);

  return (
    <section className="bg-brown px-5 py-24 text-ivory sm:px-8 sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
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
                  <span className="font-serif text-3xl tabular-nums leading-none text-ivory sm:text-5xl">
                    {countdown[unit.key].toString().padStart(2, "0")}
                  </span>
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
