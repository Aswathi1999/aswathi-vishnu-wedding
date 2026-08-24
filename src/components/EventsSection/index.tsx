import { weddingConfig } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "./EventCard";

export function EventsSection() {
  const events = weddingConfig.events.filter(Boolean);

  if (events.length === 0) return null;

  return (
    <section id="event" className="bg-sand/40 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="The Celebration" title={events.length > 1 ? "Wedding Events" : "The Wedding"} />

        <div
          className={`mt-16 grid gap-10 ${
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
