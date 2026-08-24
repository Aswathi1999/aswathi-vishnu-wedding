import { MapPin, Shirt } from "lucide-react";
import type { WeddingEvent } from "@/types/wedding";
import { weddingConfig } from "@/config/wedding";
import { formatLongDate, formatTime } from "@/lib/date";
import { getMapsUrl } from "@/lib/maps";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const { bride, groom } = weddingConfig;
  const mapsUrl = getMapsUrl({
    mapsUrl: event.mapsUrl ?? "",
    venue: event.venue,
    address: event.address ?? "",
    city: weddingConfig.location.city,
    state: weddingConfig.location.state,
    country: weddingConfig.location.country,
  });

  return (
    <Reveal delay={0.1 * index} className="w-full">
      <article className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 border border-gold/30 bg-ivory px-6 py-12 text-center sm:px-14 sm:py-16">
        <p className="text-xs tracking-[0.4em] uppercase text-gold">{event.name}</p>

        <h3 className="font-serif text-2xl sm:text-3xl tracking-wide text-brown">{formatLongDate(event.date)}</h3>

        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl uppercase tracking-[0.2em] text-brown">{bride.name}</span>
          <span className="font-serif italic text-gold">&amp;</span>
          <span className="font-serif text-2xl uppercase tracking-[0.2em] text-brown">{groom.name}</span>
        </div>

        <GoldDivider />

        <div className="flex flex-col items-center gap-1">
          <p className="font-serif text-lg text-brown">{event.venue}</p>
          {event.address ? <p className="text-sm text-brown-soft/80">{event.address}</p> : null}
        </div>

        <p className="text-sm tracking-[0.15em] uppercase text-brown-soft">
          {event.timeLabel ? `${event.timeLabel} · ` : ""}
          {formatTime(event.time)}
        </p>

        {event.description ? (
          <p className="max-w-md text-sm leading-relaxed text-brown-soft/85">{event.description}</p>
        ) : null}

        {event.dressCode ? (
          <p className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-brown-soft">
            <Shirt size={14} aria-hidden="true" />
            {event.dressCode}
          </p>
        ) : null}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
        >
          <MapPin size={14} aria-hidden="true" />
          Get Directions
        </a>
      </article>
    </Reveal>
  );
}
