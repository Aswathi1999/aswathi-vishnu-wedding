import Image from "next/image";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JasmineMotif } from "@/components/ui/motifs";

export function CoupleSection() {
  const { bride, groom } = weddingConfig;

  return (
    <section id="couple" className="bg-ivory px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={
            <>
              Two Hearts.
              <br />
              One Journey.
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <div className="relative aspect-square w-40 overflow-hidden rounded-full ring-1 ring-gold/40 sm:w-48">
              <Image
                src={groom.image}
                alt={groom.fullName}
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl tracking-[0.15em] uppercase text-brown">{groom.name}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-brown-soft/85">{groom.about}</p>
            </div>
          </Reveal>

          <div className="flex flex-row items-center justify-center gap-4 md:flex-col md:gap-4">
            <span className="h-px w-12 bg-gold/60 md:h-12 md:w-px" aria-hidden="true" />
            <span className="font-serif text-3xl italic text-gold">&amp;</span>
            <span className="h-px w-12 bg-gold/60 md:h-12 md:w-px" aria-hidden="true" />
          </div>

          <Reveal delay={0.15} className="flex flex-col items-center gap-5 text-center">
            <div className="relative aspect-square w-40 overflow-hidden rounded-full ring-1 ring-gold/40 sm:w-48">
              <Image
                src={bride.image}
                alt={bride.fullName}
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl tracking-[0.15em] uppercase text-brown">{bride.name}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-brown-soft/85">{bride.about}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex justify-center text-gold/70">
          <JasmineMotif className="h-8 w-8" />
        </div>
      </div>
    </section>
  );
}
