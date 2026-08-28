"use client";

import { useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { formatDotDate } from "@/lib/date";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

export function SaveTheDate() {
  const { bride, groom, weddingDate, location, events } = weddingConfig;
  const [open, setOpen] = useState(false);

  const mainEvent = events[0];
  const eventDetails = {
    title: `${bride.name} & ${groom.name}'s Wedding`,
    description: `Join us as we celebrate the wedding of ${bride.name} and ${groom.name} at ${location.venue}, ${location.city}.`,
    location: `${location.venue}, ${location.city}, ${location.state}`,
    isoDate: weddingDate,
    time: mainEvent?.time,
  };

  return (
    <section className="relative overflow-hidden bg-brown px-5 py-16 text-ivory sm:px-8 sm:py-24">
      <SectionFloralAccent id="savethedate" tone="gold" corners="tr-bl" />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.4em] uppercase text-gold-light">Save the Date</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-serif text-4xl sm:text-5xl tracking-[0.1em]">{formatDotDate(weddingDate)}</p>
        </Reveal>

        <Reveal delay={0.18} className="flex flex-col items-center gap-1">
          <p className="font-serif text-xl uppercase tracking-[0.15em]">
            {bride.name} &amp; {groom.name}
          </p>
          <GoldDivider className="my-3" />
          <p className="text-sm tracking-[0.2em] uppercase text-ivory/75">{location.venue}</p>
          <p className="text-sm tracking-[0.2em] uppercase text-ivory/75">{location.city}</p>
        </Reveal>

        <Reveal delay={0.28} className="relative mt-6">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 border border-gold px-7 py-3 text-xs tracking-[0.25em] uppercase text-ivory transition-colors hover:bg-gold hover:text-brown"
          >
            <CalendarPlus size={15} aria-hidden="true" />
            Add to Calendar
          </button>

          {open ? (
            <div className="absolute left-1/2 top-full z-10 mt-3 flex w-56 -translate-x-1/2 flex-col gap-1 border border-gold/40 bg-ivory p-2 text-brown shadow-xl">
              <a
                href={buildGoogleCalendarUrl(eventDetails)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-left text-xs tracking-[0.15em] uppercase hover:bg-sand"
              >
                Google Calendar
              </a>
              <button
                type="button"
                onClick={() => downloadIcs(eventDetails, "aswathi-vishnu-wedding.ics")}
                className="flex items-center gap-2 px-4 py-2 text-left text-xs tracking-[0.15em] uppercase hover:bg-sand"
              >
                <Download size={13} aria-hidden="true" />
                Download .ics
              </button>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
