import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Variants } from "framer-motion";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JasmineMotif } from "@/components/ui/motifs";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";
import type { PersonInfo } from "@/types/wedding";

const fadeFromLeft: Variants = {
  hidden: { opacity: 0, x: -36, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 36, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function PortraitCard({ person, role }: { person: PersonInfo; role: "Groom" | "Bride" }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="group relative aspect-[3/4] w-[230px] overflow-hidden rounded-[2px] shadow-[0_20px_50px_-22px_rgba(45,33,27,0.4)] ring-1 ring-gold/30 sm:w-[260px] md:w-[300px]">
        <Image
          src={person.image}
          alt={person.fullName}
          fill
          priority
          sizes="(min-width: 768px) 300px, (min-width: 640px) 260px, 230px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brown/15 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div>
        <h3 className="font-serif text-3xl tracking-[0.06em] uppercase text-brown sm:text-4xl">
          {person.name}
        </h3>
        <p className="mt-2 text-[11px] font-medium tracking-[0.4em] uppercase text-gold">{role}</p>
        {person.location ? (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-brown-soft/50">
            <MapPin size={11} aria-hidden="true" />
            {person.location}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CoupleSection() {
  const { bride, groom } = weddingConfig;

  return (
    <section id="couple" className="relative overflow-hidden bg-ivory px-5 py-20 sm:px-8 sm:py-28">
      <SectionFloralAccent id="couple" tone="blush" variant="full" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Couple"
          title={
            <>
              Two Hearts.
              <br />
              One Journey.
            </>
          }
          subtitle="Together, we begin forever."
        />

        <div className="mt-14 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-0">
          <Reveal variants={fadeFromLeft} delay={0.15} className="md:-mr-6 md:-translate-y-3">
            <PortraitCard person={groom} role="Groom" />
          </Reveal>

          <Reveal variants={fadeScaleIn} delay={0.25} className="relative z-10 flex flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ivory font-serif text-2xl italic text-gold shadow-sm">
              &amp;
            </span>
          </Reveal>

          <Reveal variants={fadeFromRight} delay={0.35} className="md:-ml-6 md:translate-y-3">
            <PortraitCard person={bride} role="Bride" />
          </Reveal>
        </div>

        <Reveal delay={0.5} className="mx-auto mt-14 max-w-md text-center">
          <p className="font-serif text-lg italic leading-relaxed text-brown-soft/80 sm:text-xl">
            Two lives.
            <br />
            One beautiful beginning.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-xs items-center gap-4 text-gold/60">
          <span className="gold-rule h-px flex-1" aria-hidden="true" />
          <JasmineMotif className="h-6 w-6 shrink-0" />
          <span className="gold-rule h-px flex-1" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
