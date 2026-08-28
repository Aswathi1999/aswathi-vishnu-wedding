import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { NilavilakkuMotif } from "@/components/ui/motifs";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

export function SacredSection() {
  return (
    <section className="relative overflow-hidden bg-brown px-5 py-16 text-ivory sm:px-8 sm:py-20">
      <SectionFloralAccent id="sacred" tone="gold" corners="tl-br" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
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
