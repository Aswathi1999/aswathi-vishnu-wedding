import { Plane, TrainFront, MapPinned, MessageCircle } from "lucide-react";
import { weddingConfig } from "@/config/wedding";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { SectionFloralAccent } from "@/components/ui/SectionFloralAccent";

export function TravelSection() {
  const { travel, contact, bride, groom } = weddingConfig;

  if (!travel.enabled) return null;

  const gettingThereItems = [
    { icon: Plane, label: "Airport", value: travel.gettingThere.airport },
    { icon: TrainFront, label: "Railway Station", value: travel.gettingThere.railway },
    { icon: MapPinned, label: "Nearby", value: travel.gettingThere.nearby },
  ].filter((item) => item.value);

  const helpMessage = `Hi! I have a question about traveling for ${bride.name} & ${groom.name}'s wedding.`;

  return (
    <section className="relative overflow-hidden bg-sand/40 px-5 py-16 sm:px-8 sm:py-24">
      <SectionFloralAccent id="travel" tone="blush" corners="tl-br" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading eyebrow="Getting Here" title="Travel &amp; Stay" />

        {gettingThereItems.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-center font-serif text-2xl text-brown">Getting There</h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {gettingThereItems.map(({ icon: Icon, label, value }, index) => (
                <Reveal key={label} delay={0.1 * index} className="flex flex-col items-center gap-3 text-center">
                  <Icon className="text-gold" size={26} aria-hidden="true" />
                  <p className="text-xs tracking-[0.25em] uppercase text-brown-soft">{label}</p>
                  <p className="text-sm leading-relaxed text-brown-soft/85">{value}</p>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {travel.stay.length > 0 ? (
          <div className="mt-14">
            <GoldDivider className="mx-auto mb-12" />
            <h3 className="text-center font-serif text-2xl text-brown">Where to Stay</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {travel.stay.map((hotel, index) => (
                <Reveal
                  key={hotel.name}
                  delay={0.08 * index}
                  className="flex flex-col items-start gap-3 border border-gold/25 bg-ivory p-6"
                >
                  <p className="font-serif text-lg text-brown">{hotel.name}</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-brown-soft/70">{hotel.distance}</p>
                  <a
                    href={hotel.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 text-xs tracking-[0.2em] uppercase text-gold underline underline-offset-4 hover:text-brown"
                  >
                    View Hotel
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {contact.whatsapp ? (
          <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
            <GoldDivider className="mb-4" />
            <p className="font-serif text-xl text-brown">Need Help?</p>
            <a
              href={buildWhatsAppUrl(contact.whatsapp, helpMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-brown transition-colors hover:bg-gold hover:text-ivory"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Message Us on WhatsApp
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
