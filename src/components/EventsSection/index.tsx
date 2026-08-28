import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";
import { EventCard } from "./EventCard";

export function EventsSection() {
  const events = weddingConfig.events.filter(Boolean);

  if (events.length === 0) return null;

  return (
    <section id="event" className="relative overflow-hidden bg-sand/40 px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="events" tone="blush" corners="tr-bl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading eyebrow="The Celebration" title={events.length > 1 ? "Wedding Events" : "The Wedding"} />

        <div
          className={`mt-12 grid gap-10 ${
            events.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
