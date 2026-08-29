import Image from "next/image";
import { MapPin } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { getMapsUrl } from "@/lib/maps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";
import { scaleIn } from "@/lib/motion";

export function VenueSection() {
  const { location, images } = weddingConfig;
  const mapsUrl = getMapsUrl(location);

  return (
    <section id="venue" className="relative overflow-hidden bg-ivory px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="venue" tone="blush" corners="tr-bl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="The Venue" title={'Where We Say "I Do"'} />

        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal variants={scaleIn} className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={images.venue}
              alt={location.venue}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col items-start gap-4">
            <h3 className="font-serif text-3xl sm:text-4xl leading-tight text-brown">{location.venue}</h3>
            <p className="text-sm tracking-[0.25em] uppercase text-brown-soft/80">
              {location.city}
              <br />
              {location.state}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
            >
              <MapPin size={14} aria-hidden="true" />
              Get Directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
