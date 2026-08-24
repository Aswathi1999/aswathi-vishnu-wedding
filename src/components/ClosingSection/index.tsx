import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function ClosingSection() {
  const { bride, groom, weddingDate, images } = weddingConfig;

  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-brown text-ivory">
      <div className="absolute inset-0">
        <Image
          src={images.coupleAlt}
          alt={`${bride.name} and ${groom.name}`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/70 via-brown/50 to-brown/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-24 text-center">
        <Reveal>
          <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed">
            And So,
            <br />
            Our Forever Begins.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="flex items-center gap-4">
          <span className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.1em]">{bride.name}</span>
          <span className="font-serif italic text-gold-light">&amp;</span>
          <span className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.1em]">{groom.name}</span>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-sm tracking-[0.35em] uppercase text-gold-light">{formatDotDate(weddingDate)}</p>
        </Reveal>

        <Reveal delay={0.35}>
          <GoldDivider className="my-6" />
        </Reveal>

        <Reveal delay={0.45} className="flex flex-col items-center gap-2">
          <p className="max-w-sm text-sm leading-relaxed text-ivory/85">
            Thank you for being part of our story.
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-ivory/70">
            With Love, {bride.name} &amp; {groom.name}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
