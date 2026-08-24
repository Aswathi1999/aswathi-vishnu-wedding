import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { NilavilakkuMotif } from "@/components/ui/motifs";

export function SacredSection() {
  return (
    <section className="bg-brown px-5 py-24 text-ivory sm:px-8 sm:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <Reveal>
          <NilavilakkuMotif className="h-20 w-16 text-gold-light" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-light">A Sacred Beginning</p>
        </Reveal>

        <GoldDivider className="opacity-70" />

        <Reveal delay={0.2}>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ivory/95 text-balance">
            With the blessings of our families, we invite you to join us as we begin a beautiful new chapter
            together.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
